import type { CourseModule } from "../../data/courseModules";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

export type ModuleCardStatus = "complete" | "next" | "upcoming";

type ModuleCardProps = {
  courseModule: CourseModule;
  status: ModuleCardStatus;
};

const statusCopy: Record<ModuleCardStatus, { label: string; marker: string; button: string }> = {
  complete: { label: "Fullført", marker: "✓", button: "Se igjen" },
  next: { label: "Neste steg", marker: "→", button: "Fortsett" },
  upcoming: { label: "Kommende", marker: "•", button: "Se modul" },
};

export function ModuleCard({ courseModule, status }: ModuleCardProps) {
  const copy = statusCopy[status];
  const isComplete = status === "complete";
  const isNext = status === "next";

  return (
    <Card
      className={`group flex h-full flex-col overflow-hidden p-0 transition duration-200 hover:-translate-y-1 hover:shadow-lift ${
        isNext ? "ring-2 ring-pine/55" : ""
      } ${status === "upcoming" ? "bg-white/88" : ""}`}
    >
      <div
        className={`h-1.5 ${
          isComplete
            ? "bg-pine"
            : isNext
              ? "bg-gradient-to-r from-pine to-leaf"
              : "bg-harbor/18"
        }`}
      />
      <div className="flex h-full flex-col p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p
              className={`text-sm font-bold uppercase tracking-normal ${
                isNext || isComplete ? "text-leaf" : "text-slate"
              }`}
            >
              Modul {courseModule.order}
            </p>
            <h3 className="mt-2 text-2xl font-bold leading-8 text-ink group-hover:text-harbor">
              {courseModule.title}
            </h3>
          </div>
          <Badge tone={isComplete ? "complete" : isNext ? "active" : "planned"}>
            <span aria-hidden="true">{copy.marker}</span>
            {copy.label}
          </Badge>
        </div>
        <p className="mt-4 text-base leading-7 text-slate">
          {courseModule.description}
        </p>
        <p className="mt-4 inline-flex w-fit rounded-full bg-mist px-3 py-1 text-sm font-semibold text-harbor">
          Ca. {courseModule.durationMinutes} minutter
        </p>
        <div className="mt-auto pt-6">
          <Button
            to={`/moduler/${courseModule.id}`}
            variant={isNext ? "primary" : "secondary"}
            className="w-full"
          >
            {copy.button}
          </Button>
        </div>
      </div>
    </Card>
  );
}
