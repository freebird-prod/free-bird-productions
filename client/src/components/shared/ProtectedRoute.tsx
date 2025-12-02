import { type ReactNode } from "react";
import { Redirect } from "wouter";
import { useAuth } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "user" | "subscriber" | "admin";
  requiredTier?: "starter" | "pro" | "enterprise";
}

export function ProtectedRoute({ 
  children, 
  requiredRole,
  requiredTier 
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4 w-full max-w-md px-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-8 w-2/3" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  // Check role requirements
  if (requiredRole && user) {
    const roleHierarchy = { user: 1, subscriber: 2, admin: 3 };
    const userLevel = roleHierarchy[user.role] || 0;
    const requiredLevel = roleHierarchy[requiredRole] || 0;

    if (userLevel < requiredLevel) {
      return <Redirect to="/subscribers" />;
    }
  }

  // Check subscription tier requirements
  if (requiredTier && user) {
    const tierHierarchy = { free: 0, starter: 1, pro: 2, enterprise: 3 };
    const userTier = tierHierarchy[user.subscriptionTier] || 0;
    const requiredTierLevel = tierHierarchy[requiredTier] || 0;

    if (userTier < requiredTierLevel) {
      return <Redirect to="/subscribers/upgrade" />;
    }
  }

  return <>{children}</>;
}

export function AdminRoute({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requiredRole="admin">
      {children}
    </ProtectedRoute>
  );
}
