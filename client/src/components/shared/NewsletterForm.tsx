import { useState } from "react";
import { ArrowRight, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { storage } from "@/lib/storage";
import { cn } from "@/lib/utils";

interface NewsletterFormProps {
  variant?: "default" | "hero" | "minimal";
  className?: string;
}

export function NewsletterForm({ variant = "default", className }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      const added = storage.addSubscriber(email);
      if (added) {
        setIsSubscribed(true);
        toast({
          title: "Welcome aboard!",
          description: "You've successfully subscribed to our newsletter.",
        });
      } else {
        toast({
          title: "Already subscribed",
          description: "This email is already in our newsletter.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className={cn("flex items-center gap-3 text-green-600 dark:text-green-400", className)}>
        <CheckCircle className="w-5 h-5" />
        <span className="font-medium">You're subscribed! Check your inbox.</span>
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <form onSubmit={handleSubmit} className={cn("w-full max-w-xl", className)} data-testid="form-newsletter-hero">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 pl-12 text-base rounded-full bg-background"
              required
              data-testid="input-newsletter-email"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="h-14 px-8 rounded-full"
            disabled={isSubmitting}
            data-testid="button-newsletter-submit"
          >
            {isSubmitting ? (
              "Subscribing..."
            ) : (
              <>
                Subscribe
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground text-center sm:text-left">
          Join 5,000+ creators. No spam, unsubscribe anytime.
        </p>
      </form>
    );
  }

  if (variant === "minimal") {
    return (
      <form onSubmit={handleSubmit} className={cn("flex gap-2", className)} data-testid="form-newsletter-minimal">
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          required
          data-testid="input-newsletter-email"
        />
        <Button type="submit" size="icon" disabled={isSubmitting} data-testid="button-newsletter-submit">
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)} data-testid="form-newsletter">
      <div className="space-y-2">
        <label htmlFor="newsletter-email" className="text-sm font-medium">
          Email Address
        </label>
        <Input
          id="newsletter-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          data-testid="input-newsletter-email"
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting} data-testid="button-newsletter-submit">
        {isSubmitting ? "Subscribing..." : "Subscribe to Newsletter"}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  );
}
