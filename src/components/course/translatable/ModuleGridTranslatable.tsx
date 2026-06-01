import type { CourseModule } from "../../../data/courseModules";
import {
  ModuleCardTranslatable,
  type ModuleCardStatus,
} from "./ModuleCardTranslatable";

type ModuleGridTranslatableProps = {
  modules: CourseModule[];
  nextModuleId?: string;
  isModuleComplete: (moduleId: string) => boolean;
  urlPrefix: string;
  partLabel: string;
  statusCopy: Record<ModuleCardStatus, { statusLabel: string; button: string }>;
};

function getCardStatus(
  moduleId: string,
  nextModuleId: string | undefined,
  isModuleComplete: (moduleId: string) => boolean,
): ModuleCardStatus {
  if (isModuleComplete(moduleId)) return "complete";
  if (moduleId === nextModuleId) return "next";
  return "upcoming";
}

export function ModuleGridTranslatable({
  isModuleComplete,
  modules,
  nextModuleId,
  urlPrefix,
  partLabel,
  statusCopy,
}: ModuleGridTranslatableProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {modules.map((courseModule) => (
        <ModuleCardTranslatable
          key={courseModule.id}
          courseModule={courseModule}
          status={getCardStatus(courseModule.id, nextModuleId, isModuleComplete)}
          urlPrefix={urlPrefix}
          partLabel={partLabel}
          statusCopy={statusCopy}
        />
      ))}
    </div>
  );
}
