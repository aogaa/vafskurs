import type { CourseDescriptor } from "./types";
import { tryggSomFrivilligCourse } from "./trygg-som-frivillig/course";
import { spraakkafeCourse } from "./spraakkafe/course";

/** Alle norske kurs i portalen, i visningsrekkefølge. */
export const courses: CourseDescriptor[] = [
  tryggSomFrivilligCourse,
  spraakkafeCourse,
];

export function getCourseBySlug(slug: string | undefined) {
  if (!slug) return undefined;
  return courses.find((course) => course.slug === slug);
}

/** Kurs som skal vises i portalen. */
export const visibleCourses = courses.filter(
  (course) => course.status === "active",
);
