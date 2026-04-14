import { Code, Layout, Server, Terminal, Database, Cloud } from "lucide-react";

const skills = [
    { name: "HTML & CSS", icon: Code },
    { name: "JavaScript", icon: Terminal },
    { name: "React & Next.js", icon: Layout },
    { name: "REST APIs", icon: Server },
    { name: "Database Design", icon: Database },
    { name: "Tailwind CSS", icon: Cloud },
];

export default function HomePage() {
    return (
        <div className="space-y-8">
            <section className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Developer Profile</h1>
                <p className="text-muted-foreground">
                    Hi, I&apos;m Alex, a web development student building modern web
                    experiences with Next.js, Tailwind, and AI-first workflows.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Skills</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {skills.map(({ name, icon: Icon }) => (
                        <div
                            key={name}
                            className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-sm transition hover:shadow-md"
                        >
                            <div className="grid h-10 w-10 place-items-center rounded-lg bg-muted">
                                <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <span className="font-medium">{name}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}