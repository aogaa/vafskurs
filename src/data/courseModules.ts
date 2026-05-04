export type CourseModule = {
  id: string;
  order: number;
  title: string;
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
    title: "Frivilligrollen: Hva er min plass?",
    description:
      "Bygg rollekompasset ditt og bli tryggere på hva du kan bidra med, hva du må avklare, og hva som ligger hos andre.",
    status: "planned",
    learningGoals: [
      "Forstå frivilligrollen som en egen og verdifull rolle",
      "Skille mellom å bidra og å overta ansvar",
      "Øve på å stoppe og avklare når rollen blir uklar",
    ],
  },
  {
    id: "modul-3",
    order: 3,
    title: "Min rolle som frivillig",
    description:
      "Bli tryggere på hva rollen rommer, og hva som ikke skal ligge hos deg.",
    status: "planned",
    learningGoals: [],
  },
  {
    id: "modul-4",
    order: 4,
    title: "Grønt, gult og rødt",
    description:
      "Lær et enkelt språk for situasjoner som er trygge, uklare eller må stoppes.",
    status: "planned",
    learningGoals: [],
  },
  {
    id: "modul-5",
    order: 5,
    title: "Stopp og avklar",
    description:
      "Øv på å stoppe i tide og spørre riktig person når noe blir uklart.",
    status: "planned",
    learningGoals: [],
  },
  {
    id: "modul-6",
    order: 6,
    title: "Å si ja, nei og «det må jeg avklare»",
    description:
      "Praktiske formuleringer for tydelige og vennlige grenser.",
    status: "planned",
    learningGoals: [],
  },
  {
    id: "modul-7",
    order: 7,
    title: "Taushet og fortrolighet",
    description:
      "Forstå hva du kan dele, hva du skal holde for deg selv, og når du må spørre.",
    status: "planned",
    learningGoals: [],
  },
  {
    id: "modul-8",
    order: 8,
    title: "Verdighet og respekt i praksis",
    description:
      "Små valg i møte med mennesker kan gi stor opplevelse av verdighet.",
    status: "planned",
    learningGoals: [],
  },
  {
    id: "modul-9",
    order: 9,
    title: "Når jeg blir bekymret",
    description:
      "Hva du gjør når magefølelsen sier at noe ikke er som det skal.",
    status: "planned",
    learningGoals: [],
  },
  {
    id: "modul-10",
    order: 10,
    title: "Bilder, historier og sosiale medier",
    description:
      "Trygge valg når du vil dele noe fra frivillig arbeid.",
    status: "planned",
    learningGoals: [],
  },
];

export function getModuleById(moduleId: string) {
  return courseModules.find((courseModule) => courseModule.id === moduleId);
}
