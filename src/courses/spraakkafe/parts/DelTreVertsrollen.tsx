import { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import type { ModuleBodyProps } from "../../types";

/**
 * Del 3 — "Vertsrollen – samtalen ved bordet".
 *
 * Generelt innhold: ta imot, struktur, bruke teksten som trampolin, håndtere
 * ulikt nivå og være til stede. Øvelse «Hva gjør du ved bordet?» (scenarioer
 * med tre valg) + refleksjon.
 *
 * Lagring (kun lokalt): spraakkafe:del-3-ovelse, spraakkafe:del-3-refleksjon
 */

const ANSWERS_STORAGE_KEY = "spraakkafe:del-3-ovelse";
const REFLECTION_STORAGE_KEY = "spraakkafe:del-3-refleksjon";

type Option = {
  id: string;
  text: string;
  correct: boolean;
  feedback: string;
};

type Scenario = {
  id: string;
  situation: string;
  options: Option[];
  tryggFormulering: string;
};

const scenarios: Scenario[] = [
  {
    id: "dominans",
    situation:
      "Ved bordet ditt er det én som snakker hele tiden. De andre kommer nesten ikke til orde.",
    options: [
      {
        id: "a",
        text: "La ham fortsette — det er jo fint at noen holder praten i gang.",
        correct: false,
        feedback:
          "Da mister de andre muligheten til å øve. Målet er at alle ved bordet skal få snakke.",
      },
      {
        id: "b",
        text: "Takk for innspillet, og vend deg vennlig til en annen: «Så spennende, Ahmad. Hva tenker du, Fatima?»",
        correct: true,
        feedback:
          "Akkurat. Du anerkjenner den som prater, og åpner samtidig døren for noen andre.",
      },
      {
        id: "c",
        text: "Be ham om å være stille en stund.",
        correct: false,
        feedback:
          "For direkte — det kan oppleves som en irettesettelse. Inviter heller andre inn på en varm måte.",
      },
    ],
    tryggFormulering: "«Så spennende, Ahmad. Fatima, har du opplevd noe lignende?»",
  },
  {
    id: "stille",
    situation: "En deltaker sier nesten ingenting og ser litt usikker ut.",
    options: [
      {
        id: "a",
        text: "La henne være i fred — hun snakker når hun er klar.",
        correct: false,
        feedback:
          "Litt oppmerksomhet hjelper. Et trygt, enkelt spørsmål senker terskelen for å si noe.",
      },
      {
        id: "b",
        text: "Still et enkelt spørsmål hun lett kan svare på, og smil: «Liker du kaffe eller te, Amina?»",
        correct: true,
        feedback:
          "Fint. Et lukket, lavterskel spørsmål gir en trygg start — så kan dere bygge videre.",
      },
      {
        id: "c",
        text: "Spør henne hvorfor hun er så stille.",
        correct: false,
        feedback:
          "Det kan oppleves som press. Gjør det heller lett å si noe lite først.",
      },
    ],
    tryggFormulering: "«Amina, liker du kaffe eller te? … Å, te — det gjør jeg også!»",
  },
  {
    id: "nivaaforskjell",
    situation:
      "Ved bordet er det stor nivåforskjell: én er fersk nybegynner, en annen snakker nesten flytende.",
    options: [
      {
        id: "a",
        text: "Snakk på et middels nivå og håp begge henger med.",
        correct: false,
        feedback:
          "Da faller ofte nybegynneren av. Du kan tilpasse til begge samtidig ved hjelp av teksten.",
      },
      {
        id: "b",
        text: "Bruk teksten i ulikt tempo: la den viderekomne lese, hjelp nybegynneren med enkle ord, og still spørsmål på begge nivåer.",
        correct: true,
        feedback:
          "Nettopp. Teksten lar deg møte begge der de er, og de kan til og med hjelpe hverandre.",
      },
      {
        id: "c",
        text: "Be den flinke om å flytte til et annet bord.",
        correct: false,
        feedback:
          "Unødvendig — og det kan såre. Ulike nivåer kan fint sitte sammen.",
      },
    ],
    tryggFormulering:
      "«Kan du lese dette avsnittet høyt? … Og dette ordet her, vet du hva det betyr?»",
  },
  {
    id: "stillhet",
    situation: "Det blir pinlig stille ved bordet. Ingen sier noe.",
    options: [
      {
        id: "a",
        text: "Fyll stillheten ved å fortelle om noe du selv er opptatt av.",
        correct: false,
        feedback:
          "Da blir det du som øver. La heller teksten gi dem noe å snakke om.",
      },
      {
        id: "b",
        text: "Bruk teksten som trampolin og still et åpent spørsmål: «Har dere noe lignende der dere kommer fra?»",
        correct: true,
        feedback:
          "Bra. Teksten er et trygt utgangspunkt, og et åpent spørsmål får praten i gang igjen.",
      },
      {
        id: "c",
        text: "Avslutt bordet tidlig.",
        correct: false,
        feedback:
          "Stillhet er helt normalt. Et åpent spørsmål løser det som regel.",
      },
    ],
    tryggFormulering:
      "«I teksten feirer de 17. mai. Har dere en lignende festdag der dere kommer fra?»",
  },
  {
    id: "tempo",
    situation: "Du merker at du snakker fort og bruker noen dialektord.",
    options: [
      {
        id: "a",
        text: "Fortsett som før — de må venne seg til ekte norsk.",
        correct: false,
        feedback:
          "På kafeen er målet at alle henger med. Tydelig, bokmålsnært språk hjelper.",
      },
      {
        id: "b",
        text: "Senk tempoet, bruk vanlige ord, og sjekk innimellom om de henger med.",
        correct: true,
        feedback:
          "Akkurat. Rolig tempo og vanlige ord gjør deg mye lettere å forstå.",
      },
      {
        id: "c",
        text: "Bytt til engelsk for å være sikker.",
        correct: false,
        feedback:
          "Målet er å øve på norsk. Forenkle heller norsken din i stedet for å bytte språk.",
      },
    ],
    tryggFormulering: "«Jeg snakker kanskje litt fort — si ifra hvis jeg skal gjenta noe.»",
  },
];

function readSavedAnswers(): Partial<Record<string, string>> {
  if (typeof window === "undefined") return {};
  try {
    const value = window.localStorage.getItem(ANSWERS_STORAGE_KEY);
    const parsed = value ? JSON.parse(value) : {};
    const next: Partial<Record<string, string>> = {};
    for (const scenario of scenarios) {
      const answer = parsed[scenario.id];
      if (scenario.options.some((o) => o.id === answer)) {
        next[scenario.id] = answer;
      }
    }
    return next;
  } catch {
    return {};
  }
}

function saveAnswers(value: Partial<Record<string, string>>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(value));
}

function readSavedReflection(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(REFLECTION_STORAGE_KEY) ?? "";
}

function saveReflection(value: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(REFLECTION_STORAGE_KEY, value);
}

function TextSection({
  children,
  title,
  icon,
}: {
  children: React.ReactNode;
  title: string;
  icon?: string;
}) {
  return (
    <Card className="border-l-4 border-pine/40 p-6 md:p-8">
      <h2 className="flex items-center gap-3 text-2xl font-extrabold leading-tight text-ink md:text-3xl">
        {icon ? (
          <span className="shrink-0 text-2xl md:text-3xl" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        {title}
      </h2>
      <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-slate md:text-lg">
        {children}
      </div>
    </Card>
  );
}

export function DelTreVertsrollen({
  courseModule,
  isComplete,
  onComplete,
}: ModuleBodyProps) {
  const [answers, setAnswers] =
    useState<Partial<Record<string, string>>>(readSavedAnswers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reflection, setReflection] = useState(readSavedReflection);

  const current = scenarios[currentIndex];
  const selectedId = answers[current.id];
  const selectedOption = current.options.find((o) => o.id === selectedId);
  const answeredCount = scenarios.filter((s) => answers[s.id]).length;
  const hasCompletedExercise = answeredCount === scenarios.length;

  function choose(optionId: string) {
    if (selectedId) return;
    setAnswers((cur) => {
      const next = { ...cur, [current.id]: optionId };
      saveAnswers(next);
      return next;
    });
  }

  function handleReflectionChange(value: string) {
    setReflection(value);
    saveReflection(value);
  }

  function getOptionClasses(option: Option) {
    const base =
      "block w-full rounded-2xl border p-4 text-left transition duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine";
    if (!selectedId) {
      return `${base} border-harbor/10 bg-white text-ink hover:-translate-y-0.5 hover:border-pine/55 hover:shadow-lift`;
    }
    if (option.correct) {
      return `${base} border-pine bg-pine/20 text-harbor ring-2 ring-pine/45`;
    }
    if (option.id === selectedId) {
      return `${base} border-red-400 bg-red-50 text-red-950 ring-2 ring-red-200`;
    }
    return `${base} border-harbor/10 bg-mist text-harbor`;
  }

  return (
    <article className="space-y-8">
      <section className="rounded-3xl bg-harbor px-7 py-9 shadow-soft md:px-8 md:py-10">
        <p className="text-sm font-bold uppercase tracking-normal text-pine">
          Del {courseModule.order} &middot; Slik lager vi språkkafe
        </p>
        <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
          Vertsrollen – samtalen ved bordet
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-white">
          Din viktigste oppgave er å få praten i gang — og så slippe den litt
          løs, slik at deltakerne får øve seg.
        </p>
      </section>

      <TextSection title="Ta godt imot og gi en enkel ramme" icon="👋">
        <p>
          Ønsk velkommen og la gjerne deltakerne skrive navnet sitt på et ark som
          settes opp, så alle ser hvem som er hvem. En tydelig, enkel ramme gjør
          at skuldrene senker seg: «Vi leser teksten, så ser vi på ord dere lurer
          på, og så prater vi sammen.»
        </p>
        <p>
          Du trenger ikke en perfekt plan. Du trenger en rolig start og en
          forutsigbar rekkefølge.
        </p>
      </TextSection>

      <TextSection title="Bruk teksten som en trampolin" icon="📖">
        <p>
          Tekstene handler gjerne om hverdagen og særnorske ting, så det er lett å
          knytte dem til deltakernes egne erfaringer. Les sammen, men la teksten
          være et springbrett til friere samtale — ikke en prøve.
        </p>
        <p>
          Still åpne spørsmål: «Har dere noe lignende der dere kommer fra?» Slike
          spørsmål gir alle noe å snakke om.
        </p>
      </TextSection>

      <TextSection title="Inkluder alle – og vær til stede" icon="🤝">
        <p>
          Hold samtalenivået slik at alle kan delta. Snakk i rolig tempo, ikke for
          mye selv, og pass på at ikke én eller to tar over. Den som er stille
          trenger en lav terskel for å si noe; den som dominerer kan vennlig
          ledes til å gi plass.
        </p>
        <p>
          Se og lytt deg inn i situasjonen, og juster underveis hvis gruppen
          trenger noe annet enn det du planla. Vennlighet og litt humor kommer
          alltid godt med.
        </p>
      </TextSection>

      {/* ── Øvelse: Hva gjør du ved bordet? ── */}
      <section className="space-y-5" aria-labelledby="bord-heading">
        <Card className="p-6 md:p-8">
          <h2
            id="bord-heading"
            className="flex items-center gap-3 text-2xl font-extrabold leading-tight text-ink md:text-3xl"
          >
            <span className="shrink-0 text-2xl md:text-3xl" aria-hidden="true">
              🎭
            </span>
            Øvelse: Hva gjør du ved bordet?
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate md:text-lg">
            Velg det grepet du mener er best i hver situasjon. Du får en
            begrunnelse og et forslag til en trygg formulering. Gå gjennom alle{" "}
            {scenarios.length}.
          </p>

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm font-semibold text-slate">
              <span>
                Situasjon {currentIndex + 1} av {scenarios.length}
              </span>
              <span aria-live="polite">{answeredCount} besvart</span>
            </div>
            <div
              className="mt-2 h-2 w-full overflow-hidden rounded-full bg-mist"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={scenarios.length}
              aria-valuenow={answeredCount}
            >
              <div
                className="h-full rounded-full bg-pine transition-all duration-300"
                style={{ width: `${(answeredCount / scenarios.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mt-6 flex min-h-24 items-center justify-center rounded-2xl bg-mist p-5 text-center text-lg font-bold text-harbor [text-wrap:balance]">
            {current.situation}
          </div>

          <div className="mt-5 space-y-3">
            {current.options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => choose(option.id)}
                disabled={Boolean(selectedId)}
                aria-pressed={selectedId === option.id}
                className={getOptionClasses(option)}
              >
                <span className="block text-base font-semibold leading-7">
                  {option.text}
                </span>
                {selectedId ? (
                  <span className="mt-2 block text-sm leading-6 opacity-90">
                    {option.feedback}
                  </span>
                ) : null}
              </button>
            ))}
          </div>

          {selectedOption ? (
            <div
              className={`mt-5 rounded-2xl border p-5 animate-[fadeIn_240ms_ease-out] ${
                selectedOption.correct
                  ? "border-pine/55 bg-pine/20"
                  : "border-honey/70 bg-honey/20"
              }`}
              aria-live="polite"
            >
              <p className="font-bold text-harbor">
                {selectedOption.correct ? "Godt valg!" : "Tenk litt videre"}
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-normal text-harbor">
                Trygg formulering
              </p>
              <p className="mt-1 text-base leading-7 text-harbor [text-wrap:balance]">
                {current.tryggFormulering}
              </p>
            </div>
          ) : null}

          <div className="mt-6 flex items-center justify-between gap-3">
            <Button
              variant="secondary"
              onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
              disabled={currentIndex === 0}
            >
              ← Forrige
            </Button>
            {currentIndex < scenarios.length - 1 ? (
              <Button
                onClick={() =>
                  setCurrentIndex((i) => Math.min(i + 1, scenarios.length - 1))
                }
                className="bg-pine text-harbor hover:bg-leaf"
              >
                Neste →
              </Button>
            ) : null}
          </div>
        </Card>
      </section>

      {hasCompletedExercise ? (
        <section className="space-y-6 animate-[fadeIn_240ms_ease-out]" aria-live="polite">
          <Card className="border border-pine/45 bg-pine/20 p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-harbor">
              Du har øvd på de viktigste grepene
            </h2>
            <p className="mt-3 text-base leading-8 text-harbor md:text-lg">
              Få praten i gang, inkluder alle, hold rolig tempo og bruk teksten
              som utgangspunkt. Resten løser seg ofte med vennlighet og litt tid.
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <label htmlFor="del-3-refleksjon" className="block text-lg font-bold text-ink">
              Kort refleksjon: Hvilken situasjon tror du blir mest krevende for
              deg — og hva vil du prøve?
            </label>
            <textarea
              id="del-3-refleksjon"
              value={reflection}
              onChange={(event) => handleReflectionChange(event.target.value)}
              rows={4}
              placeholder="Skriv gjerne noen ord …"
              className="mt-3 w-full rounded-2xl border border-harbor/15 bg-white p-4 text-base leading-7 text-ink focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-pine"
            />
            <p className="mt-2 text-sm text-slate">
              Refleksjonen lagres bare lokalt i nettleseren din og er kun ment for
              deg.
            </p>
          </Card>

          <div className="flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-soft ring-1 ring-harbor/10 sm:flex-row sm:items-center sm:justify-between">
            <Button to="/" variant="secondary">
              Til hovedsiden
            </Button>
            <Button onClick={onComplete} className="bg-pine text-harbor hover:bg-leaf">
              {isComplete ? "✓ Fullført – gå til neste del" : "Fullfør og gå videre"}
            </Button>
          </div>
        </section>
      ) : (
        <Card className="p-5">
          <p className="text-center text-sm font-semibold text-slate" aria-live="polite">
            Gå gjennom alle {scenarios.length} situasjonene i øvelsen for å
            fullføre delen.
          </p>
        </Card>
      )}
    </article>
  );
}
