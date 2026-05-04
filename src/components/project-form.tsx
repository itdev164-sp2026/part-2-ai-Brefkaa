"use client"

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { projectSchema, type Project } from "@/lib/schemas";
import { createProject } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/sonner";

const defaultValues: Project = {
  title: "",
  description: "",
  status: "active",
};

export function ProjectForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Project>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  const onSubmit = async (values: Project) => {
    const result = await createProject(values);

    if (result.success) {
      toast.success("Project created successfully");
      reset();
      return;
    }

    toast.error(result.error ?? "Unable to create project");
  };

  return (
    <div className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="space-y-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">Create a new project</h2>
          <p className="text-sm text-muted-foreground">
            Add a project with a title, description, and current status.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input id="title" placeholder="Project title" {...register("title")} />
          <FieldError>{errors.title?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            rows={5}
            placeholder="Describe the project in at least 10 characters"
            {...register("description")}
          />
          <FieldError>{errors.description?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="status">Status</FieldLabel>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError>{errors.status?.message}</FieldError>
        </Field>

        <Button type="submit" disabled={isSubmitting} className="w-fit">
          Create Project
        </Button>
      </form>

      <Toaster position="top-right" />
    </div>
  );
}
