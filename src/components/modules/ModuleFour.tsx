import { useMemo, useState, type ReactNode } from "react";
import type { CourseModule } from "../../data/courseModules";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

const ANSWERS_STORAGE_KEY = "trygg-som-frivillig:del-4-sluttovelse-svar";
const PERSONAL_RULE_STORAGE_KEY = "trygg-som-frivillig:del-4-huskeregel";

type ChoiceId = "a" | "b" | "c";

type FinalScenario = {
  id: string;
  title: string;
  situation: string;
  choices: Array<{
    id: ChoiceId;
    label: string;
  }>;
  recommendedChoiceId: ChoiceId;
  feedback: string;
  safePhrase: string;
};

type ModuleFourProps = {
  courseModule: CourseModule;
  isComplete: boolean;
  onComplete: () => void;
};

const scenarios: FinalScenario[] = [
  {
    id: "ansvarlig",
    title: "Scenario 1: Du blir gjort til «den ansvarlige»",
    situation:
      "Du er frivillig på en åpen møteplass. En deltaker virker forvirret og sier at hun ikke finner veien hjem. En annen deltaker sier til deg: «Du får følge henne hjem. Du er jo frivillig her.»",
    recommendedChoiceId: "b",
    choices: [
      { id: "a", label: "Følger henne hjem alene, fordi noen må ta ansvar." },
      {
        id: "b",
        label: "Stopper opp og kontakter ansvarlig person på stedet eller kontaktpersonen din.",
      },
      { id: "c", label: "Spør en annen deltaker om å følge henne hjem i stedet." },
    ],
    feedback:
      "Dette kan handle om trygghet, ansvar og mulig sårbarhet. Som frivillig skal du ikke automatisk bli ansvarlig for å følge noen hjem når situasjonen er uklar. Du kan bidra, men rammen må avklares.",
    safePhrase:
      "Jeg vil gjerne hjelpe, men dette må vi gjøre på riktig måte. Jeg kontakter ansvarlig person, så finner vi ut hva som er tryggest.",
  },
  {
    id: "fast-privat-avtale",
    title: "Scenario 2: Noen ber deg gjøre noe som binder deg framover",
    situation:
      "Etter en aktivitet spør en deltaker om du kan lage en fast privat avtale: «Kan ikke du bare komme innom meg hver tirsdag og hjelpe meg med småting hjemme? Det er ikke så mye, bare litt rydding, litt bæring og sånt.»",
    recommendedChoiceId: "b",
    choices: [
      { id: "a", label: "Sier ja, fordi det er hyggelig å kunne hjelpe." },
      {
        id: "b",
        label:
          "Sier at du ikke kan lage en fast privat avtale, men at du kan ta ønsket videre til kontaktpersonen.",
      },
      {
        id: "c",
        label: "Sier ja, men bare hvis deltakeren lover å ikke fortelle det til andre.",
      },
    ],
    feedback:
      "Her er ikke problemet at frivillige aldri kan gjøre små praktiske ting. Mange små oppgaver kan være helt innenfor, hvis de er trygge og passer med rammen for aktiviteten eller oppdraget. Problemet her er at det blir en fast privat avtale utenfor rammen. Da kan det skape forventninger, ansvar og uklarhet om rollen din.",
    safePhrase:
      "Jeg skjønner at det hadde vært fint å få hjelp til sånt. Jeg kan ikke lage en fast privat avtale, men jeg kan ta det videre med kontaktpersonen, så ser vi hva som er mulig innenfor riktig ramme.",
  },
  {
    id: "vurdere-noen",
    title: "Scenario 3: Du blir bedt om å vurdere noen",
    situation:
      "En ansatt spør deg etter en aktivitet: «Synes du han virker dårligere enn før? Vi rekker ikke følge med på alt.»",
    recommendedChoiceId: "b",
    choices: [
      { id: "a", label: "Gir din vurdering av helsen hans." },
      {
        id: "b",
        label: "Sier bare det du konkret har observert, uten å konkludere.",
      },
      { id: "c", label: "Sier at du ikke vil blande deg." },
    ],
    feedback:
      "Frivillige kan se viktige ting, men skal ikke gjøre faglige vurderinger. Du kan dele konkrete observasjoner gjennom riktig kanal, men ikke diagnostisere eller konkludere.",
    safePhrase:
      "Jeg kan ikke vurdere helsen hans, men jeg kan si hva jeg la merke til: Han virket trøttere enn vanlig og gikk tidligere enn han pleier.",
  },
  {
    id: "fast-losning",
    title: "Scenario 4: Noen vil ha deg som fast løsning",
    situation:
      "En deltaker sier: «Du er så flink med telefonen min. Kan vi avtale at jeg alltid kommer til deg når jeg får problemer med BankID, passord og sånt?»",
    recommendedChoiceId: "b",
    choices: [
      { id: "a", label: "Sier ja, fordi digital hjelp er nyttig." },
      {
        id: "b",
        label: "Sier at du gjerne hjelper innenfor aktiviteten, men at private faste avtaler må avklares.",
      },
      { id: "c", label: "Tar passordet hennes og ordner det raskt." },
    ],
    feedback:
      "Digital hjelp kan være innenfor, men passord, BankID og private faste avtaler er risikoområder. Du skal ikke håndtere sensitive innlogginger eller bli en privat teknisk ansvarlig.",
    safePhrase:
      "Jeg kan gjerne hjelpe deg med det som passer innenfor aktiviteten, men jeg kan ikke ta ansvar for BankID, passord eller faste private avtaler. Det må vi eventuelt avklare med kontaktpersonen.",
  },
  {
    id: "kritikk-kommunen",
    title: "Scenario 5: Du får høre kritikk om kommunen",
    situation:
      "En deltaker blir irritert og sier: «Hjemmetjenesten gjør ingenting riktig. Kan ikke du si fra til dem for meg?»",
    recommendedChoiceId: "b",
    choices: [
      { id: "a", label: "Lover å ta saken direkte med hjemmetjenesten." },
      {
        id: "b",
        label: "Lytter, men forklarer at du ikke kan være klagekanal eller saksbehandler.",
      },
      { id: "c", label: "Sier at kommunen sikkert gjør så godt den kan, og bytter tema." },
    ],
    feedback:
      "Som frivillig kan du lytte og ta personen på alvor, men du skal ikke bli saksbehandler, klageinstans eller mellomledd i en sak du ikke har ansvar for. Du kan hjelpe personen videre til riktig kanal.",
    safePhrase:
      "Jeg skjønner at dette er frustrerende. Jeg kan ikke behandle eller ta over saken, men jeg kan hjelpe deg med å finne ut hvem du bør kontakte.",
  },
  {
    id: "love-mer",
    title: "Scenario 6: Du kjenner at du har lyst til å love mer",
    situation:
      "Du møter en person som sier at hun nesten aldri ser noen. Du får vondt av henne og får lyst til å si: «Jeg kan komme innom deg hver uke.»",
    recommendedChoiceId: "b",
    choices: [
      { id: "a", label: "Lover ukentlige besøk, fordi hun trenger det." },
      {
        id: "b",
        label: "Lar være å love noe der og da, og tar behovet videre til kontaktpersonen.",
      },
      { id: "c", label: "Sier at hun må prøve å komme seg mer ut." },
    ],
    feedback:
      "Hjelpelyst er bra, men løfter skaper forventninger. Før du lover faste besøk, må det være avklart med organisasjonen og passe med rollen, kapasiteten og oppdraget.",
    safePhrase:
      "Jeg skjønner at du savner mer kontakt. Jeg kan ikke love faste besøk her og nå, men jeg kan ta det videre med kontaktpersonen.",
  },
  {
    id: "uklar-avtale",
    title: "Scenario 7: Du oppdager at avtalen er uklar",
    situation:
      "Du møter opp til en aktivitet og får beskjed om at «det meste ordner seg underveis». Du vet ikke hvem som er ansvarlig, hva du skal gjøre hvis noe skjer, eller hvem du skal kontakte etterpå.",
    recommendedChoiceId: "b",
    choices: [
      { id: "a", label: "Starter likevel, fordi frivillighet må være fleksibelt." },
      { id: "b", label: "Ber om de viktigste avklaringene før du går i gang." },
      { id: "c", label: "Lager dine egne rutiner der og da." },
    ],
    feedback:
      "Fleksibilitet er viktig, men uklarhet om ansvar og kontaktvei gjør frivilligrollen utrygg. Før du starter, bør du vite hvem du spør, hva oppdraget er, og hva du gjør hvis noe skjer.",
    safePhrase:
      "Jeg vil gjerne bidra, men før vi starter trenger jeg å vite hvem som er ansvarlig, hva rollen min er, og hvem jeg kontakter hvis noe blir uklart.",
  },
];

const reminderOptions = [
  "Jeg skal ikke løse alt alene.",
  "Når jeg blir usikker, skal jeg stoppe og avklare.",
  "Jeg kan være varm og tydelig samtidig.",
  "Jeg skal bidra som frivillig, ikke som ansatt eller pårørende.",
  "Det er ansvarlig å si nei når noe går utenfor rollen min.",
];

function isChoiceId(value: string): value is ChoiceId {
  return value === "a" || value === "b" || value === "c";
}

function readSavedAnswers(): Partial<Record<string, ChoiceId>> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const value = window.localStorage.getItem(ANSWERS_STORAGE_KEY);
    const parsed = value ? JSON.parse(value) : {};
    const next: Partial<Record<string, ChoiceId>> = {};

    for (const scenario of scenarios) {
      const answer = parsed[scenario.id];
      if (typeof answer === "string" && isChoiceId(answer)) {
        next[scenario.id] = answer;
      }
    }

    return next;
  } catch {
    return {};
  }
}

function saveAnswers(value: Partial<Record<string, ChoiceId>>) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(value));
}

function readSavedPersonalRule() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem(PERSONAL_RULE_STORAGE_KEY) ?? "";
}

function savePersonalRule(value: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PERSONAL_RULE_STORAGE_KEY, value);
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

function SmallCard({ children }: { children: ReactNode }) {
  return (
    <li className="flex min-h-28 items-center justify-center rounded-2xl bg-mist p-5 text-center text-base font-bold leading-7 text-harbor [text-wrap:balance]">
      {children}
    </li>
  );
}

export function ModuleFour({ courseModule, isComplete, onComplete }: ModuleFourProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<string, ChoiceId>>>(
    readSavedAnswers,
  );
  const [personalRule, setPersonalRule] = useState(readSavedPersonalRule);

  const currentScenario = scenarios[currentIndex];
  const selectedChoice = answers[currentScenario.id];
  const completedScenarioCount = scenarios.filter((scenario) => answers[scenario.id]).length;
  const hasCompletedExercise = completedScenarioCount === scenarios.length;
  const recommendedChoice = currentScenario.choices.find(
    (choice) => choice.id === currentScenario.recommendedChoiceId,
  )!;

  const recommendedCount = useMemo(
    () =>
      scenarios.filter((scenario) => answers[scenario.id] === scenario.recommendedChoiceId)
        .length,
    [answers],
  );

  function chooseAnswer(choiceId: ChoiceId) {
    setAnswers((current) => {
      const next = { ...current, [currentScenario.id]: choiceId };
      saveAnswers(next);
      return next;
    });
  }

  function handleRuleChange(value: string) {
    setPersonalRule(value);
    savePersonalRule(value);
  }

  function getChoiceClasses(choiceId: ChoiceId) {
    const base =
      "min-h-24 rounded-2xl border p-4 text-left text-base font-bold leading-7 transition duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine";

    if (!selectedChoice) {
      return `${base} border-harbor/10 bg-white text-ink hover:-translate-y-0.5 hover:border-pine/55 hover:shadow-lift`;
    }

    if (choiceId === currentScenario.recommendedChoiceId) {
      return `${base} border-pine bg-pine/20 text-harbor ring-2 ring-pine/45`;
    }

    if (choiceId === selectedChoice) {
      return `${base} border-honey/70 bg-honey/20 text-harbor ring-2 ring-honey/30`;
    }

    return `${base} border-harbor/10 bg-mist text-harbor`;
  }

  return (
    <article className="space-y-8">
      <section className="rounded-3xl bg-harbor px-6 py-9 shadow-soft md:px-8 md:py-10">
        <p className="text-sm font-bold uppercase tracking-normal text-white">
          Del {courseModule.order} &middot; Avslutning
        </p>
        <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
          Klar til å bidra
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white">
          Du skal ikke kunne alt. Du skal vite hva du gjør når du ikke vet.
        </p>
      </section>

      <Section title="Hva denne delen handler om">
        <p>Nå har du vært gjennom det viktigste.</p>
        <p>
          Du har sett hvorfor frivillighet betyr noe. Du har sett hva rollen din
          er. Og du har øvd på hva du kan gjøre når noe blir uklart.
        </p>
        <p>Denne siste delen handler om å samle trådene.</p>
        <p>Ikke fordi du skal kunne alt. Det skal du ikke.</p>
        <p className="flex min-h-24 items-center justify-center rounded-2xl bg-mist p-5 text-center text-xl font-bold leading-9 text-harbor [text-wrap:balance]">
          Men fordi du skal vite hva du gjør når du ikke vet.
        </p>
        <p>
          Som frivillig skal du ikke bære vanskelige situasjoner alene. Du skal
          ikke være ansatt, behandler, saksbehandler, pårørende eller
          krisekontakt. Du skal være frivillig.
        </p>
        <p className="font-bold text-harbor">Det er mer enn nok.</p>
      </Section>

      <Section title="Det viktigste du har lært">
        <p>Som frivillig er du en del av noe større.</p>
        <p>
          Du bidrar til et lokalsamfunn der mennesker ser hverandre, møter
          hverandre og bryr seg om hverandre. Det kan virke lite i øyeblikket,
          men det betyr mye.
        </p>
        <p>Du har også en tydelig rolle.</p>
        <p>
          Du kan bidra med tid, nærvær, aktivitet, samtale, praktisk
          lavterskelhjelp når det er avklart, og brobygging til fellesskap og
          møteplasser.
        </p>
        <p>
          Men du skal ikke overta ansvar som tilhører ansatte, kommunen,
          pårørende eller fagpersoner.
        </p>
        <ul className="grid gap-3 md:grid-cols-3">
          <SmallCard>Det er ikke et nederlag å si nei.</SmallCard>
          <SmallCard>Det er ikke kaldt å sette grenser.</SmallCard>
          <SmallCard>Det er ikke feil å stoppe opp og spørre.</SmallCard>
        </ul>
        <p>
          Tvert imot. Det er slik frivillig arbeid blir trygt, både for deg og
          for den du møter.
        </p>
      </Section>

      <Section title="Når du blir usikker">
        <p>Det kommer til å skje at du blir usikker.</p>
        <p>
          Kanskje noen ber deg gjøre noe du ikke vet om du kan gjøre. Kanskje
          noen forteller deg noe alvorlig. Kanskje du får en dårlig magefølelse.
          Kanskje du kjenner at en situasjon blir for stor for deg.
        </p>
        <p>Da er ikke målet at du skal ha alle svarene. Målet er at du stopper opp.</p>
        <ul className="grid gap-3 md:grid-cols-2">
          {[
            "Er dette innenfor rollen min?",
            "Er dette noe som må avklares?",
            "Er dette noe jeg ikke skal gjøre?",
            "Hvem bør jeg kontakte?",
            "Er dette akutt?",
          ].map((question) => (
            <SmallCard key={question}>{question}</SmallCard>
          ))}
        </ul>
        <p>
          Hvis noe er akutt, skal du bruke nødnummer. Hvis noe er uklart eller
          bekymringsfullt, skal du kontakte riktig person i organisasjonen eller
          etter den lokale rutinen.
        </p>
        <p className="font-bold text-harbor">
          Hvis du kjenner deg presset, utrygg eller usikker, skal du ikke løse
          det alene.
        </p>
      </Section>

      <Section title="Hvem spør du?">
        <p>Som frivillig skal du alltid vite hvem du kan kontakte.</p>
        <p>
          Det kan være frivilligkoordinator, aktivitetsleder, kontaktperson i
          organisasjonen, ansvarlig ansatt eller en annen definert person.
        </p>
        <p>Det viktigste er ikke tittelen.</p>
        <p className="flex min-h-24 items-center justify-center rounded-2xl bg-mist p-5 text-center text-xl font-bold leading-9 text-harbor [text-wrap:balance]">
          Det viktigste er at du vet hvor du går når du trenger hjelp.
        </p>
        <p>Før du starter som frivillig, bør du vite:</p>
        <ul className="grid gap-3 md:grid-cols-2">
          {[
            "Hvem kontakter jeg hvis jeg blir usikker?",
            "Hvem kontakter jeg hvis jeg må avlyse?",
            "Hvem kontakter jeg hvis jeg blir bekymret for noen?",
            "Hva gjør jeg hvis noe er akutt?",
            "Hva gjør jeg hvis jeg selv opplever noe ubehagelig?",
          ].map((question) => (
            <SmallCard key={question}>{question}</SmallCard>
          ))}
        </ul>
        <p>
          Hvis du ikke vet svaret på dette, er det ikke du som har gjort noe
          galt. Da må det avklares før du går videre.
        </p>
      </Section>

      <Section title="Ditt viktigste prinsipp som frivillig">
        <p>Det finnes mange gode prinsipper for frivillig arbeid.</p>
        <p>Men dette er kanskje det viktigste:</p>
        <p className="flex min-h-28 items-center justify-center rounded-2xl bg-mist p-5 text-center text-xl font-bold leading-9 text-harbor [text-wrap:balance]">
          Du skal bidra med det som er innenfor rollen din, og spørre når noe går
          utenfor den.
        </p>
        <ul className="grid gap-3 md:grid-cols-2">
          <SmallCard>Du kan være varm uten å bli grenseløs.</SmallCard>
          <SmallCard>Du kan bry deg uten å ta over ansvar.</SmallCard>
          <SmallCard>Du kan lytte uten å bli behandler.</SmallCard>
          <SmallCard>Du kan hjelpe uten å love mer enn du kan holde.</SmallCard>
        </ul>
        <p>
          Du kan være viktig i noens liv uten å bli den eneste personen de har.
          Trygg frivillighet handler ikke om å gjøre mest mulig.
        </p>
        <p className="font-bold text-harbor">
          Det handler om å gjøre riktig nok, på en måte som varer.
        </p>
      </Section>

      <section className="space-y-5" aria-labelledby="final-exercise-title">
        <Card className="p-6 md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <h2
                id="final-exercise-title"
                className="text-2xl font-extrabold leading-tight text-ink md:text-3xl"
              >
                Sluttøvelse: Hva gjør du nå?
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-slate md:text-lg">
                <p>
                  I denne øvelsen får du korte situasjoner. De er ikke laget for
                  å lære deg nye regler, men for å teste om du kjenner igjen
                  hovedpoengene fra kurset.
                </p>
                <p>
                  Målet er ikke å være perfekt. Målet er å øve på å stoppe opp,
                  tenke gjennom rollen din og velge en trygg vei videre.
                </p>
              </div>
            </div>
            <div className="rounded-3xl bg-mist p-5 text-harbor ring-1 ring-harbor/10">
              <p className="text-sm font-bold uppercase tracking-normal text-slate">
                Scenario
              </p>
              <p className="mt-1 text-3xl font-extrabold" aria-live="polite">
                {currentIndex + 1} av {scenarios.length}
              </p>
              <p className="mt-2 text-sm font-semibold">
                Trygg retning funnet: {recommendedCount}.
              </p>
            </div>
          </div>
          <div
            className="mt-6 h-3 overflow-hidden rounded-full bg-mist"
            role="progressbar"
            aria-label="Scenarioer vurdert"
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
            <h3 className="text-2xl font-extrabold text-ink">
              {currentScenario.title}
            </h3>
            <p className="mt-5 flex min-h-36 items-center justify-center rounded-3xl bg-mist p-5 text-center text-xl font-semibold leading-9 text-ink [text-wrap:balance]">
              {currentScenario.situation}
            </p>

            <fieldset className="mt-7">
              <legend className="text-base font-bold text-harbor">
                Hva gjør du?
              </legend>
              <div className="mt-4 grid gap-3">
                {currentScenario.choices.map((choice) => (
                  <button
                    key={choice.id}
                    type="button"
                    aria-pressed={selectedChoice === choice.id}
                    onClick={() => chooseAnswer(choice.id)}
                    className={getChoiceClasses(choice.id)}
                  >
                    <span className="flex items-start gap-3">
                      <span
                        className="grid size-8 shrink-0 place-items-center rounded-full bg-harbor text-sm font-extrabold uppercase text-white"
                        aria-hidden="true"
                      >
                        {choice.id}
                      </span>
                      <span>{choice.label}</span>
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            {selectedChoice ? (
              <section className="mt-6 rounded-3xl bg-mist p-5" aria-live="polite">
                <p className="text-sm font-bold uppercase tracking-normal text-harbor">
                  Trygg retning
                </p>
                <h4 className="mt-2 text-xl font-bold text-harbor">
                  Anbefalt valg: {recommendedChoice.id.toUpperCase()}.
                </h4>
                <p className="mt-3 text-base leading-8 text-slate">
                  {currentScenario.feedback}
                </p>
                <div className="mt-5 rounded-2xl bg-white p-5 text-harbor ring-1 ring-harbor/10">
                  <p className="text-sm font-bold uppercase tracking-normal">
                    Trygg formulering
                  </p>
                  <p className="mt-2 text-base font-bold leading-8">
                    «{currentScenario.safePhrase}»
                  </p>
                </div>
              </section>
            ) : null}
          </div>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          {currentIndex > 0 ? (
            <Button
              onClick={() => setCurrentIndex((index) => Math.max(index - 1, 0))}
              variant="secondary"
            >
              Forrige scenario
            </Button>
          ) : (
            <span aria-hidden="true" />
          )}
          {currentIndex < scenarios.length - 1 ? (
            <Button
              onClick={() =>
                setCurrentIndex((index) => Math.min(index + 1, scenarios.length - 1))
              }
              disabled={!selectedChoice}
            >
              Neste scenario
            </Button>
          ) : null}
        </div>
      </section>

      {hasCompletedExercise ? (
        <section className="space-y-8" aria-live="polite">
          <Card className="border-pine/40 bg-mist p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-harbor md:text-3xl">
              Du har øvd på trygg retning
            </h2>
            <p className="mt-4 max-w-4xl text-base font-semibold leading-8 text-slate md:text-lg">
              Du har øvd på å stoppe opp, kjenne igjen rollen din og velge trygg
              vei videre.
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
              Din egen huskeregel
            </h2>
            <p className="mt-5 max-w-4xl text-base leading-8 text-slate md:text-lg">
              Før du avslutter kurset, velg én huskeregel du vil ta med deg
              videre. Du kan også skrive din egen.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {reminderOptions.map((rule) => (
                <button
                  key={rule}
                  type="button"
                  aria-pressed={personalRule === rule}
                  onClick={() => handleRuleChange(rule)}
                  className={`flex min-h-28 items-center justify-center rounded-2xl border p-5 text-center text-base font-bold leading-7 transition focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine [text-wrap:balance] ${
                    personalRule === rule
                      ? "border-pine bg-pine/20 text-harbor ring-2 ring-pine/45"
                      : "border-harbor/10 bg-mist text-harbor hover:border-pine/55"
                  }`}
                >
                  {rule}
                </button>
              ))}
            </div>
            <label
              htmlFor="module-four-personal-rule"
              className="mt-6 block text-base font-bold text-harbor"
            >
              Min huskeregel som frivillig er:
            </label>
            <textarea
              id="module-four-personal-rule"
              value={personalRule}
              onChange={(event) => handleRuleChange(event.target.value)}
              rows={4}
              placeholder="Min huskeregel som frivillig er..."
              className="mt-3 min-h-28 w-full resize-y rounded-2xl border border-harbor/15 bg-white p-4 text-base leading-7 text-ink shadow-sm outline-none transition focus:border-pine focus:ring-4 focus:ring-pine/20"
            />
            <p className="mt-3 text-sm font-semibold text-slate">
              Huskeregelen lagres bare lokalt i nettleseren din og sendes ikke
              noe sted.
            </p>
          </Card>

          <Section title="Avslutning">
            <p>Du trenger ikke kunne alt for å være en god frivillig.</p>
            <p>Du trenger ikke ha svar på alle spørsmål.</p>
            <p>Du trenger ikke løse alle problemer.</p>
            <p>
              Det viktigste er at du forstår rollen din, kjenner grensene dine
              og vet hvem du kan spørre når noe blir uklart.
            </p>
            <p>Frivillighet handler ikke om å være perfekt.</p>
            <p>
              Det handler om å stille opp på en måte som er trygg, menneskelig og
              bærekraftig.
            </p>
            <p className="flex min-h-24 items-center justify-center rounded-2xl bg-mist p-5 text-center text-xl font-bold leading-9 text-harbor [text-wrap:balance]">
              Du er viktig. Og du står ikke alene.
            </p>
          </Section>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
              Du er klar til å bidra trygt
            </h2>
            <p className="mt-5 max-w-4xl text-base leading-8 text-slate md:text-lg">
              Du har samlet hovedpoengene fra kurset og øvd på praktiske
              situasjoner der rollen kan bli uklar.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                onClick={onComplete}
                className="w-full bg-pine text-harbor hover:bg-leaf sm:w-auto"
              >
                Fullfør kurset
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
              Gå gjennom alle scenarioene for å åpne avslutningen.
            </p>
            <Button to="/" variant="secondary">
              Til hovedsiden
            </Button>
          </div>
        </Card>
      )}

      {isComplete ? (
        <div className="sr-only" aria-live="polite">
          Del 4 er allerede fullført.
        </div>
      ) : null}
    </article>
  );
}
