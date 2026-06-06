import { useMemo, useState } from "react";
import type { CourseModule } from "../../../data/courseModules";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";

const REFLECTION_STORAGE_KEY = "uk:trygg-som-frivillig:del-1-refleksjon";
const EXERCISE_STORAGE_KEY = "uk:trygg-som-frivillig:del-1-byggesteiner";
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

type ModuleOneUKProps = {
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
    label: "Стосунки",
    description: "Люди, які помічають одне одного та підтримують зв'язок.",
  },
  {
    id: "fellesskap",
    label: "Спільнота",
    description: "Місця та заходи, де більше людей можуть відчути приналежність.",
  },
  {
    id: "tilhorighet",
    label: "Приналежність",
    description: "Відчуття того, що тебе чекають, приймають і включають.",
  },
  {
    id: "trygghet",
    label: "Безпека",
    description: "Спокійна атмосфера, яка полегшує зближення з людьми.",
  },
  {
    id: "omtanke",
    label: "Турбота",
    description: "Дрібні вчинки, які показують, що люди важливі.",
  },
];

const profiles: Record<string, VolunteerProfile> = {
  brobyggeren: {
    id: "brobyggeren",
    title: "Будівельник мостів",
    paragraphs: [
      "Ви бачите, як люди стають сильнішими, коли не стоять наодинці.",
      "Як волонтер, це може бути великою перевагою. Ви помічаєте зв'язки між людьми і те, як маленькі зустрічі можуть стати початком більшої спільноти.",
      "Ваша сила: Ви будуєте мости між людьми.",
      "Допомагаючи як волонтер, ви можете бути тим, хто трохи полегшить іншим участь у розмові, повторне звернення або відчуття приналежності.",
    ],
  },
  trygghetsankeret: {
    id: "trygghetsankeret",
    title: "Якір безпеки",
    paragraphs: [
      "Ви насамперед бачите те, що дозволяє людям зважитися зблизитися одне з одним.",
      "Як волонтер, це може бути великою перевагою. Багатьом людям спочатку не потрібні великі заходи. Їм потрібно відчути, що хтось зустрічає їх спокійно, доброзичливо і без тиску.",
      "Ваша сила: Ви створюєте безпечне середовище для людей.",
      "Допомагаючи як волонтер, ви можете бути тим, хто зробить ситуацію трохи менш незвичною, трохи менш тривожною і трохи легшою для входження.",
    ],
  },
  velkomstskaperen: {
    id: "velkomstskaperen",
    title: "Творець гостинності",
    paragraphs: [
      "Ви бачите, як важливо, щоб люди не просто отримували допомогу, але й відчували приналежність.",
      "Як волонтер, це може бути великою перевагою. Ви помічаєте цінність того, щоб бути сприйнятим як особистість, а не як отримувач допомоги.",
      "Ваша сила: Ви змушуєте людей відчувати себе бажаними гостями.",
      "Допомагаючи як волонтер, ви можете бути тим, хто допоможе комусь наважитися повернутися, сісти або залишитися трохи довше.",
    ],
  },
  menneskemoteren: {
    id: "menneskemoteren",
    title: "Зустрічаючий людей",
    paragraphs: [
      "Ви насамперед бачите людину.",
      "Як волонтер, це може бути великою перевагою. Ви помічаєте, що не завжди сама діяльність найважливіша — важливо те, як людей зустрічають.",
      "Ваша сила: Ви створюєте добрі зустрічі.",
      "Допомагаючи як волонтер, ви можете бути тим, хто дасть комусь відчути себе поміченим, почутим і добре прийнятим.",
    ],
  },
  lokalsamfunnsbyggeren: {
    id: "lokalsamfunnsbyggeren",
    title: "Будівельник громади",
    paragraphs: [
      "Ви обрали будівельні блоки, які показують, що ви бачите різні аспекти доброї громади.",
      "Як волонтер, вам не потрібно бути всім для всіх. Найважливіше — робити внесок у те, що ви можете, у чітких і безпечних рамках.",
      "Ваша сила: Ви бачите цілісну картину.",
      "Допомагаючи як волонтер, ви сприяєте побудові сусідства, де більше людей можуть відчути себе поміченими, бажаними та включеними до спільноти.",
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
    label: "Волонтер",
    icon: "🤝",
    widthClass: "w-3/5",
    bgClass: "bg-pine",
    textClass: "text-harbor",
    description:
      "Як волонтер, ви додаєте щось особливе: присутність, спільноту та людський контакт. Ви не є частиною офіційної системи — ви тепле доповнення до неї.",
    animDelay: "300ms",
  },
  {
    id: "parorende",
    label: "Родичі",
    icon: "👨‍👩‍👧",
    widthClass: "w-4/5",
    bgClass: "bg-harbor/70",
    textClass: "text-white",
    description:
      "Сім'я та близькі привносять любов, знання та постійність впродовж часу. Вони знають людину так, що жодна служба не зможе замінити їх.",
    animDelay: "150ms",
  },
  {
    id: "ansatte",
    label: "Муніципалітет / Співробітники",
    icon: "🏛️",
    widthClass: "w-full",
    bgClass: "bg-harbor",
    textClass: "text-white",
    description:
      "Офіційний фундамент: обов'язкові послуги, фахова підтримка, рішення та безпека. Завжди присутній, незалежно від того, чи ви волонтер.",
    animDelay: "0ms",
  },
];

function SupplementLayersUK() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [hidingVolunteer, setHidingVolunteer] = useState(false);

  return (
    <Card className="p-6 md:p-8">
      <h3 className="text-xl font-extrabold text-ink md:text-2xl">
        Волонтери доповнюють — але не замінюють
      </h3>
      <p className="mt-2 text-sm leading-7 text-slate">
        Натисніть на кожен шар, щоб дізнатися більше про його роль.
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
          {hidingVolunteer ? "✓ Показати волонтерів знову" : "Що станеться без волонтерів?"}
        </button>
      </div>

      {hidingVolunteer && (
        <p
          className="mt-4 animate-[fadeIn_240ms_ease-out] text-center text-sm font-semibold text-harbor"
          aria-live="polite"
        >
          Фундамент тримається. Але чогось теплого не вистачає.
        </p>
      )}
    </Card>
  );
}

const activities: { label: string; icon: string }[] = [
  { label: "Місце зустрічі", icon: "🏡" },
  { label: "Дитячий спорт", icon: "⚽" },
  { label: "Прогулянки та природа", icon: "🌲" },
  { label: "Допомога з уроками", icon: "📚" },
  { label: "Приготування їжі", icon: "🍲" },
  { label: "Управлінська робота", icon: "📋" },
  { label: "Концерти", icon: "🎵" },
  { label: "Розпродаж", icon: "🛍️" },
  { label: "Мовне кафе", icon: "☕" },
  { label: "Курси", icon: "🎓" },
  { label: "Служба відвідування", icon: "🏠" },
  { label: "Група рукоділля", icon: "🧶" },
];

const takeawayItems: string[] = [
  "Волонтерство часто починається з малих дій.",
  "Маленькі дії можуть будувати довіру, приналежність та спільноту.",
  "Безпечна громада потребує людей, які бачать одне одного.",
  "Волонтерство має відбуватися на умовах самих волонтерів.",
  "Волонтерство має багато форм, але будується на одній силі: люди, які роблять внесок у спільноту.",
  "Бути волонтером — це бути частиною чогось більшого.",
];

function CollectibleTakeawaysUK() {
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
          Це можна взяти з собою далі
        </h2>
        <span
          className="rounded-full bg-mist px-3 py-1 text-sm font-bold text-harbor"
          aria-live="polite"
        >
          {collected.length} з {takeawayItems.length} зібрано
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate">
        Натисніть на пункти, які ви берете з цього розділу.
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

export function ModuleOneUK({ courseModule, isComplete, onComplete }: ModuleOneUKProps) {
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
        setLimitMessage("Ви обрали два будівельних блоки. Зніміть вибір, щоб змінити.");
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
          Розділ {courseModule.order} &middot; Безпечний волонтер
        </p>
        <h1 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
          Волонтерство — це бути частиною чогось більшого
        </h1>
      </section>

      <TextSection title="Чому волонтерство важливе" icon="🌱">
        <p>
          Уявіть собі громаду, де люди вітаються одне з одним. Де хтось помічає,
          хто приходить, а хто — ні. Де є місця для зустрічей, люди для знайомства
          та спільноти, до яких можна долучитися.
        </p>
        <p>Саме такі громади будує волонтерство.</p>
        <p>
          Волонтерство часто починається з малого. Чашка кави. Розмова. Прогулянка.
          Телефонний дзвінок. Запрошення. Людина, яку зустрічають біля дверей зі словами:
          «Як добре, що ви прийшли.»
        </p>
        <p>
          Такі миті можуть здаватися простими. Але саме вони часто дають людям
          відчути, що їх бачать, приймають і що вони трохи менш самотні.
        </p>
      </TextSection>

      <TextSection title="Маленькі дії будують велику спільноту" icon="🏘️">
        <p>
          Хороше суспільство потребує добрих послуг, надійних систем і фахівців,
          які виконують свою роботу. Воно також потребує чогось більшого: людей,
          які бачать одне одного, знаходять час і будують довіру в повсякденному житті.
        </p>
        <p>
          Коли люди зустрічаються, відбувається більше, ніж ми завжди бачимо
          в той момент. Розмова може знизити перешкоди для повторного повернення.
          Запрошення може відкрити двері до нової спільноти. Захід може дати комусь
          привід вийти на вулицю. Волонтер може бути тим, хто дасть людині відчути:
          тут є місце для мене.
        </p>
        <p className="flex min-h-24 items-center justify-center rounded-2xl border border-pine/20 bg-mist p-5 text-center font-bold text-harbor shadow-sm [text-wrap:balance]">
          Звичайна людська турбота може зробити день легшим, зустріч безпечнішою
          та сусідство теплішим.
        </p>
        <p>
          Тому волонтерство — це не лише окремі завдання. Це будівництво спільноти
          з часом.
        </p>
      </TextSection>

      <TextSection title="Безпека починається з того, що ми знаємо одне одного" icon="🔗">
        <p>Громада стає безпечнішою, коли люди трохи знають одне одного.</p>
        <p>
          Коли ми знаємо одне одного, легше попросити про допомогу. Легше запросити
          когось разом. Легше помітити, якщо хтось залишається осторонь. Легше
          підтримати, коли щось трапляється.
        </p>
        <p>
          Безпека — це не лише плани, системи та служби. Це також щоденні зв'язки
          між людьми. Хто вітається з вами? Хто помічає, якщо ви не прийшли, як зазвичай?
          Хто питає, як справи? Хто трохи полегшує вхід у кімнату?
        </p>
        <p>Волонтери допомагають створювати такі зв'язки.</p>
        <p>
          Не через великі слова чи великі обіцянки, а через присутність, активність,
          тепло та спільноту.
        </p>
      </TextSection>

      <SupplementLayersUK />

      <TextSection title="Волонтерство є скрізь" icon="🌍">
        <p>
          Волонтерство охоплює багато людей, багато досвідів та багато способів
          зробити внесок.
        </p>

        <div className="flex flex-wrap gap-2 py-1" aria-label="Приклади волонтерської діяльності">
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

        <p>Деякі допомагають часто. Деякі — іноді. У деяких великий досвід. Інші — зовсім новачки.</p>
        <p>
          Форми різні, але сила одна: люди, які сприяють тому, щоб більше людей
          відчували приналежність.
        </p>
        <p>
          Волонтерство робить громаду сильнішою, тому що люди зустрічаються,
          знають одне одного, будують довіру та створюють місця, де більше людей
          можуть знайти своє місце.
        </p>
      </TextSection>

      <TextSection title="Бути частиною чогось більшого" icon="✨">
        <p>Коли ви волонтер, ви є частиною більшого цілого.</p>
        <p>
          Ви є частиною громади, де люди роблять більше, ніж просто живуть поруч
          одне з одним. Вони зустрічаються. Вони беруть участь. Вони підтримують.
          Вони будують спільноту.
        </p>
        <p>
          Це не означає, що один волонтер має нести все. Це означає, що багато
          малих внесків від багатьох різних людей можуть створити щось більше,
          ніж кожен із нас окремо.
        </p>
        <p>
          Захід може стати постійною точкою опори. Місце зустрічі може стати
          домом. Розмова може стати початком стосунків. Запрошення може дати комусь
          сміливість повернутися.
        </p>
        <div className="flex min-h-40 flex-col items-center justify-center gap-1 rounded-2xl border border-pine/20 bg-mist p-5 text-center text-lg font-bold leading-8 text-harbor shadow-sm [text-wrap:balance]">
          <p>Так будується спільнота.</p>
          <p>Так будується довіра.</p>
          <p>Так будується місцева громада.</p>
          <p>Коли люди підтримують одне одного, суспільство стає сильнішим.</p>
        </div>
      </TextSection>

      <CollectibleTakeawaysUK />

      <section className="space-y-6" aria-labelledby="community-builder-heading">
        <Card className="p-6 md:p-8">
          <div className="mt-2 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <h2
                id="community-builder-heading"
                className="text-2xl font-extrabold leading-tight text-ink md:text-3xl"
              >
                Побудуйте свою громаду
              </h2>
              <div className="mt-5 space-y-4 text-base leading-8 text-slate md:text-lg">
                <p>
                  Уявіть собі сусідство, де більше людей знають одне одного, більше
                  наважуються прийти і більше відчувають приналежність.
                </p>
                <p>
                  Такі сусідства не виникають самі по собі. Їх будують люди, які
                  знаходять час, запрошують, створюють безпеку та виявляють турботу
                  в повсякденному житті.
                </p>
                <p>Що, на вашу думку, найважливіше для побудови такого сусідства?</p>
                <p className="font-bold text-harbor">Оберіть два будівельних блоки.</p>
              </div>
            </div>
            <div className="rounded-3xl bg-mist p-5 text-harbor ring-1 ring-harbor/10">
              <p className="text-sm font-bold uppercase tracking-normal text-slate">
                Обрано
              </p>
              <p className="mt-1 text-3xl font-extrabold" aria-live="polite">
                {selectedIds.length} з {MAX_SELECTIONS}
              </p>
              <p className="mt-2 text-sm font-semibold">
                {selectedLabels.length > 0
                  ? selectedLabels.join(" + ")
                  : "Оберіть дві картки нижче."}
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
            Побачити мою силу
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
                  className={paragraph.startsWith("Ваша сила") ? "font-bold text-harbor" : ""}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Card>

          <TextSection title="Волонтерство — це про людей">
            <p>Волонтерство — це насамперед не про завдання.</p>
            <p>Це про людей.</p>
            <p>
              Завдання можуть бути важливими. Заходи можуть бути важливими.
              Практична допомога може бути важливою.
            </p>
            <p>Але суть волонтерства — це зустріч людей із людьми.</p>
            <p className="font-bold text-harbor">
              Ви маєте вносити свій внесок у те, що ви можете, але ви не повинні вирішувати все самостійно.
            </p>
          </TextSection>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-ink md:text-3xl">Підсумок</h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Волонтерство — це про стосунки, а не лише про завдання.",
                "Ваш внесок може означати більше, ніж ви думаєте.",
                "Волонтери доповнюють та збагачують, але не замінюють співробітників, родичів або муніципальні служби.",
                "Чіткі рамки дозволяють безпечніше вносити внесок із теплом і турботою.",
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
              Хороше сусідство для мене — це...
            </h2>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-slate md:text-lg">
              <p>Подумайте про місце, де ви самі відчували себе в безпеці та бажаним гостем.</p>
              <p>Що робило це місце приємним для перебування?</p>
              <p>Це була будівля, система чи люди?</p>
              <p>Як ви можете допомогти іншим відчути щось подібне?</p>
            </div>
            <label htmlFor="module-one-uk-reflection" className="sr-only">
              Хороше сусідство для мене — це
            </label>
            <textarea
              id="module-one-uk-reflection"
              value={reflection}
              onChange={(event) => handleReflectionChange(event.target.value)}
              rows={5}
              placeholder="Хороше сусідство для мене — це..."
              className="mt-6 min-h-36 w-full resize-y rounded-2xl border border-harbor/15 bg-white p-4 text-base leading-7 text-ink shadow-sm outline-none transition focus:border-pine focus:ring-4 focus:ring-pine/20"
            />
            <p className="mt-3 text-sm font-semibold text-slate">
              Роздуми зберігаються лише локально у вашому браузері і призначені лише для вас!
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
              Ви завершили Розділ 1
            </h2>
            <h3 className="mt-2 text-xl font-bold text-harbor md:text-2xl">
              Наступний розділ — про вашу роль
            </h3>
            <div className="mt-5 max-w-4xl space-y-4 text-base leading-8 text-slate md:text-lg">
              <p>
                Ви побачили, чому волонтерство важливе і чому волонтери є важливою
                частиною живої громади.
              </p>
              <p>
                Коли ви знаєте свою роль, легше робити внесок із впевненістю,
                теплом і чіткими межами.
              </p>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button onClick={onComplete} className="w-full bg-pine text-harbor hover:bg-leaf sm:w-auto">
                Перейти до Розділу 2
              </Button>
              <Button to="/ukrainsk" variant="secondary" className="w-full sm:w-auto">
                На головну
              </Button>
            </div>
          </Card>
        </section>
      ) : (
        <Card className="p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-slate">
              Оберіть два будівельних блоки та відкрийте відповідь, перш ніж рухатися далі.
            </p>
            <Button to="/ukrainsk" variant="secondary">
              На головну
            </Button>
          </div>
        </Card>
      )}

      {isComplete ? (
        <div className="sr-only" aria-live="polite">
          Розділ 1 вже завершено.
        </div>
      ) : null}
    </article>
  );
}
