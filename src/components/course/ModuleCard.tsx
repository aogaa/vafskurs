import type { CourseModule } from "../../data/courseModules";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

export type ModuleCardStatus = "complete" | "next" | "upcoming";

type ModuleCardProps = {
  courseModule: CourseModule;
  status: ModuleCardStatus;
};

const statusCopy: Record<ModuleCardStatus, { statusLabel: string; button: string }> = {
  complete: { statusLabel: "Gjennomført", button: "Prøv igjen" },
  next: { statusLabel: "", button: "Fortsett" },
  upcoming: { statusLabel: "Ikke åpnet ennå", button: "Se del" },
};

export function ModuleCard({ courseModule, status }: ModuleCardProps) {
  const copy = statusCopy[status];
  const isComplete = status === "complete";
  const isNext = status === "next";

  return (
    <Card
      className={`group flex h-full min-h-[23rem] flex-col overflow-hidden p-0 transition duration-200 hover:-translate-y-1 hover:shadow-lift ${
        isComplete
          ? "border-pine/55 ring-2 ring-pine/35"
          : isNext
            ? "border-pine/55 ring-2 ring-pine/35"
            : "bg-white/88"
      }`}
    >
      <div className={`h-2 ${isComplete || isNext ? "bg-pine" : "bg-harbor/18"}`} />
      <div className="flex h-full flex-col p-6">
        <p
          className={`text-sm font-bold uppercase tracking-normal ${
            isComplete || isNext ? "text-harbor" : "text-slate"
          }`}
        >
          Del {courseModule.order}
        </p>
        <h3 className="mt-3 text-2xl font-bold leading-8 text-ink group-hover:text-harbor">
          {courseModule.title}
        </h3>
        <p className="mt-5 text-base leading-7 text-slate">
          {courseModule.description}
        </p>
        <div className="mt-auto space-y-4 pt-7">
          {copy.statusLabel ? (
            <p className="text-base font-bold text-harbor">{copy.statusLabel}</p>
          ) : null}
          <Button
            to={`/trygg-som-frivillig/deler/${courseModule.id}`}
            variant={isNext || isComplete ? "primary" : "secondary"}
            className="w-full"
          >
            {copy.button}
          </Button>
        </div>
      </div>
    </Card>
  );
}
