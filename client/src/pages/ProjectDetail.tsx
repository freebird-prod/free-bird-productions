import { useRoute, Link } from "wouter";
import { ArrowLeft, Calendar, User, Download, ExternalLink, Play, FileText, Lightbulb, Palette, Camera, Grid, PenTool, Package, Type, Layout as LayoutIcon, Code, Music, Mic, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Layout } from "@/components/layout/Layout";
import { ImageGallery } from "@/components/shared/ImageGallery";
import { VideoPlayer } from "@/components/shared/VideoPlayer";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { storage } from "@/lib/storage";

const iconMap: Record<string, any> = {
  palette: Palette,
  lightbulb: Lightbulb,
  camera: Camera,
  grid: Grid,
  "pen-tool": PenTool,
  package: Package,
  type: Type,
  layout: LayoutIcon,
  code: Code,
  music: Music,
  mic: Mic,
  "volume-2": Volume2,
};

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:slug");
  const project = params?.slug ? storage.getProjectBySlug(params.slug) : null;

  if (!project) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/projects">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const relatedProjects = storage.getRelatedProjects(project.id);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen" data-testid="section-project-hero">
        <div className="absolute inset-0">
          <img
            src={project.featuredImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>

        {/* Back Button */}
        <div className="absolute top-24 left-4 sm:left-8 z-10">
          <Link href="/projects">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20"
              data-testid="button-back-to-projects"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-32 w-full">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/20">
              {project.category}
            </Badge>
            <h1 
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              data-testid="text-project-title"
            >
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              {project.overview}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-white/70">
              {project.client && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{project.client}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{project.year}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20 bg-background" data-testid="section-project-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Long Description */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {project.longDescription.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Video Section */}
              {project.videoUrl && (
                <div className="mt-12">
                  <h2 className="font-display text-2xl font-bold mb-6">Project Video</h2>
                  <VideoPlayer url={project.videoUrl} title={project.title} />
                </div>
              )}

              {/* Gallery Section */}
              {project.galleryImages.length > 0 && (
                <div className="mt-12">
                  <h2 className="font-display text-2xl font-bold mb-6">Gallery</h2>
                  <ImageGallery images={project.galleryImages} />
                </div>
              )}

              {/* Knowledge Points */}
              {project.knowledgePoints.length > 0 && (
                <div className="mt-16">
                  <h2 className="font-display text-2xl font-bold mb-6">Key Learnings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.knowledgePoints.map((point, index) => {
                      const IconComponent = iconMap[point.icon] || Lightbulb;
                      return (
                        <Card key={index} className="bg-card hover-elevate">
                          <CardHeader className="pb-3">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <IconComponent className="w-6 h-6 text-primary" />
                              </div>
                              <CardTitle className="text-lg">{point.title}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">{point.description}</p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Quick Facts */}
                <Card>
                  <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-medium">{project.category}</p>
                    </div>
                    {project.client && (
                      <div>
                        <p className="text-sm text-muted-foreground">Client</p>
                        <p className="font-medium">{project.client}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">Year</p>
                      <p className="font-medium">{project.year}</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground mb-3">Tools & Technologies</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tools.map((tool) => (
                          <Badge key={tool} variant="secondary">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Resources */}
                {project.resources.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {project.resources.map((resource, index) => (
                        <a
                          key={index}
                          href={resource.url}
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted hover-elevate transition-colors"
                        >
                          {resource.type === "video" && <Play className="w-4 h-4 text-primary" />}
                          {resource.type === "download" && <Download className="w-4 h-4 text-primary" />}
                          {resource.type === "document" && <FileText className="w-4 h-4 text-primary" />}
                          <span className="flex-1 text-sm font-medium">{resource.title}</span>
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </a>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* CTA */}
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">Want to learn more?</h3>
                    <p className="text-primary-foreground/80 text-sm mb-4">
                      Get access to exclusive project breakdowns and tutorials.
                    </p>
                    <Link href="/subscribers">
                      <Button variant="secondary" className="w-full">
                        Join Free
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 md:py-20 bg-card/50" data-testid="section-related-projects">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold mb-8">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
