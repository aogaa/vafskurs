export type RoleCompassZone = "contribute" | "clarify" | "others" | "stop";

export type RoleCompassCard = {
  id: string;
  title: string;
  situation: string;
  correctZone: RoleCompassZone;
  feedback: string[];
};

export const roleCompassZones: Array<{
  id: RoleCompassZone;
  title: string;
  shortTitle: string;
  description: string;
  marker: string;
}> = [
  {
    id: "contribute",
    title: "Jeg kan bidra",
    shortTitle: "Bidra",
    description: "Avtalte, trygge oppgaver der frivilligrollen gir verdi.",
    marker: "✓",
  },
  {
    id: "clarify",
    title: "Jeg må avklare",
    shortTitle: "Avklar",
    description: "Situasjoner der rammen, risikoen eller ansvaret er uklart.",
    marker: "?",
  },
  {
    id: "others",
    title: "Dette er andres ansvar",
    shortTitle: "Andres ansvar",
    description: "Oppgaver som ligger hos ansatte, kommune, helsepersonell eller pårørende.",
    marker: "→",
  },
  {
    id: "stop",
    title: "Jeg skal stoppe",
    shortTitle: "Stopp",
    description: "Situasjoner med høy risiko, økonomi, hemmelighold eller klart rollebrudd.",
    marker: "!",
  },
];

export const moduleTwoCards: RoleCompassCard[] = [
  {
    id: "kaffe-og-samtale",
    title: "Kaffe og samtale",
    situation:
      "Du tar en kaffe og snakker med en deltaker som virker litt alene.",
    correctZone: "contribute",
    feedback: [
      "Dette er kjernen i mye frivillig arbeid: å være til stede, lytte, dele tid og skape en god stund sammen med et annet menneske.",
      "Det kan virke lite, men for noen kan en slik samtale være forskjellen på en dag som glir forbi og en dag der de kjenner seg sett.",
    ],
  },
  {
    id: "medisiner",
    title: "Medisiner",
    situation:
      "En deltaker spør om du kan gi medisiner fordi ansatte er opptatt.",
    correctZone: "others",
    feedback: [
      "Medisiner er ikke en frivilligoppgave. Det krever riktig ansvar, rutiner og faglig kompetanse.",
      "Som frivillig kan du si fra hvis du blir bekymret eller hvis noen ber deg gjøre noe du ikke skal. Men du skal ikke overta helsefaglig ansvar.",
    ],
  },
  {
    id: "veien-inn-i-fellesskapet",
    title: "Veien inn i fellesskapet",
    situation:
      "En person har lyst til å bli med på aktivitet, men tør ikke gå inn alene. Du følger dem inn og blir litt sammen med dem i starten.",
    correctZone: "contribute",
    feedback: [
      "Dette kan være en svært viktig frivilligoppgave. Mange trenger ikke bare informasjon om at en aktivitet finnes. De trenger en trygg vei inn.",
      "Som frivillig kan du gjøre terskelen lavere. Du kan være den som gjør fellesskapet mulig å nærme seg.",
    ],
  },
  {
    id: "tjenestebehov",
    title: "Tjenestebehov",
    situation:
      "En bruker spør deg om hvilke kommunale tjenester de har rett på, og om du kan vurdere hva de bør søke om.",
    correctZone: "others",
    feedback: [
      "Å vurdere behov for tjenester er ikke en frivilligoppgave. Det krever ansvar, myndighet og faglige vurderinger.",
      "Som frivillig kan du observere, lytte og hjelpe personen videre til riktig kontaktpunkt. Men du skal ikke gjøre deg selv til saksbehandler.",
    ],
  },
  {
    id: "en-tung-samtale",
    title: "En tung samtale",
    situation:
      "En deltaker blir lei seg og forteller at hverdagen føles tung.",
    correctZone: "contribute",
    feedback: [
      "Å lytte kan være en viktig del av frivilligrollen. Du trenger ikke være redd for vanskelige følelser.",
      "Men du skal heller ikke bli behandler eller bære tunge bekymringer alene. Hvis samtalen handler om alvorlig fare, sterk psykisk belastning eller noe du blir urolig for, skal du avklare med kontaktperson.",
    ],
  },
  {
    id: "lofte-om-daglige-besok",
    title: "Løfte om daglige besøk",
    situation:
      "En ensom bruker spør om du kan love å komme innom hver dag.",
    correctZone: "clarify",
    feedback: [
      "Det kan føles snilt å love mye, særlig hvis noen er ensomme. Men store løfter kan gjøre relasjonen sårbar og skape forventninger du kanskje ikke kan bære.",
      "Som frivillig skal du bidra på en måte som varer. Da må rammen være tydelig, og slike ønsker må avklares med kontaktperson.",
    ],
  },
  {
    id: "bekymring",
    title: "Bekymring",
    situation:
      "Du legger merke til at en deltaker virker mer forvirret enn vanlig og nesten faller på vei ut.",
    correctZone: "clarify",
    feedback: [
      "Dette er en viktig del av trygg frivillighet. Frivillige skal ikke løse alt selv, men de kan legge merke til ting som bør tas videre.",
      "Beskriv det du faktisk har sett, og meld bekymringen til riktig kontaktperson etter lokal rutine.",
    ],
  },
  {
    id: "bankkort-og-pin-kode",
    title: "Bankkort og PIN-kode",
    situation:
      "En bruker ber deg ta med bankkortet deres og handle. PIN-koden ligger på en lapp.",
    correctZone: "stop",
    feedback: [
      "Penger, bankkort og PIN-koder er et risikoområde. Det kan sette både brukeren og den frivillige i en vanskelig situasjon.",
      "Som hovedregel skal frivillige ikke håndtere andres økonomi. Her skal du stoppe og avklare med kontaktperson.",
    ],
  },
  {
    id: "riktig-vei-videre",
    title: "Riktig vei videre",
    situation:
      "En deltaker vet ikke hvem de skal kontakte om et praktisk problem. Du hjelper dem å finne riktig kontaktperson.",
    correctZone: "contribute",
    feedback: [
      "Dette er en god frivilligoppgave. Du trenger ikke løse saken selv for å være til hjelp.",
      "Noen ganger er den viktigste hjelpen å gjøre veien videre litt tydeligere: Hvem kan spørres? Hvor kan man henvende seg? Hva er neste trygge steg?",
    ],
  },
  {
    id: "familiekonflikt",
    title: "Familiekonflikt",
    situation:
      "En bruker ber deg ta parti i en konflikt med familien og snakke med datteren på deres vegne.",
    correctZone: "stop",
    feedback: [
      "Familiekonflikter kan være vanskelige, sårbare og fulle av informasjon du ikke har oversikt over.",
      "Som frivillig skal du ikke bli mekler, dommer eller part i konflikten. Du kan lytte, men du bør ikke ta ansvar for å løse konflikten.",
    ],
  },
];
