import { useState, type ReactNode } from "react";
import type { CourseModule } from "../../data/courseModules";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

const SCENARIO_STORAGE_KEY = "trygg-som-frivillig:del-3-kompass-svar";
const PHRASES_STORAGE_KEY = "trygg-som-frivillig:del-3-sprak-svar";
const OBSERVATION_STORAGE_KEY = "trygg-som-frivillig:del-3-observasjon-sett";
const MASTERY_STORAGE_KEY = "trygg-som-frivillig:del-3-mestring-svar";

type CompassAction = "green" | "yellow" | "red";

type CompassDirection = {
  id: CompassAction;
  title: string;
  shortLabel: string;
  explanation: string;
  examples: string[];
  action: string;
  classes: string;
  marker: string;
};

type CompassScenario = {
  id: string;
  situation: string;
  correctAction: CompassAction;
  feedback: string;
};

type PhraseTask = {
  id: string;
  situation: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  feedback: string;
};

type ObservationPair = {
  id: string;
  weaker: string;
  better: string;
};

type MasteryTask = {
  id: string;
  situation: string;
  correctAction: CompassAction;
};

type ModuleThreeProps = {
  courseModule: CourseModule;
  isComplete: boolean;
  onComplete: () => void;
};

const compassDirections: CompassDirection[] = [
  {
    id: "green",
    title: "Grønt: Fortsett innenfor rollen",
    shortLabel: "Fortsett innenfor rollen",
    explanation: "Bruk når situasjonen er trygg og innenfor det som er avtalt.",
    examples: [
      "samtale",
      "lytte",
      "delta i avtalt aktivitet",
      "være til stede",
      "stille rolige spørsmål",
    ],
    action: "Fortsett innenfor avtalen.",
    classes: "border-pine/45 bg-pine/14 text-harbor",
    marker: "A",
  },
  {
    id: "yellow",
    title: "Gult: Stopp og avklar",
    shortLabel: "Stopp og avklar med leder/kontaktperson",
    explanation:
      "Bruk når noe er uklart, bekymringsfullt, ubehagelig eller utenfor det som er avtalt.",
    examples: [
      "noen ber deg holde noe hemmelig",
      "du får en dårlig magefølelse",
      "pårørende presser på",
      "du blir bedt om å gjøre mer enn avtalt",
      "noen ber deg håndtere penger, transport, helsehjelp eller privat kontakt",
    ],
    action: "Kontakt leder eller kontaktperson.",
    classes: "border-honey/70 bg-honey/18 text-harbor",
    marker: "B",
  },
  {
    id: "red",
    title: "Rødt: Akutt fare",
    shortLabel: "Bruk nødnummer",
    explanation: "Bruk når situasjonen ikke kan vente.",
    examples: [
      "akutt sykdom",
      "alvorlig skade",
      "brann",
      "vold eller trusler som skjer nå",
      "umiddelbar fare for liv, helse eller sikkerhet",
    ],
    action: "Bruk nødnummer: 110, 112 eller 113.",
    classes: "border-red-300 bg-red-50 text-red-950",
    marker: "C",
  },
];

const compassScenarios: CompassScenario[] = [
  {
    id: "ikke-spist",
    situation: "Brukeren sier: «Jeg har ikke spist i dag, men det går sikkert bra.»",
    correctAction: "yellow",
    feedback:
      "Dette trenger ikke være akutt, men det er en bekymring du ikke skal bære alene. Beskriv konkret hva brukeren sa, og ta det opp med lederen eller kontaktpersonen din.",
  },
  {
    id: "ligger-pa-gulvet",
    situation:
      "Du kommer til avtalt besøk, og brukeren ligger på gulvet og svarer ikke når du snakker til henne.",
    correctAction: "red",
    feedback:
      "Dette kan være akutt fare for liv og helse. Ring 113. Kontakt leder eller kontaktperson etterpå, når situasjonen er håndtert.",
  },
  {
    id: "daglige-besok",
    situation:
      "Pårørende sier: «Kan du ikke bare stikke innom mamma hver dag? Hun trenger deg.»",
    correctAction: "yellow",
    feedback:
      "Du kan møte pårørende med respekt, men du skal ikke utvide oppdraget på egen hånd. Si at rollen din er avgrenset, og ta bekymringen videre til kontaktpersonen din.",
  },
  {
    id: "bankkort",
    situation:
      "Brukeren ber deg om å hjelpe med bankkort og PIN-kode fordi det bare skal kjøpes noen få varer.",
    correctAction: "yellow",
    feedback:
      "Penger, bankkort og PIN-koder er et risikoområde. Ikke håndter dette på egen hånd. Avklar med lederen eller kontaktpersonen din.",
  },
  {
    id: "gamle-minner",
    situation:
      "Du og brukeren sitter og snakker rolig. Brukeren forteller om gamle minner og spør om du vil høre mer.",
    correctAction: "green",
    feedback:
      "Dette er en vanlig og verdifull del av frivilligrollen. Du kan lytte, stille rolige spørsmål og være til stede, så lenge samtalen kjennes trygg og innenfor oppdraget.",
  },
  {
    id: "hemmelig-sint-sonn",
    situation:
      "Brukeren sier: «Du må ikke si dette til noen, men sønnen min blir veldig sint når han kommer.»",
    correctAction: "yellow",
    feedback:
      "Dette skal du ikke bære alene. Du skal ikke love absolutt hemmelighold. Si at du ikke deler med uvedkommende, men at du må kunne snakke med lederen din hvis du blir bekymret.",
  },
  {
    id: "toalett",
    situation:
      "En ansatt sier: «Kan du bare hjelpe ham på toalettet før dere går ned til aktiviteten?»",
    correctAction: "yellow",
    feedback:
      "Personlig stell og intim hjelp ligger vanligvis utenfor frivilligrollen. Du kan si at du ikke kan gjøre dette som frivillig, men at du kan hente en ansatt eller gi beskjed videre.",
  },
  {
    id: "brann",
    situation: "Det begynner å brenne i en søppelkasse i gangen der aktiviteten foregår.",
    correctAction: "red",
    feedback:
      "Ved brann eller akutt fare skal du bruke nødnummer. Ring 110, og følg lokale sikkerhetsrutiner hvis de er kjent og det er trygt.",
  },
];

const phraseTasks: PhraseTask[] = [
  {
    id: "helgebesok",
    situation:
      "Brukeren sier: «Kan du ikke bare komme innom meg i helgen også? Vi trenger ikke si det til noen.»",
    correctOptionId: "c",
    options: [
      { id: "a", text: "Ja, det går sikkert fint." },
      { id: "b", text: "Nei, det kan jeg ikke. Det må du ikke spørre om." },
      {
        id: "c",
        text: "Jeg setter pris på at du spør, men jeg må holde meg til rammen for oppdraget mitt. Hvis du ønsker mer kontakt, kan jeg ta det opp med kontaktpersonen min.",
      },
    ],
    feedback:
      "Dette svaret er både varmt og tydelig. Du avviser ikke personen, men du holder rollen din klar.",
  },
  {
    id: "parorende-info",
    situation: "Pårørende sier: «Du må fortelle meg hva mamma sier når dere er sammen.»",
    correctOptionId: "b",
    options: [
      { id: "a", text: "Selvfølgelig, jeg kan sende deg en melding etter hvert besøk." },
      {
        id: "b",
        text: "Jeg kan ikke dele private opplysninger uten at dette er avklart. Ta gjerne kontakt med organisasjonen, så finner vi riktig måte å håndtere det på.",
      },
      { id: "c", text: "Det har du ikke noe med." },
    ],
    feedback:
      "Dette svaret beskytter brukerens fortrolighet og flytter avklaringen til riktig kanal.",
  },
  {
    id: "love-hemmelig",
    situation: "Brukeren sier: «Du må love å ikke si dette til noen.»",
    correctOptionId: "b",
    options: [
      { id: "a", text: "Jeg lover. Jeg skal aldri si noe." },
      {
        id: "b",
        text: "Jeg skal ikke dele dette med uvedkommende. Men hvis jeg blir bekymret for deg eller for noen andre, må jeg kunne snakke med lederen min for å finne ut hva som er riktig å gjøre.",
      },
      { id: "c", text: "Da vil jeg helst ikke høre det." },
    ],
    feedback:
      "Du lover ikke mer hemmelighold enn du kan holde. Samtidig viser du respekt og ro.",
  },
  {
    id: "ansatt-uklar",
    situation:
      "En ansatt ber deg gjøre noe du er usikker på om ligger innenfor frivilligrollen.",
    correctOptionId: "a",
    options: [
      { id: "a", text: "Det må jeg avklare med min kontaktperson først." },
      { id: "b", text: "Greit, hvis du sier det, så gjør jeg det." },
      { id: "c", text: "Dette er helt uakseptabelt av deg å spørre om." },
    ],
    feedback:
      "Kort og tydelig er ofte best. Du lager ikke konflikt, men du tar rollen din på alvor.",
  },
];

const observationPairs: ObservationPair[] = [
  {
    id: "deprimert",
    weaker: "Hun er deprimert.",
    better: "Hun sa at hun ikke orker mer, og jeg ble bekymret.",
  },
  {
    id: "hjemme",
    weaker: "Han klarer seg ikke hjemme.",
    better: "Han holdt på å falle to ganger og virket ustø.",
  },
  {
    id: "parorende",
    weaker: "Pårørende er kontrollerende.",
    better: "Pårørende avbrøt brukeren flere ganger og svarte på hennes vegne.",
  },
  {
    id: "hjelp",
    weaker: "Hun får ikke nok hjelp.",
    better: "Hun sa at hun ikke hadde spist i dag, og kjøleskapet virket nesten tomt.",
  },
  {
    id: "aggressiv",
    weaker: "Han er aggressiv.",
    better:
      "Han hevet stemmen, stilte seg veldig nær meg, og jeg opplevde situasjonen som ubehagelig.",
  },
];

const masteryTasks: MasteryTask[] = [
  {
    id: "royk-flammer",
    situation: "Du ser røyk og flammer i lokalet.",
    correctAction: "red",
  },
  {
    id: "bekymret-ikke-akutt",
    situation:
      "Brukeren sier noe som gjør deg bekymret, men det er ikke akutt fare akkurat nå.",
    correctAction: "yellow",
  },
  {
    id: "ferieminner",
    situation: "Brukeren vil fortelle deg om gamle ferieminner og virker glad for å prate.",
    correctAction: "green",
  },
];

function getDirection(action: CompassAction) {
  return compassDirections.find((direction) => direction.id === action)!;
}

function isCompassAction(value: string): value is CompassAction {
  return value === "green" || value === "yellow" || value === "red";
}

function readSavedRecord<T extends string>(
  key: string,
  validIds: string[],
  isValidValue: (value: string) => value is T,
): Partial<Record<string, T>> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const value = window.localStorage.getItem(key);
    const parsed = value ? JSON.parse(value) : {};
    const next: Partial<Record<string, T>> = {};

    for (const id of validIds) {
      const answer = parsed[id];
      if (typeof answer === "string" && isValidValue(answer)) {
        next[id] = answer;
      }
    }

    return next;
  } catch {
    return {};
  }
}

function saveRecord<T extends string>(key: string, value: Partial<Record<string, T>>) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

function readSeenObservationIds() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const value = window.localStorage.getItem(OBSERVATION_STORAGE_KEY);
    const parsed = value ? JSON.parse(value) : [];

    return Array.isArray(parsed)
      ? parsed.filter(
          (id): id is string =>
            typeof id === "string" && observationPairs.some((pair) => pair.id === id),
        )
      : [];
  } catch {
    return [];
  }
}

function saveSeenObservationIds(value: string[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(OBSERVATION_STORAGE_KEY, JSON.stringify(value));
}

function Section({ children, title }: { children: ReactNode; title: string }) {
  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-extrabold leading-tight text-ink md:text-3xl">
        {title}
      </h2>
      <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-slate md:text-lg">
        {children}
      </div>
    </Card>
  );
}

function ChoiceButton({
  children,
  isBest,
  isSelected,
  onClick,
}: {
  children: ReactNode;
  isBest: boolean;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={onClick}
      className={`min-h-20 rounded-2xl border p-4 text-left text-base font-bold leading-7 transition duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine ${
        isSelected && isBest
          ? "border-pine bg-pine/20 text-harbor ring-2 ring-pine/45"
          : isSelected
            ? "border-honey/70 bg-honey/18 text-harbor ring-2 ring-honey/30"
            : "border-harbor/10 bg-white text-ink hover:-translate-y-0.5 hover:border-pine/55 hover:shadow-lift"
      }`}
    >
      {children}
    </button>
  );
}

export function ModuleThree({ courseModule, isComplete, onComplete }: ModuleThreeProps) {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [scenarioAnswers, setScenarioAnswers] = useState<
    Partial<Record<string, CompassAction>>
  >(() =>
    readSavedRecord(
      SCENARIO_STORAGE_KEY,
      compassScenarios.map((scenario) => scenario.id),
      isCompassAction,
    ),
  );
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [phraseAnswers, setPhraseAnswers] = useState<Partial<Record<string, string>>>(() =>
    readSavedRecord(
      PHRASES_STORAGE_KEY,
      phraseTasks.map((task) => task.id),
      (value): value is string => value === "a" || value === "b" || value === "c",
    ),
  );
  const [seenObservationIds, setSeenObservationIds] = useState<string[]>(
    readSeenObservationIds,
  );
  const [masteryAnswers, setMasteryAnswers] = useState<
    Partial<Record<string, CompassAction>>
  >(() =>
    readSavedRecord(
      MASTERY_STORAGE_KEY,
      masteryTasks.map((task) => task.id),
      isCompassAction,
    ),
  );

  const currentScenario = compassScenarios[currentScenarioIndex];
  const selectedScenarioAction = scenarioAnswers[currentScenario.id];
  const completedScenarioCount = compassScenarios.filter(
    (scenario) => scenarioAnswers[scenario.id],
  ).length;
  const scenariosComplete = completedScenarioCount === compassScenarios.length;

  const currentPhraseTask = phraseTasks[currentPhraseIndex];
  const selectedPhraseOption = phraseAnswers[currentPhraseTask.id];
  const completedPhraseCount = phraseTasks.filter((task) => phraseAnswers[task.id]).length;
  const phrasesComplete = completedPhraseCount === phraseTasks.length;

  const observationComplete = seenObservationIds.length === observationPairs.length;
  const masteryComplete = masteryTasks.every((task) => masteryAnswers[task.id]);
  const canComplete = scenariosComplete && phrasesComplete && observationComplete && masteryComplete;

  function answerScenario(action: CompassAction) {
    setScenarioAnswers((current) => {
      const next = { ...current, [currentScenario.id]: action };
      saveRecord(SCENARIO_STORAGE_KEY, next);
      return next;
    });
  }

  function answerPhrase(optionId: string) {
    setPhraseAnswers((current) => {
      const next = { ...current, [currentPhraseTask.id]: optionId };
      saveRecord(PHRASES_STORAGE_KEY, next);
      return next;
    });
  }

  function markObservationSeen(pairId: string) {
    setSeenObservationIds((current) => {
      if (current.includes(pairId)) {
        return current;
      }

      const next = [...current, pairId];
      saveSeenObservationIds(next);
      return next;
    });
  }

  function answerMastery(taskId: string, action: CompassAction) {
    setMasteryAnswers((current) => {
      const next = { ...current, [taskId]: action };
      saveRecord(MASTERY_STORAGE_KEY, next);
      return next;
    });
  }

  return (
    <article className="space-y-8">
      <section className="rounded-3xl bg-harbor px-6 py-9 shadow-soft md:px-8 md:py-10">
        <p className="text-sm font-bold uppercase tracking-normal text-white">
          Del {courseModule.order} &middot; Trygg som frivillig
        </p>
        <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
          Når noe blir uklart - stopp og avklar
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white">
          Du skal ikke løse alt alene. Ved akutt fare bruker du nødnummer. Når
          det ikke er akutt, men du er bekymret, usikker eller opplever noe som
          ikke kjennes riktig, kontakter du lederen eller kontaktpersonen din.
        </p>
      </section>

      <Section title="Det er normalt å bli usikker">
        <p>
          Som frivillig vil du møte mennesker i ulike situasjoner. De fleste
          møtene er enkle, gode og trygge. Du møter opp, gjør det som er avtalt,
          lytter, bidrar og er et medmenneske.
        </p>
        <p>
          Men noen ganger kan det oppstå situasjoner der du blir usikker. Kanskje
          noen ber deg om noe som ikke var avtalt. Kanskje en bruker forteller
          deg noe alvorlig. Kanskje du opplever press. Kanskje du ser noe som
          gjør deg bekymret. Eller kanskje du bare får en dårlig magefølelse.
        </p>
        <p className="flex min-h-24 items-center justify-center rounded-2xl bg-mist p-5 text-center text-xl font-bold leading-9 text-harbor [text-wrap:balance]">
          Du skal ikke løse alt alene.
        </p>
        <p>
          Å være en god frivillig betyr ikke at du alltid vet svaret der og da.
          Det betyr at du forstår rollen din, kjenner grensene dine og ber om
          hjelp når noe blir uklart.
        </p>
        <p>
          Denne delen handler ikke om å gjøre deg redd for å være frivillig. Den
          handler om det motsatte: Når du vet hva du skal gjøre når noe blir
          uklart, blir det tryggere å være varm, nær og menneskelig.
        </p>
        <p>
          Du har en rolle. Du har en leder eller kontaktperson. Du har noen å
          spørre. Og hvis noe er akutt, finnes det nødnummer.
        </p>
      </Section>

      <Section title="Hovedregelen: Stopp, tenk og avklar">
        <p>
          Når noe blir uklart, er hovedregelen enkel: Stopp, tenk og avklar. Det
          betyr ikke at du skal bli passiv. Det betyr at du skal unngå å handle
          for raskt på noe som kan få større konsekvenser enn du ser der og da.
        </p>
        <p>Å stoppe opp kan være det mest ansvarlige du gjør.</p>
        <ul className="grid gap-3 md:grid-cols-2">
          {[
            "Er dette innenfor rollen min?",
            "Er dette noe jeg har avtalt å gjøre?",
            "Er dette trygt for brukeren?",
            "Er dette trygt for meg?",
            "Kan dette skape forventninger jeg ikke kan følge opp?",
            "Er dette noe lederen eller kontaktpersonen min bør vite om?",
            "Er dette akutt?",
          ].map((item) => (
            <li
              key={item}
              className="flex min-h-24 items-center justify-center rounded-2xl bg-mist p-4 text-center text-base font-bold leading-7 text-harbor [text-wrap:balance]"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Ved akutt fare bruker du nødnummer">
        <p>
          Noen situasjoner kan ikke vente. Hvis det er akutt fare for liv, helse
          eller sikkerhet, skal du kontakte nødnummer.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Brann", "110"],
            ["Politi", "112"],
            ["Ambulanse", "113"],
          ].map(([label, number]) => (
            <div
              key={number}
              className="rounded-2xl border border-red-300 bg-red-50 p-5 text-center text-red-950"
            >
              <p className="text-base font-bold">{label}</p>
              <p className="mt-2 text-4xl font-extrabold">{number}</p>
            </div>
          ))}
        </div>
        <p>
          Dette kan gjelde hvis noen er alvorlig skadet, plutselig blir akutt
          syke, er i umiddelbar fare, blir utsatt for vold eller trusler, eller
          situasjonen på annen måte er så alvorlig at hjelp må komme raskt.
        </p>
        <p className="font-bold text-harbor">
          Etterpå kontakter du lederen eller kontaktpersonen din så snart du kan.
        </p>
      </Section>

      <Section title="Når det ikke er akutt, kontakter du leder eller kontaktperson">
        <p>
          De fleste vanskelige situasjoner er ikke akutte. Det betyr ikke at de
          er uviktige. Det betyr bare at de ikke krever nødnummer der og da.
        </p>
        <p>
          Hvis du blir bekymret, urolig eller usikker, skal du kontakte lederen
          eller kontaktpersonen din i organisasjonen.
        </p>
        <ul className="grid gap-3 md:grid-cols-2">
          {[
            "Noen ber deg gjøre noe utenfor avtalen.",
            "Du får vite noe alvorlig.",
            "Du opplever press fra bruker eller pårørende.",
            "Du blir usikker på om en situasjon er trygg.",
            "Du ser tegn på at noen ikke har det bra.",
            "Noen ber deg holde noe hemmelig.",
            "Du opplever ubehag eller grenseoverskridende oppførsel.",
            "Du får en dårlig magefølelse.",
          ].map((item) => (
            <li
              key={item}
              className="flex min-h-24 items-center justify-center rounded-2xl bg-mist p-4 text-center text-base font-bold leading-7 text-harbor [text-wrap:balance]"
            >
              {item}
            </li>
          ))}
        </ul>
        <p>
          Du skal ikke måtte vurdere slike situasjoner alene. Lederen eller
          kontaktpersonen din har ansvar for å hjelpe deg med å forstå hva som
          bør gjøres videre. Ditt ansvar er å si fra til riktig person.
        </p>
      </Section>

      <Section title="Taushetsløfte betyr ikke at du skal stå alene">
        <p>
          Som frivillig kan du ha skrevet under på et taushetsløfte eller en
          taushetserklæring. Det betyr at du skal behandle private opplysninger
          med respekt. Du skal ikke dele det du får vite med uvedkommende.
        </p>
        <p>
          Men taushetsløftet betyr ikke at du skal stå alene med vanskelige
          situasjoner.
        </p>
        <p className="flex min-h-28 items-center justify-center rounded-2xl bg-mist p-5 text-center font-bold text-harbor [text-wrap:balance]">
          Hvis du er bekymret, usikker eller har opplevd noe ubehagelig, skal du
          kunne snakke med lederen eller kontaktpersonen din. Det er ikke
          sladder. Det er trygg og ansvarlig frivillighet.
        </p>
        <p>
          Taushetsløftet skal beskytte den du møter. Det skal ikke hindre deg i
          å be om hjelp. Når du snakker med lederen din, skal informasjonen
          behandles fortrolig.
        </p>
      </Section>

      <Section title="Ikke lov mer hemmelighold enn du kan holde">
        <p>
          Noen ganger kan en bruker si: «Du må ikke si dette til noen.» Møt det
          med ro og respekt, men ikke lov absolutt hemmelighold.
        </p>
        <p className="flex min-h-28 items-center justify-center rounded-2xl bg-mist p-5 text-center font-bold text-harbor [text-wrap:balance]">
          Jeg skal ikke dele dette med uvedkommende. Men hvis jeg blir bekymret
          for deg eller for noen andre, må jeg kunne snakke med lederen min for å
          finne ut hva som er riktig å gjøre.
        </p>
        <p>
          Du beskytter tilliten, men du tar ikke på deg et ansvar du ikke skal
          bære alene.
        </p>
      </Section>

      <Section title="Forskjellen på å lytte og å overta ansvar">
        <p>
          Som frivillig kan du lytte. Du kan være til stede. Du kan vise omsorg.
          Du kan gi tid. Du kan være et rolig menneske i rommet.
        </p>
        <p>
          Men du overtar ansvar når du begynner å love løsninger du ikke kan stå
          inne for, når du blir den eneste som vet om en alvorlig bekymring, eller
          når du forsøker å håndtere helse, økonomi, familiekonflikter, psykiske
          kriser eller utrygge situasjoner alene.
        </p>
        <p className="font-bold text-harbor">
          Du kan være et medmenneske uten å bli behandler. Du kan bry deg uten å
          ta over livet til den andre.
        </p>
      </Section>

      <Section title="Dårlig magefølelse er nok til å spørre">
        <p>
          Du trenger ikke ha bevis for at noe er galt før du ber om råd. Noen
          ganger er det nok at noe skurrer.
        </p>
        <p>
          Du skal ikke konkludere, diagnostisere eller etterforske. Men du kan
          si fra til lederen din:
        </p>
        <p className="flex min-h-24 items-center justify-center rounded-2xl bg-mist p-5 text-center font-bold text-harbor [text-wrap:balance]">
          Jeg vet ikke om dette er noe, men jeg vil gjerne drøfte det med deg.
        </p>
      </Section>

      <Section title="Beskriv det du har sett og hørt">
        <p>
          Når du tar opp en bekymring, er det lurt å være konkret. Prøv å
          beskrive det du faktisk har sett, hørt eller opplevd.
        </p>
        <ul className="grid gap-3 md:grid-cols-2">
          {[
            "Hun sa at hun ikke hadde spist i dag.",
            "Han virket ustø og holdt seg fast i veggen flere ganger.",
            "Brukeren ba meg om å ikke fortelle dette til noen.",
            "Pårørende ba meg komme oftere enn det som er avtalt.",
            "Jeg opplevde kommentaren som ubehagelig.",
            "Jeg ble bedt om å håndtere penger.",
          ].map((item) => (
            <li
              key={item}
              className="flex min-h-24 items-center justify-center rounded-2xl bg-mist p-4 text-center text-base font-bold leading-7 text-harbor [text-wrap:balance]"
            >
              {item}
            </li>
          ))}
        </ul>
        <p>
          Unngå å gjøre deg for sikker på ting du ikke vet. Det er forskjell på
          å si «Hun er deprimert» og «Hun sa at hun ikke orker mer, og jeg ble
          bekymret». Det første er en vurdering. Det andre er en konkret
          beskrivelse.
        </p>
      </Section>

      <Section title="Når noen ber deg gjøre mer enn avtalt">
        <p>
          Mange frivillige får spørsmål om å gjøre litt mer. Det kan være helt
          uskyldig, men det kan også bli starten på en rolle som vokser seg for
          stor.
        </p>
        <p>
          Ordene «kan du ikke bare» kan høres små ut. Men oppgaven kan likevel
          være stor, for eksempel hvis noen ber deg håndtere bankkort, bli med
          til lege, komme innom utenfor avtalen, hjelpe på badet eller kjøre noen
          hjem.
        </p>
        <p className="flex min-h-28 items-center justify-center rounded-2xl bg-mist p-5 text-center font-bold text-harbor [text-wrap:balance]">
          Når du blir bedt om noe som ikke er avtalt, trenger du ikke svare ja
          med én gang. Du kan si: «Det må jeg avklare med kontaktpersonen min
          først.»
        </p>
      </Section>

      <Section title="Når pårørende presser på">
        <p>
          Pårørende kan være slitne, bekymret og redde. De kan ha stått i ansvar
          lenge. Derfor kan de noen ganger håpe at du som frivillig kan gjøre mer
          enn det som egentlig er avtalt.
        </p>
        <p>
          Du kan møte pårørende med respekt uten å overta ansvaret deres. Hvis
          noen ber deg komme oftere, kan du si at rollen din er avgrenset til det
          som er avtalt, men at du kan gi beskjed til kontaktpersonen din om at
          de er bekymret.
        </p>
        <p>
          Du skal ikke bli familiens mellomperson, konfliktløser eller ekstra
          omsorgstjeneste. Hvis noe blir uklart, tar du det med lederen din.
        </p>
      </Section>

      <Section title="Når ansatte eller andre ber deg om noe uklart">
        <p>
          Noen ganger kan også ansatte eller samarbeidspartnere be frivillige om
          oppgaver som ikke passer med frivilligrollen. Det betyr ikke
          nødvendigvis at de mener noe galt. Ansatte kan ha dårlig tid, være
          presset eller glemme at frivillige har en annen rolle.
        </p>
        <p>
          Likevel skal du ikke gjøre oppgaver som ligger utenfor rollen din bare
          fordi noen spør. Hvis du blir bedt om noe du er usikker på, kan du si:
          «Det må jeg avklare med min kontaktperson først.»
        </p>
        <p>
          Hvis noe tydelig ligger utenfor frivilligrollen, kan du si: «Det kan
          jeg ikke gjøre som frivillig, men jeg kan hente en ansatt eller gi
          beskjed videre.»
        </p>
      </Section>

      <Section title="Når du selv blir utrygg">
        <p>
          Din trygghet er også viktig. Som frivillig skal du ikke tåle alt. Du
          skal ikke stå i situasjoner der du føler deg truet, presset, krenket
          eller utrygg.
        </p>
        <p>
          Hvis noen kommer for nær, snakker til deg på en ubehagelig måte, gjør
          seksuelle kommentarer, blir truende, er ruspåvirket på en måte som gjør
          situasjonen utrygg, eller du av andre grunner kjenner at dette ikke er
          greit, har du lov til å sette grense.
        </p>
        <p className="flex min-h-24 items-center justify-center rounded-2xl bg-mist p-5 text-center font-bold text-harbor [text-wrap:balance]">
          Jeg opplever dette som ubehagelig. Hvis det fortsetter, må jeg avslutte
          besøket.
        </p>
        <p>
          Du kan også avslutte besøket eller trekke deg ut av situasjonen hvis
          det er nødvendig. Etterpå skal du kontakte lederen eller
          kontaktpersonen din.
        </p>
      </Section>

      <Section title="Du skal ikke være privat krisekontakt">
        <p>
          Noen frivillige opplever at brukeren ønsker mer privat kontakt. Det kan
          være fordi relasjonen er god. Det kan også være fordi brukeren er
          ensom, redd eller mangler andre rundt seg.
        </p>
        <p>
          Det kan bli vanskelig hvis du blir den personen brukeren kontakter når
          som helst, utenfor avtalen og uten at organisasjonen vet om det. Du
          skal ikke bli en skjult omsorgsperson. Du skal ikke bli den eneste som
          vet. Du skal ikke være tilgjengelig hele døgnet.
        </p>
        <p>
          Hvis brukeren ønsker mer kontakt, flere besøk eller privat kontakt, skal
          dette avklares med lederen eller kontaktpersonen din.
        </p>
      </Section>

      <Section title="Det er omsorg å sette grenser">
        <p>
          Mange forbinder omsorg med å si ja. Men noen ganger er det mest
          omsorgsfulle du kan gjøre å sette en tydelig grense.
        </p>
        <p>
          Grenser beskytter brukeren mot løfter som ikke kan holdes. De beskytter
          deg mot å bli overbelastet. De beskytter organisasjonen mot uklare
          avtaler. Og de gjør relasjonen mer ærlig.
        </p>
        <p className="font-bold text-harbor">
          Når du sier «Dette må jeg avklare» eller «Dette kan jeg ikke gjøre som
          frivillig», trekker du deg ikke unna. Du tar rollen din på alvor.
        </p>
      </Section>

      <Section title="En enkel huskeregel">
        <ul className="grid gap-3 md:grid-cols-2">
          {[
            "Stopp.",
            "Ikke lov noe du er usikker på.",
            "Ikke hold alvorlige bekymringer alene.",
            "Ikke gjør oppgaver utenfor rollen din.",
            "Avklar med leder eller kontaktperson.",
            "Bruk nødnummer ved akutt fare.",
          ].map((item) => (
            <li
              key={item}
              className="flex min-h-24 items-center justify-center rounded-2xl bg-mist p-4 text-center text-base font-bold leading-7 text-harbor [text-wrap:balance]"
            >
              {item}
            </li>
          ))}
        </ul>
        <p>
          Dette er nok. Du trenger ikke kunne alt. Du trenger ikke løse alt. Du
          trenger ikke stå alene.
        </p>
      </Section>

      <Section title="Til slutt: Du skal ikke stå alene">
        <p>
          Ved akutt fare bruker du nødnummer. Når det ikke er akutt, men du er
          bekymret, usikker eller opplever noe som ikke kjennes riktig, kontakter
          du lederen eller kontaktpersonen din.
        </p>
        <p>
          Du trenger ikke kunne alt. Du trenger ikke ha alle svarene. Du trenger
          ikke vite nøyaktig hva som skal skje videre. Det du trenger, er å vite
          når du skal stoppe opp og avklare.
        </p>
        <p className="flex min-h-24 items-center justify-center rounded-2xl bg-mist p-5 text-center font-bold text-harbor [text-wrap:balance]">
          Det gjør deg ikke mindre omsorgsfull. Det gjør deg tryggere som
          frivillig.
        </p>
      </Section>

      <Card className="p-6 md:p-8">
        <h2 className="text-2xl font-extrabold leading-tight text-ink md:text-3xl">
          Stopp og avklar-kompasset
        </h2>
        <p className="mt-5 max-w-4xl text-base leading-8 text-slate md:text-lg">
          Kompasset skal hjelpe deg med å velge riktig neste handling. Du trenger
          ikke kunne alt. Du skal vite om du kan fortsette, om du må avklare, eller
          om du må bruke nødnummer.
        </p>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {compassDirections.map((direction) => (
            <section
              key={direction.id}
              className={`rounded-3xl border p-5 ${direction.classes}`}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-extrabold">{direction.title}</h3>
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-2xl bg-white text-sm font-black text-harbor shadow-sm"
                  aria-hidden="true"
                >
                  {direction.marker}
                </span>
              </div>
              <p className="mt-4 text-base font-semibold leading-7">
                {direction.explanation}
              </p>
              <ul className="mt-4 space-y-2 text-sm font-semibold leading-6">
                {direction.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
              <p className="mt-5 rounded-2xl bg-white p-4 text-base font-extrabold text-harbor">
                {direction.action}
              </p>
            </section>
          ))}
        </div>
      </Card>

      <section className="space-y-5" aria-labelledby="compass-scenarios-title">
        <Card className="p-6 md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <h2
                id="compass-scenarios-title"
                className="text-2xl font-extrabold leading-tight text-ink md:text-3xl"
              >
                Hva gjør du nå?
              </h2>
              <p className="mt-4 text-base leading-8 text-slate md:text-lg">
                Velg riktig neste handling. Dette er praktisk trening, ikke en
                eksamen.
              </p>
            </div>
            <div className="rounded-3xl bg-mist p-5 text-harbor ring-1 ring-harbor/8">
              <p className="text-sm font-bold uppercase tracking-normal text-slate">
                Situasjon
              </p>
              <p className="mt-1 text-3xl font-extrabold" aria-live="polite">
                {currentScenarioIndex + 1} av {compassScenarios.length}
              </p>
              <p className="mt-2 text-sm font-semibold">
                {completedScenarioCount} vurdert
              </p>
            </div>
          </div>
          <div
            className="mt-6 h-3 overflow-hidden rounded-full bg-mist"
            role="progressbar"
            aria-label="Situasjoner vurdert"
            aria-valuemin={0}
            aria-valuemax={compassScenarios.length}
            aria-valuenow={completedScenarioCount}
          >
            <div
              className="h-full rounded-full bg-pine transition-all duration-500"
              style={{ width: `${(completedScenarioCount / compassScenarios.length) * 100}%` }}
            />
          </div>
        </Card>

        <Card className="overflow-hidden p-0">
          <div className="h-2 bg-pine" />
          <div className="p-6 md:p-8">
            <p className="flex min-h-32 items-center justify-center rounded-3xl bg-mist p-5 text-center text-xl font-semibold leading-9 text-ink [text-wrap:balance]">
              {currentScenario.situation}
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {compassDirections.map((direction) => {
                const selected = selectedScenarioAction === direction.id;
                const correct = currentScenario.correctAction === direction.id;

                return (
                  <ChoiceButton
                    key={direction.id}
                    isSelected={selected}
                    isBest={Boolean(selectedScenarioAction) && correct}
                    onClick={() => answerScenario(direction.id)}
                  >
                    {direction.shortLabel}
                  </ChoiceButton>
                );
              })}
            </div>
            {selectedScenarioAction ? (
              <section className="mt-6 rounded-3xl bg-mist p-5" aria-live="polite">
                <h3 className="text-xl font-bold text-harbor">
                  Her bør du velge: {getDirection(currentScenario.correctAction).shortLabel}
                </h3>
                <p className="mt-3 text-base leading-8 text-slate">
                  {currentScenario.feedback}
                </p>
              </section>
            ) : null}
          </div>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          {currentScenarioIndex > 0 ? (
            <Button
              onClick={() => setCurrentScenarioIndex((index) => Math.max(index - 1, 0))}
              variant="secondary"
            >
              Forrige situasjon
            </Button>
          ) : (
            <span aria-hidden="true" />
          )}
          {currentScenarioIndex < compassScenarios.length - 1 ? (
            <Button
              onClick={() =>
                setCurrentScenarioIndex((index) =>
                  Math.min(index + 1, compassScenarios.length - 1),
                )
              }
              disabled={!selectedScenarioAction}
            >
              Neste situasjon
            </Button>
          ) : null}
        </div>
      </section>

      {scenariosComplete ? (
        <section className="space-y-8" aria-live="polite">
          <section className="space-y-5" aria-labelledby="safe-phrases-title">
            <Card className="p-6 md:p-8">
              <h2
                id="safe-phrases-title"
                className="text-2xl font-extrabold text-ink md:text-3xl"
              >
                Trygge setninger
              </h2>
              <p className="mt-4 max-w-4xl text-base leading-8 text-slate md:text-lg">
                Tren på hva du kan si når rollen blir uklar. Velg svaret som er
                varmt, tydelig og innenfor rollen.
              </p>
            </Card>

            <Card className="p-6 md:p-8">
              <p className="flex min-h-32 items-center justify-center rounded-3xl bg-mist p-5 text-center text-xl font-semibold leading-9 text-ink [text-wrap:balance]">
                {currentPhraseTask.situation}
              </p>
              <div className="mt-6 grid gap-3">
                {currentPhraseTask.options.map((option) => {
                  const selected = phraseAnswers[currentPhraseTask.id] === option.id;
                  const correct = currentPhraseTask.correctOptionId === option.id;

                  return (
                    <ChoiceButton
                      key={option.id}
                      isSelected={selected}
                      isBest={Boolean(phraseAnswers[currentPhraseTask.id]) && correct}
                      onClick={() => answerPhrase(option.id)}
                    >
                      {option.text}
                    </ChoiceButton>
                  );
                })}
              </div>
              {phraseAnswers[currentPhraseTask.id] ? (
                <section className="mt-6 rounded-3xl bg-mist p-5" aria-live="polite">
                  <h3 className="text-xl font-bold text-harbor">
                    Beste svar: alternativ {currentPhraseTask.correctOptionId.toUpperCase()}
                  </h3>
                  <p className="mt-3 text-base leading-8 text-slate">
                    {currentPhraseTask.feedback}
                  </p>
                </section>
              ) : null}
            </Card>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              {currentPhraseIndex > 0 ? (
                <Button
                  onClick={() => setCurrentPhraseIndex((index) => Math.max(index - 1, 0))}
                  variant="secondary"
                >
                  Forrige setning
                </Button>
              ) : (
                <span aria-hidden="true" />
              )}
              {currentPhraseIndex < phraseTasks.length - 1 ? (
                <Button
                  onClick={() =>
                    setCurrentPhraseIndex((index) =>
                      Math.min(index + 1, phraseTasks.length - 1),
                    )
                  }
                  disabled={!phraseAnswers[currentPhraseTask.id]}
                >
                  Neste setning
                </Button>
              ) : null}
            </div>
          </section>

          {phrasesComplete ? (
            <>
              <Card className="p-6 md:p-8">
                <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
                  Observasjon eller tolkning
                </h2>
                <p className="mt-5 max-w-4xl text-base leading-8 text-slate md:text-lg">
                  Når du tar opp en bekymring, er det lurt å beskrive det du
                  faktisk har sett, hørt eller opplevd. Klikk på hvert par for å
                  markere at du har sett forskjellen.
                </p>
                <div className="mt-6 grid gap-4">
                  {observationPairs.map((pair) => {
                    const seen = seenObservationIds.includes(pair.id);

                    return (
                      <button
                        key={pair.id}
                        type="button"
                        onClick={() => markObservationSeen(pair.id)}
                        className={`rounded-3xl border p-4 text-left transition focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine ${
                          seen
                            ? "border-pine bg-pine/14"
                            : "border-harbor/10 bg-white hover:border-pine/55 hover:shadow-lift"
                        }`}
                      >
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="rounded-2xl bg-white p-4 ring-1 ring-harbor/10">
                            <p className="text-sm font-bold uppercase text-harbor">
                              Mindre godt å melde videre
                            </p>
                            <p className="mt-2 text-base font-semibold leading-7 text-slate">
                              «{pair.weaker}»
                            </p>
                          </div>
                          <div className="flex min-h-28 flex-col items-center justify-center rounded-2xl bg-mist p-4 text-center [text-wrap:balance]">
                            <p className="text-sm font-bold uppercase text-harbor">
                              Bedre å melde videre
                            </p>
                            <p className="mt-2 text-base font-bold leading-7 text-harbor">
                              «{pair.better}»
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-6 flex min-h-28 items-center justify-center rounded-2xl bg-mist p-5 text-center text-base font-bold leading-8 text-harbor [text-wrap:balance]">
                  Du skal ikke diagnostisere, etterforske eller konkludere. Du
                  skal beskrive det du har sett, hørt eller opplevd, og ta det
                  videre til riktig person.
                </p>
              </Card>

              {observationComplete ? (
                <Card className="p-6 md:p-8">
                  <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
                    Klar for uklare situasjoner
                  </h2>
                  <p className="mt-5 max-w-4xl text-base leading-8 text-slate md:text-lg">
                    Du trenger ikke kunne alt. Denne sjekken handler bare om å se
                    om du kjenner igjen riktig neste steg.
                  </p>
                  <div className="mt-6 grid gap-5">
                    {masteryTasks.map((task) => {
                      const selected = masteryAnswers[task.id];
                      return (
                        <section
                          key={task.id}
                          className="rounded-3xl border border-harbor/10 bg-white p-5"
                        >
                          <h3 className="text-lg font-bold text-harbor">
                            {task.situation}
                          </h3>
                          <div className="mt-4 grid gap-3 md:grid-cols-3">
                            {compassDirections.map((direction) => (
                              <ChoiceButton
                                key={direction.id}
                                isSelected={selected === direction.id}
                                isBest={Boolean(selected) && task.correctAction === direction.id}
                                onClick={() => answerMastery(task.id, direction.id)}
                              >
                                {direction.shortLabel}
                              </ChoiceButton>
                            ))}
                          </div>
                        </section>
                      );
                    })}
                  </div>
                  {masteryComplete ? (
                    <p className="mt-6 flex min-h-28 items-center justify-center rounded-2xl bg-mist p-5 text-center text-base font-bold leading-8 text-harbor [text-wrap:balance]">
                      Du trenger ikke løse alt. Du trenger å vite når du skal
                      stoppe, hvem du skal spørre, og når du må handle raskt.
                    </p>
                  ) : null}
                </Card>
              ) : null}
            </>
          ) : null}

          {masteryComplete ? (
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
                Du har fullført Del 3
              </h2>
              <h3 className="mt-2 text-xl font-bold text-harbor md:text-2xl">
                Neste del handler om taushet, tillit og bekymring
              </h3>
              <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-slate md:text-lg">
                <p>Du skal ikke løse alt alene.</p>
                <p>
                  Ved akutt fare bruker du nødnummer. Når det ikke er akutt, men
                  du er bekymret, usikker eller opplever noe som ikke kjennes
                  riktig, kontakter du lederen eller kontaktpersonen din.
                </p>
                <p>
                  Det gjør deg ikke mindre omsorgsfull. Det gjør deg tryggere som
                  frivillig.
                </p>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  onClick={onComplete}
                  className="w-full bg-pine text-harbor hover:bg-leaf sm:w-auto"
                >
                  Gå til Del 4
                </Button>
                <Button to="/" variant="secondary" className="w-full sm:w-auto">
                  Til hovedsiden
                </Button>
              </div>
            </Card>
          ) : null}
        </section>
      ) : (
        <Card className="p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-slate">
              Gå gjennom kompass-situasjonene for å åpne språktreningen.
            </p>
            <Button to="/" variant="secondary">
              Til hovedsiden
            </Button>
          </div>
        </Card>
      )}

      {isComplete ? (
        <div className="sr-only" aria-live="polite">
          Del 3 er allerede fullført.
        </div>
      ) : null}
    </article>
  );
}
