export type CourseModule = {
  id: string;
  order: number;
  title: string;
  durationMinutes: number;
  description: string;
  status?: "active" | "planned";
  learningGoals: string[];
  ingress?: string;
  insight?: string;
  contentBlocks?: string[];
};

export const courseModules: CourseModule[] = [
  {
    id: "modul-1",
    order: 1,
    title: "Hvorfor frivillighet betyr noe",
    durationMinutes: 12,
    description:
      "Se hvordan frivillighet bygger relasjoner, nærvær og trygghet i lokalsamfunnet.",
    status: "active",
    ingress:
      "Frivillighet handler ikke bare om å hjelpe til. Det handler om å bygge lokalsamfunn der mennesker ser hverandre, kjenner hverandre og stiller opp når det trengs.",
    learningGoals: [
      "Forstå hvorfor frivillighet har verdi for lokalsamfunnet",
      "Se hvordan frivillige bidrar med relasjoner og nærvær",
      "Forstå at frivillighet bygger trygghet uten å erstatte tjenester",
    ],
    insight: "Når mennesker ser hverandre, blir lokalsamfunnet tryggere.",
    contentBlocks: [
      "Som frivillig bidrar du med noe annet enn en tjeneste. Du bidrar med tid, blikk, samtaler og små handlinger som kan gjøre hverdagen lettere for andre.",
      "Frivillighet virker best når rollen er tydelig. Du skal være et medmenneske, ikke en ansatt, behandler eller saksbehandler.",
    ],
  },
  {
    id: "modul-2",
    order: 2,
    title: "Hva er frivillighet?",
    durationMinutes: 10,
    description:
      "En rolig innføring i frivillig sektor, egenart og verdien av frivillig innsats.",
    status: "planned",
    learningGoals: [],
  },
  {
    id: "modul-3",
    order: 3,
    title: "Min rolle som frivillig",
    durationMinutes: 12,
    description:
      "Bli tryggere på hva rollen rommer, og hva som ikke skal ligge hos deg.",
    status: "planned",
    learningGoals: [],
  },
  {
    id: "modul-4",
    order: 4,
    title: "Grønt, gult og rødt",
    durationMinutes: 14,
    description:
      "Lær et enkelt språk for situasjoner som er trygge, uklare eller må stoppes.",
    status: "planned",
    learningGoals: [],
  },
  {
    id: "modul-5",
    order: 5,
    title: "Stopp og avklar",
    durationMinutes: 10,
    description:
      "Øv på å stoppe i tide og spørre riktig person når noe blir uklart.",
    status: "planned",
    learningGoals: [],
  },
  {
    id: "modul-6",
    order: 6,
    title: "Å si ja, nei og «det må jeg avklare»",
    durationMinutes: 12,
    description:
      "Praktiske formuleringer for tydelige og vennlige grenser.",
    status: "planned",
    learningGoals: [],
  },
  {
    id: "modul-7",
    order: 7,
    title: "Taushet og fortrolighet",
    durationMinutes: 12,
    description:
      "Forstå hva du kan dele, hva du skal holde for deg selv, og når du må spørre.",
    status: "planned",
    learningGoals: [],
  },
  {
    id: "modul-8",
    order: 8,
    title: "Verdighet og respekt i praksis",
    durationMinutes: 10,
    description:
      "Små valg i møte med mennesker kan gi stor opplevelse av verdighet.",
    status: "planned",
    learningGoals: [],
  },
  {
    id: "modul-9",
    order: 9,
    title: "Når jeg blir bekymret",
    durationMinutes: 14,
    description:
      "Hva du gjør når magefølelsen sier at noe ikke er som det skal.",
    status: "planned",
    learningGoals: [],
  },
  {
    id: "modul-10",
    order: 10,
    title: "Bilder, historier og sosiale medier",
    durationMinutes: 10,
    description:
      "Trygge valg når du vil dele noe fra frivillig arbeid.",
    status: "planned",
    learningGoals: [],
  },
  {
    id: "modul-11",
    order: 11,
    title: "Penger, gaver og praktiske tjenester",
    durationMinutes: 12,
    description:
      "Tydelige grenser for økonomi, gaver og praktiske oppgaver.",
    status: "planned",
    learningGoals: [],
  },
  {
    id: "modul-12",
    order: 12,
    title: "Når relasjonen blir for nær",
    durationMinutes: 12,
    description:
      "Hvordan ta vare på både varme og grenser i relasjoner over tid.",
    status: "planned",
    learningGoals: [],
  },
  {
    id: "modul-13",
    order: 13,
    title: "Frivillig sammen med ansatte og organisasjon",
    durationMinutes: 10,
    description:
      "Slik spiller frivillige, ansatte og organisasjon hverandre gode.",
    status: "planned",
    learningGoals: [],
  },
  {
    id: "modul-14",
    order: 14,
    title: "Ta vare på deg selv som frivillig",
    durationMinutes: 10,
    description:
      "Frivilligrollen skal være meningsfull og bærekraftig for deg også.",
    status: "planned",
    learningGoals: [],
  },
  {
    id: "modul-15",
    order: 15,
    title: "Avsluttende trygghetsløype",
    durationMinutes: 15,
    description:
      "Samle det viktigste: rolle, grenser, gode møter og hvem du spør.",
    status: "planned",
    learningGoals: [],
  },
];

export function getModuleById(moduleId: string) {
  return courseModules.find((courseModule) => courseModule.id === moduleId);
}
