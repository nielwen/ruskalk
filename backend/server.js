// ========================================
// SERVER.JS - Backend for Ruskalk Feedback System
// Enkel Express server som mottar tilbakemeldinger og sender e-post
// ========================================

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// ========================================
// HTTPS SIKKERHETSTILTAK
// ========================================

// Sikkerhetstiltak - HTTPS headers
app.use((req, res, next) => {
  // HSTS - Force HTTPS
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // XSS Protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  next();
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

// ========================================
// RATE LIMITING - Hindrer spam
// ========================================

// Rate limiting for feedback - maksimalt 3 tilbakemeldinger per 15 minutter
const feedbackLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutter
  max: 3, // Maksimalt 3 forespørsler per vindu
  message: {
    success: false,
    error: 'For mange tilbakemeldinger. Vennligst vent 15 minutter før du prøver igjen.'
  },
  standardHeaders: true, // Send rate limit info i headers
  legacyHeaders: false, // Ikke send legacy X-RateLimit-* headers
  handler: (req, res) => {
    console.log(`🚫 Rate limit exceeded for IP: ${req.ip} at ${new Date().toISOString()}`);
    res.status(429).json({
      success: false,
      error: 'For mange tilbakemeldinger. Vennligst vent 15 minutter før du prøver igjen.',
      retryAfter: Math.round(req.rateLimit.resetTime / 1000)
    });
  }
});

// ========================================
// E-POST KONFIGURASJON
// ========================================

// VIKTIG: Endre disse innstillingene til dine egne
const EMAIL_CONFIG = {
  // Gmail eksempel - endre til din e-posttjeneste
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'nielsens.epost@gmail.com',        // ENDRE: Din e-postadresse
    pass: 'ffhf wlbq hjmb kkkt'            // ENDRE: App-passord (ikke vanlig passord)
  }
};

const RECIPIENT_EMAIL = 'nielsens.epost@gmail.com';  // Din mottaker-adresse

// Opprett e-post transporter
const transporter = nodemailer.createTransport(EMAIL_CONFIG);

// ========================================
// API ENDEPUNKTER
// ========================================

/**
 * Mottar tilbakemelding og sender e-post
 * Rate limited: Maksimalt 3 tilbakemeldinger per 15 minutter
 */
app.post('/api/feedback', feedbackLimiter, async (req, res) => {
  try {
    const { type, message, activeTab } = req.body;
    
    // Valider input
    if (!type || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Type og melding er påkrevd' 
      });
    }
    
    // Bygg e-post innhold
    const emailSubject = `[Ruskalk] ${type} - Tilbakemelding`;
    const emailBody = `Tilbakemelding fra Ruskalk-verktøyet:

Type: ${type}
Aktiv fane: ${activeTab || 'Ukjent'}
Tidsstempel: ${new Date().toLocaleDateString('no-NO')} ${new Date().toLocaleTimeString('no-NO')}

Melding:
${message}

---
Sendt fra Ruskalk Skåringsverktøy Backend
IP: ${req.ip || req.connection.remoteAddress}
User-Agent: ${req.get('User-Agent')}`;

    // Send e-post
    const mailOptions = {
      from: EMAIL_CONFIG.auth.user,
      to: RECIPIENT_EMAIL,
      subject: emailSubject,
      text: emailBody
    };
    
    await transporter.sendMail(mailOptions);
    
    console.log(`✅ Tilbakemelding sendt: ${type} - ${new Date().toISOString()}`);
    
    res.json({ 
      success: true, 
      message: 'Tilbakemelding sendt!' 
    });
    
  } catch (error) {
    console.error('❌ Feil ved sending av e-post:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Kunne ikke sende tilbakemelding. Prøv igjen senere.' 
    });
  }
});

/**
 * Helse-sjekk endepunkt
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Ruskalk Backend kjører!'
  });
});

/**
 * Serve frontend filer
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {
  console.log(`🚀 Ruskalk Backend kjører på http://localhost:${PORT}`);
  console.log(`📧 E-post vil bli sendt til: ${RECIPIENT_EMAIL}`);
  console.log(`⚙️  Husk å konfigurere e-post innstillinger i EMAIL_CONFIG`);
  console.log(`🌐 Åpne http://localhost:${PORT} for å bruke appen`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Server stopper...');
  process.exit(0);
});