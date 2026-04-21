import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumbs } from "@/components/breadcrumbs";
import "@/app/globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Developer Profile — Alex",
  description: "Web development student portfolio page built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <div className="flex min-h-screen bg-background text-foreground w-full">
              <AppSidebar />
              <SidebarInset className="flex min-h-screen flex-1 flex-col">
                <div className="border-b border-border bg-card/80 px-4 py-4 backdrop-blur-sm">
                  <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <SidebarTrigger className="rounded-md border border-border bg-background p-2 text-muted-foreground shadow-sm transition hover:bg-muted hover:text-foreground" />
                      <Breadcrumbs />
                    </div>
                    <ModeToggle />
                  </div>
                </div>
                <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
