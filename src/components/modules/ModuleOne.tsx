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

const comparisonRows = [
  ["Skaper fellesskap", "Leverer tjenester"],
  ["Bygger relasjoner", "Fatter vedtak"],
  ["Gir nærvær og aktivitet", "Har formelt ansvar"],
  ["Er et supplement og en berikelse", "Har lovpålagte oppgaver"],
  ["Ser mennesket i hverdagen", "Gir nødvendig faglig oppfølging"],
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
  eyebrow,
  title,
}: {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <Card className="p-6 md:p-8">
      <p className="text-sm font-bold uppercase tracking-normal text-leaf">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-extrabold leading-tight text-ink md:text-3xl">
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
          Du er en del av noe større
        </h1>
        <div className="mt-5 max-w-3xl space-y-3 text-lg leading-8 text-white/78">
          <p>Du kommer hit fordi du ønsker å bidra.</p>
          <p>
            Kanskje vil du gjøre noe godt for andre. Kanskje vil du være til
            nytte. Kanskje vil du være en del av et fellesskap.
          </p>
          <p>Det er et godt sted å starte.</p>
          <p>
            Frivillighet handler ikke om å fylle hull. Det handler om å bygge
            broer mellom mennesker.
          </p>
        </div>
      </section>

      <TextSection eyebrow="Hvorfor det betyr noe" title="Et samfunn kan ikke bare bygges av tjenester">
        <p>
          Et samfunn trenger gode tjenester. Vi trenger helsevesen, skole,
          kommune, beredskap og fagfolk som gjør jobben sin.
        </p>
        <p>Men et godt samfunn kan ikke bare bygges av tjenester.</p>
        <p>Det må også bygges av relasjoner.</p>
        <p>
          Vi trenger mennesker som legger merke til hverandre. Mennesker som
          hilser. Mennesker som spør hvordan det går. Mennesker som inviterer
          med. Mennesker som tar seg tid.
        </p>
        <p>Det er her frivilligheten har sin egen verdi.</p>
        <p>
          Som frivillig kan du bidra med noe ingen kommune kan bestille frem på
          samme måte: menneskelige møter uten skjemaer, vedtak eller plikter.
          Bare nærvær, fellesskap og omtanke.
        </p>
      </TextSection>

      <TextSection eyebrow="Din verdi" title="Du er ikke «bare frivillig»">
        <p>Det kan være lett å tenke at frivillig innsats er noe lite.</p>
        <p>
          En kopp kaffe. En prat. En tur. En håndsrekning. Et smil ved døren.
          En telefon. En aktivitet noen kan møte opp til.
        </p>
        <p>Men små ting er ikke nødvendigvis små for den som tar imot.</p>
        <p>
          For noen kan en frivillig aktivitet være ukens høydepunkt. For noen
          kan en samtale gjøre en tung dag litt lettere. For noen kan det å bli
          husket, invitert eller sett bety mer enn vi forstår der og da.
        </p>
        <p className="font-bold text-harbor">
          Du skal ikke undervurdere betydningen av vanlig menneskelig omtanke.
        </p>
      </TextSection>

      <TextSection eyebrow="Nærmiljø" title="Frivillighet skaper tryggere nærmiljøer">
        <p>Et nærmiljø blir tryggere når mennesker ikke er fremmede for hverandre.</p>
        <p>
          Når folk kjenner hverandre litt, blir det lettere å spørre om hjelp.
          Det blir lettere å si fra. Det blir lettere å oppdage om noen faller
          utenfor. Det blir lettere å invitere noen inn.
        </p>
        <p>Frivillige er med på å bygge slike forbindelser.</p>
        <ul className="space-y-2 rounded-3xl bg-mist p-5 text-base font-semibold leading-7 text-harbor">
          <li>Ikke ved å overvåke folk.</li>
          <li>Ikke ved å ta ansvar for alt.</li>
          <li>Ikke ved å erstatte kommunen, ansatte eller pårørende.</li>
        </ul>
        <p>
          Men ved å være til stede. Ved å skape møteplasser. Ved å gjøre
          terskelen lavere for kontakt. Ved å minne oss om at mennesker fortsatt
          angår hverandre.
        </p>
      </TextSection>

      <TextSection
        eyebrow="Rolleforståelse"
        title="Frivillighet er noe annet enn kommunale tjenester"
      >
        <p>
          Kommunen har ansvar for tjenester, vedtak, faglige vurderinger og
          nødvendig oppfølging.
        </p>
        <p>Frivilligheten har en annen rolle.</p>
        <p>
          Frivillige kan skape fellesskap, aktivitet, kontakt og tilhørighet.
          Frivillige kan bidra til at mennesker får flere steder å høre til.
          Frivillige kan være brobyggere til nærmiljøet.
        </p>
        <p>Det betyr ikke at frivillige skal gjøre alt.</p>
        <p>Det betyr at frivillige gjør noe eget.</p>
        <div className="overflow-hidden rounded-3xl border border-harbor/10 bg-white">
          <div className="grid grid-cols-2 bg-mist text-sm font-bold uppercase text-harbor">
            <div className="border-r border-harbor/10 p-4">Frivillighet</div>
            <div className="p-4">Kommunale tjenester</div>
          </div>
          {comparisonRows.map(([volunteer, service]) => (
            <div
              key={volunteer}
              className="grid grid-cols-2 border-t border-harbor/10 text-sm leading-6 text-slate md:text-base"
            >
              <div className="border-r border-harbor/10 p-4">{volunteer}</div>
              <div className="p-4">{service}</div>
            </div>
          ))}
        </div>
        <p>
          Frivillige skal ikke erstatte ansatte. Frivillige skal bidra med noe
          eget.
        </p>
        <p>
          Det er viktig å forstå allerede nå, før vi senere går inn i roller,
          grenser og ansvar. Grensene finnes ikke for å gjøre frivilligheten
          kaldere. De finnes for å gjøre det tryggere å være varm.
        </p>
      </TextSection>

      <section className="space-y-6" aria-labelledby="community-builder-heading">
        <Card className="p-6 md:p-8">
          <p className="text-sm font-bold uppercase tracking-normal text-leaf">
            Interaktiv oppgave
          </p>
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
                  Alle frivillige legger merke til litt forskjellige ting først.
                  Noen ser raskt hvem som står alene. Noen er gode til å skape
                  trygghet. Noen bygger fellesskap. Noen får mennesker til å
                  føle seg velkommen.
                </p>
                <p>I denne oppgaven finnes det ikke ett riktig svar.</p>
                <p className="font-bold text-harbor">
                  Hva legger du mest merke til når du tenker på et godt
                  lokalsamfunn? Velg de to byggesteinene som betyr mest for deg.
                </p>
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
            <p className="text-sm font-bold uppercase tracking-normal text-leaf">
              Din frivillige styrke
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-harbor">
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

          <TextSection eyebrow="Dette er kjernen" title="Frivillighet handler om mennesker">
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
            <p className="text-sm font-bold uppercase tracking-normal text-leaf">
              Hva du skal huske
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-ink md:text-3xl">
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
            <p className="text-sm font-bold uppercase tracking-normal text-leaf">
              Refleksjon
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-ink md:text-3xl">
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
              Refleksjonen lagres bare lokalt i nettleseren din.
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <p className="text-sm font-bold uppercase tracking-normal text-leaf">
              Du har fullført Del 1
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-ink md:text-3xl">
              Neste del handler om rollen din
            </h2>
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
              <Button to="/trygg-som-frivillig/deler" variant="secondary" className="w-full sm:w-auto">
                Til deloversikt
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
            <Button to="/trygg-som-frivillig/deler" variant="secondary">
              Til deloversikt
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
