import type { CourseModule } from "../../data/courseModules";
import { courseModules } from "../../data/courseModules";

type ModuleProgressProps = {
  courseModule: CourseModule;
  isModuleComplete: (moduleId: string) => boolean;
};

export function ModuleProgress({ courseModule, isModuleComplete }: ModuleProgressProps) {
  return (
    <div
      className="flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-soft ring-1 ring-harbor/8 sm:flex-row sm:items-center sm:justify-between"
      aria-label={`Del ${courseModule.order} av ${courseModules.length}`}
    >
      <div className="flex items-center gap-2" aria-hidden="true">
        {courseModules.map((item) => (
          <div
            key={item.id}
            className={`h-2 w-6 rounded-full transition-colors ${
              isModuleComplete(item.id)
                ? "bg-pine"
                : item.id === courseModule.id
                  ? "bg-harbor"
                  : "bg-slate/30"
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-bold text-slate">
        Del {courseModule.order} av {courseModules.length}
      </span>
    </div>
  );
}
