import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Clock, Send, CheckCircle, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Layout, PageHeader } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { storage } from "@/lib/storage";
import { insertContactMessageSchema, type InsertContactMessage } from "@/lib/schema";

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter", handle: "@freebirdprod" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram", handle: "@freebirdproductions" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube", handle: "Free Bird Productions" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", handle: "Alex Rivera" },
];

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: InsertContactMessage) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      storage.createContactMessage(data);
      setIsSubmitted(true);
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <PageHeader
        title="Get in Touch"
        description="Have a project in mind or just want to say hello? I'd love to hear from you."
      />

      <section className="py-12 md:py-16" data-testid="section-contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Form - 60% */}
            <div className="lg:col-span-3">
              {isSubmitted ? (
                <Card>
                  <CardContent className="py-16 text-center">
                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="font-display text-2xl font-bold mb-4">
                      Message Received!
                    </h2>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Thank you for reaching out. I typically respond within 24-48 hours.
                      In the meantime, feel free to explore my projects or knowledge hub.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsSubmitted(false);
                        form.reset();
                      }}
                      data-testid="button-send-another"
                    >
                      Send Another Message
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="pt-8 pb-8">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                        data-testid="form-contact"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Your name"
                                    className="h-12"
                                    data-testid="input-name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="h-12"
                                    data-testid="input-email"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="What's this about?"
                                  className="h-12"
                                  data-testid="input-subject"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell me about your project or just say hi..."
                                  className="min-h-[160px] resize-none"
                                  data-testid="input-message"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          size="lg"
                          className="w-full md:w-auto"
                          disabled={form.formState.isSubmitting}
                          data-testid="button-submit"
                        >
                          {form.formState.isSubmitting ? (
                            "Sending..."
                          ) : (
                            <>
                              <Send className="mr-2 h-5 w-5" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Contact Info - 40% */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Details */}
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a
                        href="mailto:hello@freebirdproductions.com"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        hello@freebirdproductions.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Location</h3>
                      <p className="text-muted-foreground">
                        Los Angeles, California
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Response Time</h3>
                      <p className="text-muted-foreground">
                        Usually within 24-48 hours
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Availability Status */}
              <Card className="bg-green-500/5 border-green-500/20">
                <CardContent className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <div>
                      <p className="font-medium text-green-700 dark:text-green-400">
                        Available for Projects
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Currently accepting new clients
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Connect on Social</h3>
                  <div className="space-y-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-3 rounded-lg hover-elevate transition-colors"
                        data-testid={`link-social-${social.label.toLowerCase()}`}
                      >
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <social.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{social.label}</p>
                          <p className="text-sm text-muted-foreground">{social.handle}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Quick FAQs</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium mb-1">Do you take on freelance work?</p>
                      <p className="text-muted-foreground">
                        Yes! I selectively take on projects that align with my creative vision.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">What's your typical project budget?</p>
                      <p className="text-muted-foreground">
                        Projects typically start at $5,000. Let's discuss your specific needs.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Do you offer workshops?</p>
                      <p className="text-muted-foreground">
                        Occasionally! Subscribe to stay updated on upcoming events.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
