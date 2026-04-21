"use client"

import { usePathname } from "next/navigation"

export function Breadcrumbs() {
    const pathname = usePathname()

    const getBreadcrumbs = () => {
        switch (pathname) {
            case "/":
                return { title: "Dashboard", crumbs: ["Home", "Overview"] }
            case "/projects":
                return { title: "Projects", crumbs: ["Home", "Projects"] }
            case "/settings":
                return { title: "Settings", crumbs: ["Home", "Settings"] }
            default:
                return { title: "Dashboard", crumbs: ["Home", "Overview"] }
        }
    }

    const { title, crumbs } = getBreadcrumbs()

    return (
        <div className="space-y-1">
            <p className="text-sm font-semibold">{title}</p>
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                {crumbs.map((crumb, index) => (
                    <span key={index}>
                        {index > 0 && <span>/</span>}
                        <span className={index === crumbs.length - 1 ? "font-semibold text-foreground" : ""}>
                            {crumb}
                        </span>
                    </span>
                ))}
            </nav>
        </div>
    )
}