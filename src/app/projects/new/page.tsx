import { ProjectForm } from "@/components/project-form";

export default function NewProjectPage() {
  return (
    <div className="w-full max-w-none px-0">
      <div className="space-y-8">
        <section className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">New Project</h1>
          <p className="text-muted-foreground">
            Use the form below to create a new project entry.
          </p>
        </section>

        <ProjectForm />
      </div>
    </div>
  );
}
