export type ModuleOneCard = {
  id: string;
  title: string;
  shortText: string;
  icon: "wave" | "eye" | "place" | "bridge" | "spark" | "person" | "balance" | "people" | "arrow" | "search";
};

export const moduleOneCards: ModuleOneCard[] = [
  {
    id: "folk-hilser",
    title: "Folk hilser",
    shortText:
      "Små tegn på gjenkjennelse gjør at mennesker føler seg mindre fremmede for hverandre.",
    icon: "wave",
  },
  {
    id: "noen-merker",
    title: "Noen merker om du er borte",
    shortText:
      "Trygghet vokser når noen legger merke til at du ikke kommer som vanlig.",
    icon: "eye",
  },
  {
    id: "steder-a-motes",
    title: "Det finnes steder å møtes",
    shortText:
      "Møteplasser gjør det lettere å bygge relasjoner før man trenger hjelp.",
    icon: "place",
  },
  {
    id: "lett-a-sporre",
    title: "Det er lett å spørre om hjelp",
    shortText: "Når terskelen er lav, kan små problemer tas tidlig.",
    icon: "bridge",
  },
  {
    id: "kan-bidra",
    title: "Jeg kan bidra med noe",
    shortText:
      "Et godt nærmiljø lar mennesker både få støtte og være til nytte.",
    icon: "spark",
  },
  {
    id: "sett-som-person",
    title: "Jeg blir sett som person",
    shortText:
      "Mennesker trenger å bli møtt som mer enn behov, alder, diagnose eller problem.",
    icon: "person",
  },
  {
    id: "passe-mye",
    title: "Folk blander seg passe mye",
    shortText: "Et trygt nærmiljø bryr seg uten å overvåke eller ta over.",
    icon: "balance",
  },
  {
    id: "rom-for-ulike",
    title: "Det er rom for ulike mennesker",
    shortText:
      "Trygghet handler også om å kunne være seg selv i fellesskapet.",
    icon: "people",
  },
  {
    id: "tar-initiativ",
    title: "Noen tar initiativ",
    shortText:
      "Fellesskap oppstår sjelden helt av seg selv. Noen må invitere, spørre og starte.",
    icon: "arrow",
  },
  {
    id: "fanges-opp",
    title: "Små ting fanges opp tidlig",
    shortText:
      "Når mennesker ser hverandre, kan små bekymringer oppdages før de blir store.",
    icon: "search",
  },
];
