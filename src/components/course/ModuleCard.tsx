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
    <Card className="flex h-full flex-col p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lift">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-clay">
            Modul {courseModule.order}
          </p>
          <h3 className="mt-2 text-2xl font-bold leading-8 text-ink">
            {courseModule.title}
          </h3>
        </div>
        <Badge tone={isComplete ? "complete" : isActive ? "active" : "planned"}>
          <span aria-hidden="true">{isComplete ? "✓" : isActive ? "○" : "•"}</span>
          {statusLabel}
        </Badge>
      </div>
      <p className="mt-4 text-base leading-7 text-ink/72">
        {courseModule.description}
      </p>
      <p className="mt-4 text-sm font-semibold text-harbor">
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
    </Card>
  );
}
