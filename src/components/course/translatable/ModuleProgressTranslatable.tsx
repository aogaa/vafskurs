import type { CourseModule } from "../../../data/courseModules";

type ModuleProgressTranslatableProps = {
  courseModule: CourseModule;
  allModules: CourseModule[];
  isModuleComplete: (moduleId: string) => boolean;
  partLabel: string;
  ofLabel: string;
};

export function ModuleProgressTranslatable({
  courseModule,
  allModules,
  isModuleComplete,
  partLabel,
  ofLabel,
}: ModuleProgressTranslatableProps) {
  return (
    <div
      className="flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-soft ring-1 ring-harbor/10 sm:flex-row sm:items-center sm:justify-between"
      aria-label={`${partLabel} ${courseModule.order} ${ofLabel} ${allModules.length}`}
    >
      <div className="flex items-center gap-2" aria-hidden="true">
        {allModules.map((item) => (
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
        {partLabel} {courseModule.order} {ofLabel} {allModules.length}
      </span>
    </div>
  );
}
