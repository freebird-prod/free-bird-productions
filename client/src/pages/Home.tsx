import { Link } from "wouter";
import { ArrowRight, Play, Sparkles, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { storage } from "@/lib/storage";

export default function Home() {
  const featuredProjects = storage.getFeaturedProjects();
  const latestProject = featuredProjects[0];
  const otherFeatured = featuredProjects.slice(1, 3);

  return (
    <Layout>
      {/* Hero Section - Full Screen Featured Project */}
      <section 
        className="relative min-h-screen flex items-end"
        data-testid="section-hero"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={latestProject?.featuredImage || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop"}
            alt="Featured project"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-32 w-full">
          <div className="max-w-3xl">
            <p className="text-white/70 text-sm md:text-base mb-4 tracking-wide uppercase">
              Latest Project
            </p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {latestProject?.title || "Creative Storytelling"}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
              {latestProject?.overview || "Explore our latest creative work that pushes boundaries and tells compelling stories."}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={latestProject ? `/projects/${latestProject.slug}` : "/projects"}>
                <Button 
                  size="lg" 
                  className="h-14 px-8 rounded-full bg-white text-black hover:bg-white/90"
                  data-testid="button-hero-view-project"
                >
                  View Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="h-14 px-8 rounded-full border-white/30 text-white backdrop-blur-lg bg-white/10"
                data-testid="button-hero-showreel"
              >
                <Play className="mr-2 h-5 w-5" fill="currentColor" />
                Watch Showreel
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 md:py-32 bg-background" data-testid="section-intro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              What I Do
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              I craft visual stories that resonate. From cinematic films to stunning photography, 
              every project is an opportunity to explore new creative territories and share 
              the knowledge gained along the way.
            </p>
          </div>

          {/* Stats / Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card hover-elevate">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">Creative Projects</h3>
                <p className="text-muted-foreground">
                  Diverse portfolio spanning film, photography, design, and more.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card hover-elevate">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">Knowledge Hub</h3>
                <p className="text-muted-foreground">
                  In-depth tutorials, articles, and tips to elevate your craft.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card hover-elevate">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  Join a growing community of passionate creators.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 md:py-32 bg-card/50" data-testid="section-featured-projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
                Featured Work
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A selection of projects I'm particularly proud of.
              </p>
            </div>
            <Link href="/projects">
              <Button variant="outline" className="hidden md:flex" data-testid="button-view-all-projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Asymmetric Grid */}
          <div className="space-y-8">
            {/* Large Featured */}
            {latestProject && (
              <ProjectCard project={latestProject} variant="featured" />
            )}

            {/* Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherFeatured.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/projects">
              <Button variant="outline" data-testid="button-view-all-projects-mobile">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Knowledge Teaser */}
      <section className="py-24 md:py-32 bg-background" data-testid="section-knowledge-teaser">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-medium text-sm uppercase tracking-wide">
                Knowledge Hub
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
                Learn the Craft
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Every project teaches something new. I share these insights through detailed 
                tutorials, thoughtful articles, and quick tips that help you level up your 
                creative work.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/knowledge">
                  <Button data-testid="button-explore-knowledge">
                    Explore Knowledge Hub
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/knowledge?category=tutorial">
                  <Button variant="outline" data-testid="button-browse-tutorials">
                    Browse Tutorials
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                  alt="Learning creative skills"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Stats Card */}
              <Card className="absolute -bottom-6 -left-6 md:left-auto md:-right-6 bg-card border shadow-lg">
                <CardContent className="py-4 px-6">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="font-display text-2xl font-bold">50+</p>
                      <p className="text-sm text-muted-foreground">Tutorials</p>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div className="text-center">
                      <p className="font-display text-2xl font-bold">5k+</p>
                      <p className="text-sm text-muted-foreground">Students</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section 
        className="py-24 md:py-32 bg-primary/5"
        data-testid="section-newsletter"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Join the Creative Journey
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10">
              Get exclusive insights, early access to new projects, and creative inspiration 
              delivered straight to your inbox.
            </p>
            <div className="flex justify-center">
              <NewsletterForm variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-24 md:py-32 bg-background" data-testid="section-about-teaser">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-primary font-medium text-sm uppercase tracking-wide">
                About Me
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
                The Creative Behind Free Bird
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                I'm Alex Rivera, a multidisciplinary creative with a passion for visual 
                storytelling. What started as a hobby with a borrowed camera has evolved 
                into a full-fledged creative practice spanning film, photography, design, 
                and education.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                My mission is simple: create meaningful work and share everything I learn 
                along the way.
              </p>
              <Link href="/about">
                <Button variant="outline" data-testid="button-learn-more-about">
                  Learn More About Me
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-[4/5] rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=750&fit=crop&crop=face"
                  alt="Alex Rivera"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
