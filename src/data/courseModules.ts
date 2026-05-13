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
    title: "Frivilligrollen - hva er min rolle?",
    description:
      "Øv på å skille mellom frivilligrollen, ansattrollen, pårørenderollen og det som må avklares.",
    status: "planned",
    learningGoals: [
      "Forstå hvorfor frivilligrollen ikke er det samme som ansattrollen",
      "Skille mellom hva frivillige kan bidra med og hva andre har ansvar for",
      "Øve på å avklare når ansvar, trygghet eller rolle blir uklart",
    ],
  },
  {
    id: "modul-3",
    order: 3,
    title: "Gode møter med mennesker",
    description:
      "Øv på å møte mennesker med respekt, ro og omtanke uten å presse, fikse eller overta.",
    status: "planned",
    learningGoals: [
      "Invitere til kontakt uten å presse",
      "Lytte uten å overta samtalen eller gi råd du ikke skal gi",
      "Bidra til verdighet og selvbestemmelse i små øyeblikk",
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

export const visibleCourseModules = courseModules.filter(
  (courseModule) => courseModule.order <= 6,
);

export function getModuleById(moduleId: string) {
  return courseModules.find((courseModule) => courseModule.id === moduleId);
}
