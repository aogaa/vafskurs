import { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import type { ModuleBodyProps } from "../../types";
import {
  organisasjonsProfil as profil,
  type ProfilPunkt,
} from "../organisasjon";

/**
 * Del 5 — "Slik gjør vi det hos oss".
 *
 * Dette er den ENESTE delen som er organisasjonsspesifikk. Alt innhold leses
 * fra `organisasjon.ts`. En annen organisasjon bytter ut profilen der, og
 * denne delen forteller automatisk deres historie — uten å røre komponenten.
 *
 * Lagring (kun lokalt):
 *   spraakkafe:del-5-video-sett  → boolean, om videoen er bekreftet sett
 *   spraakkafe:del-5-quiz        → svarene i avslutningsquizen
 */

// ── Hjelpere ─────────────────────────────────────────────────────────────────

function PunktListe({ punkter }: { punkter: ProfilPunkt[] }) {
  return (
    <ul className="mt-4 space-y-4">
      {punkter.map((punkt) => (
        <li key={punkt.tittel} className="flex gap-3">
          <span
            className="mt-1 grid size-7 shrink-0 place-items-center rounded-2xl bg-pine/20 text-sm font-black text-harbor"
            aria-hidden="true"
          >
            ✓
          </span>
          <span className="text-base leading-7 text-ink">
            <span className="font-bold text-harbor">{punkt.tittel}</span>
            {punkt.detalj ? (
              <span className="block text-slate">{punkt.detalj}</span>
            ) : null}
            {punkt.lenke ? (
              <a
                href={punkt.lenke.url}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-2xl bg-mist px-3 py-1.5 text-sm font-bold text-harbor ring-1 ring-harbor/10 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine"
              >
                <span aria-hidden="true">▶</span>
                {punkt.lenke.tekst}
                <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  );
}

function InfoCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-7 ring-1 ring-harbor/10">
      <h2 className="flex items-center gap-3 text-xl font-bold text-ink">
        <span aria-hidden="true">{icon}</span>
        {title}
      </h2>
      {children}
    </Card>
  );
}

// ── Video ─────────────────────────────────────────────────────────────────────

const VIDEO_WATCHED_KEY = "spraakkafe:del-5-video-sett";

function readVideoWatched(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(VIDEO_WATCHED_KEY) === "true";
}

// ── Quiz ──────────────────────────────────────────────────────────────────────

const QUIZ_STORAGE_KEY = "spraakkafe:del-5-quiz";

type QuizAlternativ = {
  id: string;
  text: string;
  correct: boolean;
  feedback: string;
};

type QuizSporsmaal = {
  id: string;
  sporsmaal: string;
  alternativer: QuizAlternativ[];
};

const quizSporsmaal: QuizSporsmaal[] = [
  {
    id: "nivaer",
    sporsmaal: "Hvilke tre nivåbetegnelser brukes om norskferdigheter på Europarådets skala?",
    alternativer: [
      {
        id: "a",
        text: "Grunnleggende, middels og avansert",
        correct: false,
        feedback:
          "Europarådets skala bruker bokstavene A, B og C — ikke disse betegnelsene.",
      },
      {
        id: "b",
        text: "A (basisbruker), B (selvstendig bruker) og C (avansert bruker)",
        correct: true,
        feedback:
          "Riktig! A er nybegynner, B klarer seg i de fleste situasjoner, og C uttrykker seg flytende og nyansert.",
      },
      {
        id: "c",
        text: "Nivå 1, 2 og 3",
        correct: false,
        feedback:
          "Europarådets skala bruker bokstavene A, B og C — ikke tall.",
      },
    ],
  },
  {
    id: "nivaa-b",
    sporsmaal: "Hva kjennetegner en deltaker på nivå B?",
    alternativer: [
      {
        id: "a",
        text: "Forstår og bruker enkle, dagligdagse ord og fraser",
        correct: false,
        feedback:
          "Det beskriver nivå A — den som er fersk nybegynner.",
      },
      {
        id: "b",
        text: "Klarer seg i de fleste situasjoner og kan fortelle om erfaringer i sammenhengende tale",
        correct: true,
        feedback:
          "Riktig. B er den selvstendige brukeren — kan mye, men gjør fortsatt noen feil.",
      },
      {
        id: "c",
        text: "Uttrykker seg helt flytende og kan diskutere abstrakte tema uten anstrengelse",
        correct: false,
        feedback:
          "Det beskriver nivå C — den avanserte brukeren.",
      },
    ],
  },
  {
    id: "forskjell",
    sporsmaal: "Hva er den viktigste forskjellen mellom en språkkafé og et norskkurs?",
    alternativer: [
      {
        id: "a",
        text: "Språkkafeen er kun for folk med høyt norsk nivå",
        correct: false,
        feedback:
          "Nei — språkkafeen er åpen for alle fra ca. nivå A1 og oppover.",
      },
      {
        id: "b",
        text: "På norskkurset er det pensum, lekser og vurdering — på språkkafeen er det uformell samtale uten krav",
        correct: true,
        feedback:
          "Riktig. Språkkafeen er et lavterskeltilbud der praten flyter fritt — ikke et klasserom.",
      },
      {
        id: "c",
        text: "Språkkafeen ledes alltid av en person med pedagogisk bakgrunn",
        correct: false,
        feedback:
          "Det kreves ingen faglig bakgrunn for å være frivillig på en språkkafé.",
      },
    ],
  },
  {
    id: "trygge-tema",
    sporsmaal: "Hvilke temaer er trygge og gode å snakke om på språkkafeen?",
    alternativer: [
      {
        id: "a",
        text: "Religion, politikk og innvandringspolitikk",
        correct: false,
        feedback:
          "Disse er betente temaer som det er lurt å styre unna.",
      },
      {
        id: "b",
        text: "Krig, økonomi og lønn",
        correct: false,
        feedback:
          "Krig er et betent tema. Økonomi og lønn kan også oppleves privat og ubehagelig.",
      },
      {
        id: "c",
        text: "Mat, hverdagsliv, norske tradisjoner og kultur",
        correct: true,
        feedback:
          "Nettopp! Slike tema er lette å snakke om, engasjerer alle og øker kulturforståelsen.",
      },
    ],
  },
  {
    id: "styr-unna",
    sporsmaal: "Hva bør du som samtaleleder styre unna?",
    alternativer: [
      {
        id: "a",
        text: "Vær, ferie og norsk natur",
        correct: false,
        feedback:
          "Disse er fine og trygge samtaletemaer.",
      },
      {
        id: "b",
        text: "Krig, religion og politikk",
        correct: true,
        feedback:
          "Riktig. Disse temaene kan lett skape splid — særlig fordi deltakere kan komme fra land i konflikt med hverandre.",
      },
      {
        id: "c",
        text: "Norsk mat og lokale tradisjoner",
        correct: false,
        feedback:
          "Mat og tradisjoner er faktisk blant de beste samtaletemaene på en språkkafé.",
      },
    ],
  },
  {
    id: "naar-hvor",
    sporsmaal: "Når og hvor holdes Vestre Aker Frivilligsentrals språkkafé?",
    alternativer: [
      {
        id: "a",
        text: "Mandager kl. 17:00 på Vestre Aker frivilligsentral",
        correct: false,
        feedback:
          "Feil dag, tid og sted. Sjekk «Kort fortalt» øverst i denne delen.",
      },
      {
        id: "b",
        text: "Onsdager kl. 18:00 på Røa bibliotek",
        correct: false,
        feedback:
          "Nesten — stedet er riktig, men dag og tid stemmer ikke.",
      },
      {
        id: "c",
        text: "Tirsdager kl. 16:30 på Røa bibliotek",
        correct: true,
        feedback:
          "Riktig! Husk å møte opp ca. kl. 16:15 — et kvarter før — slik at alt er klart til start.",
      },
    ],
  },
  {
    id: "bordbytte",
    sporsmaal: "En deltaker sitter ved B-bordet, men viser seg å ha svært lavt nivå. Hva gjør du?",
    alternativer: [
      {
        id: "a",
        text: "Du lar dem sitte og prøver å snakke saktere",
        correct: false,
        feedback:
          "Bordene er delt inn etter nivå for at alle skal få øvd seg optimalt. Stor nivåforskjell gjør det vanskelig for alle.",
      },
      {
        id: "b",
        text: "Du foreslår vennlig at de bytter til A-bordet",
        correct: true,
        feedback:
          "Riktig. Du spør om nivå ved ankomst og kan bytte underveis. Et vennlig forslag er en naturlig del av jobben.",
      },
      {
        id: "c",
        text: "Du avslutter bordet tidlig",
        correct: false,
        feedback:
          "Det er ikke nødvendig — et vennlig forslag om bordbytte løser situasjonen.",
      },
    ],
  },
  {
    id: "sknader",
    sporsmaal: "En deltaker ber deg hjelpe med jobbsøknaden sin under kafeen. Hva er riktig?",
    alternativer: [
      {
        id: "a",
        text: "Du hjelper med en gang — det er god frivillig innsats",
        correct: false,
        feedback:
          "Slik hjelp hører ikke hjemme under selve kafeen — det forstyrrer flyten og er ikke det kafeen er til for.",
      },
      {
        id: "b",
        text: "Du forklarer at det ikke hører hjemme under kafeen, men tilbyr gjerne å hjelpe en annen gang — på dine premisser",
        correct: true,
        feedback:
          "Riktig. Du kan også henvise til frivilligsentralen om du ikke har anledning til å hjelpe selv.",
      },
      {
        id: "c",
        text: "Du avviser og sier at frivillige aldri kan hjelpe med slikt",
        correct: false,
        feedback:
          "Frivillige kan gjerne hjelpe — men utenfor kafeen, på egne premisser. Det er opp til deg.",
      },
    ],
  },
  {
    id: "servering",
    sporsmaal: "Hva er riktig om servering på språkkafeen?",
    alternativer: [
      {
        id: "a",
        text: "De frivillige har ansvar for å kjøpe inn kaffe og kjeks",
        correct: false,
        feedback:
          "Det er biblioteket som setter fram drikke og kjeks — ikke de frivillige.",
      },
      {
        id: "b",
        text: "Det er ikke tillatt å ta med mat hjemmefra",
        correct: false,
        feedback:
          "Det er lov og veldig hyggelig — men det serveres kun i pausen, og det må være nok til alle.",
      },
      {
        id: "c",
        text: "Biblioteket setter fram drikke og kjeks — medbrakt hjemmefra serveres kun i pausen, og det må være nok til alle",
        correct: true,
        feedback:
          "Riktig. Ønsker du å bidra med noe hjemmebakt eller frukt fra hagen, er det alltid velkommen — bare husk regelen.",
      },
    ],
  },
  {
    id: "pause",
    sporsmaal: "Hva er riktig om pausen?",
    alternativer: [
      {
        id: "a",
        text: "Deltakerne bør snakke norsk i pausen for å øve mest mulig",
        correct: false,
        feedback:
          "Det er slitsomt å lære et nytt språk. Pausen er til for å puste ut — det er ikke krav om å snakke norsk.",
      },
      {
        id: "b",
        text: "Pausen er til for å puste ut. Det er ikke krav om å snakke norsk, og den er et viktig sosialt møtepunkt",
        correct: true,
        feedback:
          "Riktig. Mange deltakere har lite nettverk — møtene rundt kaffekoppen betyr mer enn man kanskje tror.",
      },
      {
        id: "c",
        text: "Pausen er valgfri og kan hoppes over hvis stemningen er god",
        correct: false,
        feedback:
          "Pausen er en fast og viktig del av kafeen — sosialt og som hvile fra norskøvingen.",
      },
    ],
  },
];

function readQuizSvar(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(QUIZ_STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveQuizSvar(svar: Record<string, string>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(svar));
}

// ── Hovedkomponent ────────────────────────────────────────────────────────────

export function DelToSlikGjorVi({
  courseModule,
  isComplete,
  onComplete,
}: ModuleBodyProps) {
  const [videoSett, setVideoSett] = useState(readVideoWatched);
  const [quizSvar, setQuizSvar] = useState<Record<string, string>>(readQuizSvar);
  const [quizIndex, setQuizIndex] = useState(0);

  const quizFullfort = quizSporsmaal.every((s) => quizSvar[s.id]);
  const kanFullfore = videoSett && quizFullfort;

  function bekreftVideo() {
    window.localStorage.setItem(VIDEO_WATCHED_KEY, "true");
    setVideoSett(true);
  }

  function velgSvar(sporsmaalId: string, alternativId: string) {
    if (quizSvar[sporsmaalId]) return;
    const neste = { ...quizSvar, [sporsmaalId]: alternativId };
    setQuizSvar(neste);
    saveQuizSvar(neste);
  }

  const gjeldende = quizSporsmaal[quizIndex];
  const valtId = quizSvar[gjeldende.id];
  const valt = gjeldende.alternativer.find((a) => a.id === valtId);
  const riktig = valt?.correct ?? false;
  const besvartAntall = quizSporsmaal.filter((s) => quizSvar[s.id]).length;

  return (
    <article className="space-y-8">
      <section className="rounded-3xl bg-harbor px-7 py-9 shadow-soft md:px-8 md:py-10">
        <p className="text-sm font-bold uppercase tracking-normal text-pine">
          Del {courseModule.order} &middot; Slik lager vi språkkafe
        </p>
        <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
          Slik gjør vi det hos oss
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-white">
          Slik gjennomfører {profil.organisasjon} språkkafeen.
        </p>
      </section>

      {/* Hurtigfakta */}
      <Card className="bg-mist p-7 ring-1 ring-harbor/10">
        <h2 className="text-xl font-bold text-harbor">Kort fortalt</h2>
        <dl className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-bold uppercase tracking-normal text-harbor">
              Hvor
            </dt>
            <dd className="mt-1 text-base leading-7 text-ink">
              {profil.sted}
              {profil.adresse ? (
                profil.kartlenke ? (
                  <a
                    href={profil.kartlenke}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex w-fit items-center gap-2 font-bold text-harbor underline decoration-pine decoration-2 underline-offset-2 hover:text-leaf focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine"
                  >
                    <span aria-hidden="true">📍</span>
                    {profil.adresse}
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <span className="block">{profil.adresse}</span>
                )
              ) : null}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-bold uppercase tracking-normal text-harbor">
              Når
            </dt>
            <dd className="mt-1 text-base leading-7 text-ink">
              {profil.tidspunkt}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-bold uppercase tracking-normal text-harbor">
              Oppmøte
            </dt>
            <dd className="mt-1 text-base leading-7 text-ink">
              {profil.oppmote}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-bold uppercase tracking-normal text-harbor">
              Varighet
            </dt>
            <dd className="mt-1 text-base leading-7 text-ink">
              {profil.varighet}
            </dd>
          </div>
        </dl>
      </Card>

      <InfoCard title="Påmelding og avlysning" icon="📋">
        <PunktListe punkter={[profil.paamelding, profil.bemanning]} />
        <p className="mt-4 rounded-2xl bg-mist p-4 text-base leading-7 text-harbor">
          {profil.kontaktperson.avlysningRutine}
        </p>
        {(profil.kontaktperson.epost || profil.kontaktperson.telefon) ? (
          <div className="mt-3 flex flex-wrap gap-3">
            {profil.kontaktperson.epost ? (
              <a
                href={`mailto:${profil.kontaktperson.epost}`}
                className="inline-flex items-center gap-2 rounded-2xl bg-mist px-4 py-2 text-sm font-bold text-harbor ring-1 ring-harbor/10 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine"
              >
                <span aria-hidden="true">✉️</span>
                {profil.kontaktperson.epost}
              </a>
            ) : null}
            {profil.kontaktperson.telefon ? (
              <a
                href={`tel:${profil.kontaktperson.telefon.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-2xl bg-mist px-4 py-2 text-sm font-bold text-harbor ring-1 ring-harbor/10 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine"
              >
                <span aria-hidden="true">📞</span>
                {profil.kontaktperson.telefon}
              </a>
            ) : null}
          </div>
        ) : null}
      </InfoCard>

      {/* Video: vaktplanen */}
      <Card className="overflow-hidden p-0 ring-1 ring-harbor/10">
        <div className="p-6 md:p-8">
          <h2 className="flex items-center gap-3 text-xl font-bold text-ink">
            <span aria-hidden="true">▶️</span>
            Slik melder du deg på vakt
          </h2>
          <p className="mt-2 text-base leading-7 text-slate">
            Se videoen under for å lære hvordan vaktplanen fungerer. Du må se
            den for å fullføre kurset.
          </p>
        </div>
        <div
          className="relative w-full overflow-hidden bg-black"
          style={{ paddingBottom: "56.25%" }}
        >
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/E4jV7CfxOF0?si=Z6H2jznv461AlvlX"
            title="Slik melder du deg på vakt"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <div className="p-6 md:p-8">
          {videoSett ? (
            <div
              className="flex items-center gap-3 rounded-2xl bg-pine/20 px-5 py-4 text-base font-bold text-harbor animate-[fadeIn_240ms_ease-out]"
              aria-live="polite"
            >
              <span className="text-xl" aria-hidden="true">✓</span>
              Du har sett videoen
            </div>
          ) : (
            <button
              type="button"
              onClick={bekreftVideo}
              className="w-full rounded-2xl border-2 border-dashed border-pine/40 bg-pine/10 px-5 py-4 text-center text-base font-bold text-harbor transition duration-200 hover:bg-pine/20 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine"
            >
              ✓ Jeg har sett videoen
            </button>
          )}
        </div>
      </Card>

      <InfoCard title="Bordene og deltakerne" icon="🪑">
        <PunktListe punkter={profil.bordoppsett} />
      </InfoCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <InfoCard title="Tekster" icon="📖">
          <PunktListe punkter={[profil.tekster]} />
        </InfoCard>

        <InfoCard title="Servering" icon="☕">
          <PunktListe punkter={[profil.servering]} />
        </InfoCard>
      </div>

      {profil.meraapent.harMeraapent ? (
        <Card className="border border-pine/45 bg-pine/20 p-7">
          <h2 className="flex items-center gap-3 text-xl font-bold text-harbor">
            <span aria-hidden="true">🔑</span>
            Meråpent
          </h2>
          <p className="mt-4 text-base leading-7 text-harbor">
            {profil.meraapent.tekst}
          </p>
          {profil.meraapent.lenke ? (
            <a
              href={profil.meraapent.lenke}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-bold text-harbor ring-1 ring-harbor/10 transition-colors hover:bg-mist focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine"
            >
              {profil.meraapent.lenketekst ?? "Les mer"}
              <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </Card>
      ) : null}

      {profil.merknader.length > 0 ? (
        <InfoCard title="Verdt å vite" icon="💡">
          <PunktListe punkter={profil.merknader} />
        </InfoCard>
      ) : null}

      {/* ── Avslutningsquiz ── */}
      <section aria-labelledby="quiz-heading">
        <Card className="p-6 md:p-8">
          <h2
            id="quiz-heading"
            className="flex items-center gap-3 text-2xl font-extrabold leading-tight text-ink md:text-3xl"
          >
            <span className="shrink-0 text-2xl md:text-3xl" aria-hidden="true">
              🧠
            </span>
            Sjekk at du har fått det med deg
          </h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate md:text-lg">
            Ti raske spørsmål fra kurset. Ingen karakterer — bare en sjanse til
            å se at du har fått med deg det viktigste.
          </p>

          {/* Fremdrift */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm font-semibold text-slate">
              <span>
                Spørsmål {quizIndex + 1} av {quizSporsmaal.length}
              </span>
              <span aria-live="polite">{besvartAntall} besvart</span>
            </div>
            <div
              className="mt-2 h-2 w-full overflow-hidden rounded-full bg-mist"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={quizSporsmaal.length}
              aria-valuenow={besvartAntall}
            >
              <div
                className="h-full rounded-full bg-pine transition-all duration-300"
                style={{
                  width: `${(besvartAntall / quizSporsmaal.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Spørsmål */}
          <div className="mt-6 flex min-h-20 items-center justify-center rounded-2xl bg-mist p-5 text-center text-lg font-bold text-harbor [text-wrap:balance]">
            {gjeldende.sporsmaal}
          </div>

          {/* Alternativer */}
          <div className="mt-5 grid gap-3">
            {gjeldende.alternativer.map((alt) => {
              const erValgt = valtId === alt.id;
              const visResultat = Boolean(valtId);
              let klasse =
                "w-full rounded-2xl border p-4 text-left transition duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine";
              if (!visResultat) {
                klasse +=
                  " border-harbor/10 bg-white text-ink hover:-translate-y-0.5 hover:border-pine/55 hover:shadow-lift cursor-pointer";
              } else if (alt.correct) {
                klasse += " border-pine bg-pine/20 text-harbor ring-2 ring-pine/45";
              } else if (erValgt) {
                klasse += " border-red-400 bg-red-50 text-red-950 ring-2 ring-red-200";
              } else {
                klasse += " border-harbor/10 bg-mist text-harbor";
              }
              return (
                <button
                  key={alt.id}
                  type="button"
                  onClick={() => velgSvar(gjeldende.id, alt.id)}
                  disabled={Boolean(valtId)}
                  aria-pressed={erValgt}
                  className={klasse}
                >
                  <span className="block text-base font-semibold">
                    {alt.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tilbakemelding */}
          {valt ? (
            <div
              className={`mt-5 rounded-2xl border p-5 animate-[fadeIn_240ms_ease-out] ${
                riktig
                  ? "border-pine/55 bg-pine/20"
                  : "border-honey/70 bg-honey/20"
              }`}
              aria-live="polite"
            >
              <p className="font-bold text-harbor">
                {riktig
                  ? "Riktig!"
                  : `Ikke helt — riktig svar: ${gjeldende.alternativer.find((a) => a.correct)?.text}`}
              </p>
              <p className="mt-2 text-base leading-7 text-harbor">
                {valt.feedback}
              </p>
            </div>
          ) : null}

          {/* Navigasjon */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <Button
              variant="secondary"
              onClick={() => setQuizIndex((i) => Math.max(i - 1, 0))}
              disabled={quizIndex === 0}
            >
              ← Forrige
            </Button>
            {quizIndex < quizSporsmaal.length - 1 ? (
              <Button
                onClick={() =>
                  setQuizIndex((i) =>
                    Math.min(i + 1, quizSporsmaal.length - 1)
                  )
                }
                className="bg-pine text-harbor hover:bg-leaf"
              >
                Neste →
              </Button>
            ) : null}
          </div>
        </Card>

        {/* Fullført-melding */}
        {quizFullfort ? (
          <Card className="mt-5 border border-pine/45 bg-pine/20 p-6 animate-[fadeIn_240ms_ease-out] md:p-8">
            <p className="text-xl font-extrabold text-harbor">
              Flott — du har svart på alle spørsmålene!
            </p>
            <p className="mt-2 text-base leading-7 text-harbor">
              Du er godt rustet til å stille på din første språkkafé.
            </p>
          </Card>
        ) : null}
      </section>

      {/* Fullfør */}
      <div className="flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-soft ring-1 ring-harbor/10 sm:flex-row sm:items-center sm:justify-between">
        <Button to="/" variant="secondary">
          Til hovedsiden
        </Button>
        <div className="flex flex-col items-stretch gap-2 sm:items-end">
          {!kanFullfore && (
            <p className="text-sm font-semibold text-slate" aria-live="polite">
              {!videoSett && !quizFullfort
                ? "Se videoen og svar på alle spørsmålene for å fullføre kurset."
                : !videoSett
                ? "Se videoen om vaktplanen for å fullføre kurset."
                : "Svar på alle spørsmålene for å fullføre kurset."}
            </p>
          )}
          <Button
            onClick={onComplete}
            disabled={!kanFullfore}
            className={
              kanFullfore
                ? "bg-pine text-harbor hover:bg-leaf"
                : "cursor-not-allowed opacity-40"
            }
          >
            {isComplete ? "✓ Kurset er fullført" : "Fullfør kurset"}
          </Button>
        </div>
      </div>
    </article>
  );
}
