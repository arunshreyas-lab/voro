import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export type Post = {
  id: string;
  user_id: string;
  type: 'post' | 'spark';
  caption: string;
  description?: string;
  category: string;
  image_url?: string;
  video_url?: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  user?: {
    name: string;
    avatar: string;
    username: string;
  };
};

export type CreatePostData = {
  type: 'post' | 'spark';
  caption: string;
  description?: string;
  category: string;
  image_url?: string;
  video_url?: string;
};

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to match the expected format
      const transformedPosts: Post[] = data.map(post => ({
        ...post,
        user: {
          name: 'User', // We'll enhance this later with user profiles
          avatar: '/placeholder.svg',
          username: `@user${post.user_id.slice(0, 8)}`
        }
      }));

      setPosts(transformedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to load posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData: CreatePostData) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a post",
        variant: "destructive",
      });
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([
          {
            ...postData,
            user_id: user.id,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Add the new post to the local state
      const newPost: Post = {
        ...data,
        user: {
          name: user.user_metadata?.full_name || 'You',
          avatar: user.user_metadata?.avatar_url || '/placeholder.svg',
          username: `@${user.email?.split('@')[0] || 'you'}`
        }
      };

      setPosts(prev => [newPost, ...prev]);

      toast({
        title: "Success!",
        description: `${postData.type === 'post' ? 'Post' : 'Voro Spark'} created successfully!`,
      });

      return true;
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
      return false;
    }
  };

  const likePost = async (postId: string) => {
    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      const { error } = await supabase
        .from('posts')
        .update({ likes_count: post.likes_count + 1 })
        .eq('id', postId);

      if (error) throw error;

      setPosts(prev => prev.map(p => 
        p.id === postId 
          ? { ...p, likes_count: p.likes_count + 1 }
          : p
      ));

      toast({
        description: "Post liked!",
      });
    } catch (error) {
      console.error('Error liking post:', error);
      toast({
        title: "Error",
        description: "Failed to like post",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    createPost,
    likePost,
    refetch: fetchPosts
  };
};