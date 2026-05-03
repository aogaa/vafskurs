import { useMemo, useState } from "react";
import {
  moduleTwoCards,
  roleCompassZones,
  type RoleCompassCard,
  type RoleCompassZone,
} from "../../data/moduleTwoCards";
import type { CourseModule } from "../../data/courseModules";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

const REQUIRED_ASSESSMENTS = 8;

type ModuleTwoProps = {
  courseModule: CourseModule;
  isComplete: boolean;
  onComplete: () => void;
};

type CompassChoice = {
  cardId: string;
  chosenZone: RoleCompassZone;
};

const safePhrases = [
  {
    title: "Når noen ber om noe utenfor rollen",
    text: "Det kan jeg ikke gjøre som frivillig, men jeg kan hjelpe deg å finne ut hvem som er riktig person å spørre.",
  },
  {
    title: "Når noe må avklares",
    text: "Dette må jeg avklare med kontaktpersonen før jeg kan svare.",
  },
  {
    title: "Når noen ønsker mer enn avtalt",
    text: "Jeg skjønner at dette er viktig for deg. Min rolle er avgrenset, men jeg kan gi beskjed videre om at du ønsker mer støtte.",
  },
  {
    title: "Når den frivillige blir usikker",
    text: "Jeg vil gjerne gjøre dette riktig. Derfor må jeg stoppe litt opp og spørre før jeg går videre.",
  },
  {
    title: "Når noen deler noe alvorlig",
    text: "Takk for at du sier det. Dette er for viktig til at jeg skal bære det alene, så jeg må ta det videre til riktig person.",
  },
];

const masteryOptions = [
  {
    id: "a",
    text: "Som frivillig bør jeg hjelpe så mye jeg kan, så lenge jeg har tid.",
    feedback:
      "Det er forståelig å ville hjelpe mest mulig. Men frivilligrollen blir tryggere når hjelpen skjer innenfor en tydelig ramme.",
  },
  {
    id: "b",
    text: "Som frivillig skal jeg bidra med varme og nærvær innenfor en tydelig rolle, og spørre når noe er uklart.",
    feedback:
      "Ja. Frivilligrollen handler ikke om å gjøre alt. Den handler om å bidra klokt, varmt og trygt innenfor en rolle som både du og andre kan forstå.",
  },
  {
    id: "c",
    text: "Som frivillig bør jeg overta oppgaver hvis ansatte eller pårørende ikke rekker dem.",
    feedback:
      "Dette er lett å tenke, særlig når behovet er tydelig. Men frivillige skal bidra, ikke overta ansvar som ligger hos andre.",
  },
];

function ZonePill({ zoneId }: { zoneId: RoleCompassZone }) {
  const zone = roleCompassZones.find((item) => item.id === zoneId)!;

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-mist px-3 py-1 text-sm font-bold text-harbor">
      <span aria-hidden="true">{zone.marker}</span>
      {zone.title}
    </span>
  );
}

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

function RoleComparison() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[
        {
          title: "Ansatte og kommune",
          text: "Kan ha ansvar for vedtak, tjenester, journal, faglige vurderinger og lovpålagte oppgaver.",
        },
        {
          title: "Pårørende",
          text: "Kan ha familieansvar, følelseshistorie, praktiske forpliktelser og bekymringer over tid.",
        },
        {
          title: "Frivillige",
          text: "Kommer inn som medmennesker, med tid, nærvær, interesse og lav terskel inn i fellesskap.",
        },
      ].map((item) => (
        <section key={item.title} className="rounded-3xl bg-mist p-5">
          <h3 className="text-lg font-bold text-harbor">{item.title}</h3>
          <p className="mt-3 text-base leading-7 text-slate">{item.text}</p>
        </section>
      ))}
    </div>
  );
}

function RoleCompass({
  choices,
}: {
  choices: CompassChoice[];
}) {
  const counts = roleCompassZones.map((zone) => ({
    ...zone,
    count: choices.filter((choice) => {
      const card = moduleTwoCards.find((item) => item.id === choice.cardId);
      return card?.correctZone === zone.id;
    }).length,
  }));

  return (
    <section
      className="rounded-[2rem] border border-harbor/8 bg-white p-6 shadow-soft"
      aria-labelledby="role-compass-title"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-normal text-leaf">
            Oppdrag
          </p>
          <h2 id="role-compass-title" className="mt-2 text-3xl font-extrabold text-ink">
            Bygg rollekompasset ditt
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-slate">
            Kompasset fylles når du vurderer situasjoner. Målet er ikke å svare
            perfekt, men å øve på å kjenne igjen rollen din.
          </p>
        </div>
        <p className="w-fit rounded-2xl bg-mist px-4 py-2 text-sm font-bold text-harbor">
          {choices.length} av {moduleTwoCards.length} situasjoner vurdert
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {counts.map((zone) => (
          <article
            key={zone.id}
            className={`rounded-3xl border p-5 ${
              zone.id === "contribute"
                ? "border-pine/35 bg-pine/12"
                : zone.id === "clarify"
                  ? "border-honey/50 bg-honey/14"
                  : zone.id === "stop"
                    ? "border-red-300 bg-red-50"
                    : "border-harbor/10 bg-mist"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-ink">{zone.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate">{zone.description}</p>
              </div>
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-lg font-black text-harbor shadow-sm">
                {zone.marker}
              </span>
            </div>
            <p className="mt-4 text-sm font-bold text-harbor">
              {zone.count} {zone.count === 1 ? "situasjon funnet" : "situasjoner funnet"}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SituationCard({
  card,
  choice,
  onChoose,
}: {
  card: RoleCompassCard;
  choice?: CompassChoice;
  onChoose: (zone: RoleCompassZone) => void;
}) {
  const correctZone = roleCompassZones.find((zone) => zone.id === card.correctZone)!;
  const chosenZone = choice
    ? roleCompassZones.find((zone) => zone.id === choice.chosenZone)
    : undefined;
  const aligned = choice?.chosenZone === card.correctZone;

  return (
    <Card className="overflow-hidden p-0">
      <div className="h-2 bg-gradient-to-r from-pine via-honey to-harbor" />
      <div className="p-7 md:p-8">
        <p className="text-sm font-bold uppercase tracking-normal text-leaf">
          Situasjonskort
        </p>
        <h3 className="mt-2 text-3xl font-extrabold text-ink">{card.title}</h3>
        <p className="mt-4 text-xl leading-9 text-slate">{card.situation}</p>

        <fieldset className="mt-6">
          <legend className="text-base font-bold text-harbor">
            Hvor hører dette hjemme i rollekompasset?
          </legend>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {roleCompassZones.map((zone) => (
              <button
                key={zone.id}
                type="button"
                aria-pressed={choice?.chosenZone === zone.id}
                onClick={() => onChoose(zone.id)}
                className={`min-h-14 rounded-2xl border px-4 py-3 text-left text-base font-bold transition focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine ${
                  choice?.chosenZone === zone.id
                    ? "border-pine bg-harbor text-white shadow-soft"
                    : "border-harbor/12 bg-white text-harbor hover:-translate-y-0.5 hover:border-pine/60 hover:bg-mist"
                }`}
              >
                <span className="mr-2" aria-hidden="true">
                  {zone.marker}
                </span>
                {zone.title}
              </button>
            ))}
          </div>
        </fieldset>

        {choice && chosenZone ? (
          <section className="mt-6 rounded-3xl bg-mist p-5" aria-live="polite">
            <p className="text-sm font-bold uppercase tracking-normal text-leaf">
              Forklaring
            </p>
            <p className="mt-2 text-base font-bold leading-7 text-harbor">
              {aligned
                ? `Ja. Dette hører godt hjemme i: ${correctZone.title}.`
                : `Dette er lett å vurdere som ${chosenZone.shortTitle.toLowerCase()}, men her peker kompasset mot: ${correctZone.title}.`}
            </p>
            <div className="mt-4 space-y-3 text-base leading-8 text-slate">
              {card.feedback.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </Card>
  );
}

export function ModuleTwo({ courseModule, isComplete, onComplete }: ModuleTwoProps) {
  const [choices, setChoices] = useState<CompassChoice[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [masteryAnswer, setMasteryAnswer] = useState<string | null>(null);
  const currentCard = moduleTwoCards[currentIndex];
  const currentChoice = choices.find((choice) => choice.cardId === currentCard.id);
  const assessedCount = choices.length;
  const insightUnlocked = assessedCount >= REQUIRED_ASSESSMENTS;
  const masteryComplete = masteryAnswer === "b";
  const canComplete = insightUnlocked && masteryComplete;

  const assessedCards = useMemo(
    () =>
      choices
        .map((choice) => moduleTwoCards.find((card) => card.id === choice.cardId))
        .filter((card): card is RoleCompassCard => Boolean(card)),
    [choices],
  );

  function chooseZone(zone: RoleCompassZone) {
    setChoices((current) => {
      const existing = current.find((choice) => choice.cardId === currentCard.id);
      if (existing) {
        return current.map((choice) =>
          choice.cardId === currentCard.id ? { ...choice, chosenZone: zone } : choice,
        );
      }

      return [...current, { cardId: currentCard.id, chosenZone: zone }];
    });
  }

  function goToNextCard() {
    setCurrentIndex((index) => Math.min(index + 1, moduleTwoCards.length - 1));
  }

  function goToPreviousCard() {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }

  return (
    <article className="space-y-8">
      <header className="overflow-hidden rounded-[2rem] border border-harbor/8 bg-white shadow-soft">
        <div className="h-2 bg-gradient-to-r from-pine via-honey to-harbor" />
        <div className="grid gap-8 p-7 md:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-leaf">
              Modul {courseModule.order}
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight text-ink md:text-5xl">
              Frivilligrollen: Hva er min plass?
            </h1>
            <p className="mt-4 inline-flex rounded-full bg-mist px-3 py-1 text-base font-semibold text-harbor">
              Ca. {courseModule.durationMinutes} minutter
            </p>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-slate">
              Frivilligrollen blir tryggere når du vet hvor du står. I denne
              modulen bygger du ditt eget rollekompass ved å vurdere situasjoner
              frivillige kan møte.
            </p>
          </div>
          <div className="rounded-3xl bg-harbor p-5 text-white shadow-soft">
            <p className="text-sm font-bold uppercase tracking-normal text-pine">
              Hovedbudskap
            </p>
            <p className="mt-3 max-w-sm text-xl font-bold leading-8">
              Du er et medmenneske med et avgrenset oppdrag. Det er ikke et
              nederlag å stoppe og avklare.
            </p>
          </div>
        </div>
      </header>

      <LearningSection eyebrow="Forstå" title="Frivilligrollen er ikke en restrolle">
        <p>
          Det er lett å tenke på frivillige som noen som hjelper til litt der det
          trengs. Det er sant, men det er ikke nok.
        </p>
        <p>
          Frivilligrollen er ikke en restrolle som fyller hull når systemet ikke
          strekker til. Den er heller ikke en billigere versjon av en ansattrolle.
          Frivillige gjør noe annet.
        </p>
        <RoleComparison />
        <p className="rounded-3xl bg-mist p-5 font-bold text-harbor">
          Ikke som myndighet. Ikke som familie. Ikke som behandler. Ikke som
          kontrollør. Men som medmenneske.
        </p>
      </LearningSection>

      <LearningSection eyebrow="Avklar" title="Frivillige skal bidra, ikke overta">
        <p>
          Frivillighet skal være et supplement og en berikelse. Frivillige kan
          skape aktivitet, fellesskap, samtaler, turer, møteplasser og små broer
          mellom mennesker.
        </p>
        <p>
          Men frivillige skal ikke overta ansvar som ligger hos kommunen, ansatte
          eller pårørende. Å bidra er å være med. Å overta er å få ansvar.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-mist p-5">
            <h3 className="text-lg font-bold text-harbor">Du kan bidra</h3>
            <p className="mt-3 text-base leading-7">
              Du kan følge noen inn i et fellesskap, lytte, vise omsorg og legge
              merke til noe som bør tas videre.
            </p>
          </div>
          <div className="rounded-3xl bg-harbor p-5 text-white">
            <h3 className="text-lg font-bold">Du skal ikke overta</h3>
            <p className="mt-3 text-base leading-7 text-white/78">
              Du skal ikke bli ansvarlig for hele livssituasjonen, bli behandler,
              saksbehandler eller privat krisekontakt.
            </p>
          </div>
        </div>
      </LearningSection>

      <LearningSection eyebrow="Trygg rolle" title="Rollen blir tryggere når den er tydelig">
        <p>
          Noen tror at grenser gjør frivilligheten kaldere. Det motsatte er ofte
          sant. Tydelige grenser gjør det tryggere å være varm.
        </p>
        <p>
          Når du vet hva rollen din er, slipper du å lure på om du gjør for lite
          eller for mye. Den du møter, slipper også å bli usikker på hva du
          egentlig kan bidra med.
        </p>
        <p className="rounded-3xl bg-mist p-5 font-bold text-harbor">
          Rolleavklaring gjør ikke frivillighet byråkratisk. Den gjør
          frivillighet mulig å stå i over tid.
        </p>
      </LearningSection>

      <LearningSection eyebrow="Når du blir usikker" title="Tre spørsmål du kan stille">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["1", "Er dette avtalt?", "Er dette en del av oppdraget mitt, eller er det noe som har dukket opp underveis?"],
            ["2", "Er dette trygt?", "Kan dette føre til risiko for meg, den andre, pårørende, ansatte eller organisasjonen?"],
            ["3", "Er dette mitt ansvar?", "Ligger dette hos frivilligrollen, eller egentlig hos ansatte, kommune, helsepersonell eller pårørende?"],
          ].map(([number, title, text]) => (
            <section key={number} className="rounded-3xl bg-mist p-5">
              <span className="grid size-10 place-items-center rounded-2xl bg-white text-sm font-black text-harbor">
                {number}
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
              <p className="mt-3 text-base leading-7">{text}</p>
            </section>
          ))}
        </div>
        <p className="rounded-3xl bg-honey/18 p-5 font-bold text-harbor">
          Hvis du svarer nei eller blir usikker på ett av spørsmålene, er det et
          tegn på at du bør stoppe opp og avklare.
        </p>
      </LearningSection>

      <RoleCompass choices={choices} />

      <section className="space-y-5" aria-labelledby="situation-title">
        <div className="flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-leaf">
              Vurder situasjoner
            </p>
            <h2 id="situation-title" className="mt-1 text-2xl font-bold text-ink">
              Situasjon {currentIndex + 1} av {moduleTwoCards.length}
            </h2>
          </div>
          <div
            className="h-3 overflow-hidden rounded-full bg-mist sm:w-64"
            role="progressbar"
            aria-label="Vurderte situasjoner"
            aria-valuemin={0}
            aria-valuemax={moduleTwoCards.length}
            aria-valuenow={assessedCount}
          >
            <div
              className="h-full rounded-full bg-pine transition-all duration-500"
              style={{ width: `${(assessedCount / moduleTwoCards.length) * 100}%` }}
            />
          </div>
        </div>

        <SituationCard card={currentCard} choice={currentChoice} onChoose={chooseZone} />

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button onClick={goToPreviousCard} variant="secondary" disabled={currentIndex === 0}>
            Forrige situasjon
          </Button>
          <Button
            onClick={goToNextCard}
            disabled={!currentChoice || currentIndex === moduleTwoCards.length - 1}
          >
            Neste situasjon
          </Button>
        </div>
      </section>

      {insightUnlocked ? (
        <section className="space-y-6" aria-live="polite">
          <section className="rounded-[2rem] border border-pine/30 bg-gradient-to-br from-harbor to-fjord p-7 text-white shadow-glow md:p-9">
            <p className="text-sm font-bold uppercase tracking-normal text-pine">
              Innsikt låst opp
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight">
              Du trenger ikke være alt.
            </h2>
            <p className="mt-5 max-w-3xl text-xl leading-9 text-white/82">
              Du trenger å vite hva som er ditt bidrag, hva som må avklares, og
              hvem du spør når noe blir uklart.
            </p>
          </section>

          <Card className="p-7 md:p-8">
            <p className="text-sm font-bold uppercase tracking-normal text-leaf">
              Ferdig rollekompass
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-ink">
              Slik kan du bruke kompasset
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                "Som frivillig kan jeg bidra med nærvær, samtale, fellesskap og lavterskel støtte.",
                "Jeg skal avklare når oppgaven endrer seg, når ansvar blir uklart, eller når jeg kjenner usikkerhet.",
                "Jeg skal huske at helse, vedtak, økonomi og tjenesteansvar ligger hos andre.",
                "Jeg skal stoppe når noen ber meg gjøre noe utrygt, hemmelig, helsefaglig eller økonomisk.",
              ].map((text) => (
                <p key={text} className="rounded-3xl bg-mist p-5 text-base font-semibold leading-8 text-harbor">
                  {text}
                </p>
              ))}
            </div>
          </Card>

          <Card className="p-7 md:p-8">
            <p className="text-sm font-bold uppercase tracking-normal text-leaf">
              Trygge formuleringer
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-ink">
              Setninger du kan bruke
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {safePhrases.map((phrase) => (
                <article key={phrase.title} className="rounded-3xl border border-harbor/8 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-bold text-harbor">{phrase.title}</h3>
                  <p className="mt-3 text-base leading-8 text-slate">«{phrase.text}»</p>
                </article>
              ))}
            </div>
          </Card>

          <Card className="p-7 md:p-8">
            <p className="text-sm font-bold uppercase tracking-normal text-leaf">
              Moduloppsummering
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-ink">
              Varm, tydelig og trygg
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-slate">
              <p>
                Du har nå sett at frivilligrollen ikke handler om å gjøre mest
                mulig. Den handler om å gjøre det riktige innenfor en trygg ramme.
              </p>
              <p>
                Som frivillig kan du være nær, varm og viktig uten å overta ansvar
                som ligger hos andre. Du kan lytte uten å bli behandler. Du kan se
                uten å bli saksbehandler. Du kan bidra uten å bli ansvarlig for alt.
              </p>
              <p>
                Når du vet hva rollen din er, blir det lettere å møte mennesker
                med ro. Du kan være tydelig uten å være kald. Du kan si nei uten å
                avvise. Du kan stoppe og avklare uten å føle at du svikter.
              </p>
              <p className="font-bold text-harbor">
                En trygg frivillig er ikke en som løser alt alene. En trygg
                frivillig vet hva som er sitt bidrag, og hvem som skal spørres når
                noe går utenfor det.
              </p>
            </div>
          </Card>

          <Card className="p-7 md:p-8">
            <p className="text-sm font-bold uppercase tracking-normal text-leaf">
              Mestringssjekk
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-ink">
              Hva oppsummerer frivilligrollen best?
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
              <p className="mt-5 rounded-3xl bg-mist p-5 text-base font-semibold leading-8 text-harbor" aria-live="polite">
                {masteryOptions.find((option) => option.id === masteryAnswer)?.feedback}
              </p>
            ) : null}
          </Card>
        </section>
      ) : (
        <Card className="p-6">
          <p className="text-base font-semibold leading-8 text-slate">
            Vurder minst {REQUIRED_ASSESSMENTS} situasjoner for å låse opp
            innsikten og ferdigstille rollekompasset.
          </p>
        </Card>
      )}

      <div className="flex flex-col gap-4 rounded-3xl border border-harbor/8 bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <Button to="/moduler" variant="secondary">
          Tilbake til moduloversikt
        </Button>
        <div className="flex flex-col gap-2 sm:items-end">
          {!canComplete ? (
            <p className="text-sm font-semibold text-slate">
              Vurder minst 8 situasjoner og fullfør mestringssjekken for å
              fullføre modulen.
            </p>
          ) : null}
          <Button onClick={onComplete} disabled={!canComplete || isComplete}>
            {isComplete ? "Modul er fullført" : "Marker som fullført"}
          </Button>
        </div>
      </div>
    </article>
  );
}
