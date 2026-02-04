# Google Analytics Mål og Events - Ruskalk

## 📊 **Events som nå trackes automatisk:**

### **1. Assessment Usage (Skjemabruk)**
```javascript
// Event: assessment_usage
// Category: medical_tools
// Labels: CIWA_AR, CIWA_B, COWS, MADRS, YMRS
```

### **2. Score Completion (Fullførte skåringer)**
```javascript
// Event: score_completed
// Category: assessment  
// Labels: CIWA_AR_mild, CIWA_AR_moderat, MADRS_alvorlig, osv.
// Value: Total skår
```

### **3. Detaljert Copy Tracking (NYT)**
```javascript
// Event: copy_detailed
// Category: content_sharing
// Labels: CIWA_Ar_Score15, MADRS_Score28, osv.
// Value: Skår-verdi

// Event: copy_severity  
// Category: medical_data
// Labels: CIWA_Ar_mild, MADRS_alvorlig, osv.
// Value: 1 (count)

// Event: copy_completeness
// Category: data_quality  
// Labels: 85%_complete, 100%_complete, osv.
// Value: Prosent fullført
```

### **4. Detaljert Print Tracking (NYT)**
```javascript
// Event: print_detailed
// Category: document_generation
// Labels: CIWA_Ar_Score12, COWS_Score18, osv.
// Value: Skår-verdi

// Event: print_severity
// Category: medical_printing
// Labels: CIWA_Ar_moderat, YMRS_alvorlig, osv.

// Event: print_completeness
// Category: data_quality
// Labels: 90%_complete, 100%_complete, osv.

// Event: print_with_patient_data
// Category: clinical_use  
// Labels: CIWA_AR, MADRS, osv.
// Value: 1 (indikerer klinisk bruk med pasientdata)
```

### **5. Detaljert Email Tracking (NYT)**
```javascript
// Event: email_sent
// Category: communication
// Labels: CIWA_Ar_full, MADRS_lite, osv.

// Event: email_severity
// Category: medical_sharing
// Labels: CIWA_Ar_mild, COWS_alvorlig, osv.
// Value: Skår-verdi
```

### **6. User Interactions (Eksisterende)**
```javascript
// Event: tab_switch, copy_score, send_email, print_assessment
// Category: user_interaction
// Labels: CIWA_AR_score_15_mild, MADRS_lite, osv.
```

### **7. Feedback & Engagement (Eksisterende)**
```javascript
// Event: feedback_sent, feedback_error
// Category: engagement
// Labels: Feil/Bug, Forbedring, Spørsmål, Annet
```

## 🎯 **Google Analytics 4 - Anbefalte mål:**

### **Conversions å sette opp i GA4:**

#### **1. Fullført vurdering (Primær)**
- **Event navn:** `score_completed`
- **Beskrivelse:** Bruker fullførte en medisinsk vurdering
- **Verdi:** ✅ Høy prioritet (medisinsk verdi)

#### **2. Print dokument**
- **Event navn:** `print_assessment`
- **Beskrivelse:** Bruker printet vurderingen
- **Verdi:** ✅ Indikerer praktisk bruk

#### **3. Sendt feedback**
- **Event navn:** `feedback_sent`
- **Beskrivelse:** Aktiv brukerengasjement
- **Verdi:** ✅ Verdifull tilbakemelding

#### **4. Kopiert resultatet**
- **Event navn:** `copy_score`
- **Beskrivelse:** Bruker delte resultatet
- **Verdi:** ✅ Praktisk bruk

### **Custom Dimensions (Egendefinerte dimensjoner):**

#### **1. Assessment Type**
- **Navn:** `assessment_type`
- **Scope:** Event
- **Verdier:** CIWA_AR, CIWA_B, COWS, MADRS, YMRS

#### **2. Severity Level**
- **Navn:** `severity_level`  
- **Scope:** Event
- **Verdier:** mild, moderat, alvorlig, osv.

#### **3. Score Value**
- **Navn:** `score_value`
- **Scope:** Event  
- **Verdier:** 0-67 (varierer per skjema)

#### **4. Completeness Rate (NYT)**
- **Navn:** `completeness_rate`
- **Scope:** Event
- **Verdier:** 0-100 (prosent spørsmål besvart)

#### **5. Clinical Use Indicator (NYT)**  
- **Navn:** `has_patient_data`
- **Scope:** Event
- **Verdier:** true/false (om pasientdata er fylt ut)

## 📈 **Rapporter å opprette:**

### **1. Copy Behavior Analysis (NYT)**
```
Dimensjon: Severity Level + Assessment Type
Metric: Copy Count, Score Distribution
Insight: Hvilke alvorlighetsgrader kopieres mest?
```

### **2. Clinical Usage Patterns (NYT)**
```
Dimensjon: Has Patient Data + Assessment Type  
Metric: Print Count, Completeness Rate
Insight: Hvor mye brukes verktøyet klinisk vs teoretisk?
```

### **3. Content Sharing Analysis (NYT)**
```
Dimensjon: Action Type (copy/email/print) + Severity Level
Metric: Event Count, Score Value
Insight: Hvordan deles forskjellige alvorlighetsgrader?
```

### **4. Assessment Performance (Oppdatert)**
```
Dimensjon: Assessment Type + Completeness Rate
Metric: Completions, Avg Score, Print Rate
Insight: Hvilke skjemaer fullføres best?
```

### **5. User Engagement (Eksisterende)**
```  
Dimensjon: User Interaction Type
Metric: Event Count, Users, Sessions
```

### **6. Medical Utility (Eksisterende)**
```
Dimensjon: Severity Level  
Metric: Count, Score Distribution
```

## 🎯 **GA4 Setup Steps:**

### **1. I Google Analytics:**
1. Gå til **Events** → **Mark as conversion**
2. Marker disse som conversions:
   - `score_completed` ⭐ (Viktigst)
   - `print_assessment`
   - `feedback_sent`

### **2. Custom Dimensions:**
1. **Admin** → **Custom Definitions** → **Custom Dimensions**
2. Opprett:
   - `assessment_type`
   - `severity_level`
   - `score_value`

### **3. Audiences (Målgrupper):**
```
1. "Aktive leger" - Fullførte >3 vurderinger
2. "Power users" - Printet >5 ganger  
3. "Feedback givers" - Sendt feedback
4. "CIWA specialists" - Bruker kun CIWA
5. "Psychiatry users" - Bruker MADRS/YMRS
```

## 📊 **KPI-er å overvåke:**

### **Primære:**
- **Completion Rate:** % brukere som fullfører vurdering
- **Copy Rate:** % fullførte vurderinger som kopieres (NYT)
- **Clinical Usage Rate:** % prints med pasientdata (NYT)
- **Print Rate:** % vurderinger som printes  
- **Return Rate:** % brukere som kommer tilbake
- **Assessment Distribution:** Hvilke skjemaer brukes mest

### **Sekundære (NYT):**
- **Severity Distribution:** Fordeling av alvorlighetsgrader i kopierte/printede resultater
- **Completeness Correlation:** Sammenheng mellom fullføring og deling
- **Sharing Method Preference:** Copy vs Print vs Email fordeling
- **Patient Data Usage:** % klinisk bruk vs. teoretisk bruk
- **Score Range Analysis:** Hvilke skår-områder deles mest

### **Eksisterende sekundære:**
- **Error Rate:** % feilede actions
- **Feedback Rate:** % brukere som sender feedback
- **Session Duration:** Tid per besøk

## 🎯 **Business Intelligence:**

### **Månedlige rapporter:**
1. **Antall vurderinger** per skjematype
2. **Alvorlighetsfordeling** (mild/moderat/alvorlig)
3. **Brukermønster** (tid, dag, sesjon)
4. **Print vs digital bruk**
5. **Feedback themes** og forbedringer

### **Strategiske insights:**
- **Kopiering vs. Print:** Hvilken delingsmetode foretrekkes for ulike skjemaer?
- **Alvorlighetsgrad-mønstre:** Deles alvorlige resultater oftere enn milde?
- **Klinisk bruk:** Hvor stor andel av bruk er faktisk pasientrelatert?
- **Fullføringskvalitet:** Påvirker completeness rate sannsynligheten for deling?
- **Skjema-spesialisering:** Bruker enkelte brukere bare spesifikke skjemaer?
- **Tidsbaserte mønstre:** Når på dagen/uka deles resultater mest?
- **Score-fordeling:** Hvilke skår-områder er vanligst i klinisk praksis?
- **Workflow-analyse:** Copy → Email → Print sekvenser?

**Medisinsk verdi:**
- Hvilke abstinens-nivåer er mest vanlige i norsk helsevesen?
- Korrelasjon mellom ulike skjemaer (brukes CIWA-Ar og MADRS sammen?)
- Regional forskjeller i bruksmønster (via geographic data)?

Dette gir deg omfattende innsikt i hvordan Ruskalk brukes i praksis! 📊