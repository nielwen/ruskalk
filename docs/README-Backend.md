# Ruskalk Backend - Oppstartsinstruksjoner

## 🚀 Slik starter du backend-serveren:

### 1. Installer Node.js
- Last ned fra: https://nodejs.org
- Velg LTS-versjon

### 2. Installer avhengigheter
Åpne PowerShell i mappen og kjør:
```powershell
npm install
```

### 3. Konfigurer e-post (VIKTIG!)
Rediger `server.js` og endre følgende linjer:

```javascript
const EMAIL_CONFIG = {
  host: 'smtp.gmail.com',           // Din SMTP server
  port: 587,
  secure: false,
  auth: {
    user: 'din.epost@gmail.com',    // ENDRE: Din e-postadresse
    pass: 'ditt-app-passord'        // ENDRE: App-passord (ikke vanlig passord)
  }
};
```

#### For Gmail:
1. Gå til Google-kontoen din
2. Sikkerhet → 2-trinns bekreftelse (må være aktivert)
3. Søk etter "App-passord"
4. Generer nytt app-passord for "Mail"
5. Bruk dette passordet i `server.js`

### 4. Start serveren
```powershell
npm start
```

### 5. Åpne appen
Gå til: http://localhost:3000

## 📧 E-post innstillinger for andre tjenester:

### Outlook/Hotmail:
```javascript
host: 'smtp-mail.outlook.com',
port: 587,
```

### Yahoo:
```javascript
host: 'smtp.mail.yahoo.com',
port: 587,
```

## 🛠️ Feilsøking:

### "Cannot find module 'express'"
Kjør: `npm install`

### E-post sendes ikke
- Sjekk at e-post og passord er riktig
- Sjekk at 2-trinns bekreftelse er aktivert (Gmail)
- Sjekk at du bruker app-passord, ikke vanlig passord

### Port allerede i bruk
Endre PORT i `server.js` eller kjør:
```powershell
$env:PORT=3001; npm start
```

## 🔧 Avansert:

### Kjør i bakgrunnen (Windows)
```powershell
Start-Process -WindowStyle Hidden powershell -ArgumentList "cd '$PWD'; npm start"
```

### Stopp server
Trykk `Ctrl + C` i PowerShell vinduet

---

**Tips:** Backend må kjøre for at tilbakemeldingssystemet skal fungere. Start serveren før du bruker appen!