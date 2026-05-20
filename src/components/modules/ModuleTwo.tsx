import { useState, type ReactNode } from "react";
import type { CourseModule } from "../../data/courseModules";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

const REFLECTION_STORAGE_KEY = "trygg-som-frivillig:del-2-refleksjon";
const ANSWERS_STORAGE_KEY = "trygg-som-frivillig:del-2-svar";

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
      "Dette må avklares. Det er forståelig at pårørende ønsker mer støtte, men frivillige skal ikke utvide oppdraget sitt alene eller bli erstatning for kommunale tjenester. På Frivilligsentralen er det daglig leder som er kontaktperson når slike spørsmål må avklares.",
  },
  {
    id: "fall-hemmelig",
    text: "En bruker ber deg holde det hemmelig at de har falt flere ganger den siste uken.",
    correctChoice: "avklares",
    feedback:
      "Dette skal du ikke bære alene. Fall kan være en alvorlig bekymring. Du skal ikke love absolutt hemmelighold, men ta det videre til riktig kontaktperson etter lokal rutine. På Frivilligsentralen er det daglig leder som er kontaktperson.",
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
  "Dette må jeg avklare med kontaktpersonen før jeg kan svare.",
  "Det ligger utenfor min rolle som frivillig, men jeg kan hjelpe deg med å finne riktig person å spørre.",
  "Jeg skjønner at dette er viktig for deg, men dette kan jeg ikke ta ansvar for.",
  "Jeg kan gjerne lytte, men jeg kan ikke love at jeg kan løse dette.",
  "Dette høres alvorlig ut. Jeg kan ikke holde det hemmelig, men jeg kan hjelpe deg med å ta det videre på en trygg måte.",
  "Jeg kan være med på aktiviteten slik vi har avtalt, men jeg kan ikke gjøre oppgaver som hører til ansatte.",
  "Jeg vil gjerne bidra, men jeg må holde meg til rammen for oppdraget mitt.",
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

function isRoleChoice(value: string): value is RoleChoice {
  return roleOptions.some((option) => option.id === value);
}

function readSavedAnswers(): Partial<Record<string, RoleChoice>> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const value = window.localStorage.getItem(ANSWERS_STORAGE_KEY);
    const parsed = value ? JSON.parse(value) : {};
    const next: Partial<Record<string, RoleChoice>> = {};

    for (const scenario of scenarios) {
      const answer = parsed[scenario.id];
      if (typeof answer === "string" && isRoleChoice(answer)) {
        next[scenario.id] = answer;
      }
    }

    return next;
  } catch {
    return {};
  }
}

function saveAnswers(value: Partial<Record<string, RoleChoice>>) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(value));
}

type RoleExpandData = {
  id: string;
  icon: string;
  title: string;
  canDo: string[];
  cannotDo: string[];
};

const roleExpandData: RoleExpandData[] = [
  {
    id: "frivillig",
    icon: "🤝",
    title: "Frivillig",
    canDo: [
      "Nærvær, samtale og medmenneskelighet",
      "Aktivitet og fellesskap",
      "Følge til møteplass (når avtalt)",
      "Praktisk lavterskelhjelp (når avtalt)",
      "Brobygging mellom mennesker",
    ],
    cannotDo: [
      "Helsehjelp eller medisinhåndtering",
      "Personlig stell og pleie",
      "Håndtere økonomi eller bankkort",
      "Saksbehandling eller juridiske vurderinger",
      "Faglige vurderinger",
    ],
  },
  {
    id: "ansatt",
    icon: "🏥",
    title: "Ansatt / fagperson",
    canDo: [
      "Faglige vurderinger og oppfølging",
      "Helsehjelp og pleie",
      "Vedtak og saksbehandling",
      "Dokumentasjon og rutiner",
      "Formelt tjenesteansvar",
    ],
    cannotDo: [
      "Erstatte frivillig nærvær og varme",
      "Alltid ha tid til lange samtaler og fellesskap",
    ],
  },
  {
    id: "parorende",
    icon: "👨‍👩‍👧",
    title: "Pårørende",
    canDo: [
      "Familierelasjon og nære bånd",
      "Privat omsorg og støtte",
      "Kjenne personen over lang tid",
    ],
    cannotDo: [
      "Bestemme hva frivillige skal gjøre",
      "Utvide frivilliges oppdrag på egenhånd",
      "Erstatte kommunale tjenester",
    ],
  },
  {
    id: "kommune",
    icon: "🏛️",
    title: "Kommune / tjenester",
    canDo: [
      "Lovpålagte tjenester og vedtak",
      "Rettigheter og faglig oppfølging",
      "Nødvendige helse- og omsorgstjenester",
    ],
    cannotDo: [
      "Dekkes av frivillige når kapasiteten er lav",
      "Overlate formelt ansvar til frivillig sektor",
    ],
  },
];

function RoleExpandCard({
  role,
  isActive,
  isAnyActive,
  onToggle,
}: {
  role: RoleExpandData;
  isActive: boolean;
  isAnyActive: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
        isActive
          ? "border-pine/45 bg-white shadow-lift"
          : isAnyActive
          ? "border-harbor/8 bg-white opacity-50"
          : "border-harbor/10 bg-white hover:border-pine/30 hover:shadow-soft"
      }`}
    >
      <button
        type="button"
        aria-expanded={isActive}
        onClick={onToggle}
        className="w-full p-5 text-left focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden="true">{role.icon}</span>
            <span className="text-lg font-extrabold text-ink">{role.title}</span>
          </div>
          <span
            className={`text-lg text-harbor transition-transform duration-300 ${
              isActive ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          >
            ▾
          </span>
        </div>
        {!isActive && (
          <p className="mt-1 text-sm font-medium text-slate">
            Trykk for å se ansvar og grenser
          </p>
        )}
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="grid gap-3 px-5 pb-5 sm:grid-cols-2">
            <div className="rounded-xl bg-pine/10 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-pine">
                Kan bidra med
              </p>
              <ul className="mt-3 space-y-2">
                {role.canDo.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm font-medium leading-6 text-harbor"
                  >
                    <span className="mt-0.5 shrink-0 font-bold text-pine" aria-hidden="true">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-harbor/12 bg-mist p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate">
                Skal ikke gjøre
              </p>
              <ul className="mt-3 space-y-2">
                {role.cannotDo.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm font-medium leading-6 text-slate"
                  >
                    <span className="mt-0.5 shrink-0 text-harbor/40" aria-hidden="true">
                      –
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type KanIkkeItem = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

const kanData: KanIkkeItem[] = [
  {
    id: "sosial",
    icon: "☕",
    title: "Sosial kontakt",
    description:
      "Komme på besøk, hilse, ta en kaffe, gå en tur, delta i aktivitet eller bare være til stede.",
  },
  {
    id: "samtale",
    icon: "💬",
    title: "Samtale",
    description:
      "Lytte, stille gode spørsmål, vise interesse og gi noen mulighet til å fortelle, mimre og dele.",
  },
  {
    id: "aktivitet",
    icon: "🚶",
    title: "Aktivitet",
    description:
      "Bidra til at mennesker kommer seg ut, møter andre og deltar på noe meningsfullt.",
  },
  {
    id: "folge",
    icon: "🗺️",
    title: "Følge innenfor avtalte rammer",
    description:
      "Følge en person til aktivitet eller møteplass når oppdraget er tydelig avklart på forhånd.",
  },
  {
    id: "praktisk",
    icon: "🙌",
    title: "Praktisk lavterskelhjelp",
    description:
      "Vise vei, sette frem stoler, lese et brev sammen — enkle oppgaver som er trygge og avklarte.",
  },
  {
    id: "brobygging",
    icon: "🌉",
    title: "Brobygging",
    description:
      "Gjøre det lettere for noen å komme inn i et fellesskap — introdusere, vise vei, si «jeg kan bli med deg første gangen».",
  },
];

const ikkeData: KanIkkeItem[] = [
  {
    id: "helse",
    icon: "💊",
    title: "Helsehjelp og medisiner",
    description:
      "Gi helsehjelp, dosere medisiner, vurdere behandling eller håndtere medisinsk oppfølging.",
  },
  {
    id: "stell",
    icon: "🚿",
    title: "Personlig stell og pleie",
    description:
      "Hjelpe med toalettbesøk, dusj, påkledning, bleieskift, sårstell eller annen intim pleie.",
  },
  {
    id: "okonomi",
    icon: "💳",
    title: "Økonomi",
    description:
      "Håndtere bankkort, PIN-koder, kontanter, regninger, Vipps eller andre økonomiske avtaler.",
  },
  {
    id: "saksbehandling",
    icon: "📋",
    title: "Saksbehandling og vurderinger",
    description:
      "Opptre som saksbehandler, vurdere rettigheter, gi juridiske eller medisinske råd.",
  },
];

function KanIkkeToggle() {
  const [activeTab, setActiveTab] = useState<"kan" | "ikke">("kan");
  const items = activeTab === "kan" ? kanData : ikkeData;

  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-extrabold leading-tight text-ink md:text-3xl">
        Hva kan du bidra med — og hva skal du ikke gjøre?
      </h2>
      <p className="mt-3 max-w-4xl text-base leading-8 text-slate md:text-lg">
        Velg hvilken side du vil utforske. Begge er like viktige å kjenne.
      </p>
      <div className="mt-5 flex gap-1.5 rounded-2xl bg-mist p-1.5">
        <button
          type="button"
          onClick={() => setActiveTab("kan")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-pine ${
            activeTab === "kan"
              ? "bg-pine text-white shadow-soft"
              : "text-slate hover:text-harbor"
          }`}
        >
          <span aria-hidden="true">✓</span>
          Kan bidra med
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("ikke")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-pine ${
            activeTab === "ikke"
              ? "bg-harbor text-white shadow-soft"
              : "text-slate hover:text-harbor"
          }`}
        >
          <span aria-hidden="true">–</span>
          Skal ikke gjøre
        </button>
      </div>
      <div
        className="mt-5 grid gap-3 md:grid-cols-2"
        aria-live="polite"
        aria-label={activeTab === "kan" ? "Kan bidra med" : "Skal ikke gjøre"}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex gap-4 rounded-2xl border p-4 transition-colors duration-200 ${
              activeTab === "kan"
                ? "border-pine/20 bg-pine/8"
                : "border-harbor/12 bg-mist"
            }`}
          >
            <span
              className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-white text-xl shadow-sm"
              aria-hidden="true"
            >
              {item.icon}
            </span>
            <div>
              <p className="font-extrabold text-ink">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-slate">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <p
        className={`mt-5 flex min-h-16 items-center justify-center rounded-xl p-4 text-center text-sm font-bold [text-wrap:balance] ${
          activeTab === "kan" ? "bg-pine/10 text-pine" : "bg-harbor/8 text-harbor"
        }`}
      >
        {activeTab === "kan"
          ? "Det viktigste er at oppgaven er avklart, trygg og innenfor den rollen du har sagt ja til."
          : "Å sette grenser er ikke mangel på omsorg. Det er en del av omsorgen."}
      </p>
    </Card>
  );
}

function Section({
  children,
  icon,
  title,
}: {
  children: ReactNode;
  icon?: string;
  title: string;
}) {
  return (
    <Card className="border-l-4 border-pine/40 p-6 md:p-8">
      <h2 className="flex items-center gap-3 text-2xl font-extrabold leading-tight text-ink md:text-3xl">
        {icon ? (
          <span
            className="grid size-10 shrink-0 place-items-center rounded-2xl bg-pine/12 text-xl"
            aria-hidden="true"
          >
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
  const [answers, setAnswers] = useState<Partial<Record<string, RoleChoice>>>(
    readSavedAnswers,
  );
  const [reflection, setReflection] = useState(readSavedReflection);
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [revealedConsequences, setRevealedConsequences] = useState(1);

  const currentScenario = scenarios[currentIndex];
  const selectedChoice = answers[currentScenario.id];
  const selectedOption = roleOptions.find((option) => option.id === selectedChoice);
  const correctOption = roleOptions.find(
    (option) => option.id === currentScenario.correctChoice,
  )!;
  const completedScenarioCount = scenarios.filter((scenario) => answers[scenario.id]).length;
  const hasCompletedExercise = completedScenarioCount === scenarios.length;

  function chooseRole(choice: RoleChoice) {
    setAnswers((current) => {
      const next = {
        ...current,
        [currentScenario.id]: choice,
      };
      saveAnswers(next);
      return next;
    });
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

  function getOptionClasses(optionId: RoleChoice) {
    const base =
      "min-h-24 rounded-2xl border p-4 text-left transition duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine";

    if (!selectedChoice) {
      return `${base} border-harbor/10 bg-white text-ink hover:-translate-y-0.5 hover:border-pine/55 hover:shadow-lift`;
    }

    if (optionId === currentScenario.correctChoice) {
      return `${base} border-pine bg-pine/20 text-harbor ring-2 ring-pine/45`;
    }

    if (optionId === selectedChoice) {
      return `${base} border-red-400 bg-red-50 text-red-950 ring-2 ring-red-200`;
    }

    if (optionId === "avklares") {
      return `${base} border-honey/70 bg-honey/18 text-harbor`;
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
          Frivilligrollen - hva er min rolle?
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-white">
          Når du er frivillig, har du en egen rolle. Du kan bidra med noe helt
          eget, men du skal ikke bære alt ansvar alene.
        </p>
      </section>

      <Section icon="🎯" title="Når du er frivillig, har du en egen rolle">
        <p>
          Når du er frivillig, stiller du opp fordi du vil bidra. Du bruker av
          din egen tid, ditt eget engasjement og din egen evne til å møte andre
          mennesker. Det er verdifullt.
        </p>
        <p>Men det er også viktig å vite hva rollen din er.</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            "Ansatt uten lønn",
            "Ekstra kommunal tjeneste",
            "Pårørende",
            "Saksbehandler eller behandler",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-xl bg-mist p-3 text-sm font-semibold text-slate/70"
            >
              <span
                className="grid size-5 shrink-0 place-items-center rounded-full bg-harbor/10 text-xs font-black text-harbor/50"
                aria-hidden="true"
              >
                ✕
              </span>
              {item}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center rounded-2xl bg-harbor px-6 py-8 text-center text-white">
          <p className="text-4xl font-black leading-tight md:text-5xl">
            Du er frivillig.
          </p>
        </div>
        <p>
          Det betyr at du kan bidra med noe helt eget: nærvær, tid, samtale,
          aktivitet, menneskelig kontakt og en vei inn i fellesskap. Du kan være
          en person som ser, lytter, inviterer og følger opp innenfor trygge
          rammer.
        </p>
        <p className="flex min-h-16 items-center justify-center rounded-xl bg-pine/10 p-4 text-center font-bold text-pine [text-wrap:balance]">
          Det er en viktig rolle. Men den er ikke grenseløs.
        </p>
      </Section>

      <Section icon="💼" title="Du er ikke ansatt uten lønn">
        <p>
          Det kan være lett å tenke at frivillige er mennesker som gjør ansattes
          oppgaver gratis. Det er en misforståelse.
        </p>
        <p>
          Som ansatt har man arbeidsavtale, fagansvar, tjenesteplikt,
          dokumentasjonskrav, arbeidsgiver, lovverk og formelle oppgaver.
          Ansatte kan ha ansvar for vedtak, helsehjelp, pleie, oppfølging,
          saksbehandling og faglige vurderinger.
        </p>
        <p>Som frivillig har du en annen rolle.</p>
        <p>
          Du bidrar fordi du vil. Du er organisert gjennom frivillig sektor, for
          eksempel en frivilligsentral, en forening, et lag, en organisasjon, en
          menighet eller et annet frivillig fellesskap. Selv når du samarbeider
          med kommunale tjenester, blir du ikke en del av kommunen.
        </p>
        <p>
          Kommunen kan gi hjelp, vedtak og oppfølging. Frivilligheten kan gi
          fellesskap, tilhørighet og menneskelige møter som ikke oppstår fordi
          noen har fått et vedtak.
        </p>
        <p className="font-bold text-harbor">
          Begge deler trengs. Men de må ikke blandes sammen.
        </p>
      </Section>

      <Section icon="🤝" title="Du er en del av frivillig sektor">
        <p>
          Når du som frivillig samarbeider med kommunale tjenester, kan det skape
          gode resultater. Mange mennesker får et bedre hverdagsliv når
          frivillige, ansatte, pårørende og lokalsamfunn trekker i samme retning.
        </p>
        <p>Men samarbeid betyr ikke at rollene blir like.</p>
        <p>
          Du kan være med på en aktivitet på et sykehjem. Du kan være besøksvenn
          for en hjemmeboende eldre. Du kan følge noen til en møteplass, bidra på
          leksehjelp, arrangere turer, skape fellesskap eller hjelpe mennesker
          inn i aktiviteter.
        </p>
        <p>Men du skal fortsatt forstå deg selv som frivillig.</p>
        <p>
          Det betyr at du ikke skal overta ansvar som ligger hos kommunen,
          ansatte eller pårørende. Du skal heller ikke settes i situasjoner der
          du må gjøre faglige vurderinger, håndtere helseoppgaver eller bære
          ansvar du ikke har fått opplæring, mandat eller rammer til å bære.
        </p>
        <p className="flex min-h-28 items-center justify-center rounded-2xl bg-mist p-5 text-center font-bold text-harbor [text-wrap:balance]">
          Godt samarbeid krever tydelige grenser. Ikke fordi vi skal gjøre
          frivilligheten kaldere, men fordi tydelige grenser gjør det tryggere å
          være varm.
        </p>
      </Section>

      <Card className="p-6 md:p-8">
        <h2 className="text-2xl font-extrabold leading-tight text-ink md:text-3xl">
          Fire roller som ikke må blandes sammen
        </h2>
        <p className="mt-5 max-w-4xl text-base leading-8 text-slate md:text-lg">
          I frivillig arbeid møter du ofte fire ulike roller: den frivillige, den
          ansatte, den pårørende og kommunen. Alle kan ha betydning i et
          menneskes liv, men de har ulikt ansvar. Trykk på en rolle for å se
          hva den innebærer.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {roleExpandData.map((role) => (
            <RoleExpandCard
              key={role.id}
              role={role}
              isActive={activeRole === role.id}
              isAnyActive={activeRole !== null}
              onToggle={() =>
                setActiveRole((current) => (current === role.id ? null : role.id))
              }
            />
          ))}
        </div>
        {activeRole === null && (
          <p className="mt-4 text-center text-sm font-semibold text-slate" aria-live="polite">
            Trykk på en av rollene over for å utforske ansvaret.
          </p>
        )}
      </Card>

      <Section icon="🧩" title="Supplement og berikelse - ikke erstatning">
        <p className="flex min-h-28 items-center justify-center rounded-2xl bg-mist p-5 text-center text-xl font-bold leading-9 text-harbor [text-wrap:balance]">
          Som frivillig bidrar du med noe ekstra i menneskers liv, ikke overta
          det andre har ansvar for.
        </p>
        <p>
          I praksis kan grensen bli uklar, særlig når du møter mennesker som
          trenger mye, eller når ansatte og pårørende har dårlig tid. Da kan det
          være fristende å tenke: «Jeg kan jo bare gjøre litt mer.»
        </p>
        <p>
          Noen ganger er det riktig å bidra litt ekstra innenfor rammen. Andre
          ganger er det nettopp da du skal stoppe opp og avklare.
        </p>
        <p>Hvis du stadig overtar ansvar som egentlig ligger hos andre, kan dette skje:</p>
        <ul className="grid gap-3 md:grid-cols-2">
          {[
            "Du kan bli overbelastet.",
            "Brukeren kan bli avhengig av én person.",
            "Ansvarsforholdene blir uklare.",
            "Kommunen eller ansatte kan tro at oppgaven er løst.",
            "Pårørende kan få forventninger du ikke kan leve opp til.",
            "Det kan oppstå risiko for bruker, deg og organisasjonen.",
          ]
            .slice(0, revealedConsequences)
            .map((item) => (
              <li
                key={item}
                className="flex min-h-24 animate-[fadeIn_240ms_ease-out] items-center justify-center rounded-2xl bg-mist p-4 text-center text-base font-bold leading-7 text-harbor [text-wrap:balance]"
              >
                {item}
              </li>
            ))}
        </ul>
        {revealedConsequences < 6 ? (
          <button
            type="button"
            onClick={() => setRevealedConsequences((n) => Math.min(n + 1, 6))}
            className="flex w-full items-center justify-between gap-4 rounded-2xl border-2 border-dashed border-harbor/20 bg-white px-6 py-4 text-base font-bold text-harbor transition duration-200 hover:border-pine/50 hover:bg-pine/8 hover:text-pine focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine"
          >
            <span className="flex items-center gap-3">
              <span
                className="grid size-8 place-items-center rounded-full bg-harbor/10 text-sm"
                aria-hidden="true"
              >
                {revealedConsequences + 1}
              </span>
              Vis neste konsekvens
            </span>
            <span className="flex items-center gap-2 text-sm font-semibold text-slate">
              <span>{revealedConsequences} av 6 vist</span>
              <span aria-hidden="true" className="text-lg">↓</span>
            </span>
          </button>
        ) : null}
        <p className="font-bold text-harbor">
          Å sette grenser er derfor ikke mangel på omsorg. Det er en del av
          omsorgen.
        </p>
      </Section>

      <KanIkkeToggle />

      <Section icon="🧭" title="Når du blir usikker: stopp og avklar">
        <p>
          Du trenger ikke ha svar på alt. Det viktigste er at du vet hva du gjør
          når du blir usikker.
        </p>
        <p>
          En god frivillig er ikke en som alltid sier ja. En god frivillig er en
          som forstår rollen sin, spør når noe er uklart og sier fra når noe må
          avklares.
        </p>
        <p className="flex min-h-24 items-center justify-center rounded-2xl bg-mist p-5 text-center text-xl font-bold leading-9 text-harbor [text-wrap:balance]">
          Stopp. Tenk. Avklar.
        </p>
        <p>Stopp når du kjenner at noe er uklart.</p>
        <p>Tenk gjennom hva du faktisk blir bedt om.</p>
        <p>Avklar med kontaktperson før du går videre.</p>
        <p>Typiske tegn på at du bør stoppe og avklare:</p>
        <ul className="grid gap-3 md:grid-cols-2">
          {[
            "Noen ber deg gjøre noe som ikke var avtalt.",
            "Noen ber deg holde noe hemmelig.",
            "Noen ber deg håndtere penger.",
            "Noen ber deg gjøre noe helserelatert.",
            "Du føler deg presset eller utrygg.",
            "Du får dårlig magefølelse.",
            "Noen forventer mer enn du mener er riktig.",
            "Relasjonen begynner å bli privat eller avhengig.",
          ].map((item) => (
            <li
              key={item}
              className="flex min-h-24 items-center justify-center rounded-2xl bg-mist p-4 text-center text-base font-bold leading-7 text-harbor [text-wrap:balance]"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="font-bold text-harbor">
          Det er ikke feigt å stoppe opp. Det er ansvarlig.
        </p>
      </Section>

      <div className="flex items-center gap-4 py-2" aria-hidden="true">
        <div className="h-px flex-1 bg-harbor/10" />
        <p className="text-sm font-bold uppercase tracking-widest text-harbor/40">
          Øvelse
        </p>
        <div className="h-px flex-1 bg-harbor/10" />
      </div>

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
                      className={getOptionClasses(option.id)}
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="text-lg font-extrabold">{option.label}</span>
                        <span
                          className={`mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${
                            isSelected || (selectedChoice && option.id === currentScenario.correctChoice)
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
          {currentIndex > 0 ? (
            <Button onClick={goToPreviousScenario} variant="secondary">
              Forrige scenario
            </Button>
          ) : (
            <span aria-hidden="true" />
          )}
          {currentIndex < scenarios.length - 1 ? (
            <Button onClick={goToNextScenario} disabled={!selectedChoice}>
              Neste scenario
            </Button>
          ) : null}
        </div>
      </section>

      {hasCompletedExercise ? (
        <section className="space-y-8" aria-live="polite">
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
              Eksempler på trygge formuleringer
            </h2>
            <p className="mt-5 max-w-4xl text-base leading-8 text-slate md:text-lg">
              Det kan være vanskelig å sette grenser i øyeblikket. Derfor er det
              lurt å ha noen enkle setninger klare.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {practicalPhrases.map((phrase) => (
                <p
                  key={phrase}
                  className="flex min-h-32 items-center justify-center rounded-2xl bg-mist p-5 text-center text-base font-semibold leading-8 text-harbor [text-wrap:balance]"
                >
                  «{phrase}»
                </p>
              ))}
            </div>
            <p className="mt-5 max-w-4xl text-base font-bold leading-8 text-harbor md:text-lg">
              Slike setninger kan kjennes uvante i starten. Men de beskytter
              både deg og den du møter.
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-extrabold leading-tight text-ink md:text-3xl">
              Tre enkle spørsmål du kan bruke
            </h2>
            <p className="mt-5 max-w-4xl text-base leading-8 text-slate md:text-lg">
              Når du lurer på om noe er innenfor rollen din, kan du stille deg
              selv tre spørsmål:
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {["Er dette avtalt?", "Er dette trygt?", "Er dette min rolle?"].map(
                (question, index) => (
                  <p
                    key={question}
                    className="flex min-h-28 flex-col items-center justify-center gap-3 rounded-2xl bg-mist p-5 text-center text-lg font-bold leading-7 text-harbor [text-wrap:balance]"
                  >
                    <span
                      className="flex size-8 items-center justify-center rounded-full bg-harbor text-sm font-extrabold text-white"
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    {question}
                  </p>
                ),
              )}
            </div>
            <p className="mt-5 max-w-4xl text-base font-bold leading-8 text-harbor md:text-lg">
              Hvis svaret er nei eller uklart på ett av spørsmålene, skal du
              stoppe og avklare. Det betyr ikke at du ikke bryr deg. Det betyr
              at du tar rollen din på alvor.
            </p>
          </Card>

          <Section title="En viktig rolle - uten å bære alt">
            <p>
              Det kan være sterkt å være frivillig. Du kan møte mennesker som er
              ensomme, syke, slitne, redde, sinte, sårbare eller svært
              takknemlige. Du kan også oppleve at noen blir veldig knyttet til
              deg.
            </p>
            <p>Da er det lett å føle at du må gjøre mer.</p>
            <p className="flex min-h-24 items-center justify-center rounded-2xl bg-mist p-5 text-center font-bold text-harbor [text-wrap:balance]">
              Men du skal ikke bære alt ansvar.
            </p>
            <p>
              Du skal ikke være hele nettverket til et menneske. Du skal ikke
              være erstatning for familien. Du skal ikke være kommunen. Du skal
              ikke være behandleren. Du skal ikke være den som alltid er
              tilgjengelig.
            </p>
            <p>Du skal være frivillig.</p>
            <p>Og det er nok.</p>
            <p>
              Når du bidrar innenfor en tydelig rolle, kan du gjøre en stor
              forskjell uten å miste deg selv i ansvaret. Du kan være varm uten
              å bli grenseløs. Du kan være hjelpsom uten å overta. Du kan være
              viktig uten å være alene.
            </p>
            <p className="font-bold text-harbor">Det er trygg frivillighet.</p>
          </Section>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-extrabold leading-tight text-ink md:text-3xl">
              Dette er kjernen
            </h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-harbor md:text-lg">
              <p>Du har en viktig rolle. Men du skal ikke bære alt ansvar.</p>
              <p>
                Frivilligrollen blir tryggere når ansvaret ligger riktig sted.
                Du kan bidra med varme, kontakt og praktisk støtte innenfor en
                avtalt ramme.
              </p>
              <p className="font-bold">
                Når noe er uklart, skal du stoppe og avklare.
              </p>
            </div>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
              Kort oppsummering
            </h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Du er ikke ansatt uten lønn.",
                "Du tilhører frivillig sektor, også når du samarbeider med kommunale tjenester.",
                "Du, ansatte, pårørende og kommune har ulike roller.",
                "Frivillighet skal være supplement og berikelse, ikke erstatning for tjenester.",
                "Du kan bidra med sosial kontakt, samtale, aktivitet, følge, praktisk lavterskelhjelp og brobygging når det er avklart.",
                "Du skal vanligvis ikke gi helsehjelp, håndtere medisiner, utføre personlig stell, håndtere økonomi, drive saksbehandling eller gjøre juridiske og medisinske vurderinger.",
                "Når noe er uklart, skal du stoppe og avklare.",
              ].map((item, index) => (
                <li
                  key={item}
                  className="flex min-h-32 flex-col items-center justify-center gap-3 rounded-2xl bg-mist p-5 text-center text-base font-semibold leading-7 text-harbor [text-wrap:balance]"
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
              Neste del handler om hva du gjør når noe blir uklart
            </h3>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-slate md:text-lg">
              <p>
                Du har sett hva frivilligrollen er, hva du kan bidra med, og hva
                du ikke skal bære alene.
              </p>
              <p>
                Når rollen er tydelig, blir det lettere å være varm, hjelpsom og
                trygg uten å overta ansvar som hører hjemme et annet sted.
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
