export type CoursePhase = {
  id: string;
  title: string;
  description: string;
  moduleIds: string[];
};

export const coursePhases: CoursePhase[] = [
  {
    id: "forsta-frivilligheten",
    title: "Delområde 1: Forstå frivilligheten",
    description:
      "Hvorfor frivillighet betyr noe, og hvordan lokalsamfunn blir tryggere når mennesker ser hverandre.",
    moduleIds: ["modul-1"],
  },
  {
    id: "finn-rollen-din",
    title: "Delområde 2: Finn rollen din",
    description:
      "Hva frivilligrollen er, hva den ikke er, og hvordan du bidrar uten å overta ansvar.",
    moduleIds: ["modul-2", "modul-3"],
  },
  {
    id: "klar-til-a-bidra",
    title: "Delområde 3: Klar til å bidra",
    description:
      "Oppsummering og mestringssjekk før du fullfører kurset.",
    moduleIds: ["modul-4"],
  },
];
