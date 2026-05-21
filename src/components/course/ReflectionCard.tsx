import type { ModuleOneCard } from "../../data/moduleOneCards";

type ReflectionCardProps = {
  card: ModuleOneCard;
  isDisabled: boolean;
  isSelected: boolean;
  onToggle: (cardId: string) => void;
};

function CardIcon({ icon }: { icon: ModuleOneCard["icon"] }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 2.2,
  };

  return (
    <svg viewBox="0 0 32 32" className="size-7" aria-hidden="true">
      {icon === "wave" ? (
        <path {...common} d="M8 18c2 4 6 6 10 6 4.5 0 8-3.5 8-8M8 18l-2-5M12 16l-1-7M17 15V7M22 17l2-6" />
      ) : null}
      {icon === "eye" ? (
        <>
          <path {...common} d="M4 16s4.5-7 12-7 12 7 12 7-4.5 7-12 7S4 16 4 16Z" />
          <circle {...common} cx="16" cy="16" r="3.5" />
        </>
      ) : null}
      {icon === "place" ? (
        <>
          <path {...common} d="M6 15 16 7l10 8v10H6V15Z" />
          <path {...common} d="M12 25v-7h8v7" />
        </>
      ) : null}
      {icon === "bridge" ? (
        <>
          <path {...common} d="M5 22c5-9 17-9 22 0" />
          <path {...common} d="M7 22h18M10 19v3M16 16v6M22 19v3" />
        </>
      ) : null}
      {icon === "spark" ? (
        <path {...common} d="m16 4 2.8 8.2L27 15l-8.2 2.8L16 26l-2.8-8.2L5 15l8.2-2.8L16 4Z" />
      ) : null}
      {icon === "person" ? (
        <>
          <circle {...common} cx="16" cy="11" r="4" />
          <path {...common} d="M8 26c1.4-5 4.2-8 8-8s6.6 3 8 8" />
        </>
      ) : null}
      {icon === "balance" ? (
        <>
          <path {...common} d="M16 5v22M8 9h16M9 9l-4 8h8L9 9ZM23 9l-4 8h8l-4-8Z" />
        </>
      ) : null}
      {icon === "people" ? (
        <>
          <circle {...common} cx="12" cy="12" r="3" />
          <circle {...common} cx="21" cy="11" r="3" />
          <path {...common} d="M5 25c1.2-4.3 3.6-6.5 7-6.5s5.8 2.2 7 6.5M17 18.5c3.2.2 5.4 2.4 6.6 6.5" />
        </>
      ) : null}
      {icon === "arrow" ? (
        <path {...common} d="M6 16h18M17 9l7 7-7 7M7 7l4 4M7 25l4-4" />
      ) : null}
      {icon === "search" ? (
        <>
          <circle {...common} cx="14" cy="14" r="7" />
          <path {...common} d="m20 20 6 6M13 11h3v5" />
        </>
      ) : null}
    </svg>
  );
}

export function ReflectionCard({
  card,
  isDisabled,
  isSelected,
  onToggle,
}: ReflectionCardProps) {
  return (
    <button
      type="button"
      aria-label={`${isSelected ? "Fjern valgt kort" : "Velg kort"}: ${card.title}`}
      aria-pressed={isSelected}
      disabled={isDisabled}
      onClick={() => onToggle(card.id)}
      className={`group relative flex min-h-64 w-full flex-col overflow-hidden rounded-[1.75rem] border p-5 text-left shadow-soft transition duration-200 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine ${
        isSelected
          ? "border-pine bg-gradient-to-br from-harbor to-fjord text-white shadow-glow -translate-y-1"
          : "border-harbor/10 bg-white text-ink hover:-translate-y-1 hover:border-pine/70 hover:shadow-lift"
      } ${isDisabled ? "cursor-not-allowed opacity-55 hover:translate-y-0 hover:shadow-soft" : ""}`}
    >
      <span
        className={`absolute inset-x-0 top-0 h-2 ${
          isSelected ? "bg-pine" : "bg-gradient-to-r from-harbor via-fjord to-pine"
        }`}
        aria-hidden="true"
      />
      <span className="flex items-start justify-between gap-4">
        <span
          className={`grid size-14 place-items-center rounded-2xl ${
            isSelected ? "bg-pine text-harbor" : "bg-mist text-harbor"
          }`}
        >
          <CardIcon icon={card.icon} />
        </span>
        <span
          className={`rounded-full px-3 py-1 text-sm font-bold ${
            isSelected ? "bg-white/15 text-white" : "bg-mist text-harbor"
          }`}
        >
          {isSelected ? "✓ Valgt" : "Velg"}
        </span>
      </span>
      <span className="mt-6 block text-2xl font-bold leading-8">{card.title}</span>
      <span
        className={`mt-4 block text-base leading-7 ${
          isSelected ? "text-white" : "text-slate"
        }`}
      >
        {card.shortText}
      </span>
    </button>
  );
}
