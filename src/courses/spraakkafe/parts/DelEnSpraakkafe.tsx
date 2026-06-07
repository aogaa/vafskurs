import { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import type { ModuleBodyProps } from "../../types";

/**
 * Del 1 — "Hva er en språkkafé?"
 *
 * Generelt innhold (likt for alle organisasjoner): hva en språkkafé er, hva
 * som skiller den fra et norskkurs, hvem den er for, språknivåene A/B/C og hva
 * som kreves av deg som frivillig. To interaktive øvelser + refleksjon.
 *
 * Lagring (kun lokalt, ingen personopplysninger):
 *   spraakkafe:del-1-ovelse      → svarene i sorteringsøvelsen
 *   spraakkafe:del-1-refleksjon  → fritekst-refleksjon
 */

const ANSWERS_STORAGE_KEY = "spraakkafe:del-1-ovelse";
const REFLECTION_STORAGE_KEY = "spraakkafe:del-1-refleksjon";

type Bucket = "spraakkafe" | "norskkurs";

type Statement = {
  id: string;
  text: string;
  correct: Bucket;
  feedback: string;
};

const statements: Statement[] = [
  {
    id: "grammatikk",
    text: "«Vi retter alle grammatikkfeil deltakeren gjør.»",
    correct: "norskkurs",
    feedback:
      "På språkkafeen er målet at praten skal flyte. Du retter ikke systematisk — du hjelper når noe stopper opp, og lar folk øve seg uten å være redde for å gjøre feil.",
  },
  {
    id: "helgeprat",
    text: "«Vi prater om helga, mat og norske tradisjoner.»",
    correct: "spraakkafe",
    feedback:
      "Hverdagsprat og særnorske tema er gull verdt på en språkkafé — det er lett å snakke om, og det øker kulturforståelsen samtidig.",
  },
  {
    id: "lekser",
    text: "«Deltakerne får lekser til neste gang.»",
    correct: "norskkurs",
    feedback:
      "Språkkafeen er et lavterskeltilbud uten lekser, pensum eller krav. Folk kommer for å øve på å snakke og for å bli kjent.",
  },
  {
    id: "lese-tekst",
    text: "«Vi leser en kort tekst sammen og prater om den.»",
    correct: "spraakkafe",
    feedback:
      "Slik jobber vi på en språkkafé. Teksten er ikke en prøve, men et utgangspunkt for friere samtale rundt bordet.",
  },
  {
    id: "karakterer",
    text: "«Vi gir karakterer og tester nivået formelt.»",
    correct: "norskkurs",
    feedback:
      "Ingen testing eller karakterer på en språkkafé. Du spør uformelt om nivå for å finne rett bord — det er alt.",
  },
  {
    id: "bli-kjent",
    text: "«Folk med ulik bakgrunn møtes og blir kjent over en kaffe.»",
    correct: "spraakkafe",
    feedback:
      "Det sosiale er like viktig som språket. Mange deltakere har lite nettverk, og her får de både språktrening og nye bekjentskaper.",
  },
];

const bucketLabels: Record<Bucket, { label: string; help: string }> = {
  spraakkafe: {
    label: "Språkkafé",
    help: "Lavterskel, samtale og fellesskap",
  },
  norskkurs: {
    label: "Norskkurs",
    help: "Undervisning, pensum og vurdering",
  },
};

type NivaaData = {
  id: "A" | "B" | "C";
  navn: string;
  kort: string;
  kjennetegn: string;
  eksempel: string;
  stotte: string;
};

const nivaaer: NivaaData[] = [
  {
    id: "A",
    navn: "Basisbruker (A1–A2)",
    kort: "Helt enkel norsk",
    kjennetegn:
      "Forstår og bruker enkle, dagligdagse uttrykk og helt grunnleggende fraser. Kan presentere seg selv og stille og svare på enkle spørsmål om kjente ting.",
    eksempel:
      "«Hei, jeg heter Amir. Jeg kommer fra Syria. Jeg liker å spille fotball.»",
    stotte:
      "Snakk rolig og tydelig, bruk enkle ord og vis tålmodighet. Gjenta gjerne, og bruk teksten og pekefingeren som støtte.",
  },
  {
    id: "B",
    navn: "Selvstendig bruker (B1–B2)",
    kort: "Klarer seg i det meste",
    kjennetegn:
      "Klarer seg i de fleste situasjoner, kan fortelle om erfaringer, meninger og planer i sammenhengende tale, om enn med noen feil.",
    eksempel:
      "«I helga var jeg på tur med familien. Vi gikk i skogen og grillet etterpå. Det var litt kaldt, men veldig fint.»",
    stotte:
      "Still åpne oppfølgingsspørsmål, la deltakeren fortelle mer, og introduser nye ord naturlig underveis i samtalen.",
  },
  {
    id: "C",
    navn: "Avansert bruker (C1–C2)",
    kort: "Flytende og nyansert",
    kjennetegn:
      "Uttrykker seg flytende og nyansert, forstår krevende tekster og kan diskutere abstrakte tema uten store anstrengelser.",
    eksempel:
      "«Jeg synes integrering handler like mye om at samfunnet åpner seg, som at den enkelte tilpasser seg.»",
    stotte:
      "La samtalen flyte fritt, og utfordre gjerne med litt mer abstrakte tema. Her er du først og fremst en likeverdig samtalepartner.",
  },
];

function readSavedAnswers(): Partial<Record<string, Bucket>> {
  if (typeof window === "undefined") return {};
  try {
    const value = window.localStorage.getItem(ANSWERS_STORAGE_KEY);
    const parsed = value ? JSON.parse(value) : {};
    const next: Partial<Record<string, Bucket>> = {};
    for (const statement of statements) {
      const answer = parsed[statement.id];
      if (answer === "spraakkafe" || answer === "norskkurs") {
        next[statement.id] = answer;
      }
    }
    return next;
  } catch {
    return {};
  }
}

function saveAnswers(value: Partial<Record<string, Bucket>>) {
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

// ── TextSection ──────────────────────────────────────────────────────────────

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

// ── NivaaExplorer (A/B/C) ────────────────────────────────────────────────────

function NivaaExplorer() {
  const [active, setActive] = useState<NivaaData["id"]>("A");
  const current = nivaaer.find((n) => n.id === active)!;

  return (
    <Card className="p-6 md:p-8">
      <h2 className="flex items-center gap-3 text-2xl font-extrabold leading-tight text-ink md:text-3xl">
        <span className="shrink-0 text-2xl md:text-3xl" aria-hidden="true">
          🪜
        </span>
        Språknivåene A, B og C
      </h2>
      <p className="mt-4 max-w-4xl text-base leading-8 text-slate md:text-lg">
        Nivåene følger Europarådets skala. På en språkkafé møter du som regel
        deltakere på nivå A og B, og noen ganger C. Trykk på et nivå for å se
        kjennetegn, et eksempel og hvordan du støtter best.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3" role="tablist" aria-label="Språknivå">
        {nivaaer.map((nivaa) => {
          const isActive = nivaa.id === active;
          return (
            <button
              key={nivaa.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(nivaa.id)}
              className={`rounded-2xl border p-3 text-center transition duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine ${
                isActive
                  ? "border-pine bg-pine/20 text-harbor ring-2 ring-pine/45"
                  : "border-harbor/10 bg-white text-ink hover:-translate-y-0.5 hover:border-pine/55 hover:shadow-lift"
              }`}
            >
              <span className="block text-2xl font-extrabold">{nivaa.id}</span>
              <span className="mt-1 block text-xs font-semibold sm:text-sm">
                {nivaa.kort}
              </span>
            </button>
          );
        })}
      </div>

      <div
        className="mt-5 rounded-2xl bg-mist p-5 animate-[fadeIn_240ms_ease-out] md:p-6"
        aria-live="polite"
      >
        <p className="text-sm font-bold uppercase tracking-normal text-harbor">
          Nivå {current.id} · {current.navn}
        </p>
        <p className="mt-3 text-base leading-7 text-ink">{current.kjennetegn}</p>
        <p className="mt-4 flex min-h-16 items-center justify-center rounded-2xl bg-white p-4 text-center font-bold text-harbor [text-wrap:balance]">
          {current.eksempel}
        </p>
        <p className="mt-4 text-base leading-7 text-harbor">
          <span className="font-bold">Slik støtter du: </span>
          {current.stotte}
        </p>
      </div>
    </Card>
  );
}

// ── Hovedkomponent ───────────────────────────────────────────────────────────

export function DelEnSpraakkafe({
  courseModule,
  isComplete,
  onComplete,
}: ModuleBodyProps) {
  const [answers, setAnswers] =
    useState<Partial<Record<string, Bucket>>>(readSavedAnswers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reflection, setReflection] = useState(readSavedReflection);

  const currentStatement = statements[currentIndex];
  const selected = answers[currentStatement.id];
  const answeredCount = statements.filter((s) => answers[s.id]).length;
  const hasCompletedExercise = answeredCount === statements.length;
  const isCorrect = selected === currentStatement.correct;

  function choose(bucket: Bucket) {
    if (selected) return;
    setAnswers((current) => {
      const next = { ...current, [currentStatement.id]: bucket };
      saveAnswers(next);
      return next;
    });
  }

  function handleReflectionChange(value: string) {
    setReflection(value);
    saveReflection(value);
  }

  function getOptionClasses(bucket: Bucket) {
    const base =
      "min-h-24 rounded-2xl border p-4 text-left transition duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine";
    if (!selected) {
      return `${base} border-harbor/10 bg-white text-ink hover:-translate-y-0.5 hover:border-pine/55 hover:shadow-lift`;
    }
    if (bucket === currentStatement.correct) {
      return `${base} border-pine bg-pine/20 text-harbor ring-2 ring-pine/45`;
    }
    if (bucket === selected) {
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
          Hva er en språkkafé?
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-white">
          En uformell møteplass der mennesker øver på muntlig norsk gjennom
          samtale — og blir kjent på veien.
        </p>
      </section>

      <TextSection title="En møteplass, ikke et klasserom" icon="☕">
        <p>
          En språkkafé er et lavterskeltilbud for mennesker som vil bli bedre i
          muntlig norsk. Det er ikke et norskkurs. Her er det ingen pensum, ingen
          lekser og ingen prøver — bare mennesker med ulik bakgrunn som møtes og
          øver på norsk gjennom samtale, med en frivillig som veileder og heier.
        </p>
        <p>
          Fordi alt skjer gjennom samtale, må deltakerne kunne litt norsk fra
          før — omtrent nivå A1 eller høyere. Du skal ikke undervise. Du skal få
          praten i gang og holde den trygg og inkluderende.
        </p>
      </TextSection>

      <TextSection title="Hvem kommer på språkkafeen?" icon="🌍">
        <p>
          Deltakerne er svært forskjellige. Noen har lang utdanning fra
          hjemlandet, andre har knapt gått på skole. Noen har bodd i Norge i
          mange år, andre er helt nye. Språknivået varierer mye — derfor deler vi
          gjerne inn etter nivå ved bordene.
        </p>
        <p>
          Felles for dem er at de ønsker å øve på norsk og å være en del av et
          fellesskap. For mange er språkkafeen også et viktig sosialt møtepunkt i
          en ellers ny og ukjent hverdag.
        </p>
      </TextSection>

      <TextSection title="Hva kreves av deg som frivillig?" icon="🤝">
        <p>
          Det kreves ingen faglig bakgrunn. Du må snakke godt norsk, være
          tålmodig og unngå utpregede dialektord mens du er på kafeen, slik at
          alle henger med.
        </p>
        <p>
          Vis interesse og forståelse for hvordan det er å komme til et nytt land
          og lære et nytt språk. Vær oppmuntrende og støttende — og husk at du
          møter ulike mennesker fra gang til gang. Du trenger ikke kunne alt. Du
          skal være et varmt og trygt menneske å snakke med.
        </p>
      </TextSection>

      {/* ── Øvelse 1: Språkkafé eller norskkurs? ── */}
      <section className="space-y-5" aria-labelledby="sortering-heading">
        <Card className="p-6 md:p-8">
          <h2
            id="sortering-heading"
            className="flex items-center gap-3 text-2xl font-extrabold leading-tight text-ink md:text-3xl"
          >
            <span className="shrink-0 text-2xl md:text-3xl" aria-hidden="true">
              🧭
            </span>
            Øvelse: Språkkafé eller norskkurs?
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate md:text-lg">
            Hører utsagnet hjemme på en språkkafé, eller på et norskkurs? Velg, og
            les tilbakemeldingen. Gå gjennom alle {statements.length}.
          </p>

          {/* Fremdrift */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm font-semibold text-slate">
              <span>
                Utsagn {currentIndex + 1} av {statements.length}
              </span>
              <span aria-live="polite">{answeredCount} besvart</span>
            </div>
            <div
              className="mt-2 h-2 w-full overflow-hidden rounded-full bg-mist"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={statements.length}
              aria-valuenow={answeredCount}
            >
              <div
                className="h-full rounded-full bg-pine transition-all duration-300"
                style={{
                  width: `${(answeredCount / statements.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Utsagn */}
          <div className="mt-6 flex min-h-24 items-center justify-center rounded-2xl bg-mist p-5 text-center text-lg font-bold text-harbor [text-wrap:balance]">
            {currentStatement.text}
          </div>

          {/* Valg */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {(Object.keys(bucketLabels) as Bucket[]).map((bucket) => (
              <button
                key={bucket}
                type="button"
                onClick={() => choose(bucket)}
                disabled={Boolean(selected)}
                aria-pressed={selected === bucket}
                className={getOptionClasses(bucket)}
              >
                <span className="block text-lg font-bold">
                  {bucketLabels[bucket].label}
                </span>
                <span className="mt-1 block text-sm font-medium opacity-80">
                  {bucketLabels[bucket].help}
                </span>
              </button>
            ))}
          </div>

          {/* Tilbakemelding */}
          {selected ? (
            <div
              className={`mt-5 rounded-2xl border p-5 animate-[fadeIn_240ms_ease-out] ${
                isCorrect
                  ? "border-pine/55 bg-pine/20"
                  : "border-honey/70 bg-honey/20"
              }`}
              aria-live="polite"
            >
              <p className="font-bold text-harbor">
                {isCorrect
                  ? "Riktig!"
                  : `Egentlig: ${bucketLabels[currentStatement.correct].label}`}
              </p>
              <p className="mt-2 text-base leading-7 text-harbor">
                {currentStatement.feedback}
              </p>
            </div>
          ) : null}

          {/* Navigasjon */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <Button
              variant="secondary"
              onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
              disabled={currentIndex === 0}
            >
              ← Forrige
            </Button>
            {currentIndex < statements.length - 1 ? (
              <Button
                onClick={() =>
                  setCurrentIndex((i) => Math.min(i + 1, statements.length - 1))
                }
                className="bg-pine text-harbor hover:bg-leaf"
              >
                Neste →
              </Button>
            ) : null}
          </div>
        </Card>
      </section>

      {/* ── Nivåutforsker ── */}
      {hasCompletedExercise ? <NivaaExplorer /> : null}

      {/* ── Refleksjon + fullføring ── */}
      {hasCompletedExercise ? (
        <section className="space-y-6 animate-[fadeIn_240ms_ease-out]" aria-live="polite">
          <Card className="border border-pine/45 bg-pine/20 p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-harbor">
              Godt jobbet — du har sett forskjellen
            </h2>
            <p className="mt-3 text-base leading-8 text-harbor md:text-lg">
              En språkkafé er samtale, mestring og fellesskap — ikke
              undervisning. Med litt tålmodighet og vennlighet har du allerede
              det viktigste som skal til.
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <label
              htmlFor="del-1-refleksjon"
              className="block text-lg font-bold text-ink"
            >
              Kort refleksjon: Hva gleder du deg mest til på en språkkafé?
            </label>
            <textarea
              id="del-1-refleksjon"
              value={reflection}
              onChange={(event) => handleReflectionChange(event.target.value)}
              rows={4}
              placeholder="Skriv gjerne noen ord …"
              className="mt-3 w-full rounded-2xl border border-harbor/15 bg-white p-4 text-base leading-7 text-ink focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-pine"
            />
            <p className="mt-2 text-sm text-slate">
              Refleksjonen lagres bare lokalt i nettleseren din og er kun ment
              for deg.
            </p>
          </Card>

          <div className="flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-soft ring-1 ring-harbor/10 sm:flex-row sm:items-center sm:justify-between">
            <Button to="/" variant="secondary">
              Til hovedsiden
            </Button>
            <Button
              onClick={onComplete}
              className="bg-pine text-harbor hover:bg-leaf"
            >
              {isComplete
                ? "✓ Fullført – gå til neste del"
                : "Fullfør og gå videre"}
            </Button>
          </div>
        </section>
      ) : (
        <Card className="p-5">
          <p className="text-center text-sm font-semibold text-slate" aria-live="polite">
            Gå gjennom alle {statements.length} utsagnene i øvelsen for å fullføre
            delen.
          </p>
        </Card>
      )}
    </article>
  );
}
