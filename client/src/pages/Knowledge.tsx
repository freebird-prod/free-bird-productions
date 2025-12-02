import { useState, useMemo } from "react";
import { Search, Filter, ChevronLeft, ChevronRight, BookOpen, Video, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout, PageHeader } from "@/components/layout/Layout";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { storage } from "@/lib/storage";
import { articleTags } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import type { Article } from "@/lib/schema";

type CategoryFilter = "all" | "article" | "tutorial" | "tip";

export default function Knowledge() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 9;

  const featuredArticle = storage.getFeaturedArticle();
  const recentArticles = storage.getRecentArticles(5);

  const { items: articles, total, totalPages } = useMemo(() => {
    return storage.getArticles({
      category: category !== "all" ? category : undefined,
      search: search || undefined,
      tag: selectedTag || undefined,
      page,
      pageSize,
    });
  }, [search, category, selectedTag, page]);

  const handleCategoryChange = (newCategory: CategoryFilter) => {
    setCategory(newCategory);
    setPage(1);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const getCategoryIcon = (cat: Article["category"]) => {
    switch (cat) {
      case "article":
        return <BookOpen className="w-4 h-4" />;
      case "tutorial":
        return <Video className="w-4 h-4" />;
      case "tip":
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  return (
    <Layout>
      <PageHeader
        title="Knowledge Hub"
        description="Tutorials, articles, and tips to help you level up your creative skills. Learn from real project experiences."
      />

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-8" data-testid="section-featured-article">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ArticleCard article={featuredArticle} variant="featured" />
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12 md:py-16" data-testid="section-knowledge-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Tabs
                  value={category}
                  onValueChange={(v) => handleCategoryChange(v as CategoryFilter)}
                  className="w-full sm:w-auto"
                >
                  <TabsList className="grid grid-cols-4 w-full sm:w-auto">
                    <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
                    <TabsTrigger value="article" data-testid="tab-articles">
                      <BookOpen className="w-4 h-4 mr-2 hidden sm:inline" />
                      Articles
                    </TabsTrigger>
                    <TabsTrigger value="tutorial" data-testid="tab-tutorials">
                      <Video className="w-4 h-4 mr-2 hidden sm:inline" />
                      Tutorials
                    </TabsTrigger>
                    <TabsTrigger value="tip" data-testid="tab-tips">
                      <Lightbulb className="w-4 h-4 mr-2 hidden sm:inline" />
                      Tips
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="relative flex-1 sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search articles..."
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10"
                    data-testid="input-search-articles"
                  />
                </div>
              </div>

              {/* Active Filters */}
              {selectedTag && (
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-sm text-muted-foreground">Filtered by:</span>
                  <Badge variant="secondary" className="gap-1">
                    {selectedTag}
                    <button
                      onClick={() => setSelectedTag(null)}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                </div>
              )}

              {/* Articles Grid */}
              {articles.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {articles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
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
                    Showing {articles.length} of {total} articles
                  </p>
                </>
              ) : (
                <div className="text-center py-16">
                  <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filters.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearch("");
                      setCategory("all");
                      setSelectedTag(null);
                    }}
                    data-testid="button-clear-filters"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Categories Stats */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Content Types</h3>
                  <div className="space-y-3">
                    {[
                      { type: "article" as const, label: "Articles", icon: BookOpen },
                      { type: "tutorial" as const, label: "Tutorials", icon: Video },
                      { type: "tip" as const, label: "Quick Tips", icon: Lightbulb },
                    ].map(({ type, label, icon: Icon }) => {
                      const count = storage.getAllArticles().filter((a) => a.category === type && a.isPublished).length;
                      return (
                        <button
                          key={type}
                          onClick={() => handleCategoryChange(type)}
                          className={cn(
                            "flex items-center gap-3 w-full p-3 rounded-lg transition-colors hover-elevate",
                            category === type ? "bg-muted" : ""
                          )}
                        >
                          <Icon className="w-5 h-5 text-primary" />
                          <span className="flex-1 text-left">{label}</span>
                          <Badge variant="secondary">{count}</Badge>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Popular Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {articleTags.slice(0, 12).map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTag === tag ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Recent Posts</h3>
                  <div className="space-y-4">
                    {recentArticles.slice(0, 4).map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        variant="compact"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter CTA */}
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">Stay Updated</h3>
                  <p className="text-primary-foreground/80 text-sm mb-4">
                    Get the latest tutorials and tips delivered to your inbox.
                  </p>
                  <NewsletterForm variant="minimal" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
