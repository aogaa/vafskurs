/**
 * ─────────────────────────────────────────────────────────────────────────
 *  DET UTSKIFTBARE LAGET — organisasjonsprofil for språkkafé-kurset
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Alt i denne filen handler om HVORDAN ÉN konkret organisasjon gjennomfører
 * språkkafeen sin. Det generelle (hva en språkkafé er, vertsrollen, følsomme
 * temaer) ligger i `modules.ts` og er likt for alle.
 *
 * SLIK TILPASSER EN ANNEN ORGANISASJON KURSET:
 *   1. Kopier denne filen og fyll inn egne verdier i `organisasjonsProfil`.
 *   2. Ikke endre TYPEN (`OrganisasjonsProfil`) — bare verdiene.
 *   3. Felt som ikke er relevante: sett til `undefined` (valgfrie felt) eller
 *      tom streng/tom liste. Del 2 skjuler tomme punkter automatisk.
 *   4. Meråpent gjelder ikke alle: sett `meraapent.harMeraapent = false`.
 *
 * Del 2 ("Slik gjør vi det hos oss") er den eneste delen som leser herfra.
 * Bytt denne fila, og Del 2 forteller plutselig en annen organisasjons historie
 * — resten av kurset står urørt.
 */

/** Et navngitt punkt med valgfri utdypning, brukt i flere lister i Del 2. */
export type ProfilPunkt = {
  tittel: string;
  detalj?: string;
  /** Valgfri lenke (f.eks. video) som vises under punktet. */
  lenke?: { url: string; tekst: string };
};

/** Meråpent-ordning (selvbetjent bibliotek utenfor betjent tid). */
export type MeraapentInfo = {
  /** Er språkkafeen i et bibliotek/lokale med meråpent? */
  harMeraapent: boolean;
  /** Kort forklaring + hvorfor det er en fordel at frivillige registrerer seg. */
  tekst: string;
  /** Lenke til mer informasjon (vises som «Les mer»). */
  lenke?: string;
  lenketekst?: string;
};

export type OrganisasjonsProfil = {
  /** Organisasjonen som eier kurset (vises i Del 2-introen). */
  organisasjon: string;
  /** Hvor språkkafeen holdes, f.eks. «Røa bibliotek». */
  sted: string;
  /** Gateadresse, f.eks. «Tore Hals Mejdells vei 8 – Samfunnshus Vest». */
  adresse?: string;
  /** Lenke til kart (Google Maps e.l.) for adressen. */
  kartlenke?: string;
  /** Når den holdes, f.eks. «Tirsdager kl. 1630». */
  tidspunkt: string;
  /** Når frivillige bør møte opp, f.eks. «Møt ca. kl. 1615 (15 min før)». */
  oppmote: string;
  /** Hvor lenge den varer + pause, f.eks. «2 timer med 10–15 min pause i midten». */
  varighet: string;

  /** Hvordan frivillige melder seg på vakt. */
  paamelding: ProfilPunkt;
  /** Hvor mange frivillige det normalt er, og reserve-regelen. */
  bemanning: ProfilPunkt;
  /** Hvordan deltakerne fordeles på bord (antall per bord, nivå, rundgang). */
  bordoppsett: ProfilPunkt[];
  /** Hvem som skaffer/klargjør tekstene, og hva slags tekster. */
  tekster: ProfilPunkt;
  /** Servering: hva som settes fram, og regler for medbrakt. */
  servering: ProfilPunkt;

  /** Meråpent-ordning (kan slås av for organisasjoner uten den). */
  meraapent: MeraapentInfo;

  /** Hvem man kontakter, og hva man gjør, ved avlysning. */
  kontaktperson: {
    navn: string;
    rolle?: string;
    avlysningRutine: string;
  };

  /** Sesong/spesielle merknader (f.eks. sommer-rutiner). Kan være tom liste. */
  merknader: ProfilPunkt[];
};

/**
 * ── Vestre Aker Frivilligsentral — språkkafé på Røa bibliotek ──
 * Kilder: «Manual Språkkafé» og møtereferat april 2026.
 */
export const organisasjonsProfil: OrganisasjonsProfil = {
  organisasjon: "Vestre Aker Frivilligsentral",
  sted: "Røa bibliotek",
  adresse: "Tore Hals Mejdells vei 8 – Samfunnshus Vest",
  kartlenke: "https://maps.app.goo.gl/bhXrCewKVMCYWwbR7",
  tidspunkt: "Tirsdager kl. 1630",
  oppmote: "Møt opp kl. 1615 — rundt 15 minutter før kafeen starter.",
  varighet:
    "Språkkafeen varer i 2 timer, med en pause på 10–15 minutter i midten.",

  paamelding: {
    tittel: "Meld deg på en vakt i vaktlista",
    detalj:
      "Som frivillig melder du deg på språkkafeen via vaktlista. Trenger du å avlyse, ordner du helst en erstatter selv — eller gir beskjed til kontaktpersonen.",
  },
  bemanning: {
    tittel: "Vi ønsker 7 på vaktlista",
    detalj:
      "Det kommer gjerne mellom 20 og 30 deltakere, og det er ønskelig med maks 4 deltakere per bord.",
    lenke: {
      url: "https://youtu.be/E4jV7CfxOF0?si=OOMZ_ySYxFZWjBQ4",
      tekst: "Se video om vaktplanen",
    },
  },
  bordoppsett: [
    {
      tittel: "Bordene går på rundgang (A, B og C)",
      detalj:
        "De frivillige på vakt blir enige seg imellom, men utgangspunktet er at bordene går på rundgang. Det er ikke faste grupper — verken for deltakere eller frivillige. Vær fleksibel og bidra på alle typer bord.",
    },
    {
      tittel: "Maks 4 deltakere per bord",
      detalj:
        "Fordel deltakerne jevnt mellom bordene, slik at alle får god mulighet til å delta aktivt i samtalen.",
    },
    {
      tittel: "Sjekk nivået ved ankomst",
      detalj:
        "Spør deltakere du ikke kjenner hvilket nivå de er på. Viser det seg å være feil, er det bare å bytte nivå underveis.",
    },
  ],
  tekster: {
    tittel: "Biblioteket legger tekstene klare",
    detalj:
      "Biblioteket klargjør lokalet og legger fram nivåtilpassede tekster, drikke og kjeks før dere kommer. Velg blant tekstene som ligger klare. Vi bruker tekster det er lett å prate om — gjerne om hverdagen og særnorske kulturfenomener — for å få i gang samtalen og øke kulturforståelsen. Vil du bruke egen tekst, avtal det med kontaktpersonen på forhånd, så kan den forberedes og kopieres til alle. Tekstene skal ikke handle om politikk eller religion.",
  },
  servering: {
    tittel: "Drikke og kjeks — medbrakt kun i pausen",
    detalj:
      "Biblioteket setter fram drikke og kjeks. Har noen lyst til å bidra med hjemmebakst, frukt fra hagen eller lignende, er det veldig hyggelig — men det serveres kun i pausen, og det må være nok til alle.",
  },

  meraapent: {
    harMeraapent: true,
    tekst:
      "Røa bibliotek har meråpent: biblioteket er tilgjengelig også utenom betjent åpningstid. Du kommer inn selvbetjent med lånekort og PIN-kode. Det er en fordel om alle frivillige har registrert seg for meråpent, slik at dere har tilgang til lokalet rundt språkkafeen selv om biblioteket ikke er betjent. Registrering gjøres i biblioteket.",
    lenke:
      "https://deichman.no/vi-tilbyr/mer%C3%A5pent-bibliotek_234b3323-adb3-44ba-ab47-8e7c27f3768f",
    lenketekst: "Les mer om meråpent hos Deichman",
  },

  kontaktperson: {
    navn: "Espen",
    rolle: "kontaktperson for språkkafeen",
    avlysningRutine:
      "Må du avlyse en vakt, ta kontakt med de andre frivillige for å finne en erstatter — eller gi beskjed til Espen.",
  },

  merknader: [
    {
      tittel: "Sommer: avklar tekster i god tid",
      detalj:
        "Biblioteket har begrenset bemanning om sommeren og kan ikke alltid kopiere for oss. Avklar behovet for tekster i god tid før juni, så alt er klart. Det er også lagt til rette for at vi kan kopiere gratis på egenhånd ved behov.",
    },
  ],
};
