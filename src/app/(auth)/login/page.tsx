"use client"

import { useState } from "react"
import { signIn, signUp } from "./actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

const signInSchema = z.object({
    email: z.email({ error: "Invalid email" }),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

const signUpSchema = z.object({
    email: z.email({ error: "Invalid email" }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

type SignInForm = z.infer<typeof signInSchema>
type SignUpForm = z.infer<typeof signUpSchema>

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)

    const signInForm = useForm<SignInForm>({
        resolver: zodResolver(signInSchema),
    })

    const signUpForm = useForm<SignUpForm>({
        resolver: zodResolver(signUpSchema),
    })

    const onSignIn = async (data: SignInForm) => {
        setIsLoading(true)
        try {
            const result = await signIn(data)
            if (result?.error) {
                toast.error(result.error)
            } else {
                toast.success("Signed in successfully!")
                window.location.href = "/"
            }
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    const onSignUp = async (data: SignUpForm) => {
        setIsLoading(true)
        try {
            const result = await signUp(data)
            if (result?.error) {
                toast.error(result.error)
            } else {
                toast.success("Account created successfully! Please check your email to confirm.")
            }
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle>Welcome</CardTitle>
                    <CardDescription>
                        Sign in to your account or create a new one
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="signin" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="signin">Sign In</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>
                        <TabsContent value="signin">
                            <form onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="signin-email">Email</Label>
                                    <Input
                                        id="signin-email"
                                        type="email"
                                        placeholder="Enter your email"
                                        {...signInForm.register("email")}
                                    />
                                    {signInForm.formState.errors.email && (
                                        <p className="text-sm text-red-500">{signInForm.formState.errors.email.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signin-password">Password</Label>
                                    <Input
                                        id="signin-password"
                                        type="password"
                                        placeholder="Enter your password"
                                        {...signInForm.register("password")}
                                    />
                                    {signInForm.formState.errors.password && (
                                        <p className="text-sm text-red-500">{signInForm.formState.errors.password.message}</p>
                                    )}
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "Signing in..." : "Sign In"}
                                </Button>
                            </form>
                        </TabsContent>
                        <TabsContent value="signup">
                            <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="signup-email">Email</Label>
                                    <Input
                                        id="signup-email"
                                        type="email"
                                        placeholder="Enter your email"
                                        {...signUpForm.register("email")}
                                    />
                                    {signUpForm.formState.errors.email && (
                                        <p className="text-sm text-red-500">{signUpForm.formState.errors.email.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-password">Password</Label>
                                    <Input
                                        id="signup-password"
                                        type="password"
                                        placeholder="Enter your password"
                                        {...signUpForm.register("password")}
                                    />
                                    {signUpForm.formState.errors.password && (
                                        <p className="text-sm text-red-500">{signUpForm.formState.errors.password.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                                    <Input
                                        id="signup-confirm-password"
                                        type="password"
                                        placeholder="Confirm your password"
                                        {...signUpForm.register("confirmPassword")}
                                    />
                                    {signUpForm.formState.errors.confirmPassword && (
                                        <p className="text-sm text-red-500">{signUpForm.formState.errors.confirmPassword.message}</p>
                                    )}
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "Signing up..." : "Sign Up"}
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}