import type { CourseModule } from "../../data/courseModules";
import { ModuleCard, type ModuleCardStatus } from "./ModuleCard";

type ModuleGridProps = {
  modules: CourseModule[];
  nextModuleId?: string;
  isModuleComplete: (moduleId: string) => boolean;
};

function getCardStatus(
  moduleId: string,
  nextModuleId: string | undefined,
  isModuleComplete: (moduleId: string) => boolean,
): ModuleCardStatus {
  if (isModuleComplete(moduleId)) {
    return "complete";
  }

  if (moduleId === nextModuleId) {
    return "next";
  }

  return "upcoming";
}

export function ModuleGrid({ isModuleComplete, modules, nextModuleId }: ModuleGridProps) {
  const visibleModules = modules.filter(
    (courseModule) =>
      isModuleComplete(courseModule.id) || courseModule.id === nextModuleId,
  );

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {visibleModules.map((courseModule) => (
        <ModuleCard
          key={courseModule.id}
          courseModule={courseModule}
          status={getCardStatus(courseModule.id, nextModuleId, isModuleComplete)}
        />
      ))}
    </div>
  );
}
