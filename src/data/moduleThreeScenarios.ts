export type ActionChoiceQuality = "best" | "risky" | "wrong";

export type ActionScenarioOption = {
  id: string;
  text: string;
  quality: ActionChoiceQuality;
  feedback: string;
};

export type ActionScenario = {
  id: string;
  title: string;
  situation: string;
  options: ActionScenarioOption[];
};

export const moduleThreeScenarios: ActionScenario[] = [
  {
    id: "toalettbesoket",
    title: "Toalettbesøket",
    situation:
      "En ansatt sier: «Kan du bare hjelpe ham på toalettet før aktiviteten starter? Det tar bare to minutter.»",
    options: [
      {
        id: "a",
        text: "Jeg hjelper til, siden det går raskt og den ansatte virker travel.",
        quality: "wrong",
        feedback:
          "Dette er forståelig i øyeblikket, men det er ikke et trygt valg. Personlig stell og intim hjelp ligger utenfor frivilligrollen. At det tar kort tid, endrer ikke ansvaret. Slike oppgaver krever ansatte med riktig rolle, rutiner og ansvar. Som frivillig skal du ikke overta dette, selv om en ansatt spør.",
      },
      {
        id: "b",
        text: "Jeg sier: «Det kan jeg ikke gjøre som frivillig, men jeg kan hente en ansatt eller vente her imens.»",
        quality: "best",
        feedback:
          "Dette er et trygt og tydelig svar. Du avviser ikke personen. Du avviser oppgaven fordi den ligger utenfor frivilligrollen. Samtidig bidrar du på en måte som er innenfor: Du kan hente en ansatt, vente rolig eller sørge for at riktig person blir koblet på. Dette er god grensesetting i praksis.",
      },
      {
        id: "c",
        text: "Jeg sier nei uten forklaring og går bort fra situasjonen.",
        quality: "risky",
        feedback:
          "Det er riktig at du ikke skal gjøre oppgaven, men måten du svarer på kan skape unødvendig uro. Et kort og rolig svar fungerer bedre: «Det kan jeg ikke gjøre som frivillig, men jeg kan hente en ansatt.» Da holder du grensen uten å forlate personen eller situasjonen brått.",
      },
    ],
  },
  {
    id: "bankkort-og-handling",
    title: "Bankkort og handling",
    situation:
      "En bruker legger bankkortet sitt på bordet og sier: «Kan du handle noen småting for meg? PIN-koden ligger i vesken.»",
    options: [
      {
        id: "a",
        text: "Jeg tar kortet, men lover å ta vare på kvitteringen.",
        quality: "wrong",
        feedback:
          "Dette skal du ikke gjøre. Kvittering er ikke nok til å beskytte deg eller brukeren. Når du håndterer bankkort, PIN-kode eller penger, kan det oppstå spørsmål i etterkant selv om du har gjort alt riktig. Regelen finnes for å beskytte deg som frivillig, ikke fordi noen mistenker deg for å gjøre noe galt.",
      },
      {
        id: "b",
        text: "Jeg sier: «Jeg kan ikke ta med bankkort eller PIN-kode. Det er for å beskytte både deg og meg. Hvis du trenger hjelp til handling, må jeg ta det videre med lederen min.»",
        quality: "best",
        feedback:
          "Dette er riktig håndtering. Du er tydelig på grensen, men du forklarer den på en måte som viser omsorg. Du gjør også riktig ved å koble på leder. Hvis organisasjonen skal hjelpe med handling, må leder avklare rammene tydelig med brukeren. Slike oppgaver skal ikke løses som private avtaler mellom bruker og frivillig.",
      },
      {
        id: "c",
        text: "Jeg sier at jeg kan gjøre det denne ene gangen, men ikke senere.",
        quality: "wrong",
        feedback:
          "Dette kan virke som et kompromiss, men det skaper fortsatt feil ansvar. Én gang er nok til at grensen blir uklar. Hvis handling skal organiseres, må det skje gjennom leder og tydelige rammer.",
      },
    ],
  },
  {
    id: "daglige-besok",
    title: "Ensomhet og ønske om daglige besøk",
    situation:
      "En ensom bruker sier: «Kan du ikke bare komme innom hver dag? Du er den eneste jeg virkelig snakker med.»",
    options: [
      {
        id: "a",
        text: "Jeg lover å komme så ofte jeg kan, fordi personen tydelig trenger noen.",
        quality: "wrong",
        feedback:
          "Dette er en menneskelig reaksjon, men det er ikke en trygg løsning. Et løfte om daglige eller hyppige private besøk kan skape avhengighet og forventninger du ikke skal bære alene. Det kan også gjøre rollen din uklar og vanskelig å avslutte senere. Ensomheten skal tas på alvor, men ikke ved at du lager en privat løsning alene.",
      },
      {
        id: "b",
        text: "Jeg sier: «Jeg skjønner godt at du ønsker mer besøk. Jeg kan ikke love å komme hver dag, men jeg tar dette videre med lederen min.»",
        quality: "best",
        feedback:
          "Dette er et sterkt svar. Du anerkjenner behovet uten å love noe du ikke skal love. Du tar ensomheten på alvor, men lar leder hjelpe med grensen og eventuell videre oppfølging. Det er ikke din oppgave å bli personens private løsning på ensomhet. Din oppgave er å bidra innenfor en trygg ramme.",
      },
      {
        id: "c",
        text: "Jeg sier at jeg dessverre ikke kan, og lar det bli med det.",
        quality: "risky",
        feedback:
          "Det er riktig at du ikke skal love daglige besøk, men situasjonen bør ikke bare avsluttes der. Når noen uttrykker sterk ensomhet og et tydelig ønske om mer kontakt, bør leder få vite det. Da kan organisasjonen vurdere om det finnes andre aktiviteter, flere frivillige eller andre tiltak som kan være aktuelle.",
      },
    ],
  },
  {
    id: "medisinpaminnelse",
    title: "Medisinpåminnelse",
    situation:
      "En deltaker sier: «Kan du bare minne meg på å ta tablettene mine før du går?»",
    options: [
      {
        id: "a",
        text: "Jeg minner personen på det, siden jeg ikke fysisk gir medisinen.",
        quality: "wrong",
        feedback:
          "Dette høres mindre alvorlig ut enn å gi medisiner, men også en påminnelse kan gjøre deg til en del av medisinoppfølgingen. Hvis medisinen tas feil, tas dobbelt, glemmes eller ikke skulle vært tatt akkurat da, kan ansvaret bli uklart. Medisiner og medisinrutiner ligger utenfor frivilligrollen.",
      },
      {
        id: "b",
        text: "Jeg sier: «Det kan jeg ikke ta ansvar for som frivillig. Hvis dette er noe du trenger hjelp til, må jeg gi beskjed til lederen min.»",
        quality: "best",
        feedback:
          "Dette er riktig. Du setter en tydelig grense og kobler behovet videre. Det betyr ikke at du ignorerer personen. Medisinansvar skal ligge hos riktig instans, og som frivillig kan du melde fra om behovet på en ryddig måte.",
      },
      {
        id: "c",
        text: "Jeg sier at personen må huske dette selv, og skifter tema.",
        quality: "risky",
        feedback:
          "Du skal ikke ta ansvar for medisinen, men svaret kan bli for avvisende. Et bedre svar er å forklare grensen rolig og gi beskjed til leder hvis personen faktisk trenger hjelp med medisinrutiner.",
      },
    ],
  },
  {
    id: "bekymring-etter-nestenfall",
    title: "Bekymring etter nestenfall",
    situation:
      "Du legger merke til at en deltaker virker mer forvirret enn vanlig og nesten faller på vei ut.",
    options: [
      {
        id: "a",
        text: "Jeg observerer det, men sier ingenting. Jeg er jo ikke helsepersonell.",
        quality: "wrong",
        feedback:
          "Du har rett i at du ikke er helsepersonell, men det betyr ikke at du skal tie om det du ser. Som frivillig skal du ikke vurdere helsetilstand eller stille diagnose. Men du kan og bør melde konkrete observasjoner til leder. Å si fra er ikke å overta ansvar. Det er å sørge for at riktig person kan vurdere situasjonen videre.",
      },
      {
        id: "b",
        text: "Jeg sier til leder: «I dag virket hun mer forvirret enn vanlig, og hun holdt på å falle. Jeg vet ikke hva det betyr, men jeg synes det bør meldes videre.»",
        quality: "best",
        feedback:
          "Dette er svært god håndtering. Du beskriver det du faktisk har sett, uten å diagnostisere. Deretter kobler du på leder, som kan ta saken videre til helsetjenester eller kommunal tjeneste etter lokale rutiner. Husk at helsetjenestene har strenge regler om taushetsplikt. Det kan hende du ikke får vite hva som skjer videre. Det betyr ikke at meldingen din var uviktig. Det betyr at ansvaret nå ligger hos riktig instans.",
      },
      {
        id: "c",
        text: "Jeg spør brukeren om de har fått demens eller om de bør kontakte lege.",
        quality: "wrong",
        feedback:
          "Dette går for langt. Som frivillig skal du ikke foreslå diagnose eller gjøre helsevurderinger. Det kan oppleves krenkende og skape uro. Hold deg til konkrete observasjoner og meld dem til leder.",
      },
    ],
  },
  {
    id: "bilde-fra-aktivitet",
    title: "Bilde fra aktivitet",
    situation:
      "Du tar et hyggelig bilde fra en aktivitet og får lyst til å legge det ut på Facebook.",
    options: [
      {
        id: "a",
        text: "Jeg legger det ut siden alle smiler på bildet.",
        quality: "wrong",
        feedback:
          "Et smil er ikke det samme som samtykke. Bilder kan fortelle mer enn vi tror: hvem som deltar, hvor de er, hvilken aktivitet de er knyttet til, og hvem de er sammen med. Som frivillig skal du ikke publisere bilder fra frivilligoppdrag på egen hånd.",
      },
      {
        id: "b",
        text: "Jeg lar være å publisere og spør leder om hvilke rutiner som gjelder for bilder og samtykke.",
        quality: "best",
        feedback:
          "Dette er riktig. Synlighet er viktig, men personvern og verdighet kommer først. Hvis bildet skal brukes, må det skje etter organisasjonens rutiner og med tydelig samtykke. Du kan bidra til gode historier, men ikke på bekostning av trygghet og tillit.",
      },
      {
        id: "c",
        text: "Jeg legger ut bildet uten navn, siden det da ikke er privat.",
        quality: "wrong",
        feedback:
          "Selv uten navn kan personer gjenkjennes. Et bilde kan også avsløre sammenhenger personen ikke ønsker offentlig. Derfor må bilder avklares før publisering.",
      },
    ],
  },
  {
    id: "hemmelig-beskjed",
    title: "Hemmelig beskjed",
    situation:
      "En deltaker forteller noe alvorlig og sier: «Du må love å ikke si dette til noen.»",
    options: [
      {
        id: "a",
        text: "Jeg lover å holde det hemmelig for å bevare tilliten.",
        quality: "wrong",
        feedback:
          "Du skal ikke love absolutt hemmelighold når noe er alvorlig. Tillit betyr ikke at du skal bære alt alene. Hvis det handler om fare, vold, omsorgssvikt, selvmordstanker eller alvorlig bekymring, må leder kobles på. Du kan være varsom med hvem du deler med, men du kan ikke love stillhet uansett hva som kommer frem.",
      },
      {
        id: "b",
        text: "Jeg sier: «Takk for at du sier det. Jeg skal ikke dele dette med uvedkommende, men hvis det handler om fare eller alvorlig bekymring, må jeg ta det videre til lederen min.»",
        quality: "best",
        feedback:
          "Dette er et godt og ærlig svar. Du viser respekt for det personen forteller, men lover ikke mer enn du kan holde. Du gjør det tydelig at alvorlige bekymringer må bæres av riktig ansvarlig person, ikke av deg alene. Det beskytter både tilliten, personen og deg som frivillig.",
      },
      {
        id: "c",
        text: "Jeg avbryter og sier at jeg ikke vil høre private ting.",
        quality: "risky",
        feedback:
          "Det kan være riktig å sette grenser, men dette svaret kan bli for avvisende. Som frivillig kan du lytte rolig, samtidig som du er tydelig på at alvorlige ting må tas videre til leder.",
      },
    ],
  },
  {
    id: "skyss-hjem",
    title: "Skyss hjem",
    situation:
      "En deltaker spør om du kan kjøre dem hjem etter aktiviteten fordi bussen er tungvint.",
    options: [
      {
        id: "a",
        text: "Jeg kjører dem hjem siden jeg uansett skal samme vei.",
        quality: "risky",
        feedback:
          "Dette kan virke som en enkel og snill løsning, men transport må avklares. Skyss handler om ansvar, forsikring, sikkerhet og hva som skjer hvis noe går galt underveis. Frivillige skal ikke lage private transportavtaler uten at organisasjonen har tydelige rutiner for det.",
      },
      {
        id: "b",
        text: "Jeg sier: «Jeg kan ikke avtale skyss direkte, men jeg kan ta det opp med lederen min og høre hvilke rutiner som gjelder.»",
        quality: "best",
        feedback:
          "Dette er riktig håndtering. Du tar behovet på alvor uten å gjøre ansvaret privat. Hvis transport skal være en del av frivilligoppdraget, må det være avklart av leder og organisasjonen. Da blir både deltaker og frivillig bedre beskyttet.",
      },
      {
        id: "c",
        text: "Jeg sier at frivillige aldri kan hjelpe med transport.",
        quality: "risky",
        feedback:
          "Dette kan bli for kategorisk. Noen organisasjoner kan ha avklarte transportordninger. Poenget er at dette ikke skal avtales privat i øyeblikket. Det må avklares med leder.",
      },
    ],
  },
  {
    id: "privat-telefonnummer",
    title: "Privat telefonnummer",
    situation:
      "En bruker spør om å få ditt private telefonnummer, slik at de kan ringe deg direkte når de trenger noen å snakke med.",
    options: [
      {
        id: "a",
        text: "Jeg gir nummeret mitt fordi vi har fått god kontakt.",
        quality: "risky",
        feedback:
          "Dette kan gjøre rollen uklar. Privat telefonkontakt kan føre til forventninger om tilgjengelighet du ikke skal ha som frivillig. Det kan også gjøre det vanskelig for organisasjonen å følge opp relasjonen på en trygg måte. Gode relasjoner trenger gode rammer.",
      },
      {
        id: "b",
        text: "Jeg sier: «Jeg kan ikke gi ut privatnummeret mitt uten at det er avklart. La meg ta det med lederen min, så finner vi riktig kontaktmåte.»",
        quality: "best",
        feedback:
          "Dette er et godt svar. Du avviser ikke personen, men du beskytter rammen rundt relasjonen. Hvis det skal være kontakt utenom avtalt møte, bør det skje på en måte organisasjonen kjenner til og kan følge opp.",
      },
      {
        id: "c",
        text: "Jeg sier bare nei og forklarer ikke mer.",
        quality: "risky",
        feedback:
          "Det kan være riktig å ikke gi ut nummeret, men et kort nei kan oppleves avvisende. Et bedre svar er å forklare at dette handler om rammen for frivilligrollen, og at leder kan avklare riktig kontaktmåte.",
      },
    ],
  },
  {
    id: "beruset-deltaker",
    title: "Beruset deltaker",
    situation:
      "Du møter en deltaker til avtalt tur, men personen lukter alkohol, snakker uklart og virker ustø.",
    options: [
      {
        id: "a",
        text: "Jeg gjennomfører turen likevel, så personen ikke blir skuffet.",
        quality: "wrong",
        feedback:
          "Dette er ikke trygt. Når en person virker beruset, ustø eller uforutsigbar, må trygghet komme først. Det handler ikke om å moralisere. Det handler om risiko for fall, ubehagelige situasjoner eller at du blir stående alene med noe du ikke skal håndtere.",
      },
      {
        id: "b",
        text: "Jeg sier rolig at det ikke er lurt å gå tur nå, og at jeg må ta det videre med lederen min.",
        quality: "best",
        feedback:
          "Dette er riktig. Du setter trygghet først og lar være å presse gjennom aktiviteten. Samtidig kobler du på leder, slik at situasjonen kan vurderes videre etter organisasjonens rutiner. Du trenger ikke diskutere rus eller moral. Du trenger bare å handle trygt.",
      },
      {
        id: "c",
        text: "Jeg sier at personen må skjerpe seg før de kan være med på tur.",
        quality: "wrong",
        feedback:
          "Dette blir moraliserende og kan eskalere situasjonen. Som frivillig skal du ikke håndtere rusproblematikk med kritikk eller konfrontasjon. Du skal sette en rolig grense, avlyse eller utsette aktiviteten hvis det trengs, og varsle leder.",
      },
    ],
  },
];

