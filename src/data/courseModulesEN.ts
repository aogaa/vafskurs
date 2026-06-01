import type { CourseModule } from "./courseModules";

export const courseModulesEN: CourseModule[] = [
  {
    id: "modul-1",
    order: 1,
    title: "Volunteering is being part of something bigger",
    description:
      "See why volunteering is about relationships, community, and safer neighbourhoods.",
    status: "active",
    ingress:
      "Volunteering is people who, in various ways, help make the local community stronger.",
    learningGoals: [
      "Understand why volunteering has value for the community",
      "See how you contribute through relationships, presence, and community",
      "Understand what it means for volunteering to be a supplement",
    ],
    insight: "When people see each other, the community becomes safer.",
    contentBlocks: [
      "As a volunteer you bring something important: time, attention, conversations, and small actions that can make everyday life easier for others.",
      "Being a supplement means you don't have to carry all the responsibility alone. You contribute what volunteering is particularly good at: human contact, community, and a low-threshold entry into activities.",
    ],
  },
  {
    id: "modul-2",
    order: 2,
    title: "The volunteer role — what is my role?",
    description:
      "Practise distinguishing between the volunteer role, employee role, family role, and what needs clarification.",
    status: "planned",
    learningGoals: [
      "Understand why the volunteer role is not the same as the employee role",
      "Distinguish between what volunteers can contribute and what others are responsible for",
      "Practise clarifying when responsibility, safety, or role becomes unclear",
    ],
  },
  {
    id: "modul-3",
    order: 3,
    title: "When things become unclear — stop and clarify",
    description:
      "Learn what to do when something becomes unclear, worrying, or uncomfortable.",
    status: "planned",
    learningGoals: [
      "Use the Stop and Clarify compass when you are uncertain",
      "Distinguish between what you can continue with, what needs clarification, and acute danger",
      "Describe what you have seen and heard without diagnosing or drawing conclusions",
    ],
  },
  {
    id: "modul-4",
    order: 4,
    title: "Ready to contribute",
    description:
      "Gather the most important lessons from the course and practise making safe choices in practical situations.",
    status: "planned",
    learningGoals: [
      "Recognise when you can act yourself and when something needs clarification",
      "Know who to ask when something is unclear",
      "Formulate a personal rule for safe volunteering",
    ],
  },
];

export const visibleCourseModulesEN = courseModulesEN;

export function getModuleByIdEN(moduleId: string) {
  return courseModulesEN.find((m) => m.id === moduleId);
}
