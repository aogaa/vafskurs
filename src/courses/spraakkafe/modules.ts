import type { CourseModule } from "../../data/courseModules";

/**
 * Kurs 2 — "Slik lager vi språkkafe".
 *
 * Fem deler. Det GENERELLE (hva en språkkafé er, vertsrollen, følsomme temaer,
 * å være klar) bor her og er likt for alle organisasjoner. Det ORGANISASJONS-
 * SPESIFIKKE (sted, tid, bemanning, meråpent, kontaktperson) bor i
 * `organisasjon.ts` og rendres i Del 2 via den egne komponenten
 * `parts/DelToSlikGjorVi.tsx`.
 *
 * ID-er bruker «del-N» (ikke «modul-N») — kurset omtaler enheter som «deler».
 * Lagringsnøkkel: `spraakkafe:completed-modules` (egen prefiks, ingen kollisjon
 * med kurs 1).
 */
export const spraakkafeModules: CourseModule[] = [
  {
    id: "del-1",
    order: 1,
    title: "Hva er en språkkafé?",
    description:
      "Bli kjent med ideen bak språkkafé som lavterskel møteplass for muntlig norsk og fellesskap.",
    status: "active",
    ingress:
      "En språkkafé er ikke et norskkurs. Det er en arena der mennesker med ulik bakgrunn øver på norsk gjennom samtale — med en frivillig som veileder og heier.",
    learningGoals: [
      "Forstå hva en språkkafé er, og hva som skiller den fra et norskkurs",
      "Vite hvem språkkafeen er for, og at deltakerne må kunne litt norsk (rundt nivå A1 eller høyere)",
      "Kjenne til språknivåene A, B og C og hva som kreves av deg som frivillig",
    ],
    insight:
      "Du trenger ikke pedagogisk utdanning. Du trenger tålmodighet, vennlighet og vilje til å la andre prate.",
    contentBlocks: [
      "En språkkafé er et lavterskeltilbud for mennesker som vil bli bedre i muntlig norsk. Det er ikke et norskkurs, men en møteplass der folk med ulik bakgrunn møtes og øver på norsk gjennom samtale — med veiledning og hjelp fra frivillige. Derfor må deltakerne kunne litt norsk fra før, tilsvarende rundt nivå A1 eller høyere.",
      "Språknivåene følger Europarådets skala med tre hovedtrinn: A (basisbruker), B (selvstendig bruker) og C (avansert bruker). Som frivillig trenger du ikke vurdere nivå formelt — det holder å spørre hvilket nivå deltakeren er på, og bytte bord hvis det viser seg å passe bedre et annet sted.",
      "Det kreves ingen faglig bakgrunn for å være frivillig. Men du må snakke godt norsk, være tålmodig og unngå utpregede dialektord mens du er på kafeen. Vis interesse og forståelse for hvordan det er å komme til et nytt land og lære et nytt språk — og vær oppmuntrende og støttende.",
    ],
  },
  {
    id: "del-2",
    order: 2,
    title: "Slik gjør vi det hos oss",
    description:
      "Det praktiske: hvor og når, oppmøte, bemanning, bordoppsett, tekster, servering og meråpent. Dette er delen som tilpasses hver organisasjon.",
    status: "planned",
    learningGoals: [
      "Vite hvor og når språkkafeen holdes, og når du bør møte opp",
      "Forstå hvordan du melder deg på vakt, og hva du gjør hvis du må avlyse",
      "Kjenne det praktiske oppsettet: bemanning, bordfordeling, tekster og servering",
      "Kjenne til meråpent og hvorfor det er en fordel å ha registrert seg",
    ],
    // Innholdet rendres av parts/DelToSlikGjorVi.tsx, som leser organisasjon.ts.
  },
  {
    id: "del-3",
    order: 3,
    title: "Vertsrollen – samtalen ved bordet",
    description:
      "Hvordan du skaper trygg stemning, god samtaleflyt og inkludering når dere sitter sammen ved bordet.",
    status: "planned",
    ingress:
      "Målet er at deltakerne skal øve på norsk ved å snakke. Din viktigste oppgave er å få samtalen i gang — og så slippe den litt løs.",
    learningGoals: [
      "Lede en samtale slik at alle ved bordet blir inkludert",
      "Håndtere ulikt språknivå i samme gruppe uten at noen faller utenfor",
      "Bruke teksten som utgangspunkt for friere prat, i rolig tempo",
    ],
    insight:
      "Snakk rolig, ikke for mye selv, og pass på at ikke én eller to dominerer. Vennlighet og litt humor kommer alltid godt med.",
    contentBlocks: [
      "Ta godt imot. Ønsk velkommen, og la gjerne deltakerne skrive navnet sitt på et ark som settes opp så alle ser det. En tydelig, enkel ramme — «vi leser, så ser vi på ord dere lurer på, så prater vi sammen» — senker skuldrene og gir mestringsfølelse.",
      "Les teksten sammen og bruk den som en trampolin for friere samtale. Tekstene handler gjerne om hverdagen og særnorske fenomener, så det er lett å knytte dem til deltakernes egne erfaringer. Still åpne spørsmål, og gi rom for at alle får sagt noe.",
      "Håndter ulikt nivå ved å holde samtalenivået slik at alle kan delta. Snakk i rolig tempo, ikke for mye selv, og pass på at ikke én eller to tar over. Er nivåforskjellen stor, kan dere dele opp eller tilpasse teksten. Vær til stede: se og lytt, og juster underveis hvis gruppen trenger noe annet enn det du planla.",
    ],
  },
  {
    id: "del-4",
    order: 4,
    title: "Følsomme temaer og trygge grenser",
    description:
      "Temaer å styre unna, hvor grensen for hjelp går, og hvordan du møter alle likeverdig.",
    status: "planned",
    ingress:
      "Det meste på en språkkafé er glede og gode samtaler. Men noen grep gjør det tryggere for alle — både deltakere, deg og organisasjonen.",
    learningGoals: [
      "Kjenne hvilke temaer det er lurt å styre unna, og hvorfor",
      "Vite hvor grensen for hjelp går — og hvorfor enkelte ting skal overlates til fagfolk",
      "Møte alle deltakere likeverdig og respektfullt",
    ],
    insight:
      "Velmenende hjelp kan få utilsiktet utfall. Å vise videre til rett fagperson er også omsorg.",
    contentBlocks: [
      "Styr unna betente temaer som religion, krig og politikk. Mange deltakere kan komme fra land som er i konflikt med andre deltakeres hjemland. Møt alle likeverdig, og hold tekstene og samtalen unna det som kan splitte.",
      "Ikke hjelp deltakere med å fylle ut søknader og skjemaer, lage slektstre eller lignende. Regelverket rundt innvandring er komplisert, og velmenende hjelp kan slå feil ut. La fagfolk med grundig kjennskap til regelverket ta seg av dette — å vise videre er en del av å være en trygg frivillig.",
      "Pausen er en viktig sosial arena. Mange deltakere har lite nettverk, og det er ikke krav om at de snakker norsk i pausen — det er slitsomt å lære et nytt språk, og pausen er til for å puste ut og bli kjent.",
    ],
  },
  {
    id: "del-5",
    order: 5,
    title: "Klar til din første vakt",
    description:
      "Samle det viktigste og gjør deg klar til å stille på din første språkkafé.",
    status: "planned",
    ingress:
      "Nå har du oversikten. Det siste steget er å gjøre seg klar — og melde seg på en vakt.",
    learningGoals: [
      "Sette sammen en enkel huskeliste for din første vakt",
      "Vite hvem du kan spørre om hjelp og hvordan du melder deg på",
      "Kjenne deg trygg på å møte deltakerne for første gang",
    ],
    insight:
      "Du trenger ikke kunne alt. Møt opp, vær vennlig, la folk prate — så er du allerede i gang.",
    contentBlocks: [
      "Kort oppsummert: Møt opp i god tid. Ta godt imot. Sjekk nivå ved bordet. Bruk teksten som utgangspunkt, men slipp samtalen løs. Hold rolig tempo, inkluder alle, og styr unna betente temaer. Vis videre til fagfolk når noe handler om regelverk og skjemaer.",
      "Du er ikke alene. De andre frivillige, biblioteket og kontaktpersonen er der for å hjelpe. Må du avlyse, gir du beskjed i god tid og hjelper gjerne til med å finne en erstatter.",
      "Siste steg: meld deg på en vakt, så er du i gang. Lykke til på din første språkkafé!",
    ],
  },
];

export const visibleSpraakkafeModules = spraakkafeModules;

export function getSpraakkafeModuleById(moduleId: string) {
  return spraakkafeModules.find((courseModule) => courseModule.id === moduleId);
}
