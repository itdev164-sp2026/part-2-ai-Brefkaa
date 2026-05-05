"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function signIn(data: { email: string; password: string }) {
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/", "layout")
    redirect("/")
}

export async function signUp(data: { email: string; password: string }) {
    const supabase = await createClient()

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        return { error: error.message }
    }

    return { success: true }
}