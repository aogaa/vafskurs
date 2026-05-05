import { useMemo, useState } from "react";
import type { CourseModule } from "../../data/courseModules";
import {
  moduleThreeScenarios,
  type ActionChoiceQuality,
  type ActionScenario,
  type ActionScenarioOption,
} from "../../data/moduleThreeScenarios";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

const REQUIRED_SCENARIOS = 8;

type ModuleThreeProps = {
  courseModule: CourseModule;
  isComplete: boolean;
  onComplete: () => void;
};

type ScenarioChoice = {
  scenarioId: string;
  optionId: string;
};

const qualityCopy: Record<
  ActionChoiceQuality,
  { label: string; marker: string; classes: string; feedbackClasses: string }
> = {
  best: {
    label: "Trygt handlingsvalg",
    marker: "✓",
    classes: "border-pine bg-pine/14 text-harbor",
    feedbackClasses: "border-pine/35 bg-pine/12 text-harbor",
  },
  risky: {
    label: "Ufullstendig valg",
    marker: "!",
    classes: "border-honey bg-honey/18 text-harbor",
    feedbackClasses: "border-honey/55 bg-honey/18 text-harbor",
  },
  wrong: {
    label: "Feil ansvar",
    marker: "Stopp",
    classes: "border-red-300 bg-red-50 text-red-950",
    feedbackClasses: "border-red-300 bg-red-50 text-red-950",
  },
};

const actionSteps = [
  {
    title: "Stopp litt opp",
    text: "Du trenger ikke svare ja med én gang. Det er lov å ta en pause.",
    phrase: "Dette må jeg avklare før jeg kan svare.",
  },
  {
    title: "Svar rolig",
    text: "Et rolig svar kan senke presset uten at du må forklare alt.",
    phrase: "Jeg vil gjerne gjøre dette riktig.",
  },
  {
    title: "Sett grensen tydelig",
    text: "En grense kan være varm, kort og klar samtidig.",
    phrase: "Det kan jeg ikke gjøre som frivillig.",
  },
  {
    title: "Koble på leder",
    text: "Når noe er uklart, skal du ikke finne opp løsningen alene.",
    phrase: "Dette tar jeg videre med lederen min.",
  },
  {
    title: "Ikke bær det alene",
    text: "Tunge samtaler, bekymringer og vanskelige grenser skal tas videre.",
    phrase: "Dette vil jeg ikke bære alene.",
  },
];

const phraseGroups = [
  {
    title: "Når du trenger tid til å avklare",
    phrases: [
      "Dette må jeg avklare med lederen min før jeg kan svare.",
      "Jeg vil gjerne gjøre dette riktig, så jeg må ta det videre med leder først.",
      "Det kan hende vi kan finne en løsning, men det må ikke avtales privat mellom oss to.",
      "Dette går litt utenfor det jeg kan avgjøre som frivillig.",
    ],
  },
  {
    title: "Når du må si nei",
    phrases: [
      "Det kan jeg ikke gjøre som frivillig.",
      "Jeg skjønner at du trenger hjelp, men akkurat dette ligger utenfor rollen min.",
      "Jeg sier nei til oppgaven, ikke til deg.",
      "Det ville ikke vært riktig av meg å love noe jeg ikke har ansvar for.",
    ],
  },
  {
    title: "Når du skal stoppe og hente riktig hjelp",
    phrases: [
      "Dette kan jeg ikke ta ansvar for alene. Jeg må ta det videre med lederen min.",
      "Her må riktig ansvarlig person kobles på.",
      "Jeg kan være her med deg nå, men dette må også tas videre.",
      "Dette er for viktig til at jeg skal bære det alene.",
    ],
  },
  {
    title: "Når noen ber deg holde noe hemmelig",
    phrases: [
      "Jeg skal ikke dele dette med uvedkommende, men jeg kan ikke love å holde det hemmelig hvis det handler om fare eller alvorlig bekymring.",
      "Takk for at du sier det. Nettopp fordi dette er viktig, må jeg ta det videre til lederen min.",
    ],
  },
  {
    title: "Når ansatte eller pårørende ber om for mye",
    phrases: [
      "Det kan jeg ikke gjøre som frivillig, men jeg kan gi beskjed videre.",
      "Dette høres ut som en oppgave som må håndteres av ansatte eller leder.",
      "Jeg må holde meg til den rollen jeg har fått.",
      "Hvis dette skal endres, må det avklares med leder først.",
    ],
  },
];

const checklistItems = [
  "Jeg trenger ikke svare ja med én gang.",
  "Jeg kan si nei til oppgaven uten å si nei til mennesket.",
  "Det er ikke tiden oppgaven tar som avgjør. Det er ansvaret.",
  "Når noe handler om helse, medisiner, personlig stell, penger, bankkort, private avtaler eller utrygghet, skal jeg stoppe.",
  "Når noe er uklart, skal jeg koble på leder.",
  "Jeg skal ikke bære tunge bekymringer alene.",
  "Tydelige grenser gjør det tryggere å være varm.",
];

const masteryOptions = [
  {
    id: "a",
    text: "Hvis jeg har tid og lyst, kan jeg som frivillig gjøre det meste så lenge det hjelper noen.",
    feedback:
      "Det er forståelig å tenke slik, fordi frivillighet ofte begynner med ønsket om å hjelpe. Men tid og vilje er ikke nok. Noen oppgaver ligger utenfor frivilligrollen uansett hvor gjerne du vil bidra.",
  },
  {
    id: "b",
    text: "Som frivillig skal jeg bidra innenfor tydelige rammer, avklare med leder når noe blir uklart, og stoppe når oppgaven ligger utenfor rollen min.",
    feedback:
      "Ja. Dette er kjernen i trygg frivillighet. Du kan være varm, hjelpsom og viktig uten å ta ansvar for alt. Når noe blir uklart, er det riktig å stoppe og avklare.",
  },
  {
    id: "c",
    text: "Det er best å si ja først, og heller rydde opp etterpå hvis det ble for mye.",
    feedback:
      "Dette kan virke effektivt i øyeblikket, men det kan skape uklare forventninger og feil ansvar. Det er bedre å avklare før du lover noe enn å rydde opp etterpå.",
  },
];

function LearningSection({
  children,
  eyebrow,
  title,
}: {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <Card className="p-7 md:p-8">
      <p className="text-sm font-bold uppercase tracking-normal text-leaf">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-extrabold text-ink">{title}</h2>
      <div className="mt-5 space-y-4 text-base leading-8 text-slate">{children}</div>
    </Card>
  );
}

function ProgressTrail({ completedCount }: { completedCount: number }) {
  const percent = Math.round((completedCount / moduleThreeScenarios.length) * 100);
  const message =
    completedCount >= moduleThreeScenarios.length
      ? "10 av 10 situasjoner gjennomført. Huskelisten din er klar."
      : completedCount >= REQUIRED_SCENARIOS
        ? `${completedCount} av 10 situasjoner gjennomført. Huskelisten er låst opp.`
        : completedCount >= 7
          ? `${completedCount} av 10 situasjoner gjennomført. Du begynner å kjenne igjen når leder skal kobles på.`
          : completedCount >= 3
            ? `${completedCount} av 10 situasjoner gjennomført. Du har øvd på å sette grenser uten å avvise personen.`
            : `${completedCount} av 10 situasjoner gjennomført. Velg handling i minst 8 situasjoner.`;

  return (
    <section
      className="rounded-[2rem] border border-harbor/8 bg-white p-6 shadow-soft"
      aria-labelledby="action-trail-title"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-normal text-leaf">
            Handlingsløype
          </p>
          <h2 id="action-trail-title" className="mt-2 text-3xl font-extrabold text-ink">
            Hva gjør du nå-løypa
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate">
            Du møter konkrete øyeblikk fra frivillig arbeid. Velg hva du sier
            eller gjør, og bruk forklaringen til å trene på trygg handling.
          </p>
        </div>
        <p className="w-fit rounded-2xl bg-mist px-4 py-2 text-sm font-bold text-harbor">
          {message}
        </p>
      </div>
      <div
        className="mt-5 h-3 overflow-hidden rounded-full bg-mist"
        role="progressbar"
        aria-label="Gjennomførte scenarioer"
        aria-valuemin={0}
        aria-valuemax={moduleThreeScenarios.length}
        aria-valuenow={completedCount}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-pine to-leaf transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </section>
  );
}

function ScenarioCard({
  choice,
  onChoose,
  scenario,
}: {
  choice?: ScenarioChoice;
  onChoose: (optionId: string) => void;
  scenario: ActionScenario;
}) {
  const selectedOption = scenario.options.find((option) => option.id === choice?.optionId);
  const selectedMeta = selectedOption ? qualityCopy[selectedOption.quality] : undefined;

  return (
    <Card className="overflow-hidden p-0">
      <div className="h-2 bg-gradient-to-r from-pine via-honey to-harbor" />
      <div className="p-7 md:p-8">
        <p className="text-sm font-bold uppercase tracking-normal text-leaf">
          Scenario
        </p>
        <h3 className="mt-2 text-3xl font-extrabold text-ink">{scenario.title}</h3>
        <p className="mt-4 rounded-3xl bg-mist p-5 text-xl font-semibold leading-9 text-harbor">
          {scenario.situation}
        </p>

        <fieldset className="mt-6">
          <legend className="text-base font-bold text-harbor">
            Hva gjør du nå?
          </legend>
          <div className="mt-4 grid gap-3">
            {scenario.options.map((option) => {
              const selected = choice?.optionId === option.id;
              const meta = qualityCopy[option.quality];

              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onChoose(option.id)}
                  className={`min-h-14 rounded-2xl border px-5 py-4 text-left text-base font-semibold leading-7 transition focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine ${
                    selected
                      ? `${meta.classes} shadow-soft`
                      : "border-harbor/12 bg-white text-harbor hover:-translate-y-0.5 hover:border-pine/60 hover:bg-mist"
                  }`}
                >
                  <span className="mb-2 block text-sm font-black uppercase tracking-normal">
                    Valg {option.id.toUpperCase()}
                    {selected ? ` · ${meta.label}` : ""}
                  </span>
                  {option.text}
                </button>
              );
            })}
          </div>
        </fieldset>

        {selectedOption && selectedMeta ? (
          <section
            className={`mt-6 rounded-3xl border p-5 ${selectedMeta.feedbackClasses}`}
            aria-live="polite"
          >
            <p className="text-sm font-bold uppercase tracking-normal">
              {selectedMeta.marker} {selectedMeta.label}
            </p>
            <p className="mt-3 text-base font-semibold leading-8">
              {selectedOption.feedback}
            </p>
          </section>
        ) : null}
      </div>
    </Card>
  );
}

export function ModuleThree({ courseModule, isComplete, onComplete }: ModuleThreeProps) {
  const [choices, setChoices] = useState<ScenarioChoice[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [masteryAnswer, setMasteryAnswer] = useState<string | null>(null);

  const currentScenario = moduleThreeScenarios[currentIndex];
  const currentChoice = choices.find((choice) => choice.scenarioId === currentScenario.id);
  const completedCount = choices.length;
  const checklistUnlocked = completedCount >= REQUIRED_SCENARIOS;
  const masteryComplete = masteryAnswer === "b";
  const canComplete = checklistUnlocked && masteryComplete;

  const bestChoicesCount = useMemo(
    () =>
      choices.filter((choice) => {
        const scenario = moduleThreeScenarios.find((item) => item.id === choice.scenarioId);
        const option = scenario?.options.find((item) => item.id === choice.optionId);
        return option?.quality === "best";
      }).length,
    [choices],
  );

  function chooseOption(optionId: string) {
    setChoices((current) => {
      const existing = current.find((choice) => choice.scenarioId === currentScenario.id);
      if (existing) {
        return current.map((choice) =>
          choice.scenarioId === currentScenario.id ? { ...choice, optionId } : choice,
        );
      }

      return [...current, { scenarioId: currentScenario.id, optionId }];
    });
  }

  function goToNextScenario() {
    setCurrentIndex((index) => Math.min(index + 1, moduleThreeScenarios.length - 1));
  }

  function goToPreviousScenario() {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }

  return (
    <article className="space-y-8">
      <header className="overflow-hidden rounded-[2rem] border border-harbor/8 bg-white shadow-soft">
        <div className="h-2 bg-gradient-to-r from-pine via-honey to-harbor" />
        <div className="grid gap-8 p-7 md:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-leaf">
              Del {courseModule.order}
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight text-ink md:text-5xl">
              Trygge valg i øyeblikket
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-slate">
              I Del 2 bygget du rollekompasset. Nå skal du øve på hva du
              faktisk kan si og gjøre når rollen blir utfordret i øyeblikket.
            </p>
          </div>
          <div className="rounded-3xl bg-harbor p-5 text-white shadow-soft">
            <p className="text-sm font-bold uppercase tracking-normal text-pine">
              Hovedbudskap
            </p>
            <p className="mt-3 max-w-sm text-xl font-bold leading-8">
              Når rollen blir utfordret, trenger du ikke improvisere alene. Du
              kan stoppe opp, sette en trygg grense og koble på leder.
            </p>
          </div>
        </div>
      </header>

      <LearningSection eyebrow="Forstå" title="Når rollen blir utfordret">
        <p>
          Det er lett å forstå grenser når vi snakker om dem i ro og mak. Det er
          vanskeligere når du står midt i situasjonen.
        </p>
        <p>
          Noen spør pent. Noen er ensomme. Noen er stresset. Noen sier at det
          bare tar to minutter. Noen ansatte har dårlig tid. Noen pårørende er
          slitne. Og du vil jo hjelpe.
        </p>
        <p>
          Det er nettopp derfor frivillige trenger mer enn regler. Du trenger en
          trygg måte å handle på når situasjonen skjer.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            "Du kan være varm og tydelig samtidig.",
            "Du kan si nei til oppgaven uten å si nei til mennesket.",
            "Du kan stoppe opp uten å trekke deg unna.",
            "Du kan koble på leder uten å svikte personen foran deg.",
          ].map((text) => (
            <p key={text} className="rounded-3xl bg-mist p-5 font-bold text-harbor">
              {text}
            </p>
          ))}
        </div>
      </LearningSection>

      <LearningSection eyebrow="Handle" title="Den trygge handlingsrekkefølgen">
        <p>
          Når noe blir uklart, kan du bruke en enkel rekkefølge. Den hjelper deg
          å være rolig før ansvaret glir over i noe du ikke skal bære.
        </p>
        <ol className="grid gap-4">
          {actionSteps.map((step, index) => (
            <li
              key={step.title}
              className="grid gap-4 rounded-3xl border border-harbor/8 bg-mist p-5 md:grid-cols-[auto_1fr]"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-white text-sm font-black text-harbor shadow-sm">
                {index + 1}
              </span>
              <div>
                <h3 className="text-xl font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-base leading-7 text-slate">{step.text}</p>
                <p className="mt-3 rounded-2xl bg-white px-4 py-3 text-base font-semibold leading-7 text-harbor">
                  «{step.phrase}»
                </p>
              </div>
            </li>
          ))}
        </ol>
      </LearningSection>

      <LearningSection eyebrow="Avklar" title="Det er ikke tiden som avgjør, men ansvaret">
        <p>
          Mange vanskelige situasjoner kommer forkledd som små tjenester. Ordet
          «bare» kan gjøre en oppgave mindre enn den egentlig er.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            "Kan du bare hjelpe ham på toalettet?",
            "Kan du bare ta med bankkortet og handle?",
            "Kan du bare minne meg på medisinen?",
            "Kan du bare kjøre henne hjem?",
            "Kan du bare love å komme innom i morgen også?",
          ].map((text) => (
            <p key={text} className="rounded-2xl bg-honey/18 px-4 py-3 font-semibold text-harbor">
              {text}
            </p>
          ))}
        </div>
        <p>
          Det er ikke tidsbruken som avgjør om noe er innenfor frivilligrollen.
          Det er ansvaret. Noe kan ta to minutter og likevel være helt utenfor
          rollen.
        </p>
        <p className="rounded-3xl bg-mist p-5 font-bold text-harbor">
          Spør heller: Er dette avtalt? Er dette trygt? Er dette mitt ansvar?
        </p>
      </LearningSection>

      <LearningSection eyebrow="Varm grense" title="Å si nei uten å bli kald">
        <p>
          Mange frivillige er redde for at et nei skal oppleves avvisende. Det er
          forståelig.
        </p>
        <p>
          Men det finnes en stor forskjell på å avvise et menneske og å avvise
          en oppgave. Du kan fortsatt vise omsorg, lytte og hjelpe personen
          videre.
        </p>
        <p className="rounded-3xl bg-harbor p-5 text-xl font-bold leading-8 text-white">
          Jeg sier nei til oppgaven, ikke til deg.
        </p>
      </LearningSection>

      <ProgressTrail completedCount={completedCount} />

      <section className="space-y-5" aria-labelledby="scenario-title">
        <div className="flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-leaf">
              Øv i øyeblikket
            </p>
            <h2 id="scenario-title" className="mt-1 text-2xl font-bold text-ink">
              Situasjon {currentIndex + 1} av {moduleThreeScenarios.length}
            </h2>
          </div>
          <p className="w-fit rounded-2xl bg-mist px-4 py-2 text-sm font-bold text-harbor">
            {bestChoicesCount} trygge handlingsvalg funnet
          </p>
        </div>

        <ScenarioCard
          scenario={currentScenario}
          choice={currentChoice}
          onChoose={chooseOption}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button onClick={goToPreviousScenario} variant="secondary" disabled={currentIndex === 0}>
            Forrige situasjon
          </Button>
          <Button
            onClick={goToNextScenario}
            disabled={!currentChoice || currentIndex === moduleThreeScenarios.length - 1}
          >
            Neste situasjon
          </Button>
        </div>
      </section>

      {checklistUnlocked ? (
        <section className="space-y-6" aria-live="polite">
          <section className="rounded-[2rem] border border-pine/30 bg-gradient-to-br from-harbor to-fjord p-7 text-white shadow-glow md:p-9">
            <p className="text-sm font-bold uppercase tracking-normal text-pine">
              Huskeliste låst opp
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight">
              Min huskeliste når rollen blir utfordret
            </h2>
            <ol className="mt-6 grid gap-3">
              {checklistItems.map((item, index) => (
                <li
                  key={item}
                  className="grid gap-3 rounded-2xl bg-white/10 p-4 text-base font-semibold leading-7 text-white/88 sm:grid-cols-[auto_1fr]"
                >
                  <span className="font-black text-pine">{index + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </section>

          <Card className="p-7 md:p-8">
            <p className="text-sm font-bold uppercase tracking-normal text-leaf">
              Språk i praksis
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-ink">
              Setninger du kan bruke
            </h2>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {phraseGroups.map((group) => (
                <article
                  key={group.title}
                  className="rounded-3xl border border-harbor/8 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-harbor">{group.title}</h3>
                  <ul className="mt-3 space-y-3">
                    {group.phrases.map((phrase) => (
                      <li key={phrase} className="text-base leading-8 text-slate">
                        «{phrase}»
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Card>

          <Card className="p-7 md:p-8">
            <p className="text-sm font-bold uppercase tracking-normal text-leaf">
              Mestringssjekk
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-ink">
              Hva oppsummerer trygg handling best?
            </h2>
            <div className="mt-5 grid gap-3">
              {masteryOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={masteryAnswer === option.id}
                  onClick={() => setMasteryAnswer(option.id)}
                  className={`min-h-14 rounded-2xl border px-5 py-4 text-left text-base font-semibold leading-7 transition focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine ${
                    masteryAnswer === option.id
                      ? "border-pine bg-harbor text-white"
                      : "border-harbor/12 bg-white text-harbor hover:border-pine/60 hover:bg-mist"
                  }`}
                >
                  {option.text}
                </button>
              ))}
            </div>
            {masteryAnswer ? (
              <p
                className="mt-5 rounded-3xl bg-mist p-5 text-base font-semibold leading-8 text-harbor"
                aria-live="polite"
              >
                {masteryOptions.find((option) => option.id === masteryAnswer)?.feedback}
              </p>
            ) : null}
          </Card>

          <Card className="p-7 md:p-8">
            <p className="text-sm font-bold uppercase tracking-normal text-leaf">
              Neste steg
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-ink">
              Fra trygg handling til tillit
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-slate">
              <p>
                Nå har du øvd på hva du kan si og gjøre når frivilligrollen blir
                utfordret.
              </p>
              <p>
                Neste steg handler om noe som går gjennom nesten alt frivillig
                arbeid: tillit.
              </p>
              <p>
                Hva kan du holde for deg selv? Hva må du ta videre? Og hvordan
                kan du melde bekymring uten å bryte tilliten?
              </p>
            </div>
          </Card>
        </section>
      ) : (
        <Card className="p-6">
          <p className="text-base font-semibold leading-8 text-slate">
            Gjennomfør minst {REQUIRED_SCENARIOS} scenarioer for å låse opp
            huskelisten og mestringssjekken.
          </p>
        </Card>
      )}

      <div className="flex flex-col gap-4 rounded-3xl border border-harbor/8 bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <Button to="/moduler" variant="secondary">
          Tilbake til deloversikt
        </Button>
        <div className="flex flex-col gap-2 sm:items-end">
          {!canComplete ? (
            <p className="text-sm font-semibold text-slate">
              Gjennomfør minst 8 scenarioer og fullfør mestringssjekken for å
              fullføre delen.
            </p>
          ) : null}
          <Button onClick={onComplete} disabled={!canComplete || isComplete}>
            {isComplete ? "Del er fullf?rt" : "Marker del som fullf?rt"}
          </Button>
        </div>
      </div>
    </article>
  );
}

