import { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lightbulb, Plus, Heart, MessageCircle, Send, Image as ImageIcon, Video, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Post = {
  id: number;
  type: 'post' | 'spark';
  user: { name: string; avatar: string; username: string };
  caption: string;
  description?: string;
  image?: string;
  videoUrl?: string;
  likes: number;
  comments: number;
  timestamp: string;
};

const mockPosts: Post[] = [
  {
    id: 1,
    type: 'post',
    user: { name: 'Alex Chen', avatar: '/placeholder.svg', username: '@alexchen' },
    caption: 'Just launched my new app idea! 🚀',
    description: 'After months of development, finally ready to share this productivity app with the world. What do you think?',
    image: '/placeholder.svg',
    likes: 24,
    comments: 8,
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    type: 'spark',
    user: { name: 'Sarah Kim', avatar: '/placeholder.svg', username: '@sarahkim' },
    caption: 'Quick design tip! ✨',
    videoUrl: '/placeholder.svg',
    likes: 156,
    comments: 32,
    timestamp: '4 hours ago'
  },
  {
    id: 3,
    type: 'post',
    user: { name: 'Mike Johnson', avatar: '/placeholder.svg', username: '@mikej' },
    caption: 'Brainstorming session results',
    description: 'Had an amazing brainstorming session today. Here are the top 3 ideas we came up with for our next project.',
    likes: 45,
    comments: 12,
    timestamp: '6 hours ago'
  }
];

const Ideas = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [postType, setPostType] = useState<'post' | 'spark'>('post');
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleLike = (postId: number) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
    toast({
      description: "Post liked!",
    });
  };

  const handleComment = (postId: number) => {
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

  const handleCreatePost = () => {
    if (!caption.trim()) {
      toast({
        variant: "destructive",
        description: "Please add a caption for your post.",
      });
      return;
    }

    const newPost: Post = {
      id: posts.length + 1,
      type: postType,
      user: { name: 'You', avatar: '/placeholder.svg', username: '@you' },
      caption,
      description: postType === 'post' ? description : undefined,
      image: postType === 'post' && selectedImage ? URL.createObjectURL(selectedImage) : undefined,
      videoUrl: postType === 'spark' && selectedVideo ? URL.createObjectURL(selectedVideo) : undefined,
      likes: 0,
      comments: 0,
      timestamp: 'now'
    };

    setPosts(prev => [newPost, ...prev]);
    setIsCreateModalOpen(false);
    setCaption('');
    setDescription('');
    setSelectedImage(null);
    setSelectedVideo(null);
    
    toast({
      description: `${postType === 'post' ? 'Post' : 'Voro Spark'} created successfully!`,
    });
  };

  const PostCard = ({ post }: { post: Post }) => (
    <Card className="shadow-card border-border hover:shadow-glow transition-all duration-300 mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.user.avatar} />
            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-sm">{post.user.name}</h4>
              <span className="text-xs text-muted-foreground">{post.user.username}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{post.timestamp}</span>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-3"
            onClick={() => handleContact(post.user.username)}
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
          
          {post.type === 'post' && post.image && (
            <div className="rounded-lg overflow-hidden bg-muted">
              <img 
                src={post.image} 
                alt="Post content" 
                className="w-full h-64 object-cover"
              />
            </div>
          )}
          
          {post.type === 'spark' && (
            <div className="flex justify-center">
              <div className="relative w-64 h-96 rounded-lg overflow-hidden bg-muted">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <Video size={48} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Voro Spark</p>
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
              onClick={() => handleLike(post.id)}
            >
              <Heart size={16} />
              <span className="text-sm">{post.likes}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2 h-8 px-2"
              onClick={() => handleComment(post.id)}
            >
              <MessageCircle size={16} />
              <span className="text-sm">{post.comments}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CreatePostModal = () => (
    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New {postType === 'post' ? 'Post' : 'Voro Spark'}</DialogTitle>
          <DialogDescription>
            Share your ideas with the community through {postType === 'post' ? 'a simple post with text and optional image' : 'a vertical video (Voro Spark)'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={postType === 'post' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPostType('post')}
              className="gap-2"
            >
              <ImageIcon size={16} />
              Post
            </Button>
            <Button
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
              />
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
                    variant="outline" 
                    className="w-full gap-2 h-24 flex-col"
                    onClick={() => imageInputRef.current?.click()}
                    type="button"
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
                  variant="outline" 
                  className="w-full gap-2 h-32 flex-col"
                  onClick={() => videoInputRef.current?.click()}
                  type="button"
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
              variant="outline" 
              onClick={() => setIsCreateModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              variant="gradient" 
              className="flex-1"
              onClick={handleCreatePost}
            >
              Share {postType === 'post' ? 'Post' : 'Spark'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

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
          {posts.length === 0 && (
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