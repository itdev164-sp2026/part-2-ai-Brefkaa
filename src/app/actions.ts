"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { projectSchema } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/server";

export async function createProject(data: unknown) {
  const supabase = await createClient()

  const parsed = projectSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues.map((issue) => issue.message).join(" ") || "Invalid project data",
    };
  }

  const { error } = await supabase.from("projects").insert(parsed.data);

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  revalidatePath("/projects")
  return {
    success: true,
  };
}

export async function signOut() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/", "layout")
  redirect("/login")
}
