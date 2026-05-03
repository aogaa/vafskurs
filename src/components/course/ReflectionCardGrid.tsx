import type { ModuleOneCard } from "../../data/moduleOneCards";
import { ReflectionCard } from "./ReflectionCard";

type ReflectionCardGridProps = {
  cards: ModuleOneCard[];
  maxReached: boolean;
  selectedIds: string[];
  onToggle: (cardId: string) => void;
};

export function ReflectionCardGrid({
  cards,
  maxReached,
  onToggle,
  selectedIds,
}: ReflectionCardGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => {
        const isSelected = selectedIds.includes(card.id);

        return (
          <ReflectionCard
            key={card.id}
            card={card}
            isDisabled={maxReached && !isSelected}
            isSelected={isSelected}
            onToggle={onToggle}
          />
        );
      })}
    </div>
  );
}
