import { useState, useMemo } from "react";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Layout, PageHeader } from "@/components/layout/Layout";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { storage } from "@/lib/storage";
import { projectCategories } from "@/lib/mockData";
import { cn } from "@/lib/utils";

type SortOption = "newest" | "oldest" | "title";

export default function Projects() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("newest");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const { items: projects, total, totalPages } = useMemo(() => {
    let result = storage.getProjects({
      category: category !== "All" ? category : undefined,
      search: search || undefined,
      page,
      pageSize,
    });

    // Apply additional sorting
    if (sort === "oldest") {
      result.items = [...result.items].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (sort === "title") {
      result.items = [...result.items].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [search, category, sort, page]);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <Layout>
      <PageHeader
        title="Projects"
        description="Explore my creative work across film, photography, design, and more. Each project tells a unique story."
      />

      {/* Filters Section */}
      <section 
        className="sticky top-16 md:top-20 z-40 bg-background/95 backdrop-blur-lg border-b border-border py-4"
        data-testid="section-filters"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2" data-testid="filter-categories">
              {projectCategories.map((cat) => (
                <Badge
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer px-4 py-1.5 text-sm transition-colors",
                    category === cat 
                      ? "" 
                      : "hover:bg-muted"
                  )}
                  onClick={() => handleCategoryChange(cat)}
                  data-testid={`filter-category-${cat.toLowerCase()}`}
                >
                  {cat}
                </Badge>
              ))}
            </div>

            {/* Search and Sort */}
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
              <Select value={sort} onValueChange={(value) => setSort(value as SortOption)}>
                <SelectTrigger className="w-[140px]" data-testid="select-sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 md:py-16" data-testid="section-projects-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2" data-testid="pagination">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    data-testid="button-prev-page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <Button
                        key={pageNum}
                        variant={page === pageNum ? "default" : "ghost"}
                        size="icon"
                        onClick={() => setPage(pageNum)}
                        data-testid={`button-page-${pageNum}`}
                      >
                        {pageNum}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    data-testid="button-next-page"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <p className="text-center text-sm text-muted-foreground mt-4">
                Showing {projects.length} of {total} projects
              </p>
            </>
          ) : (
            <div className="text-center py-16">
              <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                data-testid="button-clear-filters"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
