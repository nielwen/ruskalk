# Ruskalk - Klinisk Skåringsverktøy

Digitalt verktøy for skåring av abstinens og psykiatriske tilstander. Inkluderer CIWA-Ar, CIWA-B, COWS, MADRS og YMRS.

## 📁 Mappestruktur

```
ruskalk-scoring/
├── frontend/              # Frontend applikasjon
│   ├── css/
│   │   └── styles.css     # CSS styling
│   ├── js/
│   │   ├── main.js        # Hovedlogikk
│   │   ├── utils.js       # Hjelpefunksjoner
│   │   ├── ciwa-ar.js     # CIWA-Ar skjemadata
│   │   ├── ciwa-b.js      # CIWA-B skjemadata
│   │   ├── cows.js        # COWS skjemadata
│   │   ├── madrs.js       # MADRS skjemadata
│   │   └── ymrs.js        # YMRS skjemadata
│   ├── index.html         # Hovedside
│   ├── favicon.png        # Ikon
│   ├── robots.txt         # SEO - søkemotordirektiver
│   └── sitemap.xml        # SEO - sitemap
├── backend/               # Backend server
│   ├── server.js          # Express server med e-post API
│   ├── package.json       # Backend dependencies
│   ├── package-lock.json  # Lock file
│   └── node_modules/      # NPM pakker
├── docs/                  # Dokumentasjon
│   ├── README-Backend.md  # Backend dokumentasjon
│   └── SEO-README.md      # SEO implementering guide
├── package.json           # Root package.json (scripts)
├── README.md              # Dette dokumentet
└── CNAME                  # GitHub Pages domain
```

## 🚀 Komme i gang

### 1. Backend oppsett
```bash
# Installer backend avhengigheter
npm run install-backend

# Start serveren
npm start
```

### 2. Åpne applikasjonen
Åpne nettleseren og gå til: http://localhost:3000

## ✨ Funksjoner

### 📋 Skåringsverktøy
- **CIWA-Ar** - Alkoholabstinens vurdering
- **CIWA-B** - Benzodiazepinabstinens vurdering  
- **COWS** - Opiatabstinens vurdering
- **MADRS** - Depresjonsskåring
- **YMRS** - Maniskåring

### 🛡️ Backend funksjoner
- **E-post feedback** - Send tilbakemeldinger til utvikleren
- **Rate limiting** - Spam-beskyttelse (3 meldinger per 15 min)
- **CORS støtte** - Sikkert API
- **Feilhåndtering** - Robust error handling

### 🔍 SEO optimalisering
- **Meta tags** - Title, description, keywords
- **Open Graph** - Sosiale medier optimalisert
- **Structured data** - Schema.org implementert
- **Sitemap/Robots** - Søkemotoroptimalisert

## 🛠️ Utvikling

### Scripts
```bash
npm start                # Start backend server
npm run install-backend  # Installer kun backend deps
npm run dev              # Start i utviklingsmodus
```

### Mappeorganisering
- **Frontend:** Alle klientfiler (HTML, CSS, JS)
- **Backend:** Server og API (Node.js, Express)
- **Docs:** All dokumentasjon og guider

## 🎯 Teknologier
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6 modules)
- **Backend:** Node.js, Express.js, Nodemailer
- **Sikkerhet:** express-rate-limit, CORS
- **SEO:** Schema.org, Open Graph, Twitter Cards