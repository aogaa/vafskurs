import { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import type { ModuleBodyProps } from "../../types";

/**
 * Del 3 — "Følsomme temaer og trygge grenser".
 *
 * Generelt innhold: hvorfor styre unna krig/religion/politikk, møte alle
 * likeverdig, og grensen mot skjema-/regelverkshjelp. Øvelse «Grønt eller
 * rødt?» (sortering) + refleksjon.
 *
 * Lagring (kun lokalt): spraakkafe:del-3-ovelse, spraakkafe:del-3-refleksjon
 */

const ANSWERS_STORAGE_KEY = "spraakkafe:del-3-ovelse";
const REFLECTION_STORAGE_KEY = "spraakkafe:del-3-refleksjon";

type Light = "fortsett" | "styrUnna";

type Item = {
  id: string;
  text: string;
  correct: Light;
  feedback: string;
  tryggFormulering?: string;
};

const items: Item[] = [
  {
    id: "krig",
    text: "«Samtalen begynner å gli mot krigen i et av deltakernes hjemland.»",
    correct: "styrUnna",
    feedback:
      "Krig, religion og politikk er betente tema — særlig fordi deltakere kan komme fra land i konflikt. Led samtalen vennlig over på noe mer nøytralt.",
    tryggFormulering:
      "«Det er mye som skjer i verden. — Dere nevnte mat tidligere, hva er favorittmaten fra hjemlandet ditt?»",
  },
  {
    id: "mat",
    text: "«En deltaker forteller ivrig om favorittmaten fra hjemlandet.»",
    correct: "fortsett",
    feedback:
      "Midt i blinken. Mat, hverdag og kultur er trygge og fine tema som alle kan være med på.",
  },
  {
    id: "udi",
    text: "«En deltaker ber deg hjelpe til med å fylle ut et UDI-skjema.»",
    correct: "styrUnna",
    feedback:
      "Skjemahjelp hører ikke hjemme under selve kafeen. Du kan tilby å hjelpe en annen gang — det er helt opp til deg.",
    tryggFormulering:
      "«Det hjelper jeg ikke med her på kafeen. Ønsker du hjelp, kan du ta kontakt med frivilligsentralen — de er flinke til å finne noen som kan hjelpe deg.» Har du tid og lyst, kan du også tilby å hjelpe selv en annen gang: «Snakk gjerne med meg etter kafeen, så ser vi på det sammen.»",
  },
  {
    id: "tradisjon",
    text: "«Dere prater om norske høytider og hvordan jul og 17. mai feires.»",
    correct: "fortsett",
    feedback:
      "Flott — særnorske tradisjoner er gull. Det gir språktrening og øker kulturforståelsen samtidig.",
  },
  {
    id: "religion",
    text: "«En deltaker vil diskutere religion og hvem som har rett.»",
    correct: "styrUnna",
    feedback:
      "Hold deg unna religionsdebatt. Anerkjenn at temaet er viktig for dem, og led samtalen over på noe dere har felles.",
    tryggFormulering:
      "«Det er et stort spørsmål! — Hva pleier dere å gjøre i helgene? Er det noe dere liker å gjøre som familie?»",
  },
  {
    id: "politikk",
    text: "«Samtalen dreier seg mot norsk innvandringspolitikk og hva deltakerne synes om den.»",
    correct: "styrUnna",
    feedback:
      "Politikk er et betent tema som lett kan skape splid eller ubehag rundt bordet. Led samtalen vennlig over på noe mer nøytralt.",
    tryggFormulering:
      "«Det er et stort spørsmål! — Dere nevnte mat tidligere: er det noe du savner fra hjemlandet som er vanskelig å få tak i her?»",
  },
];

const lightLabels: Record<Light, { label: string; help: string }> = {
  fortsett: { label: "Fortsett trygt", help: "Greit tema å snakke om" },
  styrUnna: { label: "Styr unna", help: "Led samtalen over på et annet tema" },
};

function readSavedAnswers(): Partial<Record<string, Light>> {
  if (typeof window === "undefined") return {};
  try {
    const value = window.localStorage.getItem(ANSWERS_STORAGE_KEY);
    const parsed = value ? JSON.parse(value) : {};
    const next: Partial<Record<string, Light>> = {};
    for (const item of items) {
      const answer = parsed[item.id];
      if (answer === "fortsett" || answer === "styrUnna") {
        next[item.id] = answer;
      }
    }
    return next;
  } catch {
    return {};
  }
}

function saveAnswers(value: Partial<Record<string, Light>>) {
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

export function DelFireGrenser({
  courseModule,
  isComplete,
  onComplete,
}: ModuleBodyProps) {
  const [answers, setAnswers] =
    useState<Partial<Record<string, Light>>>(readSavedAnswers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reflection, setReflection] = useState(readSavedReflection);

  const current = items[currentIndex];
  const selected = answers[current.id];
  const answeredCount = items.filter((i) => answers[i.id]).length;
  const hasCompletedExercise = answeredCount === items.length;
  const isCorrect = selected === current.correct;

  function choose(light: Light) {
    if (selected) return;
    setAnswers((cur) => {
      const next = { ...cur, [current.id]: light };
      saveAnswers(next);
      return next;
    });
  }

  function handleReflectionChange(value: string) {
    setReflection(value);
    saveReflection(value);
  }

  function getOptionClasses(light: Light) {
    const base =
      "min-h-24 rounded-2xl border p-4 text-left transition duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine";
    if (!selected) {
      return `${base} border-harbor/10 bg-white text-ink hover:-translate-y-0.5 hover:border-pine/55 hover:shadow-lift`;
    }
    if (light === current.correct) {
      return `${base} border-pine bg-pine/20 text-harbor ring-2 ring-pine/45`;
    }
    if (light === selected) {
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
          Følsomme temaer og trygge grenser
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-white">
          Det meste på en språkkafé er glede og gode samtaler. Noen enkle grep
          gjør det tryggere for alle.
        </p>
      </section>

      <TextSection title="Styr unna det som kan splitte" icon="🕊️">
        <p>
          Hold samtalen og tekstene unna religion, krig og politikk. Mange
          deltakere kan komme fra land som er i konflikt med andre deltakeres
          hjemland. Møt alle likeverdig, uansett bakgrunn.
        </p>
        <p>
          Du trenger ikke være streng — bare oppmerksom. Glir samtalen mot et
          betent tema, kan du vennlig lede den videre til noe dere har felles.
        </p>
      </TextSection>

      <TextSection title="Ekstra hjelp er hyggelig, men ikke på språkkafeen" icon="📄">
        <p>
          Språkkafeen er til for samtale og norskøving. Trenger en deltaker
          hjelp med jobbsøknader, brev eller andre papirer, er det noe du
          eventuelt kan tilby utenfor kafeen — ikke under selve vakten.
        </p>
        <p>
          Ønsker du å hjelpe, er det veldig fint. Vi har mange gode eksempler
          på at en frivillig har satt av litt tid til akkurat dette, og at det
          har gjort en stor forskjell. Noen deltakere har til og med fått jobb
          etter slik hjelp.
        </p>
        <p>
          Husk at hva du velger å tilby av hjelp utenfor språkkafeen, skjer på
          dine premisser. Du skal ikke føle deg forpliktet — du er frivillig!
        </p>
      </TextSection>

      <TextSection title="Pausen er en sosial frisone" icon="☕">
        <p>
          Pausen er ikke bare en pause fra norsk — den er en av de viktigste
          delene av kafeen. Kaffe og noe å bite i hører med. Ønsker du å ta
          med noe hjemmefra — epler fra hagen, hjemmebakt eller noe annet — er
          det alltid hyggelig. Husk bare at det må være nok til alle.
        </p>
        <p>
          Det er ikke krav om at deltakerne snakker norsk i pausen. Det er
          slitsomt å lære et nytt språk, og pausen er til for å puste ut og
          senke skuldrene. Mange deltakere har lite nettverk, og møtene rundt
          kaffekoppen betyr mer enn man kanskje tror. Vennskap har oppstått her
          — mellom deltakere, mellom frivillige, og noen ganger på tvers.
          Noen ganger har også deltakere funnet kjærligheten på språkkafe.
        </p>
      </TextSection>

      {/* ── Øvelse: Grønt eller rødt? ── */}
      <section className="space-y-5" aria-labelledby="lys-heading">
        <Card className="p-6 md:p-8">
          <h2
            id="lys-heading"
            className="flex items-center gap-3 text-2xl font-extrabold leading-tight text-ink md:text-3xl"
          >
            <span className="shrink-0 text-2xl md:text-3xl" aria-hidden="true">
              🚦
            </span>
            Øvelse: Grønt eller rødt?
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate md:text-lg">
            Kan du fortsette trygt, eller bør du styre unna / vise videre? Velg, og
            les begrunnelsen. Gå gjennom alle {items.length}.
          </p>

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm font-semibold text-slate">
              <span>
                Situasjon {currentIndex + 1} av {items.length}
              </span>
              <span aria-live="polite">{answeredCount} besvart</span>
            </div>
            <div
              className="mt-2 h-2 w-full overflow-hidden rounded-full bg-mist"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={items.length}
              aria-valuenow={answeredCount}
            >
              <div
                className="h-full rounded-full bg-pine transition-all duration-300"
                style={{ width: `${(answeredCount / items.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mt-6 flex min-h-24 items-center justify-center rounded-2xl bg-mist p-5 text-center text-lg font-bold text-harbor [text-wrap:balance]">
            {current.text}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {(Object.keys(lightLabels) as Light[]).map((light) => (
              <button
                key={light}
                type="button"
                onClick={() => choose(light)}
                disabled={Boolean(selected)}
                aria-pressed={selected === light}
                className={getOptionClasses(light)}
              >
                <span className="block text-lg font-bold">
                  {light === "fortsett" ? "🟢 " : "🔴 "}
                  {lightLabels[light].label}
                </span>
                <span className="mt-1 block text-sm font-medium opacity-80">
                  {lightLabels[light].help}
                </span>
              </button>
            ))}
          </div>

          {selected ? (
            <div
              className={`mt-5 rounded-2xl border p-5 animate-[fadeIn_240ms_ease-out] ${
                isCorrect ? "border-pine/55 bg-pine/20" : "border-honey/70 bg-honey/20"
              }`}
              aria-live="polite"
            >
              <p className="font-bold text-harbor">
                {isCorrect
                  ? "Riktig!"
                  : `Egentlig: ${lightLabels[current.correct].label}`}
              </p>
              <p className="mt-2 text-base leading-7 text-harbor">
                {current.feedback}
              </p>
              {current.tryggFormulering ? (
                <div className="mt-4 rounded-xl bg-white/60 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-harbor">
                    Du kan si
                  </p>
                  <p className="mt-1 text-base leading-7 text-harbor">
                    {current.tryggFormulering}
                  </p>
                </div>
              ) : null}
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
            {currentIndex < items.length - 1 ? (
              <Button
                onClick={() => setCurrentIndex((i) => Math.min(i + 1, items.length - 1))}
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
              Du kjenner grensene som gjør kafeen trygg
            </h2>
            <p className="mt-3 text-base leading-8 text-harbor md:text-lg">
              Hold deg unna betente tema, møt alle likeverdig, og husk at hjelp
              med skjemaer skjer utenfor kafeen — aldri under vakten. Da er du
              en trygg frivillig — for deltakerne, for deg selv og for
              organisasjonen.
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <label htmlFor="del-4-refleksjon" className="block text-lg font-bold text-ink">
              Kort refleksjon: Hvordan vil du vennlig lede samtalen videre hvis et
              betent tema dukker opp?
            </label>
            <textarea
              id="del-4-refleksjon"
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
            Gå gjennom alle {items.length} situasjonene i øvelsen for å fullføre
            delen.
          </p>
        </Card>
      )}
    </article>
  );
}
