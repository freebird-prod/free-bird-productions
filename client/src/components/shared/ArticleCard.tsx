import { Link } from "wouter";
import { Calendar, Clock, Lock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured" | "compact";
  className?: string;
}

export function ArticleCard({ article, variant = "default", className }: ArticleCardProps) {
  const categoryColors = {
    article: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    tutorial: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    tip: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  };

  if (variant === "featured") {
    return (
      <Link href={`/knowledge/${article.slug}`}>
        <div
          className={cn(
            "group relative overflow-hidden rounded-lg cursor-pointer",
            className
          )}
          data-testid={`card-article-featured-${article.id}`}
        >
          <div className="aspect-[21/9] md:aspect-[3/1] overflow-hidden">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <Badge className={cn("capitalize", categoryColors[article.category])}>
                {article.category}
              </Badge>
              {article.isPremium && (
                <Badge variant="secondary" className="bg-amber-500/20 text-amber-500 border-amber-500/20">
                  <Lock className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              )}
            </div>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-white mb-3">
              {article.title}
            </h2>
            <p className="text-white/80 text-sm md:text-base max-w-3xl line-clamp-2 mb-4">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-4 text-white/60 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {format(new Date(article.createdAt), "MMM d, yyyy")}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime} min read
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/knowledge/${article.slug}`}>
        <div
          className={cn(
            "group flex gap-4 cursor-pointer hover-elevate rounded-lg p-2 -m-2",
            className
          )}
          data-testid={`card-article-compact-${article.id}`}
        >
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {article.title}
            </h4>
            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              <span>{format(new Date(article.createdAt), "MMM d")}</span>
              <span>·</span>
              <span>{article.readTime} min</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/knowledge/${article.slug}`}>
      <div
        className={cn(
          "group bg-card border border-card-border rounded-lg overflow-hidden cursor-pointer hover-elevate",
          className
        )}
        data-testid={`card-article-${article.id}`}
      >
        <div className="aspect-video overflow-hidden relative">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {article.isPremium && (
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-amber-500/90 text-white border-0">
                <Lock className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className={cn("capitalize text-xs", categoryColors[article.category])}>
              {article.category}
            </Badge>
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {format(new Date(article.createdAt), "MMM d, yyyy")}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime} min
              </span>
            </div>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </Link>
  );
}
