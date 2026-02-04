// ========================================
// YMRS.JS - Young Mania Rating Scale
// Definisjoner og labels for YMRS-spørsmål
// ========================================

// YMRS – Young Mania Rating Scale
export const YMRS_DATA = {
  y1: {
    title: 'Forhøyet stemningsleie',
    options: [
      { label: 'Ikke tilstede', score: 0 },
      { label: 'Lett eller mulig forhøyet på spørsmål', score: 1 },
      { label: 'Sikkert subjektivt forhøyet, optimistisk, selvsikker, munter, passende til temaet', score: 2 },
      { label: 'Forhøyet, upassende til temaet, spøkefull', score: 3 },
      { label: 'Euforisk, upassende latter, synger', score: 4 }
    ],
    max: 4
  },

  y2: {
    title: 'Forøket motorisk aktivitet - energi',
    options: [
      { label: 'Ikke tilstede', score: 0 },
      { label: 'Subjektivt forøket', score: 1 },
      { label: 'Livlig, forøkte fakter og mimikk', score: 2 },
      { label: 'Usedvanlig stor energi, hyperaktiv i perioder, rastløs (kan roes ned)', score: 3 },
      { label: 'Motorisk eksaltasjon, kontinuerlig hyperaktiv (kan ikke roes ned)', score: 4 }
    ],
    max: 4
  },

  y3: {
    title: 'Seksuell interesse',
    options: [
      { label: 'Normal, ikke forøket', score: 0 },
      { label: 'Lett eller mulig forøket', score: 1 },
      { label: 'Sikker subjektiv økning når intervjuet', score: 2 },
      { label: 'Spontane seksuelle tringer, utdyper seksuelle tema, hyperseksuell ved egenrapportering', score: 3 },
      { label: 'Åpenlyse seksuelle handlinger', score: 4 }
    ],
    max: 4
  },

  y4: {
    title: 'Søvnbehov',
    options: [
      { label: 'Normal søvn', score: 0 },
      { label: 'Redusert med <1 time sammenlignet med normalt', score: 1 },
      { label: 'Redusert med >1 time sammenlignet med normalt', score: 2 },
      { label: 'Rapporterer nedsatt søvnbehov', score: 3 },
      { label: 'Benekter behov for søvn', score: 4 }
    ],
    max: 4
  },

  y5: {
    title: 'Irritabilitet',
    options: [
      { label: 'Ikke tilstede', score: 0 },
      { label: 'Subjektiv forøket', score: 2 },
      { label: 'Av og til irritabel under intervjuet, nylig periode med sinne eller ergrelse i avdelingen', score: 4 },
      { label: 'Hyppig irritabel under intervjuet, gjennomgående kort og avvisende', score: 6 },
      { label: 'Fiendtlig, samarbeider ikke, intervju umulig', score: 8 }
    ],
    max: 8
  },

  y6: {
    title: 'Tale (tempo og mengde)',
    options: [
      { label: 'Ingen økning', score: 0 },
      { label: 'Føler seg taletrengt', score: 2 },
      { label: 'Forøket tempo eller mengde i perioder, ordrik i perioder', score: 4 },
      { label: 'Forsert, gjennomgående forøket tempo og mengde, vanskelig å avbryte', score: 6 },
      { label: 'Prater under høytrykk, kontinuerlig tale som ikke lar seg avbryte', score: 8 }
    ],
    max: 8
  },

  y7: {
    title: 'Språk - Tankeforstyrrelse',
    options: [
      { label: 'Ikke tilstede', score: 0 },
      { label: 'Omstendelig, lett å distrahere, raske innfall', score: 1 },
      { label: 'Distraherbar, mister tråden, skifter hyppig tema, tanker raser avgårde', score: 2 },
      { label: 'Flyvende tanker, full av digresjoner, vanskelig å følge, rimer, ekkolali', score: 3 },
      { label: 'Usammenhegende, kommunikasjon umulig', score: 4 }
    ],
    max: 4
  },

  y8: {
    title: 'Innhold',
    options: [
      { label: 'Normalt', score: 0 },
      { label: 'Tvilsomme planer, nye interesser', score: 2 },
      { label: 'Ualminnelige prosjekter, hyperreligiøs', score: 4 },
      { label: 'Grandiose eller paranoide tanker, tanker om å være omtalt', score: 6 },
      { label: 'Vrangforestillinger, hallusinasjoner', score: 8 }
    ],
    max: 8
  },

  y9: {
    title: 'Nedbrytende - Aggressiv oppførsel',
    options: [
      { label: 'Ikke tilstede, samarbeider', score: 0 },
      { label: 'Sarkastisk, av og til høyrøstet, vaktsom', score: 2 },
      { label: 'Krevende, trusler i avdelingen', score: 4 },
      { label: 'Truer intervjuer, roper, intervjuet vanskelig', score: 6 },
      { label: 'Voldelig, destruktiv, intervjuet umulig', score: 8 }
    ],
    max: 8
  },

  y10: {
    title: 'Utseende',
    options: [
      { label: 'Passende påkledning, pen og presentabel', score: 0 },
      { label: 'Noe uflidd', score: 1 },
      { label: 'Ikke presentabel, moderat uflidd, overpyntet', score: 2 },
      { label: 'Uflidd, delvis påkledd, grell make-up', score: 3 },
      { label: 'Fullstendig uflidd, dekorert, bisarr påkledning', score: 4 }
    ],
    max: 4
  },

  y11: {
    title: 'Innsikt',
    options: [
      { label: 'Tilstede, vedgår å være syk, er enig i behov for behandling', score: 0 },
      { label: 'Mulig syk', score: 1 },
      { label: 'Innrømmer forandring av adferd, men benekter å være syk', score: 2 },
      { label: 'Innrømmer mulig foradring av adferd, men benekter å være syk', score: 3 },
      { label: 'Benekter enhver forandring av adferd', score: 4 }
    ],
    max: 4
  }
};

// Konverter til array-format som utils.js forventer
export const YMRS = Object.keys(YMRS_DATA).map(key => ({
  key: key,
  title: YMRS_DATA[key].title,
  options: YMRS_DATA[key].options.map(opt => ({
    value: opt.score,
    text: opt.label
  })),
  max: YMRS_DATA[key].max
}));

// Labels for kompatibilitet med eksisterende system
export const YMRS_LABELS = {};
Object.keys(YMRS_DATA).forEach(key => {
  YMRS_LABELS[key] = {
    labels: YMRS_DATA[key].options.map(opt => opt.label)
  };
});