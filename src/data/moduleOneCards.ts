export type ModuleOneCard = {
  id: string;
  title: string;
  shortText: string;
  fullText: string[];
  icon:
    | "wave"
    | "eye"
    | "place"
    | "bridge"
    | "spark"
    | "person"
    | "balance"
    | "people"
    | "arrow"
    | "search";
};

export const moduleOneCards: ModuleOneCard[] = [
  {
    id: "noen-som-ser-deg",
    title: "Noen som ser deg",
    shortText:
      "Et trygt nærmiljø begynner med at mennesker blir lagt merke til.",
    icon: "eye",
    fullText: [
      "Et trygt nærmiljø begynner med at mennesker blir lagt merke til.",
      "Ikke overvåket. Ikke kontrollert. Men sett.",
      "At noen merker om du ikke kommer som vanlig. At noen husker navnet ditt. At noen spør hvordan du har det, og faktisk venter på svaret.",
      "Som frivillig kan du være en av dem som gjør at et menneske ikke bare passerer gjennom hverdagen usynlig.",
    ],
  },
  {
    id: "et-sted-a-hore-til",
    title: "Et sted å høre til",
    shortText:
      "Mennesker trenger steder der de hører til, ikke bare hjelp når noe er vanskelig.",
    icon: "place",
    fullText: [
      "Mennesker trenger mer enn hjelp. Vi trenger steder der vi hører til.",
      "Et sted å komme inn døren. Et sted der noen kjenner deg igjen. Et sted der du ikke må forklare hvorfor du er der.",
      "Frivillighet skaper slike steder. Møteplasser, aktiviteter og fellesskap der mennesker kan være mer enn behovene sine.",
      "Som frivillig er du med på å åpne døren inn til fellesskapet.",
    ],
  },
  {
    id: "en-handsrekning-i-hverdagen",
    title: "En håndsrekning i hverdagen",
    shortText:
      "Små, hverdagslige handlinger kan gjøre at mennesker kjenner seg tryggere.",
    icon: "wave",
    fullText: [
      "Små handlinger kan bety mer enn de ser ut til.",
      "En prat. En tur. En kopp kaffe. En invitasjon. En som følger litt på vei.",
      "Det trenger ikke være stort for å være viktig. Noen ganger er det nettopp det enkle og hverdagslige som gjør at mennesker kjenner seg tryggere.",
      "Som frivillig kan du bidra med det som systemer ofte ikke kan gi: tid, nærvær og menneskelig kontakt.",
    ],
  },
  {
    id: "lav-terskel-inn",
    title: "Lav terskel inn",
    shortText:
      "En trygg invitasjon kan være forskjellen på å bli hjemme og å bli med.",
    icon: "bridge",
    fullText: [
      "Et godt nærmiljø gjør det lett å bli med.",
      "Ikke alle tør å møte opp alene. Ikke alle vet hvor de passer inn. Ikke alle har noen å spørre.",
      "Frivillighet kan senke terskelen. En invitasjon, et smil eller en trygg person ved døren kan være forskjellen på å bli hjemme og å bli en del av fellesskapet.",
      "Som frivillig kan du gjøre veien inn kortere for andre.",
    ],
  },
  {
    id: "flere-trygge-relasjoner",
    title: "Flere trygge relasjoner",
    shortText:
      "Når mennesker kjenner hverandre litt, blir det lettere å spørre, si fra og bry seg.",
    icon: "people",
    fullText: [
      "Trygghet bygges ikke bare av planer, bygg og tjenester. Trygghet bygges også av relasjoner.",
      "Når mennesker kjenner hverandre litt, blir det lettere å spørre om hjelp. Lettere å si fra. Lettere å bry seg.",
      "Frivillige skaper ikke trygghet ved å ta ansvar for alt, men ved å være en del av et nettverk av mennesker som ser hverandre.",
      "Som frivillig er du med på å gjøre lokalsamfunnet mindre fremmed.",
    ],
  },
  {
    id: "noen-som-spor",
    title: "Noen som spør",
    shortText:
      "Et enkelt spørsmål kan åpne en viktig samtale uten at du skal løse alt.",
    icon: "person",
    fullText: [
      "Et enkelt spørsmål kan åpne en dør:",
      "Hvordan går det egentlig?",
      "Det betyr noe at noen spør, lytter og ser mennesket foran seg. Ofte er nettopp det starten på mer trygghet.",
      "Frivillighet handler ofte om å være nær nok til å legge merke til, og klok nok til å vite når noe må tas videre.",
      "Som frivillig kan du være den som starter en viktig samtale.",
    ],
  },
  {
    id: "sma-tegn-blir-lagt-merke-til",
    title: "Små tegn blir lagt merke til",
    shortText:
      "Et våkent medmenneske kan se små endringer og avklare når noe bør tas videre.",
    icon: "search",
    fullText: [
      "I et godt nærmiljø forsvinner ikke mennesker like lett ut av syne.",
      "Noen merker om en stol står tom. Noen ser om en person trekker seg unna. Noen legger merke til at noe er annerledes enn før.",
      "Frivillige skal ikke tolke alt eller ta ansvar alene. Men de kan se, lytte og melde fra når noe bør avklares.",
      "Som frivillig kan du være et våkent medmenneske, ikke en privat problemløser.",
    ],
  },
  {
    id: "fellesskap-pa-tvers",
    title: "Fellesskap på tvers",
    shortText:
      "Frivillighet bygger broer mellom mennesker som ellers kanskje ikke ville møtt hverandre.",
    icon: "people",
    fullText: [
      "Et levende lokalsamfunn består av mennesker som ellers kanskje ikke ville møtt hverandre.",
      "Unge og eldre. Nye og etablerte. Folk med ulike erfaringer, interesser og livssituasjoner.",
      "Frivillighet skaper broer mellom mennesker. Den gjør nærmiljøet rikere, varmere og mer robust.",
      "Som frivillig er du med på å bygge forbindelser der det ellers kunne vært avstand.",
    ],
  },
  {
    id: "mennesker-for-systemer",
    title: "Mennesker før systemer",
    shortText:
      "Frivillighet minner oss om at mennesker er mer enn saker, vedtak og behov.",
    icon: "balance",
    fullText: [
      "Systemer er nødvendige. Tjenester er viktige. Ansatte gjør arbeid som frivillige ikke skal overta.",
      "Men et samfunn kan ikke bare bestå av systemer.",
      "Mennesker trenger å bli møtt som mennesker, ikke bare som saker, vedtak, behov eller utfordringer.",
      "Frivillighet minner oss om dette: Vi er ikke bare mottakere av hjelp. Vi er medmennesker som angår hverandre.",
      "Som frivillig bidrar du til at lokalsamfunnet ikke mister varmen.",
    ],
  },
  {
    id: "en-trygg-vei-videre",
    title: "En trygg vei videre",
    shortText:
      "Du trenger ikke bære alt selv for å være en trygg bro videre.",
    icon: "arrow",
    fullText: [
      "Noen ganger trenger mennesker ikke en stor løsning. De trenger en trygg vei videre.",
      "En person som kan si: «Dette finner vi ut av.»",
      "En som vet hvem man kan spørre. En som ikke lover for mye, men heller ikke trekker seg unna.",
      "Frivillighet handler ikke om å bære alt selv. Det handler om å være en del av et fellesskap der ingen skal måtte stå helt alene.",
      "Som frivillig kan du være en trygg bro videre.",
    ],
  },
  {
    id: "a-bli-invitert-inn",
    title: "Å bli invitert inn",
    shortText:
      "En varm invitasjon kan gjøre fellesskap mer tilgjengelige og mindre skumle.",
    icon: "bridge",
    fullText: [
      "Det er stor forskjell på å vite at noe finnes, og å føle seg invitert inn.",
      "Mange trenger et lite dytt. Ikke press, men en varm invitasjon. En trygg hånd. En som sier: «Du kan komme sammen med meg.»",
      "Frivillige kan gjøre fellesskap mer tilgjengelige, menneskelige og mindre skumle.",
      "Som frivillig kan du være forskjellen på utenfor og innenfor.",
    ],
  },
  {
    id: "et-naermiljo-som-taler-mer",
    title: "Et nærmiljø som tåler mer",
    shortText:
      "Sterke relasjoner gjør nærmiljøet mer robust før problemene blir for store.",
    icon: "spark",
    fullText: [
      "Et lokalsamfunn med sterke relasjoner tåler mer.",
      "Når mennesker kjenner hverandre, blir det lettere å mobilisere, lettere å hjelpe og lettere å oppdage når noen trenger støtte.",
      "Frivillighet er derfor ikke bare hyggelig. Det er sosial styrke. Det er hverdagsberedskap. Det er fellesskap som virker før problemene blir for store.",
      "Som frivillig er du med på å gjøre nærmiljøet mer robust.",
    ],
  },
];
