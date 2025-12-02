import { useRoute, Link } from "wouter";
import { ArrowLeft, Calendar, Clock, User, Lock, Tag, Share2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Layout } from "@/components/layout/Layout";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { storage } from "@/lib/storage";
import { useAuth } from "@/lib/auth";
import { format } from "date-fns";

export default function ArticleDetail() {
  const [, params] = useRoute("/knowledge/:slug");
  const article = params?.slug ? storage.getArticleBySlug(params.slug) : null;
  const { isAuthenticated, user } = useAuth();

  if (!article) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/knowledge">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Knowledge Hub
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Check if user can access premium content
  const canAccessPremium = isAuthenticated && user && 
    (user.role === "admin" || user.subscriptionTier !== "free");
  const isPremiumLocked = article.isPremium && !canAccessPremium;

  const recentArticles = storage.getRecentArticles(5).filter(a => a.id !== article.id);

  const categoryColors = {
    article: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    tutorial: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    tip: "bg-green-500/10 text-green-600 dark:text-green-400",
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative" data-testid="section-article-hero">
        <div className="h-[50vh] min-h-[400px] relative">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Back Button */}
        <div className="absolute top-24 left-4 sm:left-8 z-10">
          <Link href="/knowledge">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20"
              data-testid="button-back"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Knowledge Hub
            </Button>
          </Link>
        </div>

        {/* Article Meta */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className={categoryColors[article.category]}>
                {article.category}
              </Badge>
              {article.isPremium && (
                <Badge variant="secondary" className="bg-amber-500/20 text-amber-500">
                  <Lock className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              )}
            </div>
            <h1 
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
              data-testid="text-article-title"
            >
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(article.createdAt), "MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16" data-testid="section-article-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Article Content */}
            <article className="lg:col-span-3">
              {isPremiumLocked ? (
                <div className="relative">
                  {/* Preview Content */}
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Premium Lock Overlay */}
                  <div className="mt-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background pointer-events-none h-32" style={{ marginTop: "-8rem" }} />
                    <Card className="bg-card border-2 border-primary/20">
                      <CardContent className="py-12 text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                          <Lock className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="font-display text-2xl font-bold mb-3">
                          Premium Content
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                          This in-depth {article.category} is available exclusively for subscribers. 
                          Unlock access to all premium content and resources.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          {isAuthenticated ? (
                            <Link href="/subscribers/upgrade">
                              <Button size="lg" data-testid="button-upgrade">
                                Upgrade Your Plan
                              </Button>
                            </Link>
                          ) : (
                            <>
                              <Link href="/register">
                                <Button size="lg" data-testid="button-get-started">
                                  Get Started Free
                                </Button>
                              </Link>
                              <Link href="/login">
                                <Button variant="outline" size="lg" data-testid="button-login">
                                  Sign In
                                </Button>
                              </Link>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <>
                  {/* Full Article Content */}
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {article.content.split("\n\n").map((paragraph, index) => {
                      if (paragraph.startsWith("## ")) {
                        return (
                          <h2 key={index} className="font-display">
                            {paragraph.replace("## ", "")}
                          </h2>
                        );
                      }
                      if (paragraph.startsWith("### ")) {
                        return (
                          <h3 key={index} className="font-display">
                            {paragraph.replace("### ", "")}
                          </h3>
                        );
                      }
                      if (paragraph.startsWith("- ")) {
                        const items = paragraph.split("\n").map(item => item.replace("- ", ""));
                        return (
                          <ul key={index}>
                            {items.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        );
                      }
                      if (paragraph.match(/^\d\. /)) {
                        const items = paragraph.split("\n").map(item => item.replace(/^\d\. /, ""));
                        return (
                          <ol key={index}>
                            {items.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ol>
                        );
                      }
                      return <p key={index}>{paragraph}</p>;
                    })}
                  </div>

                  {/* Tags */}
                  {article.tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-border">
                      <div className="flex flex-wrap items-center gap-2">
                        <Tag className="w-4 h-4 text-muted-foreground" />
                        {article.tags.map((tag) => (
                          <Link key={tag} href={`/knowledge?tag=${encodeURIComponent(tag)}`}>
                            <Badge variant="outline" className="cursor-pointer">
                              {tag}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Author Card */}
                  <Card className="mt-12">
                    <CardContent className="py-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                          <AvatarFallback>AR</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">Written by</p>
                          <h4 className="font-semibold text-lg">{article.author}</h4>
                          <p className="text-muted-foreground mt-1">
                            Multidisciplinary creative with a passion for visual storytelling and education.
                          </p>
                          <Link href="/about">
                            <Button variant="link" className="px-0 mt-2">
                              Learn more about me
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8">
              {/* Share */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share Article
                  </h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(window.location.href)}
                    >
                      Copy Link
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* More Articles */}
              {recentArticles.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      More to Read
                    </h3>
                    <div className="space-y-4">
                      {recentArticles.slice(0, 3).map((a) => (
                        <ArticleCard key={a.id} article={a} variant="compact" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Newsletter */}
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">Enjoy this content?</h3>
                  <p className="text-primary-foreground/80 text-sm mb-4">
                    Subscribe to get new articles delivered to your inbox.
                  </p>
                  <NewsletterForm variant="minimal" />
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
