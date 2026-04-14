export default function ProjectsPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Projects</h1>
            <p className="text-lg text-muted-foreground mb-8">
                This page is under construction. Check back soon for updates on my latest projects!
            </p>
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <span className="text-2xl">🚧</span>
            </div>
        </div>
    );
}