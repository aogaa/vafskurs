import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { CompletionPanelTranslatable } from "../components/course/translatable/CompletionPanelTranslatable";
import { CourseModuleLayout } from "../components/course/CourseModuleLayout";
import { ModuleProgressTranslatable } from "../components/course/translatable/ModuleProgressTranslatable";
import { PageContainer } from "../components/layout/PageContainer";
import { Button } from "../components/ui/Button";
import type { CourseDescriptor } from "../courses/types";
import { getCourseBySlug } from "../courses/registry";
import { useProgressWithPrefix } from "../hooks/useProgressWithPrefix";

function CourseModuleContent({ course }: { course: CourseDescriptor }) {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { isModuleComplete, markModuleComplete } = useProgressWithPrefix(
    course.storagePrefix,
  );
  const [showCompletion, setShowCompletion] = useState(false);

  const overviewTo = `/${course.slug}/deler`;
  const courseModule = course.modules.find((item) => item.id === moduleId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [moduleId]);

  if (!courseModule) {
    return (
      <PageContainer>
        <section className="rounded-3xl border border-harbor/10 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-extrabold text-ink">Fant ikke delen</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate">
            Denne delen finnes ikke i kursstrukturen ennå.
          </p>
          <div className="mt-7">
            <Button to={overviewTo}>Tilbake til deloversikt</Button>
          </div>
        </section>
      </PageContainer>
    );
  }

  const previousModules = course.modules.filter(
    (item) => item.order < courseModule.order,
  );
  const canOpenModule = previousModules.every((item) => isModuleComplete(item.id));

  if (!canOpenModule) {
    return (
      <PageContainer>
        <section className="rounded-3xl border border-harbor/10 bg-white p-8 shadow-soft">
          <h1 className="text-3xl font-extrabold text-ink">
            Denne delen er ikke åpnet ennå
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate">
            Fullfør delen før, så blir denne tilgjengelig.
          </p>
          <div className="mt-7">
            <Button to={overviewTo}>Tilbake til deloversikt</Button>
          </div>
        </section>
      </PageContainer>
    );
  }

  const isComplete = isModuleComplete(courseModule.id);
  const courseModuleId = courseModule.id;
  const nextCourseModule = course.modules.find(
    (item) => item.order === courseModule.order + 1,
  );
  const BodyComponent = course.moduleComponents?.[courseModule.id];

  function handleComplete() {
    markModuleComplete(courseModuleId);

    if (nextCourseModule) {
      navigate(`${overviewTo}/${nextCourseModule.id}`);
      return;
    }

    setShowCompletion(true);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  return (
    <PageContainer className="space-y-7">
      <Link
        to={overviewTo}
        className="inline-flex w-fit items-center gap-2 rounded-2xl bg-mist px-4 py-2 text-sm font-bold text-harbor ring-1 ring-harbor/10 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-pine"
      >
        <span aria-hidden="true">←</span>
        Til deloversikt
      </Link>
      {!showCompletion ? (
        <ModuleProgressTranslatable
          courseModule={courseModule}
          allModules={course.modules}
          isModuleComplete={isModuleComplete}
          partLabel="Del"
          ofLabel="av"
        />
      ) : null}
      {showCompletion ? (
        <CompletionPanelTranslatable
          nextLabel={!nextCourseModule ? "Til hovedsiden" : undefined}
          nextTo={!nextCourseModule ? "/" : undefined}
          title={!nextCourseModule ? course.courseCompletedTitle : undefined}
          transitionText={course.transitionCopy[courseModule.id]}
          defaultTitle="Del fullført"
          stepText={course.completionStepText}
          backToOverviewLabel="Tilbake til deloversikt"
          overviewTo={overviewTo}
        />
      ) : BodyComponent ? (
        <BodyComponent
          courseModule={courseModule}
          isComplete={isComplete}
          onComplete={handleComplete}
        />
      ) : (
        <CourseModuleLayout
          courseModule={courseModule}
          isComplete={isComplete}
          onComplete={handleComplete}
          overviewTo={overviewTo}
          courseTitle={course.title}
        />
      )}
    </PageContainer>
  );
}

export function CourseModulePage() {
  const { courseSlug } = useParams();
  const course = getCourseBySlug(courseSlug);

  if (!course) {
    return <Navigate to="/" replace />;
  }

  return <CourseModuleContent course={course} />;
}
