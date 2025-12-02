import { Link } from "wouter";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

export default function NotFound() {
  return (
    <Layout showFooter={false}>
      <div className="min-h-screen flex items-center justify-center py-24 px-4">
        <div className="text-center max-w-md">
          <h1 className="font-display text-8xl md:text-9xl font-bold text-muted-foreground/30 mb-4">
            404
          </h1>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Page Not Found
          </h2>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button data-testid="button-go-home">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              data-testid="button-go-back"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
