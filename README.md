# Ruskalk - Klinisk Skåringsverktøy

Digitalt verktøy for skåring av abstinens og psykiatriske tilstander. Inkluderer CIWA-Ar, CIWA-B, COWS, MADRS og YMRS.

## 📁 Mappestruktur

```
ruskalk-scoring/
├── css/                   # CSS styling
│   └── styles.css
├── js/                    # JavaScript moduler
│   ├── main.js           # Hovedlogikk + Google Analytics
│   ├── utils.js          # Hjelpefunksjoner + tracking
│   ├── ciwa-ar.js        # CIWA-Ar skjemadata
│   ├── ciwa-b.js         # CIWA-B skjemadata
│   ├── cows.js           # COWS skjemadata
│   ├── madrs.js          # MADRS skjemadata
│   └── ymrs.js           # YMRS skjemadata
├── backend/              # Backend server
│   ├── server.js         # Express API med rate limiting
│   ├── package.json      # Backend dependencies
│   └── node_modules/     # NPM pakker
├── docs/                 # Dokumentasjon
│   ├── README-Backend.md # Backend guide
│   ├── Google-Analytics-Setup.md # Analytics guide
│   └── SEO-README.md     # SEO implementering
├── index.html            # Hovedside (SEO optimalisert)
├── favicon.png           # Ikon
├── robots.txt            # SEO - søkemotordirektiver
├── sitemap.xml           # SEO - sitemap
├── CNAME                 # GitHub Pages custom domain
├── package.json          # Root scripts
└── README.md             # Dette dokumentet
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