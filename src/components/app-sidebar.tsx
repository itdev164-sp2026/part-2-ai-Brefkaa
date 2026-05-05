"use client"

import Link from "next/link"
import { FolderOpen, Home, Settings, LogOut } from "lucide-react"
import { signOut } from "@/app/actions"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarSeparator,
    useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

interface AppSidebarProps {
    user: any // Replace with proper User type from Supabase
}

export function AppSidebar({ user }: AppSidebarProps) {
    const { isMobile, setOpenMobile, setOpen } = useSidebar()

    const handleSignOut = async () => {
        await signOut()
    }

    return (
        <Sidebar className="border-r border-border bg-card/80 text-foreground shadow-sm">
            <SidebarHeader className="border-b border-border px-4 py-4">
                <div className="space-y-1">
                    <p className="text-sm font-semibold">Alex&apos;s Dashboard</p>
                    <p className="text-xs text-muted-foreground">
                        Quick access to your workspace.
                    </p>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-2 py-4">
                <SidebarMenu className="space-y-1">
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive>
                            <Link href="/" className="flex items-center gap-2" onClick={() => { if (isMobile) setOpenMobile(false); else setOpen(false); }}>
                                <Home className="h-4 w-4" />
                                <span>Overview</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/projects" className="flex items-center gap-2" onClick={() => { if (isMobile) setOpenMobile(false); else setOpen(false); }}>
                                <FolderOpen className="h-4 w-4" />
                                <span>Projects</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/settings" className="flex items-center gap-2" onClick={() => { if (isMobile) setOpenMobile(false); else setOpen(false); }}>
                                <Settings className="h-4 w-4" />
                                <span>Settings</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>

            <SidebarSeparator />

            <SidebarFooter className="px-4 py-4">
                {user && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSignOut}
                        className="w-full justify-start"
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                    </Button>
                )}
                <p className="text-sm text-muted-foreground">
                    Collapsible sidebar designed for profile and workflow content.
                </p>
            </SidebarFooter>
        </Sidebar>
    )
}
