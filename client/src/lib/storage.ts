import { mockProjects, mockArticles, mockUsers } from "./mockData";

const SUBSCRIBERS_KEY = "freebird_subscribers";
const MESSAGES_KEY = "freebird_messages";

interface PaginatedResult<T> {
    items: T[];
    total: number;
    totalPages: number;
    currentPage: number;
}

interface ProjectFilters {
    category?: string;
    search?: string;
    page?: number;
    pageSize?: number;
}

interface ArticleFilters {
    category?: string;
    search?: string;
    tag?: string;
    page?: number;
    pageSize?: number;
}

// Initialize subscribers from localStorage
const loadSubscribers = (): Map<string, { email: string; subscribedAt: string }> => {
    if (typeof window === "undefined") return new Map();

    const stored = localStorage.getItem(SUBSCRIBERS_KEY);
    if (stored) {
        try {
            const data = JSON.parse(stored);
            return new Map(Object.entries(data));
        } catch {
            return new Map();
        }
    }
    return new Map();
};

// Initialize messages from localStorage
const loadMessages = (): Map<string, any> => {
    if (typeof window === "undefined") return new Map();

    const stored = localStorage.getItem(MESSAGES_KEY);
    if (stored) {
        try {
            const data = JSON.parse(stored);
            return new Map(Object.entries(data));
        } catch {
            return new Map();
        }
    }
    return new Map();
};

// Save subscribers to localStorage
const saveSubscribers = (subscribers: Map<string, { email: string; subscribedAt: string }>) => {
    if (typeof window !== "undefined") {
        const data = Object.fromEntries(subscribers);
        localStorage.setItem(SUBSCRIBERS_KEY, JSON.stringify(data));
    }
};

// Save messages to localStorage
const saveMessages = (messages: Map<string, any>) => {
    if (typeof window !== "undefined") {
        const data = Object.fromEntries(messages);
        localStorage.setItem(MESSAGES_KEY, JSON.stringify(data));
    }
};

// Simple in-memory storage with localStorage persistence
export const storage = {
    // Newsletter subscribers (with localStorage persistence)
    subscribers: loadSubscribers(),
    addSubscriber: (email: string) => {
        if (!storage.subscribers.has(email)) {
            storage.subscribers.set(email, {
                email,
                subscribedAt: new Date().toISOString(),
            });
            saveSubscribers(storage.subscribers);
            return true;
        }
        return false;
    },
    subscribeToNewsletter: (data: { email: string }) => {
        return storage.addSubscriber(data.email);
    },
    getSubscribers: () =>
        Array.from(storage.subscribers.values()),

    // Contact messages (with localStorage persistence)
    messages: loadMessages(),
    addMessage: (message: any) => {
        const id = Date.now().toString();
        storage.messages.set(id, {
            ...message,
            id,
            timestamp: new Date().toISOString(),
        });
        saveMessages(storage.messages);
        return id;
    },
    createContactMessage: (message: any) => {
        return storage.addMessage(message);
    },
    getMessages: () =>
        Array.from(storage.messages.values()),

    // Projects
    getAllProjects: () => mockProjects,
    getFeaturedProjects: () =>
        mockProjects.filter((p) => p.isFeatured && p.isPublished),
    getProjectBySlug: (slug: string) =>
        mockProjects.find((p) => p.slug === slug),
    getProjectsByCategory: (category: string) =>
        mockProjects.filter((p) => p.category === category && p.isPublished),
    getRelatedProjects: (projectId: string) => {
        const project = mockProjects.find((p) => p.id === projectId);
        if (!project || !project.relatedProjectIds) return [];
        return project.relatedProjectIds
            .map((id) => mockProjects.find((p) => p.id === id))
            .filter((p) => p && p.isPublished) as typeof mockProjects;
    },
    getProjects: (filters?: ProjectFilters): PaginatedResult<typeof mockProjects[0]> => {
        const page = filters?.page || 1;
        const pageSize = filters?.pageSize || 6;

        let filtered = mockProjects.filter((p) => p.isPublished);

        // Filter by category
        if (filters?.category) {
            filtered = filtered.filter((p) => p.category === filters.category);
        }

        // Filter by search
        if (filters?.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(
                (p) =>
                    p.title.toLowerCase().includes(searchLower) ||
                    p.overview.toLowerCase().includes(searchLower)
            );
        }

        // Sort by newest first (default)
        filtered.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        const total = filtered.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIdx = (page - 1) * pageSize;
        const items = filtered.slice(startIdx, startIdx + pageSize);

        return { items, total, totalPages, currentPage: page };
    },

    // Articles
    getAllArticles: () => mockArticles,
    getPublicArticles: () =>
        mockArticles.filter((a) => a.isPublished && !a.isPremium),
    getPremiumArticles: () =>
        mockArticles.filter((a) => a.isPublished && a.isPremium),
    getArticleBySlug: (slug: string) =>
        mockArticles.find((a) => a.slug === slug),
    getArticlesByTag: (tag: string) =>
        mockArticles.filter((a) => a.isPublished && a.tags.includes(tag)),
    getFeaturedArticle: () => {
        // Return the most recent premium article or the first published article
        const featured = mockArticles.find((a) => a.isPublished && a.isPremium);
        return featured || mockArticles.find((a) => a.isPublished);
    },
    getRecentArticles: (limit: number = 5) => {
        return mockArticles
            .filter((a) => a.isPublished)
            .sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
            .slice(0, limit);
    },
    getArticles: (filters?: ArticleFilters): PaginatedResult<typeof mockArticles[0]> => {
        const page = filters?.page || 1;
        const pageSize = filters?.pageSize || 9;

        let filtered = mockArticles.filter((a) => a.isPublished);

        // Filter by category
        if (filters?.category && filters.category !== "all") {
            filtered = filtered.filter((a) => a.category === filters.category);
        }

        // Filter by tag
        if (filters?.tag) {
            filtered = filtered.filter((a) => a.tags.includes(filters.tag!));
        }

        // Filter by search
        if (filters?.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(
                (a) =>
                    a.title.toLowerCase().includes(searchLower) ||
                    a.excerpt.toLowerCase().includes(searchLower)
            );
        }

        // Sort by newest first (default)
        filtered.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        const total = filtered.length;
        const totalPages = Math.ceil(total / pageSize);
        const startIdx = (page - 1) * pageSize;
        const items = filtered.slice(startIdx, startIdx + pageSize);

        return { items, total, totalPages, currentPage: page };
    },

    // Users
    getAllUsers: () => mockUsers,
    getUserById: (id: string) =>
        mockUsers.find((u) => u.id === id),
    getUserByEmail: (email: string) =>
        mockUsers.find((u) => u.email === email),

    // Newsletter subscribers (simple in-memory storage)
    subscribers: new Map<string, { email: string; subscribedAt: string }>(),
    addSubscriber: (email: string) => {
        if (!storage.subscribers.has(email)) {
            storage.subscribers.set(email, {
                email,
                subscribedAt: new Date().toISOString(),
            });
            return true;
        }
        return false;
    },
    getSubscribers: () =>
        Array.from(storage.subscribers.values()),

    // Contact messages (simple in-memory storage)
    messages: new Map<string, any>(),
    addMessage: (message: any) => {
        const id = Date.now().toString();
        storage.messages.set(id, {
            ...message,
            id,
            timestamp: new Date().toISOString(),
        });
        return id;
    },
    getMessages: () =>
        Array.from(storage.messages.values()),
};
