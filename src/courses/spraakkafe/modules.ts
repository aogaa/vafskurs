import type { CourseModule } from "../../data/courseModules";

/**
 * Stillas for kurs 2 "Slik lager vi språkkafe".
 * Plassholder-innhold — tekst, læringsmål og interaktive øvelser fylles inn
 * i senere runder. Alle deler rendres foreløpig med den generiske layouten.
 */
export const spraakkafeModules: CourseModule[] = [
  {
    id: "modul-1",
    order: 1,
    title: "Hva er en språkkafé?",
    description:
      "Bli kjent med ideen bak språkkafé som lavterskel møteplass for språk og fellesskap.",
    status: "active",
    learningGoals: [
      "Forstå hva en språkkafé er og hvem den er for",
      "Se verdien av uformell språktrening og sosial kontakt",
      "Kjenne til hva som skiller en språkkafé fra et språkkurs",
    ],
  },
  {
    id: "modul-2",
    order: 2,
    title: "Planlegging og det praktiske",
    description:
      "Sted, tid, utstyr og enkel organisering som gjør en språkkafé trygg og forutsigbar.",
    status: "planned",
    learningGoals: [
      "Vite hva som skal til av lokale, tid og utstyr",
      "Planlegge en enkel og gjentakbar struktur for samlingene",
      "Lage en plan for å nå ut til og ta imot deltakere",
    ],
  },
  {
    id: "modul-3",
    order: 3,
    title: "Vertsrollen",
    description:
      "Hvordan du som vert skaper trygg stemning, god samtaleflyt og inkludering for alle.",
    status: "planned",
    learningGoals: [
      "Lede en samtale slik at alle blir inkludert",
      "Skape en trygg og raus stemning på kafeen",
      "Håndtere ulikt språknivå i samme gruppe",
    ],
  },
  {
    id: "modul-4",
    order: 4,
    title: "Klar til å starte",
    description:
      "Samle det viktigste og gjør deg klar til å starte din egen språkkafé.",
    status: "planned",
    learningGoals: [
      "Sette sammen en konkret plan for første samling",
      "Vite hvem du kan spørre om hjelp og samarbeid",
      "Kjenne deg trygg på å invitere de første deltakerne",
    ],
  },
];

export const visibleSpraakkafeModules = spraakkafeModules;

export function getSpraakkafeModuleById(moduleId: string) {
  return spraakkafeModules.find((courseModule) => courseModule.id === moduleId);
}
