import { useState, type ReactNode } from "react";
import type { CourseModule } from "../../data/courseModules";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

const REFLECTION_STORAGE_KEY = "trygg-som-frivillig:del-2-refleksjon";

type RoleChoice = "frivillig" | "ansatt" | "parorende" | "avklares";

type Scenario = {
  id: string;
  text: string;
  correctChoice: RoleChoice;
  feedback: string;
};

type ModuleTwoProps = {
  courseModule: CourseModule;
  isComplete: boolean;
  onComplete: () => void;
};

const roleOptions: { id: RoleChoice; label: string; helpText: string }[] = [
  {
    id: "frivillig",
    label: "Frivillig",
    helpText: "Nærvær, aktivitet, kontakt og fellesskap innenfor avtalt rolle.",
  },
  {
    id: "ansatt",
    label: "Ansatt/fagperson",
    helpText: "Faglige vurderinger, helsehjelp, tjenester og formelt ansvar.",
  },
  {
    id: "parorende",
    label: "Pårørende",
    helpText: "Familierelasjon, privat ansvar og personlige bånd over tid.",
  },
  {
    id: "avklares",
    label: "Må avklares",
    helpText: "Når rammen, ansvaret eller tryggheten ikke er tydelig nok.",
  },
];

const scenarios: Scenario[] = [
  {
    id: "alene-pa-aktivitet",
    text: "En person på en aktivitet sitter alene. Du setter deg ned, hilser og spør om vedkommende vil være med i samtalen.",
    correctChoice: "frivillig",
    feedback:
      "Dette passer godt i frivilligrollen. Du bidrar med nærvær, kontakt og en lavere terskel inn i fellesskapet.",
  },
  {
    id: "medisiner",
    text: "En deltaker sier at medisinene ikke virker, og spør hva du mener de bør gjøre.",
    correctChoice: "ansatt",
    feedback:
      "Dette ligger utenfor frivilligrollen. Du kan lytte og ta personen på alvor, men du skal ikke gi medisinske råd. Her bør personen henvises til riktig fagperson eller kontaktpunkt etter lokal rutine.",
  },
  {
    id: "daglige-besok",
    text: "En pårørende spør om du kan stikke innom moren deres hver dag, fordi hjemmetjenesten har dårlig tid.",
    correctChoice: "avklares",
    feedback:
      "Dette må avklares. Det er forståelig at pårørende ønsker mer støtte, men frivillige skal ikke utvide oppdraget sitt alene eller bli erstatning for kommunale tjenester.",
  },
  {
    id: "fall-hemmelig",
    text: "En bruker ber deg holde det hemmelig at de har falt flere ganger den siste uken.",
    correctChoice: "avklares",
    feedback:
      "Dette skal du ikke bære alene. Fall kan være en alvorlig bekymring. Du skal ikke love absolutt hemmelighold, men ta det videre til riktig kontaktperson etter lokal rutine.",
  },
  {
    id: "toalett",
    text: "En ansatt ber deg hjelpe en person på toalettet før aktiviteten starter.",
    correctChoice: "ansatt",
    feedback:
      "Personlig stell og intim hjelp ligger vanligvis utenfor frivilligrollen. Du kan svare rolig at dette ikke er noe du kan gjøre som frivillig, men at du kan hente en ansatt.",
  },
  {
    id: "kaffe-ved-bordet",
    text: "Du følger en deltaker bort til bordet, finner en stol og spør om de vil ha kaffe.",
    correctChoice: "frivillig",
    feedback:
      "Dette passer godt i frivilligrollen. Du bidrar praktisk og sosialt på en enkel og trygg måte.",
  },
];

const practicalPhrases = [
  "Dette må jeg avklare før jeg kan svare.",
  "Det ligger utenfor min rolle som frivillig, men jeg kan hjelpe deg å finne riktig person.",
  "Jeg kan lytte, men jeg kan ikke gi råd om dette.",
  "Jeg skjønner at dette er viktig, og derfor bør det tas videre til kontaktpersonen.",
  "Jeg kan ikke love å holde dette hemmelig hvis det handler om trygghet eller alvorlig bekymring.",
  "Jeg kan bidra innenfor det vi har avtalt.",
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

function RoleCard({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="rounded-2xl bg-mist p-5">
      <h3 className="text-lg font-bold text-harbor">{title}</h3>
      <div className="mt-3 text-base leading-7 text-slate">{children}</div>
    </section>
  );
}

export function ModuleTwo({ courseModule, isComplete, onComplete }: ModuleTwoProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<string, RoleChoice>>>({});
  const [reflection, setReflection] = useState(readSavedReflection);

  const currentScenario = scenarios[currentIndex];
  const selectedChoice = answers[currentScenario.id];
  const selectedOption = roleOptions.find((option) => option.id === selectedChoice);
  const correctOption = roleOptions.find(
    (option) => option.id === currentScenario.correctChoice,
  )!;
  const completedScenarioCount = scenarios.filter((scenario) => answers[scenario.id]).length;
  const hasCompletedExercise = completedScenarioCount === scenarios.length;

  function chooseRole(choice: RoleChoice) {
    setAnswers((current) => ({
      ...current,
      [currentScenario.id]: choice,
    }));
  }

  function goToNextScenario() {
    setCurrentIndex((index) => Math.min(index + 1, scenarios.length - 1));
  }

  function goToPreviousScenario() {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }

  function handleReflectionChange(value: string) {
    setReflection(value);
    saveReflection(value);
  }

  return (
    <article className="space-y-8">
      <section className="rounded-3xl bg-harbor px-6 py-9 shadow-soft md:px-8 md:py-10">
        <p className="text-sm font-bold uppercase tracking-normal text-pine">
          Del {courseModule.order} &middot; Trygg som frivillig
        </p>
        <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
          Hva er min rolle?
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white">
          Frivillige er viktige, men ansvar må ligge riktig sted. Denne delen
          handler om hva du kan bidra med, hva andre har ansvar for, og når noe
          må avklares før du går videre.
        </p>
      </section>

      <Section title="Frivillig er ikke det samme som ansatt">
        <p>
          Frivillige tilhører frivillig sektor. Det betyr at rollen er en egen
          rolle, ikke en mindre formell variant av en ansattrolle.
        </p>
        <p>
          Ansatte og fagpersoner kan ha ansvar for tjenester, vedtak, helsehjelp,
          dokumentasjon og faglige vurderinger. Frivillige kan bidra med noe
          annet: tid, nærvær, aktivitet, kontakt og fellesskap.
        </p>
        <p className="rounded-2xl bg-mist p-5 font-bold text-harbor">
          Frivillige skal ikke fylle hull i kommunale tjenester. Frivillige skal
          bidra med noe eget.
        </p>
      </Section>

      <Section title="Frivilligrollen i én setning">
        <p className="text-xl font-bold leading-9 text-harbor">
          Som frivillig kan du være et medmenneske som skaper kontakt,
          fellesskap og trygghet innenfor en tydelig avtalt ramme.
        </p>
        <p>
          Den setningen er enkel, men viktig. Den sier både at rollen betyr noe,
          og at den har grenser.
        </p>
      </Section>

      <Section title="Fire roller som ofte blandes sammen">
        <div className="grid gap-4 md:grid-cols-2">
          <RoleCard title="Frivillig">
            <p>
              Bidrar med aktivitet, nærvær, fellesskap, praktisk støtte innenfor
              avtalt ramme og en trygg vei inn i lokalsamfunnet.
            </p>
          </RoleCard>
          <RoleCard title="Ansatt/fagperson">
            <p>
              Har ansvar for tjenester, faglige vurderinger, helsehjelp,
              oppfølging, vedtak og rutiner som krever formell rolle.
            </p>
          </RoleCard>
          <RoleCard title="Pårørende">
            <p>
              Har en privat relasjon, familiehistorie, følelsesmessige bånd og
              ofte bekymringer eller ansvar over tid.
            </p>
          </RoleCard>
          <RoleCard title="Personens egen selvbestemmelse">
            <p>
              Personen selv har rett til å bli lyttet til, ta valg i eget liv og
              bli møtt med respekt, også når andre ønsker å hjelpe.
            </p>
          </RoleCard>
        </div>
      </Section>

      <Section title="Hva frivillige vanligvis kan bidra med">
        <ul className="grid gap-3 md:grid-cols-2">
          {[
            "Hilse, lytte og skape kontakt.",
            "Invitere inn i aktivitet og fellesskap.",
            "Følge noen til bordet, døren eller inn i et rom.",
            "Bidra praktisk innenfor det som er avtalt.",
            "Legge merke til bekymringer og ta dem videre.",
            "Være en bro til riktig person eller kontaktpunkt.",
          ].map((item) => (
            <li
              key={item}
              className="rounded-2xl bg-mist p-4 text-base font-semibold leading-7 text-harbor"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Hva frivillige vanligvis ikke skal gjøre">
        <ul className="grid gap-3 md:grid-cols-2">
          {[
            "Gi medisinske råd eller vurdere helsetilstand.",
            "Utføre personlig stell eller intim hjelp.",
            "Overta oppgaver som ligger hos ansatte eller kommunen.",
            "Lage private avtaler som utvider oppdraget.",
            "Love absolutt hemmelighold ved alvorlig bekymring.",
            "Ta ansvar som egentlig ligger hos pårørende eller fagpersoner.",
          ].map((item) => (
            <li
              key={item}
              className="rounded-2xl bg-white p-4 text-base font-semibold leading-7 text-slate ring-1 ring-harbor/10"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <section className="space-y-5" aria-labelledby="role-exercise-title">
        <Card className="p-6 md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <h2
                id="role-exercise-title"
                className="text-2xl font-extrabold leading-tight text-ink md:text-3xl"
              >
                Hvilken hatt har du på?
              </h2>
              <p className="mt-4 text-base leading-8 text-slate md:text-lg">
                Du får ett scenario om gangen. Velg hvilken rolle som har riktig
                retning i situasjonen. Målet er ikke å få karakter, men å øve på
                hvor ansvaret hører hjemme.
              </p>
            </div>
            <div className="rounded-3xl bg-mist p-5 text-harbor ring-1 ring-harbor/8">
              <p className="text-sm font-bold uppercase tracking-normal text-slate">
                Scenario
              </p>
              <p className="mt-1 text-3xl font-extrabold" aria-live="polite">
                {currentIndex + 1} av {scenarios.length}
              </p>
              <p className="mt-2 text-sm font-semibold">
                {completedScenarioCount} vurdert
              </p>
            </div>
          </div>
          <div
            className="mt-6 h-3 overflow-hidden rounded-full bg-mist"
            role="progressbar"
            aria-label="Scenarioer fullført"
            aria-valuemin={0}
            aria-valuemax={scenarios.length}
            aria-valuenow={completedScenarioCount}
          >
            <div
              className="h-full rounded-full bg-pine transition-all duration-500"
              style={{ width: `${(completedScenarioCount / scenarios.length) * 100}%` }}
            />
          </div>
        </Card>

        <Card className="overflow-hidden p-0">
          <div className="h-2 bg-pine" />
          <div className="p-6 md:p-8">
            <h3 className="text-xl font-bold text-harbor">
              Scenario {currentIndex + 1}
            </h3>
            <p className="mt-4 text-xl font-semibold leading-9 text-ink">
              {currentScenario.text}
            </p>

            <fieldset className="mt-7">
              <legend className="text-base font-bold text-harbor">
                Hvilken rolle peker situasjonen mot?
              </legend>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {roleOptions.map((option) => {
                  const isSelected = selectedChoice === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => chooseRole(option.id)}
                      className={`min-h-24 rounded-2xl border p-4 text-left transition duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine ${
                        isSelected
                          ? "border-pine bg-pine/18 text-harbor ring-2 ring-pine/45"
                          : "border-harbor/10 bg-white text-ink hover:-translate-y-0.5 hover:border-pine/55 hover:shadow-lift"
                      }`}
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="text-lg font-extrabold">{option.label}</span>
                        <span
                          className={`mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${
                            isSelected
                              ? "border-harbor bg-harbor text-white"
                              : "border-harbor/25 text-transparent"
                          }`}
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                      </span>
                      <span className="mt-2 block text-sm font-medium leading-6 text-slate">
                        {option.helpText}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {selectedChoice ? (
              <section
                className="mt-6 rounded-3xl bg-mist p-5"
                aria-live="polite"
                aria-label="Tilbakemelding på scenario"
              >
                <h4 className="text-xl font-bold text-harbor">
                  Riktig retning: {correctOption.label}
                </h4>
                {selectedOption && selectedOption.id !== currentScenario.correctChoice ? (
                  <p className="mt-3 text-base font-semibold leading-7 text-slate">
                    Du valgte {selectedOption.label}. Det er forståelig at rollen
                    kan kjennes uklar her. I denne situasjonen er det tryggest å
                    plassere ansvaret slik:
                  </p>
                ) : null}
                <p className="mt-3 text-base leading-8 text-slate">
                  {currentScenario.feedback}
                </p>
              </section>
            ) : null}
          </div>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button
            onClick={goToPreviousScenario}
            variant="secondary"
            disabled={currentIndex === 0}
          >
            Forrige scenario
          </Button>
          <Button
            onClick={goToNextScenario}
            disabled={!selectedChoice || currentIndex === scenarios.length - 1}
          >
            Neste scenario
          </Button>
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
                  className="rounded-2xl bg-mist p-5 text-base font-semibold leading-8 text-harbor"
                >
                  «{phrase}»
                </p>
              ))}
            </div>
          </Card>

          <Section title="Dette er kjernen">
            <p>Frivilligrollen blir tryggere når ansvaret ligger riktig sted.</p>
            <p>
              Du kan bidra med varme, kontakt og praktisk støtte innenfor en
              avtalt ramme. Du skal ikke løse alt alene, gi faglige råd eller
              overta ansvar som hører hjemme hos ansatte, pårørende eller
              tjenester.
            </p>
            <p className="font-bold text-harbor">
              Når du blir usikker, er det ikke et nederlag å stoppe opp. Det er
              trygg frivillighet.
            </p>
          </Section>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
              Oppsummering
            </h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Frivillige er viktige, men de er ikke ansatte eller fagpersoner.",
                "Frivilligrollen handler om kontakt, fellesskap og trygg aktivitet innenfor avtalt ramme.",
                "Ansvar for helsehjelp, vedtak, tjenester og faglige vurderinger ligger hos andre.",
                "Når noe blir uklart, alvorlig eller større enn avtalt, skal det avklares.",
              ].map((item, index) => (
                <li
                  key={item}
                  className="flex gap-4 rounded-2xl bg-mist p-4 text-base font-semibold leading-7 text-harbor"
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
              Når rollen blir uklar, kan jeg...
            </h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-slate md:text-lg">
              <p>
                Tenk på en situasjon der det kunne vært fristende å hjelpe mer
                enn rollen egentlig åpner for.
              </p>
              <p>
                Hva kan du si eller gjøre for å være både varm og tydelig?
              </p>
            </div>
            <label htmlFor="module-two-reflection" className="sr-only">
              Når rollen blir uklar, kan jeg
            </label>
            <textarea
              id="module-two-reflection"
              value={reflection}
              onChange={(event) => handleReflectionChange(event.target.value)}
              rows={5}
              placeholder="Når rollen blir uklar, kan jeg..."
              className="mt-6 min-h-36 w-full resize-y rounded-2xl border border-harbor/15 bg-white p-4 text-base leading-7 text-ink shadow-sm outline-none transition focus:border-pine focus:ring-4 focus:ring-pine/20"
            />
            <p className="mt-3 text-sm font-semibold text-slate">
              Refleksjonen lagres bare lokalt i nettleseren din og er kun ment
              for deg!
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
              Du har fullført Del 2
            </h2>
            <h3 className="mt-2 text-xl font-bold text-harbor md:text-2xl">
              Neste del handler om trygge valg i øyeblikket
            </h3>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-slate md:text-lg">
              <p>
                Du har øvd på å skille mellom frivilligrollen, ansattrollen,
                pårørenderollen og det som må avklares.
              </p>
              <p>
                Når rollen er tydelig, blir det lettere å bidra med varme uten å
                ta ansvar som hører hjemme et annet sted.
              </p>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                onClick={onComplete}
                className="w-full bg-pine text-harbor hover:bg-leaf sm:w-auto"
              >
                Gå til Del 3
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
              Gå gjennom alle seks scenarioene for å åpne resten av delen.
            </p>
            <Button to="/" variant="secondary">
              Til hovedsiden
            </Button>
          </div>
        </Card>
      )}

      {isComplete ? (
        <div className="sr-only" aria-live="polite">
          Del 2 er allerede fullført.
        </div>
      ) : null}
    </article>
  );
}
