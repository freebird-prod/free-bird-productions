import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/schema";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  variant?: "default" | "featured" | "compact";
  className?: string;
}

export function ProjectCard({ project, variant = "default", className }: ProjectCardProps) {
  if (variant === "featured") {
    return (
      <Link href={`/projects/${project.slug}`}>
        <div
          className={cn(
            "group relative overflow-hidden rounded-lg cursor-pointer",
            className
          )}
          data-testid={`card-project-featured-${project.id}`}
        >
          <div className="aspect-[16/10] md:aspect-[21/9] overflow-hidden">
            <img
              src={project.featuredImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <Badge variant="secondary" className="mb-3 bg-white/20 text-white border-white/20 backdrop-blur-sm">
              {project.category}
            </Badge>
            <h3 className="font-display text-2xl md:text-4xl font-bold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-white/80 text-sm md:text-base max-w-2xl line-clamp-2">
              {project.overview}
            </p>
            <div className="mt-4 flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
              <span className="text-sm font-medium">View Project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/projects/${project.slug}`}>
        <div
          className={cn(
            "group flex gap-4 cursor-pointer hover-elevate rounded-lg p-2 -m-2",
            className
          )}
          data-testid={`card-project-compact-${project.id}`}
        >
          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={project.featuredImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex-1 min-w-0">
            <Badge variant="outline" className="mb-1 text-xs">
              {project.category}
            </Badge>
            <h4 className="font-semibold truncate group-hover:text-primary transition-colors">
              {project.title}
            </h4>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {project.overview}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/projects/${project.slug}`}>
      <div
        className={cn(
          "group relative overflow-hidden rounded-lg bg-card border border-card-border cursor-pointer hover-elevate",
          className
        )}
        data-testid={`card-project-${project.id}`}
      >
        <div className="aspect-video overflow-hidden">
          <img
            src={project.featuredImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="text-xs">
              {project.category}
            </Badge>
            <span className="text-xs text-muted-foreground">{project.year}</span>
          </div>
          <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {project.overview}
          </p>
          <div className="mt-4 flex flex-wrap gap-1">
            {project.tools.slice(0, 3).map((tool) => (
              <span
                key={tool}
                className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded"
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{project.tools.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
