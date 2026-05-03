import type { CourseModule } from "../../data/courseModules";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

type ModuleCardProps = {
  courseModule: CourseModule;
  isComplete: boolean;
};

export function ModuleCard({ courseModule, isComplete }: ModuleCardProps) {
  const isActive = courseModule.status === "active";
  const statusLabel = isComplete
    ? "Fullført"
    : isActive
      ? "Ikke startet"
      : "Kommende";

  return (
    <Card className="group flex h-full flex-col overflow-hidden p-0 transition duration-200 hover:-translate-y-1 hover:shadow-lift">
      <div className="h-1.5 bg-gradient-to-r from-pine via-leaf to-harbor" />
      <div className="flex h-full flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-leaf">
              Modul {courseModule.order}
            </p>
            <h3 className="mt-2 text-2xl font-bold leading-8 text-ink group-hover:text-harbor">
              {courseModule.title}
            </h3>
          </div>
          <Badge tone={isComplete ? "complete" : isActive ? "active" : "planned"}>
            <span aria-hidden="true">{isComplete ? "✓" : isActive ? "○" : "•"}</span>
            {statusLabel}
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
            variant={isActive || isComplete ? "primary" : "secondary"}
            className="w-full"
          >
            Åpne modul
          </Button>
        </div>
      </div>
    </Card>
  );
}
