import { Navigate, useParams } from "react-router-dom";
import { ModuleGridTranslatable } from "../components/course/translatable/ModuleGridTranslatable";
import { PageContainer } from "../components/layout/PageContainer";
import { SectionTitle } from "../components/ui/SectionTitle";
import type { CourseDescriptor } from "../courses/types";
import { getCourseBySlug } from "../courses/registry";
import { useProgressWithPrefix } from "../hooks/useProgressWithPrefix";

const statusCopy = {
  complete: { statusLabel: "Gjennomført", button: "Prøv igjen" },
  next: { statusLabel: "", button: "Fortsett" },
  upcoming: { statusLabel: "Ikke åpnet ennå", button: "Se del" },
} as const;

function CourseOverviewContent({ course }: { course: CourseDescriptor }) {
  const { isModuleComplete } = useProgressWithPrefix(course.storagePrefix);
  const nextModule = course.modules.find(
    (courseModule) => !isModuleComplete(courseModule.id),
  );

  return (
    <PageContainer className="space-y-8">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionTitle
          eyebrow="Deloversikt"
          title="Kursløpet"
          description="Her ser du hele kursløpet. Start med første del hvis du er ny, eller fortsett der du slapp."
        />
      </header>
      <ModuleGridTranslatable
        modules={course.modules}
        nextModuleId={nextModule?.id}
        isModuleComplete={isModuleComplete}
        urlPrefix={`/${course.slug}`}
        partLabel="Del"
        statusCopy={statusCopy}
      />
    </PageContainer>
  );
}

export function CourseOverviewPage() {
  const { courseSlug } = useParams();
  const course = getCourseBySlug(courseSlug);

  if (!course) {
    return <Navigate to="/" replace />;
  }

  return <CourseOverviewContent course={course} />;
}
