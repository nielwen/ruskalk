// ========================================
// MAIN.JS - Hovedfil for skåringsverktøy
// Håndterer initialisering, fane-navigasjon og globale funksjoner
// ========================================

// Import av skjemadata
import { AR_LABELS, CIWA_AR } from './ciwa-ar.js';
import { B_LABELS, CIWA_B } from './ciwa-b.js';
import { COWS_LABELS, COWS } from './cows.js';
import { MADRS_LABELS, MADRS } from './madrs.js';
import { YMRS_LABELS, YMRS } from './ymrs.js';

// Import av hjelpefunksjoner
import {
  labelFor,
  buildPrintSheet,
  makeScale,
  renderQuestions,
  getAnswers,
  levelFor,
  computeTotals,
  scrollToFirstUnanswered,
  resetForm,
  buildSummary,
  buildLite,
  sendEmail,
  copySum,
  fallbackCopy,
  renderAll
} from './utils.js';

// ========================================
// INITIALISERING
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  
  // ========================================
  // SETT DAGENS DATO
  // ========================================
  
  /**
   * Sett dagens dato i datofelt automatisk
   */
  function setTodaysDate() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const today = `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
    
    const datoField = document.getElementById('dato');
    if (datoField) {
      datoField.value = today;
    }
  }
  
  setTodaysDate();

  // ========================================
  // DOM-ELEMENTER OG VARIABLER
  // ========================================
  
  // Fane-elementer
  const tabAr = document.getElementById('tab-ar');
  const tabB = document.getElementById('tab-b');
  const tabCOWS = document.getElementById('tab-cows');
  const tabMADRS = document.getElementById('tab-madrs');
  const tabYMRS = document.getElementById('tab-ymrs');
  
  // Panel-elementer
  const panelAr = document.getElementById('panel-ar');
  const panelB = document.getElementById('panel-b');
  const panelC = document.getElementById('panel-cows');
  const panelM = document.getElementById('panel-madrs');
  const panelY = document.getElementById('panel-ymrs');
  
  // Footer-elementer
  const footerAr = document.getElementById('footer-ar');
  const footerB = document.getElementById('footer-b');
  const footerC = document.getElementById('footer-cows');
  const footerM = document.getElementById('footer-madrs');
  const footerY = document.getElementById('footer-ymrs');
  
  // Modal-elementer
  const modal = document.getElementById('email-modal');
  const modalSchemeLabel = document.getElementById('modal-scheme-label');
  
  // Gjeldende skjema
  let currentScheme = 'ar';

  // ========================================
  // GOOGLE ANALYTICS TRACKING
  // ========================================
  
  /**
   * Track events til Google Analytics
   * @param {string} action - Handlingen som utføres
   * @param {string} category - Kategori for eventen
   * @param {string} label - Ekstra label/info
   * @param {number} value - Numerisk verdi (valgfri)
   */
  function trackEvent(action, category, label = '', value = null) {
    if (typeof gtag !== 'undefined') {
      const eventData = {
        event_category: category,
        event_label: label
      };
      if (value !== null) eventData.value = value;
      
      gtag('event', action, eventData);
      console.log(`GA Event: ${action} | ${category} | ${label}`, value);
    }
  }
  
  /**
   * Track skjema completion
   */
  function trackCompletion(scheme, score, level) {
    trackEvent('score_completed', 'assessment', `${scheme.toUpperCase()}_${level}`, score);
    trackEvent('assessment_usage', 'medical_tools', scheme.toUpperCase());
  }
  
  /**
   * Track user actions
   */
  function trackUserAction(action, scheme, additionalInfo = '') {
    trackEvent(action, 'user_interaction', `${scheme.toUpperCase()}_${additionalInfo}`);
  }

  // ========================================
  // FANE-NAVIGASJON
  // ========================================
  
  /**
   * Aktiver en spesifikk fane og skjul andre
   * @param {string} which - Skjematype ('ar', 'b', 'cows', 'madrs', 'ymrs')
   */
  function activateTab(which) {
    currentScheme = which;
    
    // Track tab switching
    trackUserAction('tab_switch', which);
    
    // Bestem hvilken fane som er aktiv
    const isAr = which === 'ar';
    const isB = which === 'b';
    const isC = which === 'cows';
    const isM = which === 'madrs';
    const isY = which === 'ymrs';
    
    // Oppdater fane-tilstand
    updateTabStates(isAr, isB, isC, isM, isY);
    
    // Vis/skjul paneler
    togglePanelVisibility(isAr, isB, isC, isM, isY);
    
    // Vis/skjul footers
    toggleFooterVisibility(isAr, isB, isC, isM, isY);
    
    // Kontroller synlighet av skjema-spesifikke seksjoner
    updateBodyClasses(which);
    
    // Oppdater utskriftselementer
    updatePrintElements(isAr, isB, isC, isM, isY);
    
    // Oppdater modal
    updateModalLabel(isAr, isB, isC, isM, isY);
    
    // Lukk details-elementer (footer, kontakt, ar-extra-info) ved fanebytte
    closeDetailsElements();
    
    // Scroll til topp og oppdater beregninger
    window.scrollTo({ top: 0, behavior: 'smooth' });
    computeTotals();
  }
  
  /**
   * Oppdater tilstand for faner (active/inactive)
   */
  function updateTabStates(isAr, isB, isC, isM, isY) {
    tabAr.classList.toggle('active', isAr);
    tabAr.setAttribute('aria-selected', isAr);
    
    tabB.classList.toggle('active', isB);
    tabB.setAttribute('aria-selected', isB);
    
    tabCOWS.classList.toggle('active', isC);
    tabCOWS.setAttribute('aria-selected', isC);
    
    tabMADRS.classList.toggle('active', isM);
    tabMADRS.setAttribute('aria-selected', isM);
    
    tabYMRS.classList.toggle('active', isY);
    tabYMRS.setAttribute('aria-selected', isY);
  }
  
  /**
   * Vis/skjul paneler basert på aktiv fane
   */
  function togglePanelVisibility(isAr, isB, isC, isM, isY) {
    panelAr.hidden = !isAr;
    panelB.hidden = !isB;
    panelC.hidden = !isC;
    panelM.hidden = !isM;
    panelY.hidden = !isY;
  }
  
  /**
   * Vis/skjul footers basert på aktiv fane
   */
  function toggleFooterVisibility(isAr, isB, isC, isM, isY) {
    footerAr.hidden = !isAr;
    footerB.hidden = !isB;
    footerC.hidden = !isC;
    footerM.hidden = !isM;
    footerY.hidden = !isY;
  }
  
  /**
   * Oppdater body-klasser for skjema-spesifikke stiler
   */
  function updateBodyClasses(scheme) {
    // Fjern eksisterende klasser
    document.body.className = document.body.className.replace(/active-(ar|b|cows|madrs|ymrs)/g, '');
    
    // Legg til ny klasse
    document.body.classList.add(`active-${scheme}`);
  }
  
  /**
   * Oppdater elementer for utskrift
   */
  function updatePrintElements(isAr, isB, isC, isM, isY) {
    const psList = document.getElementById('ps-list');
    const psTitle = document.getElementById('ps-title');
    
    if (psTitle) {
      psTitle.textContent = isAr ? 'CIWA-Ar' : isB ? 'CIWA-B' : isC ? 'COWS' : isM ? 'MADRS' : 'YMRS';
    }
    
    if (psList) {
      psList.classList.toggle('ps-ar', isAr);
      psList.classList.toggle('ps-b', isB);
      psList.classList.toggle('ps-cows', isC);
      psList.classList.toggle('ps-madrs', isM);
      psList.classList.toggle('ps-ymrs', isY);
    }
  }
  
  /**
   * Oppdater modal-label
   */
  function updateModalLabel(isAr, isB, isC, isM, isY) {
    if (modalSchemeLabel) {
      modalSchemeLabel.textContent = isAr ? 'CIWA-Ar' : isB ? 'CIWA-B' : isC ? 'COWS' : isM ? 'MADRS' : 'YMRS';
    }
  }
  
  /**
   * Lukk alle details-elementer ved fanebytte
   */
  function closeDetailsElements() {
    // Lukk footer-details
    const footerDetails = document.getElementById('footer-details');
    if (footerDetails) footerDetails.open = false;
    
    // Lukk kontakt-seksjonen (finn details-element i contact-section)
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      const contactDetails = contactSection.querySelector('details');
      if (contactDetails) contactDetails.open = false;
    }
    
    // Lukk AR-extra-info seksjon (finn details-element i ar-extra-info)
    const arExtraInfo = document.getElementById('ar-extra-info');
    if (arExtraInfo) {
      const arDetails = arExtraInfo.querySelector('details');
      if (arDetails) arDetails.open = false;
    }
  }
  
  // Event listeners for faner
  if (tabAr) tabAr.addEventListener('click', () => activateTab('ar'));
  if (tabB) tabB.addEventListener('click', () => activateTab('b'));
  if (tabCOWS) tabCOWS.addEventListener('click', () => activateTab('cows'));
  if (tabMADRS) tabMADRS.addEventListener('click', () => activateTab('madrs'));
  if (tabYMRS) tabYMRS.addEventListener('click', () => activateTab('ymrs'));

  // ========================================
  // E-POST MODAL
  // ========================================
  
  /**
   * Åpne e-post modal
   * @param {string} scheme - Skjematype
   */
  function openEmailModal(scheme) {
    currentScheme = scheme;
    
    if (modalSchemeLabel) {
      modalSchemeLabel.textContent = scheme === 'ar' ? 'CIWA-Ar' : 
                                   scheme === 'b' ? 'CIWA-B' : 
                                   scheme === 'cows' ? 'COWS' : 'MADRS';
    }
    
    if (modal) {
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
    }
  }
  
  /**
   * Lukk e-post modal
   */
  function closeEmailModal() {
    if (modal) {
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
  }
  
  // Event listeners for modal
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeEmailModal();
    });
  }
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeEmailModal();
  });

  // ========================================
  // UTSKRIFT
  // ========================================
  
  // Bygg utskriftsark før utskrift
  window.addEventListener('beforeprint', () => {
    buildPrintSheet(currentScheme);
    // Track print action
    trackUserAction('print_assessment', currentScheme);
  });

  // ========================================
  // GLOBALE FUNKSJONER
  // ========================================
  
  // Gjør funksjoner tilgjengelig for HTML onclick-attributter
  window.scrollToFirstUnanswered = scrollToFirstUnanswered;
  window.resetForm = resetForm;
  window.copySum = copySum;
  window.openEmailModal = openEmailModal;
  window.closeEmailModal = closeEmailModal;
  window.sendEmail = sendEmail;
  
  // Gjør tracking-funksjoner tilgjengelig globalt
  window.trackEvent = trackEvent;
  window.trackCompletion = trackCompletion;
  window.trackUserAction = trackUserAction;

  // ========================================
  // RESPONSIV FUNKSJONALITET
  // ========================================
  
  /**
   * Sett åpen/lukket tilstand for meta-details basert på skjermstørrelse
   */
  function setMetaOpenState() {
    const details = document.getElementById('meta-details');
    if (!details) return;
    
    // Åpne automatisk på større skjermer
    if (window.innerWidth > 700) {
      details.open = true;
    } else {
      details.open = false;
    }
  }
  
  // Event listeners for responsiv funksjonalitet
  window.addEventListener('resize', setMetaOpenState);
  setMetaOpenState(); // Kjør ved lasting

  // ========================================
  // INITIAL RENDERING
  // ========================================
  
  // Render alle skjemaer
  renderAll();
  
  // Sett initial tilstand (CIWA-Ar aktiv)
  document.body.classList.add('active-ar');
  
  // Sett initial meta-tilstand
  setMetaOpenState();
  
  // Marker at appen er lastet
  window.APP_LOADED = true;
  console.log('App initialisert successfully');
});

// ========================================
// KONTAKT/TILBAKEMELDING FUNKTIONER
// ========================================

/**
 * Send tilbakemelding via backend API
 * @param {Event} event - Form submit event
 */
window.sendFeedback = function(event) {
  event.preventDefault();
  
  const type = document.getElementById('feedback-type').value;
  const text = document.getElementById('feedback-text').value;
  
  // Valider input
  if (!type || !text.trim()) {
    alert('Vennligst fyll ut alle feltene.');
    return;
  }
  
  // Finn hvilken fane som er aktiv
  const activeTab = document.querySelector('.tab-btn.active');
  const currentScheme = activeTab ? activeTab.textContent.trim() : 'Ukjent fane';
  
  // Vis loading melding
  const submitBtn = event.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sender...';
  submitBtn.disabled = true;
  
  // Send til backend
  fetch('/api/feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: type,
      message: text,
      activeTab: currentScheme
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Track successful feedback
      trackEvent('feedback_sent', 'engagement', type);
      alert('Takk for tilbakemeldingen! Den er sendt til utvikleren.');
      resetContactForm();
    } else {
      // Track feedback error
      trackEvent('feedback_error', 'engagement', data.error || 'unknown_error');
      // Spesiell håndtering av rate limiting
      if (data.retryAfter) {
        const minutes = Math.ceil(data.retryAfter / 60);
        alert(`${data.error}\nPrøv igjen om ${minutes} minutter.`);
      } else {
        alert('Feil ved sending: ' + (data.error || 'Ukjent feil'));
      }
    }
  })
  .catch(error => {
    console.error('Feil ved sending av tilbakemelding:', error);
    alert('Kunne ikke sende tilbakemelding. Sjekk at backend-serveren kjører og prøv igjen.');
  })
  .finally(() => {
    // Tilbakestill knapp
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
};

/**
 * Nullstill kontaktskjemaet
 */
window.resetContactForm = function() {
  document.getElementById('contact-form').reset();
};