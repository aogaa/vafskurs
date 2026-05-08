import { useMemo, useState } from "react";
import type { CourseModule } from "../../data/courseModules";
import {
  moduleFourTrustCases,
  trustLevels,
  type TrustCase,
  type TrustLevel,
} from "../../data/moduleFourTrustCases";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

const REQUIRED_CASES = 8;
const REQUIRED_MASTERY = 4;

type ModuleFourProps = {
  courseModule: CourseModule;
  isComplete: boolean;
  onComplete: () => void;
};

type TrustChoice = {
  caseId: string;
  level: TrustLevel;
};

type MasteryQuestion = {
  id: string;
  question: string;
  correctOptionId: string;
  options: Array<{
    id: string;
    text: string;
    feedback: string;
  }>;
};

const checklistItems = [
  "Jeg skal behandle private opplysninger med respekt.",
  "Jeg deler ikke personlige opplysninger med uvedkommende.",
  "Taushet betyr ikke at jeg må love absolutt hemmelighold.",
  "Når jeg er usikker, kan jeg be leder om veiledning.",
  "Jeg deler minst mulig, men nok til at riktig person kan følge opp.",
  "Bekymringer for liv, helse, sikkerhet, økonomisk utnyttelse eller alvorlig belastning skal ikke bæres alene.",
  "Ved akutt fare følger jeg lokal rutine og bruker riktig akuttinstans ved behov.",
  "Jeg har gjort min del når jeg sier fra gjennom riktig kanal.",
  "Jeg har ikke alltid krav på å vite hva som skjer videre.",
  "Tillit bevares best når jeg er både varsom og tydelig.",
];

const phraseGroups = [
  {
    title: "Når noen forteller noe personlig",
    phrases: [
      "Takk for at du forteller meg dette.",
      "Jeg setter pris på at du stoler på meg.",
      "Jeg skal behandle det du forteller med respekt.",
    ],
  },
  {
    title: "Når noen ber om absolutt hemmelighold",
    phrases: [
      "Jeg kan ikke love at jeg aldri sier noe videre, for noen ganger må vi be om hjelp. Men jeg lover at jeg ikke deler mer enn nødvendig, og at jeg bruker riktig vei.",
      "Jeg hører at dette er viktig for deg. Hvis dette handler om trygghet eller fare, må jeg ta det videre til leder slik at du ikke står alene med det.",
    ],
  },
  {
    title: "Når frivillig må koble på leder",
    phrases: [
      "Dette er litt mer enn jeg skal håndtere alene som frivillig. Jeg vil ta det videre til leder på en ryddig måte.",
      "Jeg vil gjerne hjelpe deg med å få dette til riktig person, men jeg kan ikke løse det alene.",
      "Jeg kommer ikke til å dele dette med uvedkommende, men jeg må ta det videre til leder.",
    ],
  },
  {
    title: "Når pårørende spør om private samtaler",
    phrases: [
      "Jeg forstår at du er bekymret, men jeg kan ikke gjengi private samtaler uten at dette er avklart.",
      "Det beste er at jeg tar spørsmålet videre til leder, så håndterer vi det på riktig måte.",
    ],
  },
  {
    title: "Når frivillig trenger støtte etterpå",
    phrases: [
      "Jeg trenger å snakke med leder om en situasjon som gjorde inntrykk på meg.",
      "Jeg er usikker på om dette er noe jeg skal ta videre, og trenger veiledning.",
    ],
  },
];

const masteryQuestions: MasteryQuestion[] = [
  {
    id: "hovedregel",
    question: "Hva er hovedregelen når du får vite noe privat som frivillig?",
    correctOptionId: "b",
    options: [
      {
        id: "a",
        text: "Jeg kan dele historien hvis jeg ikke bruker navn.",
        feedback:
          "Selv uten navn kan private opplysninger gjenkjennes eller bli feil å dele.",
      },
      {
        id: "b",
        text: "Jeg deler det ikke med uvedkommende, og tar det bare videre hvis det er nødvendig.",
        feedback:
          "Riktig. Fortrolighet handler om respekt, og videreformidling skal bare skje når riktig person faktisk trenger informasjonen.",
      },
      {
        id: "c",
        text: "Jeg må alltid fortelle leder alt jeg får vite.",
        feedback:
          "Ikke alt må videre. Mennesker skal kunne dele personlige ting uten at alt blir en sak.",
      },
    ],
  },
  {
    id: "hemmelighold",
    question:
      "Hva gjør du hvis noen forteller noe alvorlig og ber deg love å aldri si det videre?",
    correctOptionId: "b",
    options: [
      {
        id: "a",
        text: "Jeg lover absolutt hemmelighold for å bevare tilliten.",
        feedback:
          "Det kan kjennes omsorgsfullt, men alvorlige bekymringer skal ikke bæres alene.",
      },
      {
        id: "b",
        text: "Jeg lover ikke absolutt hemmelighold, men forklarer rolig at alvorlige bekymringer må tas videre til riktig person.",
        feedback:
          "Riktig. Du kan være varsom og respektfull uten å love mer taushet enn du kan holde.",
      },
      {
        id: "c",
        text: "Jeg avslutter samtalen så jeg slipper å få vite mer.",
        feedback:
          "Du kan lytte rolig. Poenget er å ikke stå alene hvis innholdet er alvorlig.",
      },
    ],
  },
  {
    id: "nok-informasjon",
    question: "Hvor mye bør du dele med leder ved en bekymring?",
    correctOptionId: "a",
    options: [
      {
        id: "a",
        text: "Minst mulig, men nok til at leder kan forstå og følge opp.",
        feedback:
          "Riktig. God videreformidling er konkret, rolig og begrenset til det som trengs.",
      },
      {
        id: "b",
        text: "Hele samtalen, slik at leder får alle detaljer.",
        feedback:
          "Som regel trenger leder ikke hele samtalen. Del det som er nødvendig for vurdering og oppfølging.",
      },
      {
        id: "c",
        text: "Så lite som mulig, helst uten å forklare hva bekymringen gjelder.",
        feedback:
          "Leder må få nok informasjon til å forstå hva som bør følges opp.",
      },
    ],
  },
  {
    id: "etterpa",
    question:
      "Hvorfor får du ikke alltid vite hva som skjer videre etter at du har meldt en bekymring?",
    correctOptionId: "c",
    options: [
      {
        id: "a",
        text: "Fordi bekymringen sannsynligvis ikke var viktig nok.",
        feedback:
          "Manglende detaljer tilbake betyr ikke at bekymringen ble ignorert.",
      },
      {
        id: "b",
        text: "Fordi frivillige ikke skal bry seg etter at de har sagt fra.",
        feedback:
          "Du kan fortsatt bry deg og be om støtte for din egen del, men du har ikke krav på alle detaljer.",
      },
      {
        id: "c",
        text: "Fordi andre kan være bundet av taushetsplikt, og fordi jeg ikke alltid trenger detaljer for å ha gjort min del.",
        feedback:
          "Riktig. Når riktig kanal er brukt, ligger videre vurdering hos dem som har ansvar og myndighet.",
      },
    ],
  },
  {
    id: "akutt",
    question: "Hva gjør du hvis du tror det kan være akutt fare?",
    correctOptionId: "b",
    options: [
      {
        id: "a",
        text: "Jeg venter og tar det med leder neste gang vi møtes.",
        feedback:
          "Akutt fare kan ikke vente til neste møte eller neste kontordag.",
      },
      {
        id: "b",
        text: "Jeg følger lokal akutt rutine og bruker riktig akuttinstans ved behov.",
        feedback:
          "Riktig. Ved fare for liv, helse eller sikkerhet må handling skje raskt etter lokal rutine.",
      },
      {
        id: "c",
        text: "Jeg lover personen å ikke si noe, siden tillit er viktigst.",
        feedback:
          "Tillit er viktig, men akutt fare må håndteres raskt og riktig.",
      },
    ],
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

function activateOnKeyboard(
  event: React.KeyboardEvent<HTMLButtonElement>,
  action: () => void,
) {
  if (event.key !== "Enter" && event.key !== " " && event.key !== "Spacebar") {
    return;
  }

  event.preventDefault();
  action();
}

function TrustCompass({ choices }: { choices: TrustChoice[] }) {
  const counts = trustLevels.map((level) => ({
    ...level,
    count: choices.filter((choice) => {
      const trustCase = moduleFourTrustCases.find((item) => item.id === choice.caseId);
      return trustCase?.correctLevel === level.id;
    }).length,
  }));

  return (
    <section
      className="rounded-[2rem] border border-harbor/10 bg-harbor p-6 text-white shadow-soft"
      aria-labelledby="trust-compass-title"
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
            <p className="text-sm font-bold uppercase tracking-normal text-pine">
            Fire nivåer
          </p>
          <h2 id="trust-compass-title" className="mt-2 text-3xl font-extrabold">
            Hva gjør jeg med det jeg vet?
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-white/78">
            Kompasset hjelper deg å skille mellom det som kan bli hos deg, det
            du kan be om råd om, det leder må vite, og det som kan kreve rask
            handling.
          </p>
        </div>
        <p className="w-fit rounded-2xl bg-white/10 px-4 py-2 text-sm font-bold text-pine">
          {choices.length} av {moduleFourTrustCases.length} situasjoner vurdert
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {counts.map((level, index) => (
          <article
            key={level.id}
            className="rounded-3xl border border-white/12 bg-white/8 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-normal text-pine">
                  Nivå {index + 1}
                </p>
                <h3 className="mt-2 text-xl font-bold">{level.title}</h3>
              </div>
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-base font-black text-harbor">
                {level.letter}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/76">{level.action}</p>
            <p className="mt-4 text-sm font-bold text-pine">
              {level.count} {level.count === 1 ? "kort funnet" : "kort funnet"}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function TrustCaseCard({
  choice,
  onChoose,
  trustCase,
}: {
  choice?: TrustChoice;
  onChoose: (level: TrustLevel) => void;
  trustCase: TrustCase;
}) {
  const chosenLevel = choice
    ? trustLevels.find((level) => level.id === choice.level)
    : undefined;
  const correctLevel = trustLevels.find((level) => level.id === trustCase.correctLevel)!;
  const aligned = choice?.level === trustCase.correctLevel;

  return (
    <Card className="overflow-hidden p-0">
      <div className="h-2 bg-gradient-to-r from-harbor via-fjord to-pine" />
      <div className="grid gap-0 lg:grid-cols-[1fr_0.85fr]">
        <div className="bg-gradient-to-br from-harbor to-fjord p-7 text-white md:p-8">
          <p className="text-sm font-bold uppercase tracking-normal text-pine">
            Fortrolighetsmappe
          </p>
          <h3 className="mt-3 text-3xl font-extrabold leading-tight">{trustCase.title}</h3>
          <p className="mt-5 rounded-3xl bg-white/10 p-5 text-lg font-semibold leading-8 text-white/88">
            {trustCase.situation}
          </p>
          <div className="mt-5 grid grid-cols-4 gap-2" aria-hidden="true">
            {trustLevels.map((level) => (
              <span
                key={level.id}
                className={`h-2 rounded-full ${
                  choice?.level === level.id ? "bg-pine" : "bg-white/22"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="p-7 md:p-8">
          <fieldset>
            <legend className="text-base font-bold text-harbor">
              Hva gjør du med det du får vite?
            </legend>
            <div className="mt-4 grid gap-3">
              {trustLevels.map((level) => {
                const selected = choice?.level === level.id;
                return (
                  <button
                    key={level.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => onChoose(level.id)}
                    onKeyDown={(event) =>
                      activateOnKeyboard(event, () => onChoose(level.id))
                    }
                    className={`min-h-14 rounded-2xl border px-4 py-4 text-left transition focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine motion-safe:hover:-translate-y-0.5 ${
                      selected
                        ? `${level.classes} shadow-soft`
                        : "border-harbor/12 bg-white text-harbor hover:border-pine/60 hover:bg-mist"
                    }`}
                  >
                    <span className="flex items-start gap-3">
                      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-harbor text-sm font-black text-white">
                        {level.letter}
                      </span>
                      <span>
                        <span className="block text-base font-black">
                          {level.shortTitle}
                        </span>
                        <span className="mt-1 block text-sm font-semibold leading-6">
                          {level.description}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {choice && chosenLevel ? (
            <section
              className={`mt-6 rounded-3xl border p-5 ${correctLevel.classes}`}
              aria-live="polite"
            >
              <p className="text-sm font-bold uppercase tracking-normal">
                {aligned ? "Trygg vurdering" : "Se kompasset en gang til"}
              </p>
              <p className="mt-2 text-base font-bold leading-7">
                {aligned
                  ? `Dette hører hjemme i: ${correctLevel.title}.`
                  : `Du valgte ${chosenLevel.shortTitle}. Her er trygg håndtering: ${correctLevel.shortTitle}.`}
              </p>
              <p className="mt-3 text-base font-semibold leading-8">
                {trustCase.feedback}
              </p>
            </section>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

function MasteryCheck({
  answers,
  onAnswer,
}: {
  answers: Record<string, string>;
  onAnswer: (questionId: string, optionId: string) => void;
}) {
  const correctCount = masteryQuestions.filter(
    (question) => answers[question.id] === question.correctOptionId,
  ).length;

  return (
    <Card className="p-7 md:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-normal text-leaf">
            Mestringssjekk
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-ink">
            Har du trygg nok retning?
          </h2>
        </div>
        <p className="w-fit rounded-2xl bg-mist px-4 py-2 text-sm font-bold text-harbor">
          {correctCount} av {masteryQuestions.length} trygge svar
        </p>
      </div>
      <div className="mt-6 grid gap-5">
        {masteryQuestions.map((question, index) => {
          const selectedOptionId = answers[question.id];
          const selectedOption = question.options.find(
            (option) => option.id === selectedOptionId,
          );
          const isCorrect = selectedOptionId === question.correctOptionId;

          return (
            <section
              key={question.id}
              className="rounded-3xl border border-harbor/8 bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-bold leading-7 text-ink">
                {index + 1}. {question.question}
              </h3>
              <div className="mt-4 grid gap-3">
                {question.options.map((option) => {
                  const selected = selectedOptionId === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => onAnswer(question.id, option.id)}
                      onKeyDown={(event) =>
                        activateOnKeyboard(event, () => onAnswer(question.id, option.id))
                      }
                      className={`min-h-14 rounded-2xl border px-5 py-4 text-left text-base font-semibold leading-7 transition focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine ${
                        selected
                          ? isCorrect
                            ? "border-pine bg-pine/14 text-harbor"
                            : "border-honey/55 bg-honey/18 text-harbor"
                          : "border-harbor/12 bg-white text-harbor hover:border-pine/60 hover:bg-mist"
                      }`}
                    >
                      {option.text}
                    </button>
                  );
                })}
              </div>
              {selectedOption ? (
                <p
                  className="mt-4 rounded-2xl bg-mist p-4 text-base font-semibold leading-7 text-harbor"
                  aria-live="polite"
                >
                  {selectedOption.feedback}
                </p>
              ) : null}
            </section>
          );
        })}
      </div>
    </Card>
  );
}

export function ModuleFour({ courseModule, isComplete, onComplete }: ModuleFourProps) {
  const [choices, setChoices] = useState<TrustChoice[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [masteryAnswers, setMasteryAnswers] = useState<Record<string, string>>({});

  const currentCase = moduleFourTrustCases[currentIndex];
  const currentChoice = choices.find((choice) => choice.caseId === currentCase.id);
  const assessedCount = choices.length;
  const checklistUnlocked = assessedCount >= REQUIRED_CASES;
  const correctMasteryCount = masteryQuestions.filter(
    (question) => masteryAnswers[question.id] === question.correctOptionId,
  ).length;
  const masteryComplete =
    Object.keys(masteryAnswers).length === masteryQuestions.length &&
    correctMasteryCount >= REQUIRED_MASTERY;
  const canComplete = checklistUnlocked && masteryComplete;

  const correctChoicesCount = useMemo(
    () =>
      choices.filter((choice) => {
        const trustCase = moduleFourTrustCases.find((item) => item.id === choice.caseId);
        return trustCase?.correctLevel === choice.level;
      }).length,
    [choices],
  );

  function chooseLevel(level: TrustLevel) {
    setChoices((current) => {
      const existing = current.find((choice) => choice.caseId === currentCase.id);
      if (existing) {
        return current.map((choice) =>
          choice.caseId === currentCase.id ? { ...choice, level } : choice,
        );
      }

      return [...current, { caseId: currentCase.id, level }];
    });
  }

  function goToNextCase() {
    setCurrentIndex((index) => Math.min(index + 1, moduleFourTrustCases.length - 1));
  }

  function goToPreviousCase() {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }

  function answerMastery(questionId: string, optionId: string) {
    setMasteryAnswers((current) => ({ ...current, [questionId]: optionId }));
  }

  return (
    <article className="space-y-8">
      <header className="overflow-hidden rounded-[2rem] border border-harbor/8 bg-white shadow-soft">
        <div className="h-2 bg-gradient-to-r from-harbor via-fjord to-pine" />
        <div className="grid gap-8 p-7 md:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-leaf">
              Del {courseModule.order}
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight text-ink md:text-5xl">
              Taushet, tillit og bekymring
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-slate">
              Når mennesker viser deg tillit, trenger du et praktisk kompass:
              Hva kan bli fortrolig, hva kan du be om veiledning på, hva må
              leder vite, og hva kan ikke vente?
            </p>
          </div>
          <div className="rounded-3xl bg-harbor p-5 text-white shadow-soft">
            <p className="text-sm font-bold uppercase tracking-normal text-pine">
              Hovedbudskap
            </p>
            <p className="mt-3 max-w-sm text-xl font-bold leading-8">
              Del minst mulig, men nok. Bruk riktig person, riktig vei og riktig
              tempo.
            </p>
          </div>
        </div>
      </header>

      <LearningSection eyebrow="Tillit" title="Tillit er grunnmuren">
        <p>
          Når du er frivillig, kan mennesker fortelle deg ting de ikke sier til
          så mange andre. Det kan være små hverdagslige ting, minner fra et
          langt liv, bekymringer, savn, skam, konflikter eller tanker de har
          båret på lenge.
        </p>
        <p>
          Det skjer fordi du møter dem som menneske. Tillit vokser ofte når noen
          har tid til å lytte og være til stede.
        </p>
        <p>
          Å være til å stole på betyr ikke at du skal bære alt alene. Det betyr
          at du ikke deler private opplysninger unødvendig, at du ikke forteller
          videre til uvedkommende, og at du bare kobler på riktig person når det
          faktisk trengs.
        </p>
        <p className="rounded-3xl bg-mist p-5 font-bold text-harbor">
          Noen ting skal bli mellom deg og den du møter. Andre ting bør du be
          leder om råd om. Noen bekymringer må tas videre. Og noen få
          situasjoner kan være så alvorlige at de må håndteres raskt etter lokal
          rutine.
        </p>
      </LearningSection>

      <LearningSection eyebrow="Fortrolighet" title="Taushet er ikke absolutt hemmelighold">
        <p>
          Som frivillig får du ofte innblikk i menneskers private liv. Det kan
          være informasjon om helse, familie, økonomi, ensomhet, konflikter,
          sorg, tro, livsvalg eller ting personen synes er vanskelig.
        </p>
        <p className="rounded-3xl bg-harbor p-5 text-xl font-bold leading-8 text-white">
          Du skal ikke dele private opplysninger med andre som ikke trenger å
          vite det.
        </p>
        <p>
          Det gjelder også hvis historien er rørende, spennende, trist eller
          lærerik. Selv gode intensjoner kan bli feil hvis et menneskes privatliv
          blir gjort til samtaleemne for andre.
        </p>
        <p>
          Men taushet betyr ikke at du må love absolutt hemmelighold. Hvis noen
          forteller deg noe som gjør deg bekymret for liv, helse, sikkerhet
          eller alvorlig belastning, skal du ikke stå alene med det. Da skal du
          bruke riktig vei videre, som regel leder.
        </p>
      </LearningSection>

      <TrustCompass choices={choices} />

      <LearningSection eyebrow="Del klokt" title="Del minst mulig, men nok">
        <p>
          Når du tar noe videre til leder, trenger du ikke fortelle alt. Du skal
          ikke gjengi hele samtalen hvis det ikke er nødvendig. Fortell det som
          gjør at leder kan forstå situasjonen og vurdere riktig oppfølging.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            "Hva har du sett?",
            "Hva har du hørt?",
            "Hva gjør deg bekymret?",
            "Er det akutt?",
            "Hva har du allerede gjort?",
          ].map((question) => (
            <p
              key={question}
              className="rounded-2xl bg-mist px-4 py-3 font-bold text-harbor"
            >
              {question}
            </p>
          ))}
        </div>
      </LearningSection>

      <section className="space-y-5" aria-labelledby="trust-test-title">
        <div className="flex flex-col gap-4 rounded-[2rem] bg-white p-5 shadow-soft lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-leaf">
              Tillitstesten
            </p>
            <h2 id="trust-test-title" className="mt-1 text-3xl font-extrabold text-ink">
              Hva gjør du med det du får vite?
            </h2>
            <p className="mt-2 max-w-2xl text-base leading-7 text-slate">
              Vurder fortrolighetsmappen. Målet er trygg dømmekraft, ikke å bli
              redd for vanskelige samtaler.
            </p>
          </div>
          <div className="min-w-52">
            <p className="text-sm font-bold text-harbor">
              {assessedCount} av {moduleFourTrustCases.length} situasjoner
              vurdert
            </p>
            <div
              className="mt-2 h-3 overflow-hidden rounded-full bg-mist"
              role="progressbar"
              aria-label="Vurderte situasjoner i Tillitstesten"
              aria-valuemin={0}
              aria-valuemax={moduleFourTrustCases.length}
              aria-valuenow={assessedCount}
            >
              <div
                className="h-full rounded-full bg-pine transition-all duration-500 motion-reduce:transition-none"
                style={{
                  width: `${(assessedCount / moduleFourTrustCases.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-leaf">
              Situasjonskort
            </p>
            <h3 className="mt-1 text-2xl font-bold text-ink">
              Situasjon {currentIndex + 1} av {moduleFourTrustCases.length}
            </h3>
          </div>
          <p className="w-fit rounded-2xl bg-mist px-4 py-2 text-sm font-bold text-harbor">
            {correctChoicesCount} trygge vurderinger funnet
          </p>
        </div>

        <TrustCaseCard
          choice={currentChoice}
          onChoose={chooseLevel}
          trustCase={currentCase}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button
            onClick={goToPreviousCase}
            onKeyDown={(event) => activateOnKeyboard(event, goToPreviousCase)}
            variant="secondary"
            disabled={currentIndex === 0}
          >
            Forrige situasjon
          </Button>
          <Button
            onClick={goToNextCase}
            onKeyDown={(event) => activateOnKeyboard(event, goToNextCase)}
            disabled={!currentChoice || currentIndex === moduleFourTrustCases.length - 1}
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
              Min huskeliste for taushet, tillit og bekymring
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
              Trygge formuleringer
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

          <LearningSection
            eyebrow="Etterpå"
            title="Hvorfor du ikke alltid får vite hva som skjer videre"
          >
            <p>
              Når du har meldt en bekymring til leder, kan det hende du ikke får
              vite så mye om hva som skjer videre.
            </p>
            <p>
              Det kan føles rart. Du har kanskje vært den som oppdaget noe
              viktig, og du bryr deg om personen. Da er det naturlig å ønske å
              vite hvordan det går.
            </p>
            <p>
              Men ansatte, kommunen, helse- og omsorgstjenester og andre
              ansvarlige kan være bundet av taushetsplikt. De kan ofte ikke gi
              deg detaljer om vurderinger, tiltak, helseopplysninger,
              familieforhold eller videre oppfølging.
            </p>
            <p className="rounded-3xl bg-mist p-5 font-bold text-harbor">
              Det betyr ikke at bekymringen din ikke ble tatt på alvor. Som
              frivillig er din oppgave å si fra gjennom riktig kanal. Deretter må
              riktig ansvarlig person eller tjeneste vurdere veien videre.
            </p>
            <p>
              Du kan fortsatt be leder om støtte for din egen del, særlig hvis
              situasjonen gjorde inntrykk på deg. Men du har ikke krav på å få
              vite alt som skjer videre med personen.
            </p>
          </LearningSection>

          <MasteryCheck answers={masteryAnswers} onAnswer={answerMastery} />

          <Card className="p-7 md:p-8">
            <p className="text-sm font-bold uppercase tracking-normal text-leaf">
              Bro til Del 5
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-ink">
              Fra informasjon til gode møter
            </h2>
            <p className="mt-5 text-base leading-8 text-slate">
              Nå har du trent på hva du gjør med informasjon du får vite som
              frivillig. I neste del går vi videre til selve møtet mellom
              mennesker: hvordan du skaper gode samtaler, viser respekt, lytter
              godt og samtidig holder rollen tydelig.
            </p>
          </Card>
        </section>
      ) : (
        <Card className="p-6">
          <p className="text-base font-semibold leading-8 text-slate">
            Gjennomfør minst {REQUIRED_CASES} situasjoner for å låse opp
            huskelisten, trygge formuleringer og mestringssjekken.
          </p>
        </Card>
      )}

      <div className="flex flex-col gap-4 rounded-3xl border border-harbor/8 bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <Button to="/trygg-som-frivillig/deler" variant="secondary">
          Tilbake til deloversikt
        </Button>
        <div className="flex flex-col gap-2 sm:items-end">
          {!canComplete ? (
            <p className="text-sm font-semibold text-slate">
              Vurder minst 8 situasjoner og få minst 4 av 5 trygge svar i
              mestringssjekken for å fullføre delen.
            </p>
          ) : null}
          <Button
            onClick={onComplete}
            onKeyDown={(event) => activateOnKeyboard(event, onComplete)}
            disabled={!canComplete || isComplete}
          >
            {isComplete ? "Del er fullf?rt" : "Marker del som fullf?rt"}
          </Button>
        </div>
      </div>
    </article>
  );
}





