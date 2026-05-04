import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Project {
    id: string;
    title: string;
    description: string;
    status: "active" | "completed" | "archived";
}

export default async function ProjectsPage() {
    const { data: projects } = await supabase.from("projects").select("*");

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-500 text-white";
            case "completed":
                return "bg-blue-500 text-white";
            case "archived":
                return "bg-gray-500 text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };

    return (
        <div className="w-full max-w-none px-0">
            <div className="space-y-8">
                <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                        <p className="text-muted-foreground">
                            A showcase of my development projects and achievements.
                        </p>
                    </div>
                    <Link href="/projects/new">
                        <Button variant="secondary">New Project</Button>
                    </Link>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">All Projects</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {projects?.map((project: Project) => (
                            <Card key={project.id} className="shadow-sm transition hover:shadow-md">
                                <CardHeader>
                                    <div className="grid grid-cols-[1fr_auto] items-start gap-2">
                                        <CardTitle className="text-lg">{project.title}</CardTitle>
                                        <Badge className={getStatusColor(project.status)}>
                                            {project.status}
                                        </Badge>
                                    </div>
                                    <CardDescription>{project.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}