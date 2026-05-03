import type { CourseModule } from "../../data/courseModules";
import { ModuleCard } from "./ModuleCard";

type ModuleGridProps = {
  modules: CourseModule[];
  isModuleComplete: (moduleId: string) => boolean;
};

export function ModuleGrid({ isModuleComplete, modules }: ModuleGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {modules.map((courseModule) => (
        <ModuleCard
          key={courseModule.id}
          courseModule={courseModule}
          isComplete={isModuleComplete(courseModule.id)}
        />
      ))}
    </div>
  );
}
