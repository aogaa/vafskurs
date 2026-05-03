export type RoleCompassZone = "contribute" | "clarify" | "others" | "stop";

export type RoleCompassCard = {
  id: string;
  title: string;
  situation: string;
  correctZone: RoleCompassZone;
  alignedIntro: string;
  misalignedIntro: string;
  feedback: string[];
};

export const roleCompassZones: Array<{
  id: RoleCompassZone;
  title: string;
  shortTitle: string;
  description: string;
  marker: string;
}> = [
  {
    id: "contribute",
    title: "Jeg kan bidra",
    shortTitle: "Bidra",
    description: "Avtalte, trygge oppgaver der frivilligrollen gir verdi.",
    marker: "✓",
  },
  {
    id: "clarify",
    title: "Jeg må avklare",
    shortTitle: "Avklar",
    description: "Situasjoner der rammen, risikoen eller ansvaret er uklart.",
    marker: "?",
  },
  {
    id: "others",
    title: "Dette er andres ansvar",
    shortTitle: "Andres ansvar",
    description:
      "Oppgaver som ligger hos ansatte, kommune, helsepersonell eller pårørende.",
    marker: "→",
  },
  {
    id: "stop",
    title: "Jeg skal stoppe",
    shortTitle: "Stopp",
    description: "Situasjoner med høy risiko, økonomi, hemmelighold eller klart rollebrudd.",
    marker: "!",
  },
];

export const moduleTwoCards: RoleCompassCard[] = [
  {
    id: "kaffe-og-samtale",
    title: "Kaffe og samtale",
    situation:
      "Du tar en kaffe og snakker med en deltaker som virker litt alene.",
    correctZone: "contribute",
    alignedIntro: "Ja. Dette er en god og viktig frivilligoppgave.",
    misalignedIntro:
      "Her kan kompasset få deg tilbake til det enkle og viktige: dette er nettopp en oppgave frivillige kan bidra med.",
    feedback: [
      "En kaffe og en samtale kan se enkelt ut, men det er ofte nettopp slike øyeblikk som gjør frivilligheten verdifull. Du møter personen uten journal, vedtak eller skjema. Du sitter ikke der for å kartlegge, behandle eller vurdere. Du sitter der som et medmenneske.",
      "For noen kan en slik samtale være ukens viktigste stund. Ikke fordi du løser alt, men fordi du er til stede. Du gir tid, oppmerksomhet og en følelse av å bli sett.",
      "Det er frivillighet på sitt beste: nært, menneskelig og innenfor en trygg rolle.",
    ],
  },
  {
    id: "medisiner",
    title: "Medisiner",
    situation:
      "En deltaker spør om du kan gi medisiner fordi ansatte er opptatt.",
    correctZone: "others",
    alignedIntro: "Ja. Dette ligger utenfor frivilligrollen.",
    misalignedIntro:
      "Dette kan virke som en praktisk liten hjelp, men her er det en tydelig rollegrense.",
    feedback: [
      "Medisiner handler om helse, ansvar, riktig dosering, dokumentasjon og faglige rutiner. Det er ikke en oppgave frivillige skal overta, selv om situasjonen virker enkel eller noen sier at det «bare tar et øyeblikk».",
      "Her er det viktig å være tydelig uten å bli hard. Du kan gjerne si at du forstår behovet, men at dette må håndteres av ansatte eller helsepersonell.",
      "Som frivillig kan du hjelpe ved å si fra til leder eller ansvarlig ansatt om at personen ber om hjelp. Men du skal ikke gi medisiner, kontrollere medisiner eller ta ansvar for helsehjelp.",
      "Grensen finnes for å beskytte både den som trenger hjelp, de ansatte og deg som frivillig.",
    ],
  },
  {
    id: "veien-inn-i-fellesskapet",
    title: "Veien inn i fellesskapet",
    situation:
      "En person har lyst til å bli med på aktivitet, men tør ikke gå inn alene. Du følger dem inn og blir litt sammen med dem i starten.",
    correctZone: "contribute",
    alignedIntro: "Ja. Dette er en svært viktig frivilligoppgave.",
    misalignedIntro:
      "Hvis du ble usikker her, er det forståelig. Men dette er ikke å overta ansvar. Det er å bygge bro inn i fellesskap.",
    feedback: [
      "Mange trenger ikke bare informasjon om at en aktivitet finnes. De trenger en trygg vei inn. Det kan være krevende å komme alene inn i et rom der man ikke kjenner noen, særlig hvis man allerede føler seg utenfor.",
      "Som frivillig kan du senke terskelen. Du kan møte personen ved døren, gå sammen inn, introdusere dem rolig og bli litt til situasjonen kjennes tryggere.",
      "Dette er ikke å overta ansvar. Det er å bygge bro.",
      "Du gjør fellesskapet lettere å nærme seg, og det er en av frivillighetens viktigste styrker.",
    ],
  },
  {
    id: "tjenestebehov",
    title: "Tjenestebehov",
    situation:
      "En bruker spør deg om hvilke kommunale tjenester de har rett på, og om du kan vurdere hva de bør søke om.",
    correctZone: "others",
    alignedIntro: "Ja. Her er det viktig å skille mellom å hjelpe videre og å ta ansvar.",
    misalignedIntro:
      "Det er forståelig at du vil hjelpe når noen viser tillit. Men her kan rollen raskt bli for stor.",
    feedback: [
      "Det er fint at personen spør deg. Det betyr ofte at de har tillit til deg. Men å vurdere hvilke kommunale tjenester noen har rett på, er ikke en frivilligoppgave. Det krever kunnskap om regelverk, vurderinger, vedtak, dokumentasjon og ansvarslinjer.",
      "Hvis du begynner å gi råd om hva personen bør søke på, kan du fort bli oppfattet som en som har myndighet eller faglig ansvar. Det kan skape feil forventninger, misforståelser eller skuffelse senere.",
      "Som frivillig kan du gjøre noe annet som fortsatt er verdifullt: Du kan lytte, hjelpe personen å sortere hva de lurer på, og vise dem videre til riktig instans. Du kan også si fra til leder i organisasjonen dersom du blir bekymret eller ser at personen trenger hjelp til å finne frem.",
      "Du skal ikke gjøre deg selv til saksbehandler. Du skal være en trygg bro videre.",
    ],
  },
  {
    id: "en-tung-samtale",
    title: "En tung samtale",
    situation:
      "En deltaker blir lei seg og forteller at hverdagen føles tung.",
    correctZone: "contribute",
    alignedIntro: "Ja. Å lytte kan være en viktig del av frivilligrollen.",
    misalignedIntro:
      "Vanskelige følelser kan gjøre oss usikre. Men du trenger ikke trekke deg unna bare fordi noen blir lei seg.",
    feedback: [
      "Du trenger ikke bli redd bare fordi noen blir lei seg. Mange mennesker bærer på ensomhet, sorg, savn eller bekymringer, og noen ganger kommer det frem nettopp fordi du møter dem på en rolig og menneskelig måte.",
      "Det du kan gjøre, er å være til stede. Lytte. La personen få snakke ferdig. Ikke skynde deg å fikse, forklare eller løse alt.",
      "Samtidig er det viktig å vite hvor grensen går. Hvis samtalen handler om alvorlig fare, selvmordstanker, vold, omsorgssvikt, sterk psykisk belastning eller noe du blir urolig for, skal du ikke bære det alene. Da skal du ta det videre til leder i organisasjonen.",
      "Som frivillig kan du være et medmenneske. Du skal ikke bli behandler.",
    ],
  },
  {
    id: "lofte-om-daglige-besok",
    title: "Løfte om daglige besøk",
    situation:
      "En ensom bruker spør om du kan love å komme innom hver dag.",
    correctZone: "stop",
    alignedIntro: "Ja. Dette er utenfor frivilligrollen.",
    misalignedIntro:
      "Her er det lett å bli dratt lenger enn rollen egentlig tåler. Nettopp derfor er det viktig å stoppe opp.",
    feedback: [
      "Det kan kjennes brutalt å si nei når et ensomt menneske ber om mer kontakt. Nettopp derfor er dette en situasjon der frivillige kan komme til å love for mye. Man vil være snill. Man vil ikke skuffe. Man vil hjelpe.",
      "Men et løfte om daglige besøk er ikke en liten hyggelig avtale. Det skaper forventning, avhengighet og ansvar. Hvis du ikke klarer å holde løftet, kan det oppleves som et nytt svik for personen. Og hvis du prøver å holde det, kan du ende opp med et ansvar du aldri skulle hatt.",
      "Her skal du ikke stå alene i grensesettingen. Det er leder i organisasjonen som skal hjelpe deg å holde rammen. Du kan møte ønsket med varme, men du skal ikke inngå en privat avtale om daglige besøk.",
      "En trygg formulering kan være:",
      "«Jeg skjønner godt at du ønsker mer besøk. Jeg kan ikke love å komme hver dag, men jeg tar dette videre med lederen min, så vi kan se hva som er riktig måte å følge det opp på.»",
      "Dette handler ikke om å være avvisende. Det handler om å ta både personen og frivilligrollen på alvor.",
    ],
  },
  {
    id: "bekymring",
    title: "Bekymring",
    situation:
      "Du legger merke til at en deltaker virker mer forvirret enn vanlig og nesten faller på vei ut.",
    correctZone: "clarify",
    alignedIntro: "Ja. Dette er en situasjon der du både kan og bør melde fra.",
    misalignedIntro:
      "Her skal du ikke løse helsesituasjonen selv, men du skal heller ikke late som du ikke har sett det.",
    feedback: [
      "Som frivillig skal du ikke vurdere helsetilstand, stille diagnose eller avgjøre hvilke tjenester personen trenger. Men du kan legge merke til konkrete endringer: at personen virker mer forvirret enn vanlig, nesten faller, virker ustø, ikke finner frem, eller oppfører seg annerledes enn du er vant til.",
      "Det viktigste er å beskrive det du faktisk har sett, ikke tolke for langt.",
      "Du kan si til leder i organisasjonen:",
      "«I dag la jeg merke til at hun virket mer forvirret enn vanlig, og hun holdt på å falle på vei ut. Jeg vet ikke hva det betyr, men jeg synes det bør meldes videre.»",
      "Deretter er det leder i organisasjonen som tar saken videre til riktig instans, for eksempel helsetjenestene eller kommunal tjeneste, etter lokale rutiner.",
      "Det er også viktig å vite at helsetjenestene har strenge regler om taushetsplikt. De kan ofte ikke gi deg tilbakemelding om hva som skjer videre, selv om du var den som meldte bekymringen. Det betyr ikke at meldingen din var uviktig. Det betyr bare at ansvaret nå ligger hos dem som har riktig rolle.",
      "Som frivillig og medmenneske kan du se noe viktig. Du skal ikke løse det alene, men du skal heller ikke late som du ikke har sett det.",
    ],
  },
  {
    id: "bankkort-og-pin-kode",
    title: "Bankkort og PIN-kode",
    situation:
      "En bruker ber deg ta med bankkortet deres og handle. PIN-koden ligger på en lapp.",
    correctZone: "stop",
    alignedIntro: "Ja. Her skal du stoppe.",
    misalignedIntro:
      "Dette kan se ut som praktisk hjelp, men konsekvensene kan bli større enn de ser ut som.",
    feedback: [
      "Bankkort, kontanter, PIN-koder og privat økonomi er et område der frivillige må være svært forsiktige. Regelen finnes ikke fordi man mistenker frivillige for å ville gjøre noe galt. Den finnes for å beskytte deg som frivillig, og for å beskytte personen som trenger hjelp.",
      "Hvis du tar med bankkort og PIN-kode, kan det i etterkant oppstå spørsmål om hva som ble kjøpt, hvor mye penger som ble brukt, om noe mangler, eller om personen egentlig forstod hva de samtykket til. Selv om du har gjort alt riktig, kan du bli stående i en vanskelig situasjon.",
      "Derfor skal slike oppgaver aldri løses som en privat avtale mellom frivillig og bruker.",
      "Hvis organisasjonen skal hjelpe med handling eller lignende, må leder for frivilligsentralen eller leder i organisasjonen avklare dette tydelig med personen det gjelder. Det må gjøres på en måte som viser hvem som har ansvar, hvilke rammer som gjelder, og hvordan både brukeren og den frivillige beskyttes.",
      "En trygg formulering kan være:",
      "«Jeg kan ikke ta med bankkort eller PIN-kode. Det er for å beskytte både deg og meg. Hvis du trenger hjelp til handling, må jeg ta det videre med lederen min, så det kan avklares på riktig måte.»",
      "Dette er ikke lite hjelpsomt. Dette er ansvarlig frivillighet.",
    ],
  },
  {
    id: "riktig-vei-videre",
    title: "Riktig vei videre",
    situation:
      "En deltaker vet ikke hvem de skal kontakte om et praktisk problem. Du hjelper dem å finne riktig kontaktperson eller riktig sted å henvende seg.",
    correctZone: "contribute",
    alignedIntro: "Ja. Dette er en god frivilligoppgave.",
    misalignedIntro:
      "Du trenger ikke overta saken for å være til hjelp. Her er frivilligbidraget å gjøre veien videre tydeligere.",
    feedback: [
      "Du trenger ikke løse saken selv for å være til stor hjelp. Mange blir stående fast fordi de ikke vet hvor de skal begynne, hvem de skal spørre, eller hva neste steg er.",
      "Som frivillig kan du bidra til å gjøre veien videre litt tydeligere. Du kan hjelpe personen å finne telefonnummer, åpningstid, nettside, skranke, frivillig tilbud eller riktig ansvarlig instans.",
      "Det viktige er at du ikke overtar saken. Du blir ikke saksbehandler, rådgiver eller garantist for utfallet. Du hjelper personen videre til noen som har riktig rolle.",
      "Noen ganger er nettopp dette nok: å gjøre neste steg mindre uoversiktlig.",
    ],
  },
  {
    id: "familiekonflikt",
    title: "Familiekonflikt",
    situation:
      "En bruker ber deg ta parti i en konflikt med familien og snakke med datteren på deres vegne.",
    correctZone: "stop",
    alignedIntro: "Ja. Her skal du ikke gå inn som part.",
    misalignedIntro:
      "Dette er en situasjon der frivillige ofte kan føle press. Da er lederens rolle å hjelpe deg å holde grensen.",
    feedback: [
      "Familiekonflikter kan være svært kompliserte. Du får kanskje bare høre én side av saken, og det kan ligge mye historie, sårhet, misforståelser og ansvar i bakgrunnen som du ikke kjenner til.",
      "Som frivillig kan du lytte til at personen har det vanskelig. Du kan anerkjenne følelsene deres. Men du skal ikke bli mekler, dommer, budbringer eller familiens konfliktløser.",
      "Hvis du begynner å snakke med datteren på vegne av brukeren, kan rollen din raskt bli uklar. Du kan bli trukket inn i en konflikt du ikke har ansvar for og ikke har forutsetninger for å løse.",
      "En trygg formulering kan være:",
      "«Jeg hører at dette er vondt for deg. Jeg kan ikke gå inn i konflikten eller snakke med familien på dine vegne, men jeg kan ta det opp med lederen min hvis du trenger hjelp til å finne riktig støtte.»",
      "Det er omsorg å lytte. Det er også omsorg å ikke ta på seg ansvar som ikke tilhører frivilligrollen.",
    ],
  },
];
