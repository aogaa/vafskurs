import { useMemo, useState } from "react";
import type { CourseModule } from "../../data/courseModules";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

const REFLECTION_STORAGE_KEY = "trygg-som-frivillig:del-1-refleksjon";
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

function choicesMatch(selectedIds: BuildingBlockId[], choices: BuildingBlockId[]) {
  return choices.every((choice) => selectedIds.includes(choice));
}

function getProfile(selectedIds: BuildingBlockId[]) {
  const rule = profileRules.find((item) => choicesMatch(selectedIds, item.choices));
  return profiles[rule?.profileId ?? "lokalsamfunnsbyggeren"];
}

function TextSection({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
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

export function ModuleOne({ courseModule, isComplete, onComplete }: ModuleOneProps) {
  const [selectedIds, setSelectedIds] = useState<BuildingBlockId[]>([]);
  const [limitMessage, setLimitMessage] = useState("");
  const [hasRevealedProfile, setHasRevealedProfile] = useState(false);
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
        setLimitMessage("");
        setHasRevealedProfile(false);
        return current.filter((id) => id !== blockId);
      }

      if (current.length >= MAX_SELECTIONS) {
        setLimitMessage("Du har valgt to byggesteiner. Fjern et valg hvis du vil bytte.");
        return current;
      }

      setLimitMessage("");
      setHasRevealedProfile(false);
      return [...current, blockId];
    });
  }

  function handleRevealProfile() {
    if (!canRevealProfile) {
      return;
    }

    setHasRevealedProfile(true);
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

      <TextSection title="Hvorfor frivillighet betyr noe">
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

      <TextSection title="Små handlinger bygger store fellesskap">
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
        <p className="rounded-2xl bg-mist p-5 font-bold text-harbor">
          Vanlig menneskelig omtanke kan gjøre en dag lettere, et møte tryggere
          og et nærmiljø varmere.
        </p>
        <p>
          Frivillighet handler derfor ikke bare om enkeltoppgaver. Det handler
          om å bygge fellesskap over tid.
        </p>
      </TextSection>

      <TextSection title="Trygghet begynner med at vi kjenner hverandre">
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

      <TextSection title="Frivillighet finnes overalt">
        <p>
          Frivillighet rommer mange mennesker, mange erfaringer og mange måter å
          bidra på.
        </p>
        <p>
          Noen er frivillige på en møteplass. Noen trener barn og unge. Noen går
          tur med andre. Noen hjelper til på leksehjelp. Noen lager mat. Noen
          sitter i styrer. Noen arrangerer konserter, loppemarkeder, språkkafeer,
          kurs, besøkstjenester eller håndarbeidsgrupper.
        </p>
        <p>
          Noen bidrar ofte. Noen bidrar av og til. Noen har lang erfaring. Andre
          er helt nye.
        </p>
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

      <TextSection title="Å være del av noe større">
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
        <div className="rounded-2xl bg-mist p-5 text-lg font-bold leading-8 text-harbor">
          <p>Slik bygges fellesskap.</p>
          <p>Slik bygges tillit.</p>
          <p>Slik bygges lokalsamfunn.</p>
          <p>Når mennesker stiller opp for hverandre, blir samfunnet sterkere.</p>
        </div>
      </TextSection>

      <Card className="p-6 md:p-8">
        <h2 className="text-2xl font-extrabold leading-tight text-ink md:text-3xl">
          Dette skal du ta med deg videre
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            "Frivillighet begynner ofte i små handlinger.",
            "Små handlinger kan bygge tillit, tilhørighet og fellesskap.",
            "Et trygt lokalsamfunn trenger mennesker som ser hverandre.",
            "Frivillighet finnes i mange former, men bygger på samme kraft: mennesker som bidrar til fellesskapet.",
            "Å være frivillig er å være del av noe større.",
          ].map((item) => (
            <li
              key={item}
              className="flex min-h-28 items-center rounded-2xl bg-mist p-5 text-base font-bold leading-7 text-harbor"
            >
              {item}
            </li>
          ))}
        </ul>
      </Card>

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
            <div className="rounded-3xl bg-mist p-5 text-harbor ring-1 ring-harbor/8">
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
                      ? "border-pine bg-pine/18 text-harbor ring-2 ring-pine/45"
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
              <p className="rounded-2xl bg-honey/18 px-4 py-3 text-sm font-semibold text-harbor">
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
