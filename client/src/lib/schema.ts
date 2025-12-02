import { z } from "zod";

// User schema
export const userSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
    role: z.enum(["admin", "subscriber"]),
    subscriptionTier: z.enum(["free", "starter", "pro", "enterprise"]),
    avatar: z.string().url().optional(),
    createdAt: z.string(),
});

export const insertUserSchema = userSchema.omit({ id: true, createdAt: true });
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;
export type AuthResponse = { user: User; token: string };

// Project schema
export const projectSchema = z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    category: z.string(),
    client: z.string(),
    year: z.string(),
    overview: z.string(),
    longDescription: z.string(),
    tools: z.array(z.string()),
    featuredImage: z.string().url(),
    galleryImages: z.array(z.string().url()),
    videoUrl: z.string().url().optional(),
    knowledgePoints: z.array(
        z.object({
            title: z.string(),
            description: z.string(),
            icon: z.string(),
        })
    ),
    resources: z.array(
        z.object({
            title: z.string(),
            url: z.string(),
            type: z.string(),
        })
    ),
    relatedProjectIds: z.array(z.string()),
    isFeatured: z.boolean(),
    isPublished: z.boolean(),
    createdAt: z.string(),
});

export const insertProjectSchema = projectSchema.omit({ id: true, createdAt: true });
export type Project = z.infer<typeof projectSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;

// Article schema
export const articleSchema = z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    excerpt: z.string(),
    content: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    featuredImage: z.string().url(),
    readTime: z.number(),
    author: z.string(),
    isPublished: z.boolean(),
    isPremium: z.boolean(),
    createdAt: z.string(),
});

export const insertArticleSchema = articleSchema.omit({ id: true, createdAt: true });
export type Article = z.infer<typeof articleSchema>;
export type InsertArticle = z.infer<typeof insertArticleSchema>;

// Contact message schema
export const insertContactMessageSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    subject: z.string().min(5),
    message: z.string().min(10),
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

// Subscription tier schema
export const subscriptionTierSchema = z.object({
    id: z.enum(["free", "starter", "pro", "enterprise"]),
    name: z.string(),
    price: z.number(),
    features: z.array(z.string()),
    highlighted: z.boolean().optional(),
});

export type SubscriptionTier = z.infer<typeof subscriptionTierSchema>;
export type SubscriptionTierDetails = z.infer<typeof subscriptionTierSchema>;
