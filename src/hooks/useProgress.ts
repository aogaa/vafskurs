import { useCallback, useMemo, useState } from "react";
import { readStringArray, storageKeys, writeStringArray } from "../utils/storage";

export function useProgress() {
  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>(() =>
    readStringArray(storageKeys.completedModules),
  );

  const completedSet = useMemo(
    () => new Set(completedModuleIds),
    [completedModuleIds],
  );

  const markModuleComplete = useCallback((moduleId: string) => {
    setCompletedModuleIds((current) => {
      if (current.includes(moduleId)) {
        return current;
      }

      const next = [...current, moduleId];
      writeStringArray(storageKeys.completedModules, next);
      return next;
    });
  }, []);

  const isModuleComplete = useCallback(
    (moduleId: string) => completedSet.has(moduleId),
    [completedSet],
  );

  const getCompletedCount = useCallback(
    () => completedModuleIds.length,
    [completedModuleIds.length],
  );

  return {
    completedModuleIds,
    getCompletedCount,
    isModuleComplete,
    markModuleComplete,
  };
}
