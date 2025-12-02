import { Link } from "wouter";
import { ArrowRight, Mail, MapPin, Calendar, Award, Heart, Target, Twitter, Instagram, Youtube, Linkedin, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Layout } from "@/components/layout/Layout";
import { creatorSkills, journeyTimeline, socialLinks } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const socialIconMap: Record<string, any> = {
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  film: Film,
};

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24" data-testid="section-about-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Portrait */}
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/5] rounded-lg overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=750&fit=crop&crop=face"
                  alt="Alex Rivera"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPin className="w-4 h-4" />
                    <span>Los Angeles, California</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Intro Text */}
            <div className="order-1 lg:order-2">
              <p className="text-primary font-medium text-sm uppercase tracking-wide mb-4">
                Hello, I'm
              </p>
              <h1 
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                data-testid="text-name"
              >
                Alex Rivera
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
                Filmmaker, photographer, designer, and educator. I create visual 
                stories that resonate and share the journey with fellow creators.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" data-testid="button-get-in-touch">
                    Get in Touch
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button variant="outline" size="lg" data-testid="button-view-work">
                    View My Work
                  </Button>
                </Link>
              </div>

              {/* Social Links */}
              <div className="mt-8 flex items-center gap-4">
                {socialLinks.map((social) => {
                  const Icon = socialIconMap[social.icon] || Mail;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={social.name}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 md:py-24 bg-card/50" data-testid="section-mission">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-6">
            <Target className="w-4 h-4" />
            <span className="text-sm font-medium">My Mission</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">
            Create meaningful work. Share everything I learn.
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            I believe creativity thrives when knowledge is shared freely. Every project 
            teaches me something new, and I'm committed to documenting and sharing those 
            lessons with the creative community. Whether through in-depth tutorials, 
            thoughtful articles, or raw behind-the-scenes content, my goal is to help 
            fellow creators avoid the pitfalls I've encountered and accelerate their 
            own creative journeys.
          </p>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 md:py-24" data-testid="section-journey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-4">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">The Journey</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              A Decade of Creative Growth
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Center Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-12 md:space-y-0">
              {journeyTimeline.map((item, index) => (
                <div 
                  key={item.year}
                  className={cn(
                    "relative md:grid md:grid-cols-2 md:gap-8",
                    index !== journeyTimeline.length - 1 && "md:mb-12"
                  )}
                >
                  {/* Year Marker */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-primary-foreground items-center justify-center z-10 font-display font-bold">
                    {item.year.slice(-2)}
                  </div>

                  {/* Content - Alternating sides */}
                  <div 
                    className={cn(
                      "md:pr-16",
                      index % 2 === 0 ? "md:text-right" : "md:col-start-2 md:text-left md:pl-16 md:pr-0"
                    )}
                  >
                    <Card className="inline-block">
                      <CardContent className="py-6 max-w-md">
                        <div className="flex items-center gap-2 mb-2 md:hidden">
                          <Badge variant="secondary">{item.year}</Badge>
                        </div>
                        <h3 className="font-display text-xl font-semibold mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 md:py-24 bg-card/50" data-testid="section-skills">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-4">
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">Expertise</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Skills & Tools
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {creatorSkills.map((category) => (
              <Card key={category.category}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-4">{category.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24" data-testid="section-values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-4">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">Core Values</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              What Drives My Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card hover-elevate">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">Authenticity</h3>
                <p className="text-muted-foreground">
                  Creating work that's genuine and true to my vision, not chasing trends or algorithms.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card hover-elevate">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">Continuous Learning</h3>
                <p className="text-muted-foreground">
                  Embracing every project as an opportunity to grow and discover new techniques.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card hover-elevate">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">Community First</h3>
                <p className="text-muted-foreground">
                  Building connections and sharing knowledge to lift the entire creative community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary" data-testid="section-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Let's Create Something Together
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Whether you have a project in mind or just want to connect, I'd love to hear from you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button 
                variant="secondary" 
                size="lg"
                data-testid="button-contact"
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </Button>
            </Link>
            <Link href="/projects">
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                data-testid="button-explore-work"
              >
                Explore My Work
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
