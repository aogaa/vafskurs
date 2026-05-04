export type CoursePhase = {
  id: string;
  title: string;
  description: string;
  moduleIds: string[];
};

export const coursePhases: CoursePhase[] = [
  {
    id: "forsta-frivilligheten",
    title: "Fase 1: Forstå frivilligheten",
    description:
      "Hvorfor frivillighet betyr noe, og hvordan lokalsamfunn blir tryggere når mennesker ser hverandre.",
    moduleIds: ["modul-1"],
  },
  {
    id: "finn-rollen-din",
    title: "Fase 2: Finn rollen din",
    description:
      "Hva frivilligrollen er, hva den ikke er, og hvordan du bidrar uten å overta ansvar.",
    moduleIds: ["modul-2", "modul-3"],
  },
  {
    id: "sett-trygge-grenser",
    title: "Fase 3: Sett trygge grenser",
    description:
      "Innenfor, avklar og utenfor: grensesetting, fortrolighet og trygge formuleringer.",
    moduleIds: ["modul-4", "modul-5", "modul-6", "modul-7"],
  },
  {
    id: "mot-mennesker-godt",
    title: "Fase 4: Møt mennesker godt",
    description:
      "Verdighet, respekt, relasjoner og hvordan du møter mennesker på en trygg og menneskelig måte.",
    moduleIds: ["modul-8"],
  },
  {
    id: "stopp-avklar-ta-vare",
    title: "Fase 5: Stopp, avklar og håndter trygt",
    description:
      "Bekymring, avklaring og trygge valg når situasjoner kan få større konsekvenser.",
    moduleIds: ["modul-9", "modul-10"],
  },
];
