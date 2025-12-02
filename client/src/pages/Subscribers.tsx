import { Link } from "wouter";
import { Crown, Download, Video, BookOpen, Star, ArrowRight, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Layout, PageHeader } from "@/components/layout/Layout";
import { ArticleCard } from "@/components/shared/ArticleCard";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { useAuth } from "@/lib/auth";
import { storage } from "@/lib/storage";
import { subscriptionTiers } from "@/lib/mockData";
import { cn } from "@/lib/utils";

function SubscriberDashboard() {
  const { user } = useAuth();
  const premiumArticles = storage.getAllArticles().filter(a => a.isPremium && a.isPublished);
  const featuredProjects = storage.getFeaturedProjects();
  
  const currentTier = subscriptionTiers.find(t => t.id === user?.subscriptionTier);
  const canAccessPremium = user && (user.role === "admin" || user.subscriptionTier !== "free");

  const tierColors = {
    free: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
    starter: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    pro: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    enterprise: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  };

  return (
    <Layout>
      <div className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="font-display text-3xl md:text-4xl font-bold">
                    Welcome back, {user?.name?.split(" ")[0]}!
                  </h1>
                  <Badge className={tierColors[user?.subscriptionTier || "free"]}>
                    <Crown className="w-3 h-3 mr-1" />
                    {currentTier?.name} Member
                  </Badge>
                </div>
                <p className="text-muted-foreground">
                  Access your exclusive content and manage your subscription.
                </p>
              </div>
              {user?.subscriptionTier === "free" && (
                <Link href="/subscribers/upgrade">
                  <Button data-testid="button-upgrade">
                    Upgrade Plan
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Video className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">Tutorials Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Download className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-sm text-muted-foreground">Resources Downloaded</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">24</p>
                    <p className="text-sm text-muted-foreground">Articles Read</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">Level 3</p>
                    <p className="text-sm text-muted-foreground">Community Rank</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Premium Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-amber-500" />
                    Premium Content
                  </CardTitle>
                  <CardDescription>
                    Exclusive tutorials and in-depth guides
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {canAccessPremium ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {premiumArticles.slice(0, 4).map((article) => (
                        <ArticleCard key={article.id} article={article} variant="compact" />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Unlock Premium Content</h3>
                      <p className="text-muted-foreground mb-4">
                        Upgrade your plan to access all premium tutorials and resources.
                      </p>
                      <Link href="/subscribers/upgrade">
                        <Button data-testid="button-unlock-premium">
                          View Plans
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Latest Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>Featured Project Breakdowns</CardTitle>
                  <CardDescription>
                    Deep dives into our latest creative work
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {featuredProjects.slice(0, 3).map((project) => (
                      <ProjectCard key={project.id} project={project} variant="compact" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Current Plan */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-lg">{currentTier?.name}</span>
                      <span className="text-2xl font-bold">
                        ${currentTier?.price}
                        <span className="text-sm font-normal text-muted-foreground">/mo</span>
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {currentTier?.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {user?.subscriptionTier !== "enterprise" && (
                      <Link href="/subscribers/upgrade">
                        <Button variant="outline" className="w-full">
                          Upgrade Plan
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Color Grading Course</span>
                        <span className="text-muted-foreground">75%</span>
                      </div>
                      <Progress value={75} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Sound Design Basics</span>
                        <span className="text-muted-foreground">40%</span>
                      </div>
                      <Progress value={40} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Animation Fundamentals</span>
                        <span className="text-muted-foreground">20%</span>
                      </div>
                      <Progress value={20} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Link href="/knowledge">
                      <Button variant="ghost" className="w-full justify-start">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Browse Knowledge Hub
                      </Button>
                    </Link>
                    <Link href="/projects">
                      <Button variant="ghost" className="w-full justify-start">
                        <Video className="mr-2 h-4 w-4" />
                        Explore Projects
                      </Button>
                    </Link>
                    <Link href="/subscribers/settings">
                      <Button variant="ghost" className="w-full justify-start">
                        <Star className="mr-2 h-4 w-4" />
                        Account Settings
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default function Subscribers() {
  return (
    <ProtectedRoute>
      <SubscriberDashboard />
    </ProtectedRoute>
  );
}
