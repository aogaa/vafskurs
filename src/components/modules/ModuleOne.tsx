import { useMemo, useState } from "react";
import type { CourseModule } from "../../data/courseModules";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

const REFLECTION_STORAGE_KEY = "trygg-som-frivillig:del-1-refleksjon";
const EXERCISE_STORAGE_KEY = "trygg-som-frivillig:del-1-byggesteiner";
const MAX_SELECTIONS = 2;

type BuildingBlockId =
  | "relasjoner"
  | "fellesskap"
  | "tilhorighet"
  | "trygghet"
  | "omtanke";

type VolunteerProfile = {
  id: string;
  title: string;
  paragraphs: string[];
};

type ModuleOneProps = {
  courseModule: CourseModule;
  isComplete: boolean;
  onComplete: () => void;
};

type SavedExercise = {
  revealedProfile: boolean;
  selectedIds: BuildingBlockId[];
};

const buildingBlocks: { id: BuildingBlockId; label: string; description: string }[] = [
  {
    id: "relasjoner",
    label: "Relasjoner",
    description: "Mennesker som legger merke til hverandre og holder kontakt.",
  },
  {
    id: "fellesskap",
    label: "Fellesskap",
    description: "Steder og aktiviteter der flere kan høre til.",
  },
  {
    id: "tilhorighet",
    label: "Tilhørighet",
    description: "Følelsen av å være ønsket, ventet og inkludert.",
  },
  {
    id: "trygghet",
    label: "Trygghet",
    description: "Rolige rammer som gjør det lettere å komme nærmere.",
  },
  {
    id: "omtanke",
    label: "Omtanke",
    description: "Små handlinger som viser at mennesker betyr noe.",
  },
];

const profiles: Record<string, VolunteerProfile> = {
  brobyggeren: {
    id: "brobyggeren",
    title: "Brobyggeren",
    paragraphs: [
      "Du ser hvordan mennesker blir sterkere når de ikke står alene.",
      "Som frivillig kan dette være en stor styrke. Du legger merke til forbindelsene mellom folk, og hvordan små møter kan bli starten på større fellesskap.",
      "Din styrke: Du bygger broer mellom mennesker.",
      "Når du bidrar som frivillig, kan du være den som gjør det litt lettere for andre å komme inn i samtalen, møte opp igjen eller kjenne at de hører til.",
    ],
  },
  trygghetsankeret: {
    id: "trygghetsankeret",
    title: "Trygghetsankeret",
    paragraphs: [
      "Du ser først det som gjør at mennesker våger å komme nærmere hverandre.",
      "Som frivillig kan dette være en stor styrke. Mange trenger ikke store tiltak først. De trenger å kjenne at noen møter dem rolig, vennlig og uten press.",
      "Din styrke: Du skaper trygghet rundt mennesker.",
      "Når du bidrar som frivillig, kan du være den som gjør situasjonen litt mindre fremmed, litt mindre utrygg og litt lettere å gå inn i.",
    ],
  },
  velkomstskaperen: {
    id: "velkomstskaperen",
    title: "Velkomstskaperen",
    paragraphs: [
      "Du ser hvor viktig det er at mennesker ikke bare får hjelp, men kjenner at de hører til.",
      "Som frivillig kan dette være en stor styrke. Du legger merke til verdien av å bli sett som person, ikke som mottaker av hjelp.",
      "Din styrke: Du får mennesker til å kjenne seg velkommen.",
      "Når du bidrar som frivillig, kan du være den som gjør at noen tør å komme tilbake, sette seg ned eller bli værende litt lenger.",
    ],
  },
  menneskemoteren: {
    id: "menneskemoteren",
    title: "Menneskemøteren",
    paragraphs: [
      "Du ser mennesket først.",
      "Som frivillig kan dette være en stor styrke. Du legger merke til at det ikke alltid er aktiviteten i seg selv som betyr mest, men måten mennesker blir møtt på.",
      "Din styrke: Du skaper gode møter.",
      "Når du bidrar som frivillig, kan du være den som gjør at noen føler seg sett, lyttet til og tatt imot på en god måte.",
    ],
  },
  lokalsamfunnsbyggeren: {
    id: "lokalsamfunnsbyggeren",
    title: "Lokalsamfunnsbyggeren",
    paragraphs: [
      "Du har valgt byggesteiner som viser at du ser flere sider av et godt lokalsamfunn.",
      "Som frivillig trenger du ikke være alt for alle. Det viktigste er at du bidrar med det du kan, innenfor en tydelig og trygg ramme.",
      "Din styrke: Du ser helheten.",
      "Når du bidrar som frivillig, er du med på å bygge et nærmiljø der flere kan føle seg sett, ønsket og inkludert i fellesskapet.",
    ],
  },
};

const profileRules: { profileId: keyof typeof profiles; choices: BuildingBlockId[] }[] = [
  { profileId: "brobyggeren", choices: ["relasjoner", "fellesskap"] },
  { profileId: "brobyggeren", choices: ["relasjoner", "tilhorighet"] },
  { profileId: "brobyggeren", choices: ["fellesskap", "tilhorighet"] },
  { profileId: "trygghetsankeret", choices: ["trygghet", "omtanke"] },
  { profileId: "trygghetsankeret", choices: ["trygghet", "tilhorighet"] },
  { profileId: "trygghetsankeret", choices: ["trygghet", "relasjoner"] },
  { profileId: "velkomstskaperen", choices: ["tilhorighet", "omtanke"] },
  { profileId: "velkomstskaperen", choices: ["fellesskap", "omtanke"] },
  { profileId: "menneskemoteren", choices: ["relasjoner", "omtanke"] },
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

function isBuildingBlockId(value: string): value is BuildingBlockId {
  return buildingBlocks.some((block) => block.id === value);
}

function readSavedExercise(): SavedExercise {
  if (typeof window === "undefined") {
    return { revealedProfile: false, selectedIds: [] };
  }

  try {
    const value = window.localStorage.getItem(EXERCISE_STORAGE_KEY);
    const parsed = value ? JSON.parse(value) : {};
    const selectedIds = Array.isArray(parsed.selectedIds)
      ? parsed.selectedIds.filter(
          (item: unknown): item is BuildingBlockId =>
            typeof item === "string" && isBuildingBlockId(item),
        )
      : [];

    return {
      revealedProfile: Boolean(parsed.revealedProfile) && selectedIds.length === MAX_SELECTIONS,
      selectedIds: selectedIds.slice(0, MAX_SELECTIONS),
    };
  } catch {
    return { revealedProfile: false, selectedIds: [] };
  }
}

function saveExercise(value: SavedExercise) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(EXERCISE_STORAGE_KEY, JSON.stringify(value));
}

function choicesMatch(selectedIds: BuildingBlockId[], choices: BuildingBlockId[]) {
  return choices.every((choice) => selectedIds.includes(choice));
}

function getProfile(selectedIds: BuildingBlockId[]) {
  const rule = profileRules.find((item) => choicesMatch(selectedIds, item.choices));
  return profiles[rule?.profileId ?? "lokalsamfunnsbyggeren"];
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
        {icon && (
          <span className="shrink-0 text-2xl md:text-3xl" aria-hidden="true">
            {icon}
          </span>
        )}
        {title}
      </h2>
      <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-slate md:text-lg">
        {children}
      </div>
    </Card>
  );
}

// ── SupplementLayers ─────────────────────────────────────────────────────────

type SupplementLayerData = {
  id: string;
  label: string;
  icon: string;
  widthClass: string;
  bgClass: string;
  textClass: string;
  description: string;
  animDelay: string;
};

const supplementLayers: SupplementLayerData[] = [
  {
    id: "frivillig",
    label: "Frivillig",
    icon: "🤝",
    widthClass: "w-3/5",
    bgClass: "bg-pine",
    textClass: "text-harbor",
    description:
      "Som frivillig legger du til noe ekstra: nærvær, fellesskap og menneskelig kontakt. Du er ikke en del av det formelle systemet — du er et varmt tillegg til det.",
    animDelay: "300ms",
  },
  {
    id: "parorende",
    label: "Pårørende",
    icon: "👨‍👩‍👧",
    widthClass: "w-4/5",
    bgClass: "bg-harbor/70",
    textClass: "text-white",
    description:
      "Familie og nære bidrar med kjærlighet, kunnskap og kontinuitet over tid. De kjenner personen på en måte ingen tjeneste kan erstatte.",
    animDelay: "150ms",
  },
  {
    id: "ansatte",
    label: "Kommune / Ansatte",
    icon: "🏛️",
    widthClass: "w-full",
    bgClass: "bg-harbor",
    textClass: "text-white",
    description:
      "Den formelle grunnmuren: lovpålagte tjenester, faglig oppfølging, vedtak og sikkerhet. Alltid til stede, uansett om du er frivillig eller ikke.",
    animDelay: "0ms",
  },
];

function SupplementLayers() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [hidingVolunteer, setHidingVolunteer] = useState(false);

  return (
    <Card className="p-6 md:p-8">
      <h3 className="text-xl font-extrabold text-ink md:text-2xl">
        Frivillige supplerer — de erstatter ikke
      </h3>
      <p className="mt-2 text-sm leading-7 text-slate">
        Klikk på hvert lag for å lære mer om rollen det spiller.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3">
        {supplementLayers.map((layer) => {
          const isActive = activeLayer === layer.id;
          const isHidden = hidingVolunteer && layer.id === "frivillig";

          return (
            <div
              key={layer.id}
              className={layer.widthClass}
              style={{
                animation: `slideUp 500ms ease-out ${layer.animDelay} both`,
              }}
            >
              <button
                type="button"
                onClick={() => setActiveLayer(isActive ? null : layer.id)}
                aria-pressed={isActive}
                className={`w-full rounded-2xl px-5 py-4 text-left transition-all duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-pine ${layer.bgClass} ${layer.textClass} ${
                  isHidden ? "opacity-30" : "opacity-95 hover:opacity-100"
                }`}
              >
                <span className="flex items-center justify-between">
                  <span className="flex items-center gap-2.5">
                    <span className="text-xl" aria-hidden="true">
                      {layer.icon}
                    </span>
                    <span className="text-base font-extrabold">{layer.label}</span>
                  </span>
                  <span className="text-xs opacity-60" aria-hidden="true">
                    {isActive ? "▲" : "▼"}
                  </span>
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
                aria-live="polite"
              >
                <div className="overflow-hidden">
                  <p className="mt-2 rounded-2xl bg-mist px-5 py-4 text-sm leading-7 text-slate">
                    {layer.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={() => setHidingVolunteer(!hidingVolunteer)}
          className="rounded-2xl border-2 border-dashed border-harbor/20 px-5 py-2.5 text-sm font-bold text-slate transition hover:border-harbor/40 hover:text-ink focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine"
        >
          {hidingVolunteer ? "✓ Vis frivillige igjen" : "Hva skjer uten frivillige?"}
        </button>
      </div>

      {hidingVolunteer && (
        <p
          className="mt-4 animate-[fadeIn_240ms_ease-out] text-center text-sm font-semibold text-harbor"
          aria-live="polite"
        >
          Grunnmuren står. Men noe varmt mangler.
        </p>
      )}
    </Card>
  );
}

// ── Activity chips ────────────────────────────────────────────────────────────

const activities: { label: string; icon: string }[] = [
  { label: "Møteplass", icon: "🏡" },
  { label: "Barneidrett", icon: "⚽" },
  { label: "Turer og friluft", icon: "🌲" },
  { label: "Leksehjelp", icon: "📚" },
  { label: "Matlaging", icon: "🍲" },
  { label: "Styrearbeid", icon: "📋" },
  { label: "Konserter", icon: "🎵" },
  { label: "Loppemarked", icon: "🛍️" },
  { label: "Språkkafé", icon: "☕" },
  { label: "Kurs", icon: "🎓" },
  { label: "Besøkstjeneste", icon: "🏠" },
  { label: "Håndarbeidsgruppe", icon: "🧶" },
];

// ── CollectibleTakeaways ──────────────────────────────────────────────────────

const takeawayItems: string[] = [
  "Frivillighet begynner ofte i små handlinger.",
  "Små handlinger kan bygge tillit, tilhørighet og fellesskap.",
  "Et trygt lokalsamfunn trenger mennesker som ser hverandre.",
  "Frivillighet skal skje på de frivilliges premisser.",
  "Frivillighet finnes i mange former, men bygger på samme kraft: mennesker som bidrar til fellesskapet.",
  "Å være frivillig er å være del av noe større.",
];

function CollectibleTakeaways() {
  const [collected, setCollected] = useState<number[]>([]);

  function toggle(index: number) {
    setCollected((current) =>
      current.includes(index) ? current.filter((i) => i !== index) : [...current, index],
    );
  }

  return (
    <Card className="p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-2xl font-extrabold leading-tight text-ink md:text-3xl">
          Dette kan du ta med deg videre
        </h2>
        <span
          className="rounded-full bg-mist px-3 py-1 text-sm font-bold text-slate"
          aria-live="polite"
        >
          {collected.length} av {takeawayItems.length} samlet
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate">
        Klikk på de punktene du tar med deg fra denne delen.
      </p>

      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {takeawayItems.map((item, index) => {
          const isCollected = collected.includes(index);
          return (
            <li key={item}>
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-pressed={isCollected}
                className={`flex min-h-28 w-full flex-col items-center justify-center gap-3 rounded-2xl border p-5 text-center text-base font-bold leading-7 transition-all duration-200 [text-wrap:balance] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine ${
                  isCollected
                    ? "border-pine/45 bg-pine/20 text-harbor ring-2 ring-pine/30"
                    : "border-transparent bg-mist text-harbor hover:border-pine/25 hover:bg-pine/10"
                }`}
              >
                {isCollected && (
                  <span
                    className="flex size-6 animate-[fadeIn_150ms_ease-out] items-center justify-center rounded-full bg-harbor text-sm text-white"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                )}
                {item}
              </button>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

// ── ModuleOne ─────────────────────────────────────────────────────────────────

export function ModuleOne({ courseModule, isComplete, onComplete }: ModuleOneProps) {
  const [selectedIds, setSelectedIds] = useState<BuildingBlockId[]>(
    () => readSavedExercise().selectedIds,
  );
  const [limitMessage, setLimitMessage] = useState("");
  const [hasRevealedProfile, setHasRevealedProfile] = useState(
    () => readSavedExercise().revealedProfile,
  );
  const [reflection, setReflection] = useState(readSavedReflection);

  const selectedLabels = useMemo(
    () =>
      buildingBlocks
        .filter((block) => selectedIds.includes(block.id))
        .map((block) => block.label),
    [selectedIds],
  );
  const profile = useMemo(() => getProfile(selectedIds), [selectedIds]);
  const canRevealProfile = selectedIds.length === MAX_SELECTIONS;

  function toggleBlock(blockId: BuildingBlockId) {
    setSelectedIds((current) => {
      if (current.includes(blockId)) {
        const next = current.filter((id) => id !== blockId);
        setLimitMessage("");
        setHasRevealedProfile(false);
        saveExercise({ revealedProfile: false, selectedIds: next });
        return next;
      }

      if (current.length >= MAX_SELECTIONS) {
        setLimitMessage("Du har valgt to byggesteiner. Fjern et valg hvis du vil bytte.");
        return current;
      }

      setLimitMessage("");
      setHasRevealedProfile(false);
      const next = [...current, blockId];
      saveExercise({ revealedProfile: false, selectedIds: next });
      return next;
    });
  }

  function handleRevealProfile() {
    if (!canRevealProfile) {
      return;
    }

    setHasRevealedProfile(true);
    saveExercise({ revealedProfile: true, selectedIds });
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
          Frivillighet er å være del av noe større
        </h1>
      </section>

      <TextSection title="Hvorfor frivillighet betyr noe" icon="🌱">
        <p>
          Se for deg et lokalsamfunn der mennesker hilser på hverandre. Der noen
          legger merke til hvem som kommer, og hvem som ikke kommer. Der det
          finnes steder å gå til, mennesker å møte og fellesskap å bli en del av.
        </p>
        <p>Det er slike lokalsamfunn frivilligheten er med på å bygge.</p>
        <p>
          Frivillighet begynner ofte i det små. En kopp kaffe. En prat. En tur.
          En telefon. En invitasjon. Et menneske som blir møtt i døren og får
          høre: «Så hyggelig at du kom.»
        </p>
        <p>
          Slike øyeblikk kan virke enkle. Likevel er det ofte nettopp disse
          øyeblikkene som gjør at mennesker kjenner seg sett, ønsket og litt
          mindre alene.
        </p>
      </TextSection>

      <TextSection title="Små handlinger bygger store fellesskap" icon="🏘️">
        <p>
          Et godt samfunn trenger gode tjenester, trygge systemer og fagfolk som
          gjør jobben sin. Det trenger også noe mer: mennesker som ser hverandre,
          tar seg tid og skaper tillit i hverdagen.
        </p>
        <p>
          Når mennesker møtes, skjer det mer enn vi alltid ser der og da. En
          samtale kan senke terskelen for å komme tilbake. En invitasjon kan
          åpne døren inn til et nytt fellesskap. En aktivitet kan gi noen en
          grunn til å gå ut. En frivillig kan være den som gjør at et menneske
          kjenner: Her er det plass til meg.
        </p>
        <p className="flex min-h-24 items-center justify-center rounded-2xl border border-pine/20 bg-mist p-5 text-center font-bold text-harbor shadow-sm [text-wrap:balance]">
          Vanlig menneskelig omtanke kan gjøre en dag lettere, et møte tryggere
          og et nærmiljø varmere.
        </p>
        <p>
          Frivillighet handler derfor ikke bare om enkeltoppgaver. Det handler
          om å bygge fellesskap over tid.
        </p>
      </TextSection>

      <TextSection title="Trygghet begynner med at vi kjenner hverandre" icon="🔗">
        <p>Et lokalsamfunn blir tryggere når mennesker kjenner hverandre litt.</p>
        <p>
          Når vi kjenner hverandre, blir det lettere å spørre om hjelp. Det blir
          lettere å invitere noen med. Det blir lettere å legge merke til om
          noen faller utenfor. Det blir lettere å stille opp når noe skjer.
        </p>
        <p>
          Trygghet handler ikke bare om planer, systemer og tjenester. Det
          handler også om hverdagslige bånd mellom mennesker. Hvem hilser på
          deg? Hvem merker om du ikke kommer som vanlig? Hvem spør hvordan det
          går? Hvem gjør det litt lettere å komme inn i rommet?
        </p>
        <p>Frivillige er med på å skape slike bånd.</p>
        <p>
          Ikke gjennom store ord eller store løfter, men gjennom tilstedeværelse,
          aktivitet, varme og fellesskap.
        </p>
      </TextSection>

      <SupplementLayers />

      <TextSection title="Frivillighet finnes overalt" icon="🌍">
        <p>
          Frivillighet rommer mange mennesker, mange erfaringer og mange måter å
          bidra på.
        </p>

        <div className="flex flex-wrap gap-2 py-1" aria-label="Eksempler på frivillig aktivitet">
          {activities.map((activity) => (
            <span
              key={activity.label}
              className="flex items-center gap-1.5 rounded-full border border-harbor/10 bg-mist px-3.5 py-1.5 text-sm font-semibold text-harbor"
            >
              <span aria-hidden="true">{activity.icon}</span>
              {activity.label}
            </span>
          ))}
        </div>

        <p>Noen bidrar ofte. Noen bidrar av og til. Noen har lang erfaring. Andre er helt nye.</p>
        <p>
          Formene er ulike, men kraften er den samme: mennesker som bidrar til
          at flere kan høre til.
        </p>
        <p>
          Frivillighet gjør lokalsamfunnet sterkere fordi mennesker møtes,
          kjenner hverandre, bygger tillit og skaper steder der flere kan finne
          sin plass.
        </p>
      </TextSection>

      <TextSection title="Å være del av noe større" icon="✨">
        <p>Når du er frivillig, er du en del av en større sammenheng.</p>
        <p>
          Du er en del av et lokalsamfunn der mennesker gjør mer enn å bo ved
          siden av hverandre. De møtes. De deltar. De stiller opp. De bygger
          fellesskap.
        </p>
        <p>
          Det betyr ikke at én frivillig skal bære alt. Det betyr at mange små
          bidrag, fra mange ulike mennesker, kan skape noe som er større enn hver
          enkelt av oss.
        </p>
        <p>
          En aktivitet kan bli et fast holdepunkt. En møteplass kan bli et sted
          å høre til. En samtale kan bli starten på en relasjon. En invitasjon
          kan gjøre at noen våger å komme tilbake.
        </p>
        <div className="flex min-h-40 flex-col items-center justify-center gap-1 rounded-2xl border border-pine/20 bg-mist p-5 text-center text-lg font-bold leading-8 text-harbor shadow-sm [text-wrap:balance]">
          <p>Slik bygges fellesskap.</p>
          <p>Slik bygges tillit.</p>
          <p>Slik bygges lokalsamfunn.</p>
          <p>Når mennesker stiller opp for hverandre, blir samfunnet sterkere.</p>
        </div>
      </TextSection>

      <CollectibleTakeaways />

      <section className="space-y-6" aria-labelledby="community-builder-heading">
        <Card className="p-6 md:p-8">
          <div className="mt-2 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <h2
                id="community-builder-heading"
                className="text-2xl font-extrabold leading-tight text-ink md:text-3xl"
              >
                Bygg ditt lokalsamfunn
              </h2>
              <div className="mt-5 space-y-4 text-base leading-8 text-slate md:text-lg">
                <p>
                  Tenk deg et nærmiljø der flere kjenner hverandre, flere tør å
                  møte opp, og flere opplever at de hører til.
                </p>
                <p>
                  Slike nærmiljøer oppstår ikke av seg selv. De bygges av
                  mennesker som tar seg tid, inviterer med, skaper trygghet og
                  viser omtanke i hverdagen.
                </p>
                <p>Hva mener du er viktigst for å bygge et slikt lokalsamfunn?</p>
                <p className="font-bold text-harbor">Velg to byggesteiner.</p>
              </div>
            </div>
            <div className="rounded-3xl bg-mist p-5 text-harbor ring-1 ring-harbor/10">
              <p className="text-sm font-bold uppercase tracking-normal text-slate">
                Valgt
              </p>
              <p className="mt-1 text-3xl font-extrabold" aria-live="polite">
                {selectedIds.length} av {MAX_SELECTIONS}
              </p>
              <p className="mt-2 text-sm font-semibold">
                {selectedLabels.length > 0
                  ? selectedLabels.join(" + ")
                  : "Velg to kort under."}
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {buildingBlocks.map((block) => {
              const isSelected = selectedIds.includes(block.id);

              return (
                <button
                  key={block.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggleBlock(block.id)}
                  className={`min-h-36 rounded-2xl border p-4 text-left transition duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine ${
                    isSelected
                      ? "border-pine bg-pine/20 text-harbor ring-2 ring-pine/45"
                      : "border-harbor/10 bg-white text-ink hover:-translate-y-0.5 hover:border-pine/55 hover:shadow-lift"
                  }`}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-lg font-extrabold">{block.label}</span>
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
                  <span className="mt-3 block text-sm font-medium leading-6 text-slate">
                    {block.description}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 min-h-12" aria-live="polite">
            {limitMessage ? (
              <p className="rounded-2xl bg-honey/20 px-4 py-3 text-sm font-semibold text-harbor">
                {limitMessage}
              </p>
            ) : null}
          </div>

          <Button
            onClick={handleRevealProfile}
            disabled={!canRevealProfile}
            className="w-full sm:w-auto"
          >
            Se min styrke
          </Button>
        </Card>
      </section>

      {hasRevealedProfile ? (
        <section className="space-y-8" aria-live="polite">
          <Card className="animate-[fadeIn_240ms_ease-out] border-pine/45 bg-mist p-6 md:p-8">
            <h2 className="text-3xl font-extrabold text-harbor">
              {profile.title}
            </h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-slate md:text-lg">
              {profile.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className={paragraph.startsWith("Din styrke") ? "font-bold text-harbor" : ""}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Card>

          <TextSection title="Frivillighet handler om mennesker">
            <p>Frivillighet handler ikke først og fremst om oppgaver.</p>
            <p>Det handler om mennesker.</p>
            <p>
              Oppgaver kan være viktige. Aktiviteter kan være viktige. Praktisk
              hjelp kan være viktig.
            </p>
            <p>Men kjernen i frivillighet er at mennesker møter mennesker.</p>
            <p className="font-bold text-harbor">
              Du skal bidra med det du kan, men du skal ikke løse alt alene.
            </p>
          </TextSection>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
              Oppsummering
            </h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Frivillighet handler om relasjoner, ikke bare oppgaver.",
                "Din innsats kan bety mer enn du tror.",
                "Frivillige supplerer og beriker, men erstatter ikke ansatte, pårørende eller kommunale tjenester.",
                "Tydelige rammer gjør det tryggere å bidra med varme og omtanke.",
              ].map((item, index) => (
                <li
                  key={item}
                  className="flex min-h-28 flex-col items-center justify-center gap-3 rounded-2xl bg-mist p-4 text-center text-base font-semibold leading-7 text-harbor [text-wrap:balance]"
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
              Et godt nærmiljø for meg er...
            </h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-slate md:text-lg">
              <p>Tenk på et sted der du selv har følt deg trygg og velkommen.</p>
              <p>Hva var det som gjorde stedet godt å være på?</p>
              <p>Var det bygget, systemet eller menneskene?</p>
              <p>Hvordan kan du bidra til at andre får kjenne litt av det samme?</p>
            </div>
            <label htmlFor="module-one-reflection" className="sr-only">
              Et godt nærmiljø for meg er
            </label>
            <textarea
              id="module-one-reflection"
              value={reflection}
              onChange={(event) => handleReflectionChange(event.target.value)}
              rows={5}
              placeholder="Et godt nærmiljø for meg er..."
              className="mt-6 min-h-36 w-full resize-y rounded-2xl border border-harbor/15 bg-white p-4 text-base leading-7 text-ink shadow-sm outline-none transition focus:border-pine focus:ring-4 focus:ring-pine/20"
            />
            <p className="mt-3 text-sm font-semibold text-slate">
              Refleksjonen lagres bare lokalt i nettleseren din og er kun ment
              for deg!
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
              Du har fullført Del 1
            </h2>
            <h3 className="mt-2 text-xl font-bold text-harbor md:text-2xl">
              Neste del handler om rollen din
            </h3>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-slate md:text-lg">
              <p>
                Du har sett hvorfor frivillighet betyr noe, og hvorfor frivillige
                er en viktig del av et levende lokalsamfunn.
              </p>
              <p>
                Når du vet hva slags rolle du har, blir det lettere å bidra med
                trygghet, varme og tydelige grenser.
              </p>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button onClick={onComplete} className="w-full bg-pine text-harbor hover:bg-leaf sm:w-auto">
                Gå til Del 2
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
              Velg to byggesteiner og åpne responsen før du går videre.
            </p>
            <Button to="/" variant="secondary">
              Til hovedsiden
            </Button>
          </div>
        </Card>
      )}

      {isComplete ? (
        <div className="sr-only" aria-live="polite">
          Del 1 er allerede fullført.
        </div>
      ) : null}
    </article>
  );
}
