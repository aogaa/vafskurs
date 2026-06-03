import { visibleCourseModules } from "../../data/courseModules";
import { ModuleOne } from "../../components/modules/ModuleOne";
import { ModuleTwo } from "../../components/modules/ModuleTwo";
import { ModuleThree } from "../../components/modules/ModuleThree";
import { ModuleFour } from "../../components/modules/ModuleFour";
import type { CourseDescriptor } from "../types";

const transitionCopy: Record<string, string> = {
  "modul-1":
    "Nå har du sett hvorfor frivillighet betyr noe. Neste steg er å bli tydeligere på hva frivillighet er, og hvordan rollen kan være både varm og trygg.",
  "modul-2":
    "Nå har du bygget rollekompasset ditt. Neste steg handler om hva du gjør når noe blir uklart.",
  "modul-3":
    "Nå har du øvd på å stoppe, avklare og bruke riktig hjelp når noe blir uklart. Neste steg er å samle læringen og gjøre deg klar til å bidra.",
  "modul-4":
    "Du har fullført kurset. Du trenger ikke kunne alt. Du skal vite hva du gjør når du ikke vet.",
};

export const tryggSomFrivilligCourse: CourseDescriptor = {
  id: "trygg-som-frivillig",
  slug: "trygg-som-frivillig",
  storagePrefix: "trygg-som-frivillig",
  title: "Trygg som frivillig",
  shortDescription:
    "Et praktisk kurs om frivilligrollen, gode grenser og trygge valg i møte med mennesker, lokalsamfunn og kommunale tjenester.",
  status: "active",
  hero: {
    subtitle:
      "Et grunnkurs for deg som vil bidra i møte med mennesker og lokalsamfunn.",
    description1:
      "Frivillighet er noe av det fineste vi gjør sammen. Det handler om mennesker som ser hverandre, stiller opp for hverandre og bygger fellesskap der de bor. Når du er frivillig, er du med på å gjøre nærmiljøet varmere, tryggere og mer levende.",
    description2:
      "Dette kurset skal gi deg en tydeligere forståelse av frivilligrollen, slik at det blir lettere å bidra med trygghet, omtanke og god dømmekraft i møte med andre mennesker.",
  },
  progressCopy: {
    journeyLabel: "Trygghetsreisen",
    notStartedText: "Du har trygghetsreisen foran deg",
    completedText: "Hele trygghetsreisen er fullført",
    inProgressText: "Du har startet trygghetsreisen",
  },
  completionStepText:
    "Du har tatt et viktig steg på trygghetsreisen som frivillig.",
  courseCompletedTitle: "Kurset er fullført",
  modules: visibleCourseModules,
  transitionCopy,
  moduleComponents: {
    "modul-1": ModuleOne,
    "modul-2": ModuleTwo,
    "modul-3": ModuleThree,
    "modul-4": ModuleFour,
  },
};
