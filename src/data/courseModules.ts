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
    title: "Frivillighet er å være del av noe større",
    description:
      "Se hvorfor frivillighet handler om relasjoner, fellesskap og tryggere nærmiljøer.",
    status: "active",
    ingress:
      "Frivillighet er mennesker som, på ulike måter, er med på å gjøre lokalsamfunnet sterkere.",
    learningGoals: [
      "Forstå hvorfor frivillighet har verdi for lokalsamfunnet",
      "Se hvordan du bidrar med relasjoner, nærvær og fellesskap",
      "Forstå hva det betyr at frivillighet er et supplement",
    ],
    insight: "Når mennesker ser hverandre, blir lokalsamfunnet tryggere.",
    contentBlocks: [
      "Som frivillig kommer du med noe viktig: tid, blikk, samtaler og små handlinger som kan gjøre hverdagen lettere for andre.",
      "Å være et supplement betyr at du ikke skal bære hele ansvaret alene. Du bidrar med det frivilligheten er særlig god på: menneskelig kontakt, fellesskap og lav terskel inn i aktivitet.",
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
    title: "Trygge valg i øyeblikket",
    description:
      "Øv på hva du kan si og gjøre når frivilligrollen blir utfordret i praksis.",
    status: "planned",
    learningGoals: [
      "Stoppe opp før du sier ja til uklare oppgaver",
      "Sette grenser uten å avvise personen foran deg",
      "Koble på leder når ansvar, trygghet eller rolle blir uklart",
    ],
  },
  {
    id: "modul-4",
    order: 4,
    title: "Taushet, tillit og bekymring",
    description:
      "Hva du kan holde for deg selv, hva som må tas videre, og hvordan du melder bekymring trygt.",
    status: "planned",
    learningGoals: [
      "Skille mellom vanlig fortrolighet, veiledningsbehov, bekymring og alvorlig fare",
      "Forstå at taushet og tillit ikke betyr absolutt hemmelighold",
      "Dele minst mulig, men nok til at riktig person kan følge opp",
    ],
  },
  {
    id: "modul-5",
    order: 5,
    title: "Gode møter med mennesker",
    description:
      "Hvordan du skaper gode samtaler, viser respekt, lytter godt og holder rollen tydelig.",
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
