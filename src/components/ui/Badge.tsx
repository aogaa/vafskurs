import type { ReactNode } from "react";

type BadgeTone = "complete" | "planned" | "active";

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
};

const toneClasses: Record<BadgeTone, string> = {
  complete: "bg-pine text-harbor ring-pine/60",
  planned: "bg-mist text-harbor ring-harbor/10",
  active: "bg-honey/20 text-harbor ring-honey/45",
};

export function Badge({ children, tone = "planned" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ring-1 ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
