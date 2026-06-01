import { useCallback, useMemo, useState } from "react";
import { readStringArray, writeStringArray } from "../utils/storage";

export function useProgressWithPrefix(prefix: string) {
  const storageKey = `${prefix}:completed-modules`;

  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>(() =>
    readStringArray(storageKey),
  );

  const completedSet = useMemo(
    () => new Set(completedModuleIds),
    [completedModuleIds],
  );

  const markModuleComplete = useCallback(
    (moduleId: string) => {
      setCompletedModuleIds((current) => {
        if (current.includes(moduleId)) return current;
        const next = [...current, moduleId];
        writeStringArray(storageKey, next);
        return next;
      });
    },
    [storageKey],
  );

  const isModuleComplete = useCallback(
    (moduleId: string) => completedSet.has(moduleId),
    [completedSet],
  );

  const getCompletedCount = useCallback(
    () => completedModuleIds.length,
    [completedModuleIds.length],
  );

  return { completedModuleIds, getCompletedCount, isModuleComplete, markModuleComplete };
}
