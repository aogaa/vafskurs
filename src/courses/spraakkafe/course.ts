import type { CourseDescriptor } from "../types";
import { visibleSpraakkafeModules } from "./modules";
import { DelEnSpraakkafe } from "./parts/DelEnSpraakkafe";
import { DelToSlikGjorVi } from "./parts/DelToSlikGjorVi";
import { DelTreVertsrollen } from "./parts/DelTreVertsrollen";
import { DelFireGrenser } from "./parts/DelFireGrenser";
import { DelFemKlar } from "./parts/DelFemKlar";

const transitionCopy: Record<string, string> = {
  "del-1":
    "Nå vet du hva en språkkafé er. Neste steg er det praktiske: hvor, når og hvordan vi gjør det hos oss.",
  "del-2":
    "Nå kjenner du det praktiske. Neste steg er det viktigste når dere først sitter sammen: vertsrollen ved bordet.",
  "del-3":
    "Nå vet du hvordan du leder en god samtale. Neste steg handler om følsomme temaer og trygge grenser.",
  "del-4":
    "Nå kjenner du grensene som gjør kafeen trygg for alle. Siste steg er å gjøre deg klar til din første vakt.",
  "del-5":
    "Du er klar til å starte. Meld deg på en vakt — og lykke til på din første språkkafé!",
};

export const spraakkafeCourse: CourseDescriptor = {
  id: "spraakkafe",
  slug: "spraakkafe",
  storagePrefix: "spraakkafe",
  title: "Slik lager vi språkkafe",
  shortDescription:
    "En praktisk innføring i hvordan du bidrar på en språkkafé — en lavterskel møteplass for muntlig norsk, mestring og fellesskap.",
  // "planned" → skjules fra portalen (visibleCourses). Ruten /spraakkafe
  // fungerer fortsatt direkte for testing. Sett til "active" når klar.
  status: "planned",
  hero: {
    subtitle:
      "En praktisk veiviser for deg som vil være frivillig på en språkkafé.",
    description1:
      "En språkkafé er en uformell møteplass der mennesker øver på muntlig norsk, blir kjent og opplever fellesskap. Det krever ikke pedagogisk utdanning — det krever tålmodighet, vennlighet og et trygt rom.",
    description2:
      "Dette kurset tar deg gjennom alt fra hva en språkkafé er, til hvordan vi gjør det i praksis, slik at du føler deg trygg på din første vakt.",
  },
  progressCopy: {
    journeyLabel: "Din fremdrift",
    notStartedText: "Du har hele kurset foran deg",
    completedText: "Hele kurset er fullført",
    inProgressText: "Du har startet kurset",
  },
  completionStepText: "Du har tatt et viktig steg mot å bli språkkafévert.",
  courseCompletedTitle: "Kurset er fullført",
  modules: visibleSpraakkafeModules,
  transitionCopy,
  // Alle deler har egne interaktive komponenter. Del 2 leser organisasjon.ts.
  moduleComponents: {
    "del-1": DelEnSpraakkafe,
    "del-2": DelToSlikGjorVi,
    "del-3": DelTreVertsrollen,
    "del-4": DelFireGrenser,
    "del-5": DelFemKlar,
  },
};
