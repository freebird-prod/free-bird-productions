import { useState } from "react";
import { Link } from "wouter";
import { 
  LayoutDashboard, FolderOpen, BookOpen, Users, Mail, 
  Plus, Eye, Pencil, Trash2, MoreHorizontal, Search,
  TrendingUp, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Layout } from "@/components/layout/Layout";
import { AdminRoute } from "@/components/shared/ProtectedRoute";
import { useAuth, getAllUsers } from "@/lib/auth";
import { storage } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

function AdminDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{ type: string; id: string; title: string } | null>(null);

  const stats = storage.getStats();
  const projects = storage.getAllProjects();
  const articles = storage.getAllArticles();
  const messages = storage.getContactMessages();
  const users = getAllUsers();

  const handleDelete = (type: string, id: string) => {
    if (type === "project") {
      storage.deleteProject(id);
    } else if (type === "article") {
      storage.deleteArticle(id);
    }
    setDeleteDialog(null);
    toast({
      title: "Deleted",
      description: `The ${type} has been deleted.`,
    });
  };

  const handleMarkAsRead = (id: string) => {
    storage.markMessageAsRead(id);
    toast({
      title: "Marked as read",
      description: "Message has been marked as read.",
    });
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArticles = articles.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage your content, subscribers, and settings.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/admin/project/new">
                <Button data-testid="button-new-project">
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </Link>
              <Link href="/admin/article/new">
                <Button variant="outline" data-testid="button-new-article">
                  <Plus className="mr-2 h-4 w-4" />
                  New Article
                </Button>
              </Link>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="overview" data-testid="tab-overview">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="projects" data-testid="tab-projects">
                <FolderOpen className="w-4 h-4 mr-2" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="articles" data-testid="tab-articles">
                <BookOpen className="w-4 h-4 mr-2" />
                Articles
              </TabsTrigger>
              <TabsTrigger value="users" data-testid="tab-users">
                <Users className="w-4 h-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger value="messages" data-testid="tab-messages">
                <Mail className="w-4 h-4 mr-2" />
                Messages
                {stats.unreadMessages > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {stats.unreadMessages}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                    <FolderOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalProjects}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.publishedProjects} published
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalArticles}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.publishedArticles} published
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.activeSubscribers}</div>
                    <div className="flex items-center text-xs text-green-600">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +12% this month
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Messages</CardTitle>
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalMessages}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.unreadMessages} unread
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {projects.slice(0, 5).map((project) => (
                        <div key={project.id} className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={project.featuredImage}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{project.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(project.createdAt), "MMM d, yyyy")}
                            </p>
                          </div>
                          <Badge variant={project.isPublished ? "default" : "secondary"}>
                            {project.isPublished ? "Published" : "Draft"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {messages.length > 0 ? (
                      <div className="space-y-4">
                        {messages.slice(0, 5).map((message) => (
                          <div 
                            key={message.id} 
                            className={cn(
                              "p-3 rounded-lg",
                              message.isRead ? "bg-muted/50" : "bg-primary/5 border border-primary/20"
                            )}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium">{message.name}</p>
                              <span className="text-xs text-muted-foreground">
                                {format(new Date(message.createdAt), "MMM d")}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {message.subject}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        No messages yet
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Manage Projects</CardTitle>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProjects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded overflow-hidden">
                                <img
                                  src={project.featuredImage}
                                  alt={project.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="font-medium">{project.title}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{project.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={project.isPublished ? "default" : "secondary"}>
                              {project.isPublished ? "Published" : "Draft"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {project.isFeatured ? (
                              <Badge className="bg-amber-500/20 text-amber-600">Featured</Badge>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {format(new Date(project.createdAt), "MMM d, yyyy")}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/projects/${project.slug}`}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/admin/project/${project.id}`}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => setDeleteDialog({ 
                                    type: "project", 
                                    id: project.id, 
                                    title: project.title 
                                  })}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Articles Tab */}
            <TabsContent value="articles">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Manage Articles</CardTitle>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Premium</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredArticles.map((article) => (
                        <TableRow key={article.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded overflow-hidden">
                                <img
                                  src={article.featuredImage}
                                  alt={article.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="font-medium line-clamp-1">{article.title}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">{article.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={article.isPublished ? "default" : "secondary"}>
                              {article.isPublished ? "Published" : "Draft"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {article.isPremium ? (
                              <Badge className="bg-amber-500/20 text-amber-600">Premium</Badge>
                            ) : (
                              <span className="text-muted-foreground">Free</span>
                            )}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {format(new Date(article.createdAt), "MMM d, yyyy")}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/knowledge/${article.slug}`}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/admin/article/${article.id}`}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => setDeleteDialog({ 
                                    type: "article", 
                                    id: article.id, 
                                    title: article.title 
                                  })}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Users</CardTitle>
                  <CardDescription>View and manage subscriber accounts.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Subscription</TableHead>
                        <TableHead>Joined</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((u) => (
                        <TableRow key={u.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={u.avatar} alt={u.name} />
                                <AvatarFallback>{u.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{u.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{u.email}</TableCell>
                          <TableCell>
                            <Badge variant={u.role === "admin" ? "default" : "outline"} className="capitalize">
                              {u.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="capitalize">
                              {u.subscriptionTier}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {format(new Date(u.createdAt), "MMM d, yyyy")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Messages</CardTitle>
                  <CardDescription>View and respond to messages from visitors.</CardDescription>
                </CardHeader>
                <CardContent>
                  {messages.length > 0 ? (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <Card 
                          key={message.id}
                          className={cn(
                            !message.isRead && "border-primary/50"
                          )}
                        >
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold">{message.name}</h4>
                                  {!message.isRead && (
                                    <Badge variant="secondary" className="text-xs">New</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{message.email}</p>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {format(new Date(message.createdAt), "MMM d, yyyy 'at' h:mm a")}
                              </span>
                            </div>
                            <h5 className="font-medium mb-2">{message.subject}</h5>
                            <p className="text-muted-foreground whitespace-pre-wrap">{message.message}</p>
                            <div className="mt-4 flex gap-2">
                              <Button size="sm">Reply</Button>
                              {!message.isRead && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleMarkAsRead(message.id)}
                                >
                                  Mark as Read
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">No messages yet</h3>
                      <p className="text-muted-foreground">
                        Messages from your contact form will appear here.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Delete Confirmation Dialog */}
          <Dialog open={!!deleteDialog} onOpenChange={() => setDeleteDialog(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  This will permanently delete "{deleteDialog?.title}". This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteDialog(null)}>
                  Cancel
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => deleteDialog && handleDelete(deleteDialog.type, deleteDialog.id)}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
}

export default function Admin() {
  return (
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  );
}
