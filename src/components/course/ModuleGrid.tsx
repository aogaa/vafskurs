import { coursePhases } from "../../data/coursePhases";
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
  return (
    <div className="space-y-10">
      {coursePhases.map((phase) => {
        const phaseModules = phase.moduleIds
          .map((moduleId) => modules.find((courseModule) => courseModule.id === moduleId))
          .filter((courseModule): courseModule is CourseModule => Boolean(courseModule));

        return (
          <section key={phase.id} className="space-y-5" aria-labelledby={`${phase.id}-title`}>
            <div className="rounded-[2rem] border border-harbor/8 bg-white p-6 shadow-soft">
              <p className="text-sm font-bold uppercase tracking-normal text-leaf">
                Læringsfase
              </p>
              <h2 id={`${phase.id}-title`} className="mt-2 text-2xl font-bold text-ink">
                {phase.title}
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate">
                {phase.description}
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {phaseModules.map((courseModule) => (
                <ModuleCard
                  key={courseModule.id}
                  courseModule={courseModule}
                  status={getCardStatus(courseModule.id, nextModuleId, isModuleComplete)}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
