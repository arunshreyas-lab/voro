import { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lightbulb, Plus, Heart, MessageCircle, Send, Image as ImageIcon, Video, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePosts, type Post, type CreatePostData } from "@/hooks/usePosts";

const businessCategories = [
  "Retail & E-commerce",
  "Food & Beverage", 
  "Automotive",
  "Real Estate",
  "Healthcare",
  "Creative Services",
  "Technology",
  "Construction"
];

const Ideas = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [postType, setPostType] = useState<'post' | 'spark'>('post');
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { posts, loading, createPost, likePost } = usePosts();

  const handleComment = (postId: string) => {
    toast({
      description: "Comment feature coming soon!",
    });
  };

  const handleContact = (username: string) => {
    toast({
      description: `Contacting ${username}...`,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      toast({
        description: "Image selected successfully!",
      });
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedVideo(file);
      toast({
        description: "Video selected successfully!",
      });
    }
  };

  const resetForm = () => {
    setCaption('');
    setDescription('');
    setCategory('');
    setSelectedImage(null);
    setSelectedVideo(null);
    setPostType('post');
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!caption.trim()) {
      toast({
        variant: "destructive",
        description: "Please add a caption for your post.",
      });
      return;
    }

    if (!category) {
      toast({
        variant: "destructive",
        description: "Please select a category for your post.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const postData: CreatePostData = {
        type: postType,
        caption: caption.trim(),
        description: postType === 'post' ? description.trim() || undefined : undefined,
        category,
        // Create object URLs for the uploaded files to display them immediately
        image_url: postType === 'post' && selectedImage ? URL.createObjectURL(selectedImage) : undefined,
        video_url: postType === 'spark' && selectedVideo ? URL.createObjectURL(selectedVideo) : undefined,
      };

      const success = await createPost(postData);
      
      if (success) {
        setIsCreateModalOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        variant: "destructive",
        description: "Failed to create post. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const PostCard = ({ post }: { post: Post }) => (
    const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const target = e.target as HTMLVideoElement;
      target.style.display = 'none';
      const fallback = target.nextElementSibling as HTMLElement;
      if (fallback) fallback.style.display = 'flex';
    };

    return (
    <Card className="shadow-card border-border hover:shadow-glow transition-all duration-300 mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.user?.avatar} />
            <AvatarFallback>{post.user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-sm">{post.user?.username}</h4>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{formatTimestamp(post.created_at)}</span>
            </div>
            <div className="text-xs text-accent font-medium">{post.category}</div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-3"
            onClick={() => handleContact(post.user?.username || '')}
          >
            <Send size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <p className="font-medium">{post.caption}</p>
          {post.description && (
            <p className="text-sm text-muted-foreground">{post.description}</p>
          )}
          
          {post.type === 'post' && post.image_url && (
            <div className="rounded-lg overflow-hidden bg-muted">
              <img 
                src={post.image_url || '/placeholder.svg'} 
                alt="Post content" 
                className="w-full h-64 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                }}
              />
            </div>
          )}
          
          {post.type === 'spark' && (
            <div className="flex justify-center">
              <div className="relative w-64 h-96 rounded-lg overflow-hidden bg-muted">
                {post.video_url ? (
                  <video 
                    src={post.video_url} 
                    className="w-full h-full object-cover"
                    controls
                    onError={handleVideoError}
                  />
                ) : null}
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center" style={{ display: post.video_url ? 'none' : 'flex' }}>
                  <div className="text-center">
                    <Video size={48} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Voro Spark</p>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-4 pt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2 h-8 px-2 hover:text-red-500 transition-colors"
              onClick={() => likePost(post.id)}
            >
              <Heart size={16} />
              <span className="text-sm">{post.likes_count}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2 h-8 px-2"
              onClick={() => handleComment(post.id)}
            >
              <MessageCircle size={16} />
              <span className="text-sm">{post.comments_count}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
    );
  };

  const CreatePostModal = () => (
    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New {postType === 'post' ? 'Post' : 'Voro Spark'}</DialogTitle>
          <DialogDescription>
            Share your ideas with the community through {postType === 'post' ? 'a simple post with text and optional image' : 'a vertical video (Voro Spark)'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreatePost} className="space-y-4">
          <div className="flex gap-2">
            <Button
              type="button"
              variant={postType === 'post' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPostType('post')}
              className="gap-2"
            >
              <ImageIcon size={16} />
              Post
            </Button>
            <Button
              type="button"
              variant={postType === 'spark' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPostType('spark')}
              className="gap-2"
            >
              <Video size={16} />
              Voro Spark
            </Button>
          </div>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="caption">Caption</Label>
              <Input
                id="caption"
                placeholder="What's on your mind?"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {businessCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {postType === 'post' && (
              <>
                <div>
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Add more details about your idea..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label>Image (optional)</Label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={imageInputRef}
                    className="hidden"
                  />
                  <Button 
                    type="button"
                    variant="outline" 
                    className="w-full gap-2 h-24 flex-col"
                    onClick={() => imageInputRef.current?.click()}
                  >
                    <Upload size={24} />
                    <span>{selectedImage ? selectedImage.name : 'Click to upload image'}</span>
                  </Button>
                </div>
              </>
            )}
            
            {postType === 'spark' && (
              <div>
                <Label>Video (9:16 format)</Label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  ref={videoInputRef}
                  className="hidden"
                />
                <Button 
                  type="button"
                  variant="outline" 
                  className="w-full gap-2 h-32 flex-col"
                  onClick={() => videoInputRef.current?.click()}
                >
                  <Video size={32} />
                  <span>{selectedVideo ? selectedVideo.name : 'Upload vertical video'}</span>
                  <span className="text-xs text-muted-foreground">Recommended: 9:16 aspect ratio</span>
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button 
              type="button"
              variant="outline" 
              onClick={() => setIsCreateModalOpen(false)}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="gradient" 
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : `Share ${postType === 'post' ? 'Post' : 'Spark'}`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background pl-16">
        <Navbar />
        <main className="container mx-auto px-4 py-8 transition-all duration-300">
          <div className="max-w-2xl mx-auto">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading posts...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pl-16">
      <Navbar />
      <main className="container mx-auto px-4 py-8 transition-all duration-300">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 form-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-gradient-primary">
                <Lightbulb className="text-white" size={24} />
              </div>
              <h1 className="text-3xl font-bold">Ideas Feed</h1>
            </div>
            <p className="text-muted-foreground mb-6">
              Share your ideas and discover inspiration from others
            </p>
            <Button 
              variant="gradient" 
              size="lg" 
              className="gap-2"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus size={20} />
              Create
            </Button>
          </div>

          {/* Feed */}
          <div className="form-slide-up">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Empty State for new users */}
          {posts.length === 0 && !loading && (
            <div className="text-center mt-16 p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Lightbulb className="text-muted-foreground" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Share your first idea!</h3>
              <p className="text-muted-foreground mb-4">
                Create a post or Voro spark to get started
              </p>
            </div>
          )}
        </div>
      </main>
      <CreatePostModal />
    </div>
  );
};

export default Ideas;