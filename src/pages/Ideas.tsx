import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, Plus, Image, Video } from 'lucide-react';
import { usePosts } from '@/hooks/usePosts';
import { useAuth } from '@/contexts/AuthContext';

const Ideas = () => {
  const { user } = useAuth();
  const { posts, loading, createPost } = usePosts();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPost, setNewPost] = useState({
    caption: '',
    description: '',
    category: 'general',
    type: 'post' as 'post' | 'spark',
    image: null as File | null,
    video: null as File | null
  });
  const [isCreating, setIsCreating] = useState(false);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.caption.trim()) return;

    setIsCreating(true);
    try {
      await createPost({
        caption: newPost.caption,
        description: newPost.description,
        category: newPost.category,
        type: newPost.type,
        image_url: newPost.image ? URL.createObjectURL(newPost.image) : null,
        video_url: newPost.video ? URL.createObjectURL(newPost.video) : null
      });
      
      setNewPost({
        caption: '',
        description: '',
        category: 'general',
        type: 'post',
        image: null,
        video: null
      });
    } catch (error) {
        setShowCreateForm(false);
      console.error('Error creating post:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewPost(prev => ({ ...prev, image: file, video: null }));
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewPost(prev => ({ ...prev, video: file, image: null }));
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    e.currentTarget.style.display = 'none';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading posts...</div>
      </div>
    );
  }

  return (
      {/* Create Button */}
      {!showCreateForm && (
        <div className="text-center">
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2"
            variant="gradient"
            size="lg"
          >
            <Plus className="w-5 h-5" />
            Create Post
          </Button>
        </div>
      )}

      {/* Create Post Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Share Your Ideas
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={newPost.type === 'post' ? 'default' : 'outline'}
                  onClick={() => setNewPost(prev => ({ ...prev, type: 'post' }))}
                  className="flex-1"
                >
                  Post
                </Button>
                <Button
                  type="button"
                  variant={newPost.type === 'spark' ? 'default' : 'outline'}
                  onClick={() => setNewPost(prev => ({ ...prev, type: 'spark' }))}
                  className="flex-1"
                >
                  Voro Spark
                </Button>
              </div>

              <Input
                placeholder="What's your idea?"
                value={newPost.caption}
                onChange={(e) => setNewPost(prev => ({ ...prev, caption: e.target.value }))}
                required
              />

              <Textarea
                placeholder="Tell us more about it..."
                value={newPost.description}
                onChange={(e) => setNewPost(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />

              <Input
                placeholder="Category"
                value={newPost.category}
                onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
              />

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="flex items-center gap-2 cursor-pointer p-2 border rounded-md hover:bg-gray-50">
                    <Image className="w-4 h-4" />
                    <span className="text-sm">Add Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex-1">
                  <label className="flex items-center gap-2 cursor-pointer p-2 border rounded-md hover:bg-gray-50">
                    <Video className="w-4 h-4" />
                    <span className="text-sm">Add Video</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {newPost.image && (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(newPost.image)}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setNewPost(prev => ({ ...prev, image: null }))}
                  >
                    Remove
                  </Button>
                </div>
              )}

              {newPost.video && (
                <div className="relative">
                  <video
                    src={URL.createObjectURL(newPost.video)}
                    className="w-full h-48 object-cover rounded-md"
                    controls
                    onError={handleVideoError}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setNewPost(prev => ({ ...prev, video: null }))}
                  >
                    Remove
                  </Button>
                </div>
              )}

              <Button type="submit" disabled={isCreating} className="w-full">
                {isCreating ? 'Sharing...' : 'Share Idea'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={post.profiles?.avatar_url || ''} />
                  <AvatarFallback>
                    {post.profiles?.username?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-semibold">
                    @{post.profiles?.username || 'anonymous'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </div>
                </div>
                <Badge variant={post.type === 'spark' ? 'secondary' : 'default'}>
                  {post.type === 'spark' ? 'Voro Spark' : 'Post'}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div>
                <h3 className="font-semibold text-lg">{post.caption}</h3>
                {post.description && (
                  <p className="text-gray-600 mt-1">{post.description}</p>
                )}
              </div>

              <Badge variant="outline">{post.category}</Badge>

              {post.image_url && (
                <div className="rounded-md overflow-hidden">
                  <img
                    src={post.image_url}
                    alt={post.caption}
                    className="w-full h-64 object-cover"
                    onError={handleImageError}
                  />
                </div>
              )}

              {post.video_url && post.type === 'spark' && (
                <div className="rounded-md overflow-hidden">
                  <video
                    src={post.video_url}
                    className="w-full h-64 object-cover"
                    controls
                    onError={handleVideoError}
                  />
                </div>
              )}

              <div className="flex items-center gap-4 pt-2">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span>{post.likes_count || 0}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments_count || 0}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {posts.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No posts yet. Be the first to share an idea!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Ideas;