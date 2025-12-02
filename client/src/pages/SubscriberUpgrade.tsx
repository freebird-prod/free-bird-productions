import { Link } from "wouter";
import { Check, Crown, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/layout/Layout";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { subscriptionTiers } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import type { SubscriptionTier } from "@/lib/schema";

function UpgradePage() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();

  const handleUpgrade = async (tierId: SubscriptionTier) => {
    // Simulate payment processing
    toast({
      title: "Processing...",
      description: "Simulating payment processing...",
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    updateUser({ subscriptionTier: tierId, role: "subscriber" });

    toast({
      title: "Upgrade successful!",
      description: `You're now a ${tierId.charAt(0).toUpperCase() + tierId.slice(1)} member.`,
    });
  };

  const currentTierIndex = subscriptionTiers.findIndex(t => t.id === user?.subscriptionTier);

  return (
    <Layout>
      <div className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/subscribers">
              <Button variant="ghost" className="mb-4" data-testid="button-back">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Choose Your Plan</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Upgrade Your Experience
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get access to premium tutorials, exclusive resources, and personalized support.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subscriptionTiers.map((tier, index) => {
              const isCurrentPlan = tier.id === user?.subscriptionTier;
              const isDowngrade = index < currentTierIndex;

              return (
                <Card
                  key={tier.id}
                  className={cn(
                    "relative",
                    tier.highlighted && "border-primary shadow-lg"
                  )}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="flex items-center justify-center gap-2">
                      {tier.id !== "free" && <Crown className="w-5 h-5 text-amber-500" />}
                      {tier.name}
                    </CardTitle>
                    <CardDescription>
                      {tier.id === "free" && "Get started for free"}
                      {tier.id === "starter" && "For hobby creators"}
                      {tier.id === "pro" && "For serious creators"}
                      {tier.id === "enterprise" && "For teams & agencies"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="mb-6">
                      <span className="text-4xl font-bold">${tier.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>

                    <ul className="space-y-3 mb-6 text-left">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {isCurrentPlan ? (
                      <Button variant="outline" className="w-full" disabled>
                        Current Plan
                      </Button>
                    ) : isDowngrade ? (
                      <Button variant="outline" className="w-full" disabled>
                        Downgrade
                      </Button>
                    ) : (
                      <Button
                        className="w-full"
                        variant={tier.highlighted ? "default" : "outline"}
                        onClick={() => handleUpgrade(tier.id)}
                        data-testid={`button-select-${tier.id}`}
                      >
                        {tier.price === 0 ? "Get Started" : "Select Plan"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* FAQ Section */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
                <p className="text-muted-foreground">
                  Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards, PayPal, and bank transfers for enterprise plans.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is there a refund policy?</h3>
                <p className="text-muted-foreground">
                  We offer a 14-day money-back guarantee. If you're not satisfied, contact us for a full refund.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I upgrade or downgrade later?</h3>
                <p className="text-muted-foreground">
                  Absolutely! You can change your plan at any time. Upgrades take effect immediately, and downgrades at the next billing cycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default function SubscriberUpgrade() {
  return (
    <ProtectedRoute>
      <UpgradePage />
    </ProtectedRoute>
  );
}
