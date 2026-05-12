import { useState, type ReactNode } from "react";
import type { CourseModule } from "../../data/courseModules";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

const REFLECTION_STORAGE_KEY = "trygg-som-frivillig:del-3-refleksjon";
const ANSWERS_STORAGE_KEY = "trygg-som-frivillig:del-3-svar";

type DialogueOptionId = "a" | "b" | "c";

type DialogueScenario = {
  id: string;
  title: string;
  text: string;
  question: string;
  bestOption: DialogueOptionId;
  options: { id: DialogueOptionId; text: string }[];
  feedback: string[];
};

type ModuleThreeProps = {
  courseModule: CourseModule;
  isComplete: boolean;
  onComplete: () => void;
};

const dialogueScenarios: DialogueScenario[] = [
  {
    id: "inngangen",
    title: "Personen ved inngangen",
    text: "En ny person står litt usikkert ved inngangen til en aktivitet. Du ser at personen nøler.",
    question: "Hva ville du sagt?",
    bestOption: "a",
    options: [
      {
        id: "a",
        text: "Hei, jeg heter ___. Er det greit at jeg står her litt sammen med deg?",
      },
      { id: "b", text: "Bare kom inn, det er ikke noe å være nervøs for." },
      { id: "c", text: "Du må nesten bestemme deg, for vi begynner snart." },
    ],
    feedback: [
      "Dette er en god måte å starte på. Du presenterer deg, tar kontakt uten å presse, og gir personen mulighet til å si ja eller nei.",
      "Alternativ B kan være godt ment, men kan bagatellisere usikkerheten.",
      "Alternativ C kan oppleves pressende.",
    ],
  },
  {
    id: "sitter-alene",
    title: "Personen som sitter alene",
    text: "På en møteplass sitter en deltaker alene ved et bord. Du vurderer å ta kontakt.",
    question: "Hva ville du sagt?",
    bestOption: "b",
    options: [
      { id: "a", text: "Hvorfor sitter du her helt alene?" },
      { id: "b", text: "Hei. Er det greit at jeg setter meg her litt?" },
      { id: "c", text: "Du bør bli med de andre, det er mye hyggeligere." },
    ],
    feedback: [
      "Dette er en respektfull åpning. Du spør om lov, og du gjør det mulig for personen å velge kontakt uten å måtte forklare seg.",
      "Alternativ A kan føles utleverende.",
      "Alternativ C kan bli for styrende.",
    ],
  },
  {
    id: "sier-nei",
    title: "Personen som sier nei",
    text: "Du inviterer en deltaker med på en aktivitet. Personen svarer: «Nei, jeg tror ikke det passer for meg.»",
    question: "Hva ville du sagt?",
    bestOption: "a",
    options: [
      {
        id: "a",
        text: "Det er helt i orden. Du er velkommen hvis du får lyst senere.",
      },
      {
        id: "b",
        text: "Jo, kom igjen. Du kommer sikkert til å like det når du først prøver.",
      },
      { id: "c", text: "Da får du nesten ha det så godt." },
    ],
    feedback: [
      "Dette respekterer personens nei, samtidig som døren holdes åpen. Det er en trygg måte å invitere uten å presse.",
      "Alternativ B kan oppleves som mas.",
      "Alternativ C kan oppleves avvisende.",
    ],
  },
  {
    id: "forteller-noe-tungt",
    title: "Personen som forteller noe tungt",
    text: "En deltaker sier: «Jeg føler meg mye alene for tiden.»",
    question: "Hva ville du sagt?",
    bestOption: "b",
    options: [
      { id: "a", text: "Det må du ikke tenke på. Du må bare komme deg mer ut." },
      { id: "b", text: "Det høres vondt ut. Vil du fortelle litt mer?" },
      {
        id: "c",
        text: "Jeg vet akkurat hvordan du har det. Det samme skjedde med meg.",
      },
    ],
    feedback: [
      "Dette gir rom for personen uten at du overtar samtalen. Du viser at du hører det som blir sagt, og inviterer videre uten å presse.",
      "Alternativ A kan bagatellisere det personen sier.",
      "Alternativ C kan flytte oppmerksomheten over på deg.",
    ],
  },
  {
    id: "vil-ha-rad",
    title: "Personen som vil ha råd",
    text: "En deltaker forteller om en vanskelig familiesituasjon og spør: «Hva synes du jeg bør gjøre?»",
    question: "Hva ville du sagt?",
    bestOption: "b",
    options: [
      { id: "a", text: "Jeg synes du burde si tydelig fra til familien din." },
      {
        id: "b",
        text: "Dette høres viktig ut. Jeg kan lytte, men jeg er ikke riktig person til å gi råd om hva du bør gjøre.",
      },
      { id: "c", text: "Det der bør du ikke blande meg inn i." },
    ],
    feedback: [
      "Dette er en trygg respons. Du avviser ikke personen, men du går heller ikke inn i en rådgiverrolle du ikke skal ha.",
      "Alternativ A kan gjøre deg til rådgiver i en situasjon du ikke har ansvar for.",
      "Alternativ C kan bli for hardt og avvisende.",
    ],
  },
  {
    id: "finne-rom",
    title: "Personen som trenger hjelp",
    text: "En deltaker strever med å finne frem til riktig rom og virker litt flau.",
    question: "Hva ville du sagt?",
    bestOption: "a",
    options: [
      {
        id: "a",
        text: "Det er lett å gå seg bort her. Jeg kan vise deg veien hvis du vil.",
      },
      { id: "b", text: "Har du ikke vært her før?" },
      { id: "c", text: "Du må følge bedre med på skiltene." },
    ],
    feedback: [
      "Dette normaliserer situasjonen og tilbyr hjelp uten å gjøre personen liten. Det er praktisk, varmt og respektfullt.",
      "Alternativ B kan gjøre personen mer flau.",
      "Alternativ C er unødvendig korrigerende.",
    ],
  },
];

const practicalPhrases = [
  "Hei, jeg heter ___. Er det greit at jeg setter meg her litt?",
  "Du er velkommen til å bli med hvis du har lyst.",
  "Det er helt i orden å bare se an litt først.",
  "Vil du at jeg skal vise deg hvor det er?",
  "Hva pleier å gi deg en god dag?",
  "Det høres vanskelig ut.",
  "Vil du fortelle litt mer?",
  "Jeg kan lytte, men jeg kan ikke løse dette alene.",
  "Dette høres viktig ut. Vi bør finne ut hvem som kan hjelpe deg videre.",
  "Det er helt greit å si nei.",
];

function readSavedReflection() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem(REFLECTION_STORAGE_KEY) ?? "";
}

function saveReflection(value: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(REFLECTION_STORAGE_KEY, value);
}

function isDialogueOptionId(value: string): value is DialogueOptionId {
  return value === "a" || value === "b" || value === "c";
}

function readSavedAnswers(): Partial<Record<string, DialogueOptionId>> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const value = window.localStorage.getItem(ANSWERS_STORAGE_KEY);
    const parsed = value ? JSON.parse(value) : {};
    const next: Partial<Record<string, DialogueOptionId>> = {};

    for (const scenario of dialogueScenarios) {
      const answer = parsed[scenario.id];
      if (typeof answer === "string" && isDialogueOptionId(answer)) {
        next[scenario.id] = answer;
      }
    }

    return next;
  } catch {
    return {};
  }
}

function saveAnswers(value: Partial<Record<string, DialogueOptionId>>) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(value));
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

export function ModuleThree({ courseModule, isComplete, onComplete }: ModuleThreeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<string, DialogueOptionId>>>(
    readSavedAnswers,
  );
  const [reflection, setReflection] = useState(readSavedReflection);

  const currentScenario = dialogueScenarios[currentIndex];
  const selectedOptionId = answers[currentScenario.id];
  const selectedOption = currentScenario.options.find(
    (option) => option.id === selectedOptionId,
  );
  const completedScenarioCount = dialogueScenarios.filter(
    (scenario) => answers[scenario.id],
  ).length;
  const hasCompletedExercise = completedScenarioCount === dialogueScenarios.length;

  function chooseOption(optionId: DialogueOptionId) {
    setAnswers((current) => {
      const next = {
        ...current,
        [currentScenario.id]: optionId,
      };
      saveAnswers(next);
      return next;
    });
  }

  function goToNextScenario() {
    setCurrentIndex((index) => Math.min(index + 1, dialogueScenarios.length - 1));
  }

  function goToPreviousScenario() {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }

  function handleReflectionChange(value: string) {
    setReflection(value);
    saveReflection(value);
  }

  function getOptionClasses(optionId: DialogueOptionId) {
    const base =
      "min-h-24 rounded-2xl border p-4 text-left transition duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine";

    if (!selectedOptionId) {
      return `${base} border-harbor/10 bg-white text-ink hover:-translate-y-0.5 hover:border-pine/55 hover:shadow-lift`;
    }

    if (optionId === currentScenario.bestOption) {
      return `${base} border-pine bg-pine/20 text-harbor ring-2 ring-pine/45`;
    }

    if (optionId === selectedOptionId) {
      return `${base} border-honey/70 bg-honey/18 text-harbor ring-2 ring-honey/30`;
    }

    return `${base} border-harbor/12 bg-mist text-harbor`;
  }

  return (
    <article className="space-y-8">
      <section className="rounded-3xl bg-harbor px-6 py-9 shadow-soft md:px-8 md:py-10">
        <p className="text-sm font-bold uppercase tracking-normal text-pine">
          Del {courseModule.order} &middot; Trygg som frivillig
        </p>
        <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
          Gode møter med mennesker
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white">
          Gode møter handler ikke om å fikse andre mennesker. Det handler om å
          møte mennesker med respekt, gi rom for valg, lytte uten å overta og
          bidra til verdighet i små øyeblikk.
        </p>
      </section>

      <Section title="Å møte mennesket, ikke problemet">
        <p>
          Mennesker kommer ikke til en aktivitet som et problem som skal løses.
          De kommer med erfaringer, grenser, ønsker, usikkerhet og ressurser.
        </p>
        <p>
          Som frivillig kan du bidra med noe enkelt og viktig: å møte personen
          som et menneske først. Ikke som en sak, en utfordring eller en oppgave.
        </p>
      </Section>

      <Section title="Å invitere uten å presse">
        <p>
          En god invitasjon åpner en dør uten å dytte noen gjennom den. Den gir
          mulighet, men lar personen selv velge.
        </p>
        <p>
          Det kan være nok å si: «Du er velkommen hvis du har lyst» eller «Det er
          helt i orden å bare se an litt først».
        </p>
      </Section>

      <Section title="Å lytte uten å overta">
        <p>
          Å lytte betyr ikke at du skal fikse det personen forteller. Det betyr
          at du gir rom, viser at du hører, og lar personen eie sin egen historie.
        </p>
        <p>
          Noen ganger er det beste svaret kort og rolig: «Det høres vanskelig
          ut. Vil du fortelle litt mer?»
        </p>
      </Section>

      <Section title="Respekt for nei">
        <p>
          Et nei kan være et uttrykk for grenser, dagsform, usikkerhet eller bare
          et valg. Det skal respekteres.
        </p>
        <p>
          Når du respekterer et nei og samtidig holder døren åpen, blir det
          tryggere for personen å komme tilbake senere.
        </p>
      </Section>

      <Section title="Når hjelp kan bli for mye">
        <p>
          Hjelp kan bli for mye når den presser, forklarer, overtar eller gjør
          den andre mindre. God hjelp gir rom for selvbestemmelse.
        </p>
        <p>
          Spør heller enn å anta. Tilby heller enn å styre. Vent heller enn å
          presse.
        </p>
      </Section>

      <Section title="Verdighet i små øyeblikk">
        <p>
          Verdighet kan ligge i måten du hilser på, måten du spør om lov, og
          måten du hjelper noen uten å gjøre dem flau.
        </p>
        <p>
          Små øyeblikk kan sette tonen for hele møtet: et rolig blikk, en
          vennlig åpning, et spørsmål som gir valgfrihet.
        </p>
      </Section>

      <section className="space-y-5" aria-labelledby="dialogue-exercise-title">
        <Card className="p-6 md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <h2
                id="dialogue-exercise-title"
                className="text-2xl font-extrabold leading-tight text-ink md:text-3xl"
              >
                Hva ville du sagt?
              </h2>
              <p className="mt-4 text-base leading-8 text-slate md:text-lg">
                Du får ett møte om gangen. Velg svaret som best skaper trygghet,
                respekt og rom for den andre personen.
              </p>
            </div>
            <div className="rounded-3xl bg-mist p-5 text-harbor ring-1 ring-harbor/8">
              <p className="text-sm font-bold uppercase tracking-normal text-slate">
                Situasjon
              </p>
              <p className="mt-1 text-3xl font-extrabold" aria-live="polite">
                {currentIndex + 1} av {dialogueScenarios.length}
              </p>
              <p className="mt-2 text-sm font-semibold">
                {completedScenarioCount} gjennomført
              </p>
            </div>
          </div>
          <div
            className="mt-6 h-3 overflow-hidden rounded-full bg-mist"
            role="progressbar"
            aria-label="Dialogøvelser gjennomført"
            aria-valuemin={0}
            aria-valuemax={dialogueScenarios.length}
            aria-valuenow={completedScenarioCount}
          >
            <div
              className="h-full rounded-full bg-pine transition-all duration-500"
              style={{
                width: `${(completedScenarioCount / dialogueScenarios.length) * 100}%`,
              }}
            />
          </div>
        </Card>

        <Card className="overflow-hidden p-0">
          <div className="h-2 bg-pine" />
          <div className="p-6 md:p-8">
            <h3 className="text-xl font-bold text-harbor">
              {currentScenario.title}
            </h3>
            <p className="mt-4 rounded-3xl bg-mist p-5 text-xl font-semibold leading-9 text-ink">
              {currentScenario.text}
            </p>

            <fieldset className="mt-7">
              <legend className="text-base font-bold text-harbor">
                {currentScenario.question}
              </legend>
              <div className="mt-4 grid gap-3">
                {currentScenario.options.map((option) => {
                  const isSelected = selectedOptionId === option.id;
                  const isBest = selectedOptionId && option.id === currentScenario.bestOption;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => chooseOption(option.id)}
                      className={getOptionClasses(option.id)}
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="text-sm font-black uppercase tracking-normal">
                          Alternativ {option.id.toUpperCase()}
                          {isBest ? " · beste retning" : ""}
                        </span>
                        <span
                          className={`flex size-6 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${
                            isSelected || isBest
                              ? "border-harbor bg-harbor text-white"
                              : "border-harbor/25 text-transparent"
                          }`}
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                      </span>
                      <span className="mt-3 block text-base font-semibold leading-7">
                        «{option.text}»
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {selectedOption ? (
              <section
                className="mt-6 rounded-3xl bg-mist p-5"
                aria-live="polite"
                aria-label="Veiledende respons"
              >
                <h4 className="text-xl font-bold text-harbor">
                  Beste retning: Alternativ {currentScenario.bestOption.toUpperCase()}
                </h4>
                {selectedOption.id !== currentScenario.bestOption ? (
                  <p className="mt-3 text-base font-semibold leading-7 text-slate">
                    Du valgte alternativ {selectedOption.id.toUpperCase()}. Det
                    er forståelig at slike øyeblikk kan vurderes ulikt. Her er
                    hvorfor alternativ {currentScenario.bestOption.toUpperCase()} er
                    tryggeste retning:
                  </p>
                ) : null}
                <div className="mt-3 space-y-3 text-base leading-8 text-slate">
                  {currentScenario.feedback.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          {currentIndex > 0 ? (
            <Button onClick={goToPreviousScenario} variant="secondary">
              Forrige situasjon
            </Button>
          ) : (
            <span aria-hidden="true" />
          )}
          {currentIndex < dialogueScenarios.length - 1 ? (
            <Button onClick={goToNextScenario} disabled={!selectedOptionId}>
              Neste situasjon
            </Button>
          ) : null}
        </div>
      </section>

      {hasCompletedExercise ? (
        <section className="space-y-8" aria-live="polite">
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
              Praktiske formuleringer
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {practicalPhrases.map((phrase) => (
                <p
                  key={phrase}
                  className="flex min-h-28 items-center justify-center rounded-2xl bg-mist p-5 text-center text-base font-semibold leading-8 text-harbor"
                >
                  «{phrase}»
                </p>
              ))}
            </div>
          </Card>

          <Section title="Dette er kjernen">
            <p>
              Gode møter handler ikke om å presse, fikse eller overta. De handler
              om å gi rom for den andre personen.
            </p>
            <p>
              Du kan bidra med ro, nærvær og respekt. Du kan invitere uten å
              presse, lytte uten å gjøre samtalen til din egen, og hjelpe uten å
              gjøre den andre liten.
            </p>
            <p className="font-bold text-harbor">
              Verdighet ligger ofte i de små valgene.
            </p>
          </Section>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
              Oppsummering
            </h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Møt mennesket først, ikke problemet.",
                "Inviter på en måte som gir personen et reelt valg.",
                "Lytt uten å overta samtalen eller gi råd du ikke skal gi.",
                "Respekter nei, og hold døren åpen uten press.",
                "Hjelp på en måte som bevarer verdighet og selvbestemmelse.",
                "Små formuleringer kan gjøre et møte tryggere.",
              ].map((item, index) => (
                <li
                  key={item}
                  className="flex min-h-32 flex-col items-center justify-center gap-3 rounded-2xl bg-mist p-5 text-center text-base font-semibold leading-7 text-harbor"
                >
                  <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-harbor text-sm font-extrabold text-white"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
              Et godt møte begynner med...
            </h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-slate md:text-lg">
              <p>
                Tenk på en situasjon der noen møtte deg på en måte som gjorde
                deg trygg, sett eller respektert.
              </p>
              <p>Hva gjorde de? Hva kan du ta med deg inn i frivilligrollen?</p>
            </div>
            <label htmlFor="module-three-reflection" className="sr-only">
              Et godt møte begynner med
            </label>
            <textarea
              id="module-three-reflection"
              value={reflection}
              onChange={(event) => handleReflectionChange(event.target.value)}
              rows={5}
              placeholder="Et godt møte begynner med..."
              className="mt-6 min-h-36 w-full resize-y rounded-2xl border border-harbor/15 bg-white p-4 text-base leading-7 text-ink shadow-sm outline-none transition focus:border-pine focus:ring-4 focus:ring-pine/20"
            />
            <p className="mt-3 text-sm font-semibold text-slate">
              Refleksjonen lagres bare lokalt i nettleseren din og er kun ment
              for deg!
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
              Du har fullført Del 3
            </h2>
            <h3 className="mt-2 text-xl font-bold text-harbor md:text-2xl">
              Neste del handler om taushet, tillit og bekymring
            </h3>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-slate md:text-lg">
              <p>
                Du har øvd på gode møter med mennesker: å invitere, lytte,
                respektere nei og gi hjelp uten å overta.
              </p>
              <p>
                Neste del handler om hva du gjør når noen deler noe vanskelig,
                privat eller bekymringsfullt.
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
        </section>
      ) : (
        <Card className="p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-slate">
              Gå gjennom alle seks situasjonene for å åpne resten av delen.
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
