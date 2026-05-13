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
    title: "Når noe blir uklart - stopp og avklar",
    description:
      "Lær hva du gjør når noe blir uklart, bekymringsfullt eller ubehagelig.",
    status: "planned",
    learningGoals: [
      "Bruke Stopp og avklar-kompasset når du blir usikker",
      "Skille mellom det du kan fortsette med, det du må avklare og akutt fare",
      "Beskrive det du har sett og hørt uten å diagnostisere eller konkludere",
    ],
  },
  {
    id: "modul-4",
    order: 4,
    title: "Klar til å bidra",
    description:
      "Samle det viktigste fra kurset og øv på trygge valg i praktiske situasjoner.",
    status: "planned",
    learningGoals: [
      "Kjenne igjen når du kan bidra selv og når noe må avklares",
      "Vite hvem du spør når noe blir uklart",
      "Samle en personlig huskeregel for trygg frivillighet",
    ],
  },
];

export const visibleCourseModules = courseModules;

export function getModuleById(moduleId: string) {
  return courseModules.find((courseModule) => courseModule.id === moduleId);
}
