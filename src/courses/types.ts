import type { ComponentType } from "react";
import type { CourseModule } from "../data/courseModules";

/**
 * Props for et kurs sin modul-"body" — det interaktive innholdet i en del.
 * Matcher nøyaktig propsene de eksisterende ModuleOne..Four-komponentene tar,
 * slik at de kan gjenbrukes urørt via et kursregister.
 */
export type ModuleBodyProps = {
  courseModule: CourseModule;
  isComplete: boolean;
  onComplete: () => void;
};

/** Tematisk fremdriftstekst (kan variere per kurs). */
export type CourseProgressCopy = {
  journeyLabel: string;
  notStartedText: string;
  completedText: string;
  inProgressText: string;
};

/**
 * En selvstendig kursenhet. Alt som gjør et kurs unikt — slug, lagringsnøkkel,
 * tekster, moduler og evt. egne interaktive komponenter — defineres her.
 */
export type CourseDescriptor = {
  /** Stabil id, f.eks. "trygg-som-frivillig". */
  id: string;
  /** URL-segment. For kurs 1 == id for å bevare eksisterende URL-er. */
  slug: string;
  /**
   * Prefiks for localStorage. For kurs 1 == "trygg-som-frivillig", slik at
   * useProgressWithPrefix bygger den eksisterende nøkkelen
   * "trygg-som-frivillig:completed-modules" og bevarer brukernes progresjon.
   */
  storagePrefix: string;
  /** Synlig kurstittel. */
  title: string;
  /** Kort beskrivelse til portalkortet. */
  shortDescription: string;
  /** Styrer om kurset vises i portalen. */
  status: "active" | "planned";
  /** Hero-tekst på kursets hjemmeside. */
  hero: {
    subtitle: string;
    description1: string;
    description2: string;
  };
  /** Tematisk fremdriftstekst på hjemmesiden. */
  progressCopy: CourseProgressCopy;
  /** Tekst i fullføringspanelet etter hver del. */
  completionStepText: string;
  /** Tittel i fullføringspanelet når hele kurset er fullført. */
  courseCompletedTitle: string;
  /** Moduler/deler i kurset. */
  modules: CourseModule[];
  /** Overgangstekst per modul-id, vises i fullføringspanelet. */
  transitionCopy: Record<string, string>;
  /**
   * Egen interaktiv komponent per modul-id. Moduler uten oppføring her
   * faller tilbake til den generiske CourseModuleLayout (stillas).
   */
  moduleComponents?: Record<string, ComponentType<ModuleBodyProps>>;
};
