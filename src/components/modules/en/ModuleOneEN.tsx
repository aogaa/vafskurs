import { useMemo, useState } from "react";
import type { CourseModule } from "../../../data/courseModules";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";

const REFLECTION_STORAGE_KEY = "en:trygg-som-frivillig:del-1-refleksjon";
const EXERCISE_STORAGE_KEY = "en:trygg-som-frivillig:del-1-byggesteiner";
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

type ModuleOneENProps = {
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
    label: "Relationships",
    description: "People who notice each other and keep in touch.",
  },
  {
    id: "fellesskap",
    label: "Community",
    description: "Places and activities where more people can belong.",
  },
  {
    id: "tilhorighet",
    label: "Belonging",
    description: "The feeling of being wanted, expected, and included.",
  },
  {
    id: "trygghet",
    label: "Safety",
    description: "A calm atmosphere that makes it easier to get closer.",
  },
  {
    id: "omtanke",
    label: "Care",
    description: "Small actions that show that people matter.",
  },
];

const profiles: Record<string, VolunteerProfile> = {
  brobyggeren: {
    id: "brobyggeren",
    title: "The Bridge Builder",
    paragraphs: [
      "You see how people become stronger when they don't stand alone.",
      "As a volunteer, this can be a great strength. You notice the connections between people, and how small meetings can become the start of a larger community.",
      "Your strength: You build bridges between people.",
      "When you contribute as a volunteer, you can be the one who makes it a little easier for others to join the conversation, come back again, or feel like they belong.",
    ],
  },
  trygghetsankeret: {
    id: "trygghetsankeret",
    title: "The Safety Anchor",
    paragraphs: [
      "You first see what allows people to dare to get closer to each other.",
      "As a volunteer, this can be a great strength. Many people don't need big measures first. They need to feel that someone meets them calmly, warmly, and without pressure.",
      "Your strength: You create safety around people.",
      "When you contribute as a volunteer, you can be the one who makes the situation a little less unfamiliar, a little less unsettling, and a little easier to enter.",
    ],
  },
  velkomstskaperen: {
    id: "velkomstskaperen",
    title: "The Welcome Creator",
    paragraphs: [
      "You see how important it is that people not only receive help, but feel like they belong.",
      "As a volunteer, this can be a great strength. You notice the value of being seen as a person, not as a recipient of help.",
      "Your strength: You make people feel welcome.",
      "When you contribute as a volunteer, you can be the one who helps someone dare to come back, sit down, or stay a little longer.",
    ],
  },
  menneskemoteren: {
    id: "menneskemoteren",
    title: "The People Meeter",
    paragraphs: [
      "You see the person first.",
      "As a volunteer, this can be a great strength. You notice that it's not always the activity itself that matters most, but the way people are met.",
      "Your strength: You create good encounters.",
      "When you contribute as a volunteer, you can be the one who makes someone feel seen, listened to, and well received.",
    ],
  },
  lokalsamfunnsbyggeren: {
    id: "lokalsamfunnsbyggeren",
    title: "The Community Builder",
    paragraphs: [
      "You have chosen building blocks that show you see multiple sides of a good local community.",
      "As a volunteer, you don't need to be everything for everyone. The most important thing is that you contribute what you can, within a clear and safe framework.",
      "Your strength: You see the whole picture.",
      "When you contribute as a volunteer, you help build a neighbourhood where more people can feel seen, wanted, and included in the community.",
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
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(REFLECTION_STORAGE_KEY) ?? "";
}

function saveReflection(value: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(REFLECTION_STORAGE_KEY, value);
}

function isBuildingBlockId(value: string): value is BuildingBlockId {
  return buildingBlocks.some((block) => block.id === value);
}

function readSavedExercise(): SavedExercise {
  if (typeof window === "undefined") return { revealedProfile: false, selectedIds: [] };
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
  if (typeof window === "undefined") return;
  window.localStorage.setItem(EXERCISE_STORAGE_KEY, JSON.stringify(value));
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
    label: "Volunteer",
    icon: "🤝",
    widthClass: "w-3/5",
    bgClass: "bg-pine",
    textClass: "text-harbor",
    description:
      "As a volunteer you add something extra: presence, community, and human contact. You are not part of the formal system — you are a warm addition to it.",
    animDelay: "300ms",
  },
  {
    id: "parorende",
    label: "Family",
    icon: "👨‍👩‍👧",
    widthClass: "w-4/5",
    bgClass: "bg-harbor/70",
    textClass: "text-white",
    description:
      "Family and close ones contribute with love, knowledge, and continuity over time. They know the person in a way no service can replace.",
    animDelay: "150ms",
  },
  {
    id: "ansatte",
    label: "Municipality / Staff",
    icon: "🏛️",
    widthClass: "w-full",
    bgClass: "bg-harbor",
    textClass: "text-white",
    description:
      "The formal foundation: mandatory services, professional follow-up, decisions, and safety. Always present, whether you are a volunteer or not.",
    animDelay: "0ms",
  },
];

function SupplementLayersEN() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [hidingVolunteer, setHidingVolunteer] = useState(false);

  return (
    <Card className="p-6 md:p-8">
      <h3 className="text-xl font-extrabold text-ink md:text-2xl">
        Volunteers supplement — they do not replace
      </h3>
      <p className="mt-2 text-sm leading-7 text-slate">
        Click on each layer to learn more about the role it plays.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3">
        {supplementLayers.map((layer) => {
          const isActive = activeLayer === layer.id;
          const isHidden = hidingVolunteer && layer.id === "frivillig";

          return (
            <div
              key={layer.id}
              className={layer.widthClass}
              style={{ animation: `slideUp 500ms ease-out ${layer.animDelay} both` }}
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
                    <span className="text-xl" aria-hidden="true">{layer.icon}</span>
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
                  <p className="mt-2 rounded-2xl bg-mist px-5 py-4 text-sm leading-7 text-ink">
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
          {hidingVolunteer ? "✓ Show volunteers again" : "What happens without volunteers?"}
        </button>
      </div>

      {hidingVolunteer && (
        <p
          className="mt-4 animate-[fadeIn_240ms_ease-out] text-center text-sm font-semibold text-harbor"
          aria-live="polite"
        >
          The foundation holds. But something warm is missing.
        </p>
      )}
    </Card>
  );
}

const activities: { label: string; icon: string }[] = [
  { label: "Meeting place", icon: "🏡" },
  { label: "Children's sport", icon: "⚽" },
  { label: "Hikes and outdoors", icon: "🌲" },
  { label: "Homework help", icon: "📚" },
  { label: "Cooking", icon: "🍲" },
  { label: "Board work", icon: "📋" },
  { label: "Concerts", icon: "🎵" },
  { label: "Flea market", icon: "🛍️" },
  { label: "Language café", icon: "☕" },
  { label: "Courses", icon: "🎓" },
  { label: "Visiting service", icon: "🏠" },
  { label: "Crafts group", icon: "🧶" },
];

const takeawayItems: string[] = [
  "Volunteering often begins with small actions.",
  "Small actions can build trust, belonging, and community.",
  "A safe local community needs people who see each other.",
  "Volunteering should happen on the volunteers' own terms.",
  "Volunteering comes in many forms, but is built on the same power: people who contribute to the community.",
  "Being a volunteer is being part of something bigger.",
];

function CollectibleTakeawaysEN() {
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
          Things to take with you
        </h2>
        <span
          className="rounded-full bg-mist px-3 py-1 text-sm font-bold text-harbor"
          aria-live="polite"
        >
          {collected.length} of {takeawayItems.length} collected
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate">
        Click on the points you take with you from this part.
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

export function ModuleOneEN({ courseModule, isComplete, onComplete }: ModuleOneENProps) {
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
        setLimitMessage("You have selected two building blocks. Remove a selection if you want to change.");
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
    if (!canRevealProfile) return;
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
          Part {courseModule.order} &middot; Safe as a Volunteer
        </p>
        <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
          Volunteering is being part of something bigger
        </h1>
      </section>

      <TextSection title="Why volunteering matters" icon="🌱">
        <p>
          Imagine a local community where people greet each other. Where someone
          notices who comes, and who doesn't. Where there are places to go,
          people to meet, and communities to become part of.
        </p>
        <p>These are the kinds of communities that volunteering helps to build.</p>
        <p>
          Volunteering often begins in small ways. A cup of coffee. A chat. A walk.
          A phone call. An invitation. A person who is met at the door and hears:
          "So glad you came."
        </p>
        <p>
          Such moments can seem simple. Yet it is often precisely these moments
          that make people feel seen, wanted, and a little less alone.
        </p>
      </TextSection>

      <TextSection title="Small actions build big communities" icon="🏘️">
        <p>
          A good society needs good services, safe systems, and professionals
          doing their jobs. It also needs something more: people who see each
          other, take the time, and build trust in everyday life.
        </p>
        <p>
          When people meet, more happens than we always see in the moment. A
          conversation can lower the threshold for coming back. An invitation
          can open the door to a new community. An activity can give someone a
          reason to go out. A volunteer can be the one who makes a person feel:
          there is room for me here.
        </p>
        <p className="flex min-h-24 items-center justify-center rounded-2xl border border-pine/20 bg-mist p-5 text-center font-bold text-harbor shadow-sm [text-wrap:balance]">
          Ordinary human care can make a day easier, a meeting safer,
          and a neighbourhood warmer.
        </p>
        <p>
          Volunteering is therefore not just about individual tasks. It is about
          building community over time.
        </p>
      </TextSection>

      <TextSection title="Safety begins with knowing each other" icon="🔗">
        <p>A local community becomes safer when people know each other a little.</p>
        <p>
          When we know each other, it becomes easier to ask for help. It becomes
          easier to invite someone along. It becomes easier to notice if someone
          is falling behind. It becomes easier to step up when something happens.
        </p>
        <p>
          Safety is not just about plans, systems, and services. It is also about
          everyday bonds between people. Who greets you? Who notices if you don't
          come as usual? Who asks how you are? Who makes it a little easier to
          enter the room?
        </p>
        <p>Volunteers help create such bonds.</p>
        <p>
          Not through big words or big promises, but through presence, activity,
          warmth, and community.
        </p>
      </TextSection>

      <SupplementLayersEN />

      <TextSection title="Volunteering is everywhere" icon="🌍">
        <p>
          Volunteering encompasses many people, many experiences, and many ways
          to contribute.
        </p>

        <div className="flex flex-wrap gap-2 py-1" aria-label="Examples of voluntary activity">
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

        <p>Some contribute often. Some contribute occasionally. Some have long experience. Others are completely new.</p>
        <p>
          The forms are different, but the power is the same: people who contribute
          so that more people can belong.
        </p>
        <p>
          Volunteering makes the community stronger because people meet, get to know
          each other, build trust, and create places where more people can find
          their place.
        </p>
      </TextSection>

      <TextSection title="Being part of something bigger" icon="✨">
        <p>When you are a volunteer, you are part of a larger context.</p>
        <p>
          You are part of a local community where people do more than just live
          next to each other. They meet. They participate. They step up. They build
          community.
        </p>
        <p>
          This doesn't mean that one volunteer has to carry everything. It means
          that many small contributions, from many different people, can create
          something that is bigger than each of us individually.
        </p>
        <p>
          An activity can become a regular anchor point. A meeting place can become
          somewhere to belong. A conversation can become the start of a relationship.
          An invitation can make someone dare to come back.
        </p>
        <div className="flex min-h-40 flex-col items-center justify-center gap-1 rounded-2xl border border-pine/20 bg-mist p-5 text-center text-lg font-bold leading-8 text-harbor shadow-sm [text-wrap:balance]">
          <p>This is how community is built.</p>
          <p>This is how trust is built.</p>
          <p>This is how local society is built.</p>
          <p>When people support each other, society becomes stronger.</p>
        </div>
      </TextSection>

      <CollectibleTakeawaysEN />

      <section className="space-y-6" aria-labelledby="community-builder-heading">
        <Card className="p-6 md:p-8">
          <div className="mt-2 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <h2
                id="community-builder-heading"
                className="text-2xl font-extrabold leading-tight text-ink md:text-3xl"
              >
                Build your community
              </h2>
              <div className="mt-5 space-y-4 text-base leading-8 text-slate md:text-lg">
                <p>
                  Imagine a neighbourhood where more people know each other, more
                  dare to show up, and more feel like they belong.
                </p>
                <p>
                  Such neighbourhoods don't arise by themselves. They are built by
                  people who take the time, invite others, create safety, and show
                  care in everyday life.
                </p>
                <p>What do you think is most important for building such a community?</p>
                <p className="font-bold text-harbor">Choose two building blocks.</p>
              </div>
            </div>
            <div className="rounded-3xl bg-mist p-5 text-harbor ring-1 ring-harbor/10">
              <p className="text-sm font-bold uppercase tracking-normal text-slate">
                Selected
              </p>
              <p className="mt-1 text-3xl font-extrabold" aria-live="polite">
                {selectedIds.length} of {MAX_SELECTIONS}
              </p>
              <p className="mt-2 text-sm font-semibold">
                {selectedLabels.length > 0
                  ? selectedLabels.join(" + ")
                  : "Choose two cards below."}
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
            See my strength
          </Button>
        </Card>
      </section>

      {hasRevealedProfile ? (
        <section className="space-y-8" aria-live="polite">
          <Card className="animate-[fadeIn_240ms_ease-out] border-pine/45 bg-mist p-6 md:p-8">
            <h2 className="text-3xl font-extrabold text-harbor">{profile.title}</h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-slate md:text-lg">
              {profile.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className={paragraph.startsWith("Your strength") ? "font-bold text-harbor" : ""}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Card>

          <TextSection title="Volunteering is about people">
            <p>Volunteering is not primarily about tasks.</p>
            <p>It is about people.</p>
            <p>
              Tasks can be important. Activities can be important. Practical help
              can be important.
            </p>
            <p>But the core of volunteering is that people meet people.</p>
            <p className="font-bold text-harbor">
              You should contribute what you can, but you don't have to solve everything alone.
            </p>
          </TextSection>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-ink md:text-3xl">Summary</h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Volunteering is about relationships, not just tasks.",
                "Your contribution can mean more than you think.",
                "Volunteers supplement and enrich, but do not replace employees, family, or municipal services.",
                "Clear frameworks make it safer to contribute with warmth and care.",
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
              A good neighbourhood for me is...
            </h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-slate md:text-lg">
              <p>Think of a place where you yourself have felt safe and welcome.</p>
              <p>What was it that made the place good to be in?</p>
              <p>Was it the building, the system, or the people?</p>
              <p>How can you help others to feel a little of the same?</p>
            </div>
            <label htmlFor="module-one-en-reflection" className="sr-only">
              A good neighbourhood for me is
            </label>
            <textarea
              id="module-one-en-reflection"
              value={reflection}
              onChange={(event) => handleReflectionChange(event.target.value)}
              rows={5}
              placeholder="A good neighbourhood for me is..."
              className="mt-6 min-h-36 w-full resize-y rounded-2xl border border-harbor/15 bg-white p-4 text-base leading-7 text-ink shadow-sm outline-none transition focus:border-pine focus:ring-4 focus:ring-pine/20"
            />
            <p className="mt-3 text-sm font-semibold text-slate">
              The reflection is saved only locally in your browser and is intended only for you!
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
              You have completed Part 1
            </h2>
            <h3 className="mt-2 text-xl font-bold text-harbor md:text-2xl">
              The next part is about your role
            </h3>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-slate md:text-lg">
              <p>
                You have seen why volunteering matters, and why volunteers are an
                important part of a living local community.
              </p>
              <p>
                When you know what kind of role you have, it becomes easier to
                contribute with confidence, warmth, and clear boundaries.
              </p>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button onClick={onComplete} className="w-full bg-pine text-harbor hover:bg-leaf sm:w-auto">
                Go to Part 2
              </Button>
              <Button to="/engelsk" variant="secondary" className="w-full sm:w-auto">
                To home page
              </Button>
            </div>
          </Card>
        </section>
      ) : (
        <Card className="p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-slate">
              Choose two building blocks and open the response before moving on.
            </p>
            <Button to="/engelsk" variant="secondary">
              To home page
            </Button>
          </div>
        </Card>
      )}

      {isComplete ? (
        <div className="sr-only" aria-live="polite">
          Part 1 is already completed.
        </div>
      ) : null}
    </article>
  );
}
