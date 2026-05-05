export type TrustLevel = "confidential" | "guidance" | "concern" | "urgent";

export type TrustCase = {
  id: string;
  title: string;
  situation: string;
  correctLevel: TrustLevel;
  feedback: string;
};

export const trustLevels: Array<{
  id: TrustLevel;
  letter: string;
  title: string;
  shortTitle: string;
  action: string;
  description: string;
  signal: string;
  classes: string;
}> = [
  {
    id: "confidential",
    letter: "A",
    title: "Vanlig fortrolighet",
    shortTitle: "Fortrolig",
    action: "Jeg holder dette fortrolig.",
    description: "Privat informasjon som ikke trenger å tas videre.",
    signal: "Respekt",
    classes: "border-pine/35 bg-pine/12 text-harbor",
  },
  {
    id: "guidance",
    letter: "B",
    title: "Veiledningsbehov",
    shortTitle: "Veiledning",
    action: "Jeg ber leder om veiledning, uten å dele mer enn nødvendig.",
    description: "Jeg er usikker og trenger råd om rollen min.",
    signal: "Råd",
    classes: "border-honey/55 bg-honey/18 text-harbor",
  },
  {
    id: "concern",
    letter: "C",
    title: "Bekymring",
    shortTitle: "Bekymring",
    action: "Jeg tar dette videre til leder.",
    description: "Dette bør leder vite om.",
    signal: "Videre",
    classes: "border-fjord/30 bg-fjord/10 text-harbor",
  },
  {
    id: "urgent",
    letter: "D",
    title: "Alvorlig fare",
    shortTitle: "Akutt",
    action: "Dette kan være akutt og må håndteres raskt etter lokal rutine.",
    description: "Dette kan ikke vente.",
    signal: "Raskt",
    classes: "border-red-300 bg-red-50 text-red-950",
  },
];

export const moduleFourTrustCases: TrustCase[] = [
  {
    id: "en-gammel-sorg",
    title: "En gammel sorg",
    situation:
      "Under en kaffestund forteller en deltaker at hun mistet ektefellen sin for mange år siden. Hun blir blank i øynene og sier at savnet fortsatt kommer brått noen dager. Hun sier ikke at hun er utrygg, syk eller i fare. Hun virker rolig etter samtalen og takker for at du lyttet.",
    correctLevel: "confidential",
    feedback:
      "Dette er et eksempel på vanlig fortrolighet. Mennesker må kunne dele sorg, minner og savn uten at det automatisk tas videre. Du kan møte henne med varme og respekt, men du trenger ikke gjøre sorgen hennes til en sak. Hvis du selv blir sterkt berørt, kan du be leder om generell veiledning uten å dele mer enn nødvendig.",
  },
  {
    id: "usikker-pa-egen-rolle",
    title: "Du blir usikker på egen rolle",
    situation:
      "En deltaker har begynt å fortelle deg mye hver gang dere møtes. Det er ikke akutt, men du merker at du tenker på samtalene etterpå og blir usikker på om rollen begynner å bli for tung for deg.",
    correctLevel: "guidance",
    feedback:
      "Dette er et veiledningsbehov. Det betyr ikke at personen har gjort noe galt, og det betyr ikke at du må legge frem hele livshistorien deres. Men du skal heller ikke stå alene når et oppdrag begynner å belaste deg. Leder kan hjelpe deg å sortere rollen, sette grenser og finne en trygg vei videre.",
  },
  {
    id: "lite-mat-og-endring",
    title: "Lite mat og tydelig endring",
    situation:
      "Du besøker en eldre person du har møtt flere ganger. Denne gangen virker personen mer forvirret enn før, har nesten ikke mat i kjøleskapet og sier at hun ikke husker om hun har spist i dag.",
    correctLevel: "concern",
    feedback:
      "Dette er en bekymring som bør tas videre. Du skal ikke diagnostisere eller konkludere, men du har konkrete observasjoner: mer forvirring enn vanlig, lite mat og usikkerhet rundt måltider. Dette er relevant for leder å vite. Beskriv det konkret og rolig, uten å overdrive eller tolke mer enn nødvendig.",
  },
  {
    id: "hemmelig-onske-om-penger",
    title: "Hemmelig ønske om hjelp med penger",
    situation:
      "En bruker sier at sønnen styrer bankkortet hennes, og at hun ikke tør spørre ham om penger. Hun ber deg om å hjelpe henne å ta ut kontanter, men sier at du ikke må fortelle det til noen.",
    correctLevel: "concern",
    feedback:
      "Dette handler om økonomi, mulig press og en forespørsel om hemmelighold. Det skal du ikke håndtere alene. Du skal ikke ta ut penger, låne penger, bruke bankkort eller bli en privat mellomperson. Ta situasjonen videre til leder, og del det som er nødvendig for at saken kan vurderes riktig.",
  },
  {
    id: "akutt-sykdomstegn",
    title: "Akutt sykdomstegn",
    situation:
      "Under en aktivitet blir en deltaker plutselig svært dårlig. Personen strever med å snakke, virker skjev i ansiktet og klarer ikke løfte den ene armen normalt.",
    correctLevel: "urgent",
    feedback:
      "Dette kan være akutt. Her skal du ikke vente til etter aktiviteten eller bare notere det til senere. Følg lokal rutine for akutte situasjoner og bruk riktig akuttinstans ved behov. Varsle også ansvarlig person så snart det er praktisk mulig. I slike situasjoner er rask handling viktigere enn å vurdere rollen alene.",
  },
  {
    id: "bilde-og-privat-historie",
    title: "Bilde og privat historie",
    situation:
      "Etter en hyggelig aktivitet forteller en deltaker en sterk historie om barndommen sin. Du tenker at historien kunne vært fin å bruke i et innlegg om frivilligheten, og du har også et bilde der personen smiler.",
    correctLevel: "guidance",
    feedback:
      "Bilder og personlige historier må håndteres varsomt. Et smil på et bilde er ikke det samme som samtykke til publisering, og en privat historie tilhører personen som fortalte den. Be leder om veiledning og følg lokal rutine for samtykke, bilder og historiefortelling. Ikke publiser på egen hånd.",
  },
  {
    id: "ubehagelig-kommentar",
    title: "Ubehagelig kommentar",
    situation:
      "En deltaker kommer med flere kommentarer om kroppen din og står nærmere deg enn du liker. Du føler deg utrygg, men personen ler og sier at det bare var hyggelig ment.",
    correctLevel: "concern",
    feedback:
      "Frivillige har rett til å være trygge. Ubehag skal tas på alvor, også når den andre sier at det bare var ment hyggelig. Du kan sette en tydelig grense der og da, og du skal ta situasjonen videre til leder etterpå. Leder skal hjelpe med å vurdere videre rammer for oppdraget.",
  },
  {
    id: "en-tung-setning",
    title: "En tung setning",
    situation:
      "Under en samtale sier en bruker lavt: «Noen ganger tenker jeg at det hadde vært bedre om jeg ikke våknet i morgen.» Etterpå ber personen deg om å ikke si det til noen.",
    correctLevel: "concern",
    feedback:
      "Dette er for alvorlig til at du skal bære det alene. Du kan lytte rolig og vise omsorg, men du bør ikke love absolutt hemmelighold. Si gjerne at du bryr deg, og at dette er noe dere må få riktig hjelp til å håndtere. Ta det videre til leder etter lokal rutine. Hvis du oppfatter situasjonen som akutt, skal akutt rutine brukes.",
  },
  {
    id: "parørende-spor",
    title: "Parørende spør hva som ble sagt",
    situation:
      "Etter et besøk ringer en pårørende og spør: «Hva sa mamma egentlig til deg? Hun forteller meg ingenting.» Du forstår at den pårørende er bekymret, men brukeren har ikke gitt deg samtykke til å dele samtalen.",
    correctLevel: "guidance",
    feedback:
      "Parørende kan være viktige og bekymrede, men det betyr ikke at du kan gjengi private samtaler. Du kan møte pårørende med respekt uten å dele fortrolig informasjon. Be leder om veiledning hvis du er usikker på hva som kan sies, og følg lokal rutine for kontakt med pårørende.",
  },
  {
    id: "apner-ikke-doren",
    title: "Bruker åpner ikke døren",
    situation:
      "Du kommer til et avtalt besøk hjemme hos en person som vanligvis alltid åpner. Denne gangen er det helt stille. Telefonen blir ikke besvart. Du ser at lyset står på inne, og personen har tidligere fortalt at hun er ustø.",
    correctLevel: "urgent",
    feedback:
      "Dette kan være en alvorlig situasjon. Du skal ikke bare dra hjem og vente til neste gang. Følg lokal rutine for når bruker ikke åpner, og kontakt riktig ansvarlig person eller akuttinstans ved behov. Her handler det ikke om å være nysgjerrig, men om sikkerhet.",
  },
];



