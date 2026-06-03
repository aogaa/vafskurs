import type { CourseDescriptor } from "../types";
import { visibleSpraakkafeModules } from "./modules";

const transitionCopy: Record<string, string> = {
  "modul-1":
    "Nå vet du hva en språkkafé er. Neste steg er det praktiske: sted, tid og enkel organisering.",
  "modul-2":
    "Nå har du planen på plass. Neste steg handler om hvordan du leder samlingene som vert.",
  "modul-3":
    "Nå kjenner du vertsrollen. Neste steg er å samle alt og gjøre deg klar til å starte.",
  "modul-4":
    "Du er klar til å starte din egen språkkafé. Lykke til!",
};

export const spraakkafeCourse: CourseDescriptor = {
  id: "spraakkafe",
  slug: "spraakkafe",
  storagePrefix: "spraakkafe",
  title: "Slik lager vi språkkafe",
  shortDescription:
    "En praktisk innføring i hvordan du starter og driver en språkkafé — en lavterskel møteplass for språk, mestring og fellesskap.",
  // "planned" → skjules fra portalen (visibleCourses). Ruten /spraakkafe
  // fungerer fortsatt direkte for testing. Sett til "active" når klar.
  status: "planned",
  hero: {
    subtitle:
      "En praktisk veiviser for deg som vil starte en språkkafé i nærmiljøet.",
    description1:
      "En språkkafé er en uformell møteplass der mennesker øver på norsk, blir kjent og opplever fellesskap. Det krever ikke pedagogisk utdanning — det krever raushet, struktur og et trygt rom.",
    description2:
      "Dette kurset tar deg gjennom alt fra idé til første samling, slik at du føler deg trygg på å invitere de første deltakerne.",
  },
  progressCopy: {
    journeyLabel: "Din fremdrift",
    notStartedText: "Du har hele kurset foran deg",
    completedText: "Hele kurset er fullført",
    inProgressText: "Du har startet kurset",
  },
  completionStepText: "Du har tatt et viktig steg mot din egen språkkafé.",
  courseCompletedTitle: "Kurset er fullført",
  modules: visibleSpraakkafeModules,
  transitionCopy,
  // Ingen moduleComponents ennå → alle deler bruker generisk stillas-layout.
};
