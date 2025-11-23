"use client"

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  MoreHorizontal, 
  Image as ImageIcon, 
  Smile, 
  TrendingUp,
  Users,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/DashboardHeader";
import { useAuth } from "@/contexts/AuthContext";
import { getPosts, createPost, likePost, unlikePost, getUserLikedPostIds, subscribeToNewPosts, Post } from "@/lib/api/social";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { EmptyState } from "@/components/ui/empty-state";

interface UIPost extends Post {
  isLiked: boolean;
}

export default function SocialPage() {
  const { user, profile } = useAuth();
  const [posts, setPosts] = useState<UIPost[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    async function loadPosts() {
      try {
        const [fetchedPosts, likedPostIds] = await Promise.all([
          getPosts(),
          user ? getUserLikedPostIds(user.id) : Promise.resolve([])
        ]);

        const uiPosts = fetchedPosts.map(post => ({
          ...post,
          isLiked: likedPostIds.includes(post.id)
        }));

        setPosts(uiPosts);
      } catch (error) {
        console.error("Error loading posts:", error);
        toast.error("Failed to load feed");
      } finally {
        setLoading(false);
      }
    }

    loadPosts();

    const subscription = subscribeToNewPosts((newPost) => {
      setPosts(prev => [{ ...newPost, isLiked: false }, ...prev]);
    });

    return () => {
      subscription.then(sub => sub.unsubscribe());
    };
  }, [user]);

  const handleLike = async (post: UIPost) => {
    if (!user) {
      toast.error("Please login to like posts");
      return;
    }

    // Optimistic update
    const originalPosts = [...posts];
    setPosts(posts.map(p => {
      if (p.id === post.id) {
        return {
          ...p,
          likes_count: p.isLiked ? p.likes_count - 1 : p.likes_count + 1,
          isLiked: !p.isLiked
        };
      }
      return p;
    }));

    try {
      if (post.isLiked) {
        await unlikePost(user.id, post.id);
      } else {
        await likePost(user.id, post.id);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      setPosts(originalPosts); // Revert on error
      toast.error("Failed to update like");
    }
  };

  const handlePost = async () => {
    if (!newPostContent.trim() || !user) return;
    
    setPosting(true);
    try {
      const newPost = await createPost(newPostContent);
      if (newPost) {
        // Post will be added via subscription, but we can also add it manually if needed
        // For now, let's rely on subscription or add it manually to be instant
        // setPosts(prev => [{ ...newPost, isLiked: false }, ...prev]); 
        setNewPostContent("");
        toast.success("Post created!");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post");
    } finally {
      setPosting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#866bff] animate-spin" />
      </div>
    );
  }

  return (
    <motion.div 
      className="p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <DashboardHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* Left Sidebar - User Stats / Nav */}
        <div className="hidden lg:block space-y-6">
           <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
             <Card className="bg-[#1c1f2a]/40 backdrop-blur-xl border-white/5 text-white sticky top-24 rounded-3xl overflow-hidden shadow-xl">
                <div className="h-24 bg-gradient-to-r from-[#866bff] to-[#5A29C3]" />
                <CardContent className="pt-0 -mt-12 text-center relative z-10">
                   <div className="p-1.5 bg-[#1c1f2a] rounded-full w-fit mx-auto">
                      <Avatar className="w-24 h-24 border-4 border-[#1c1f2a]">
                         <AvatarImage src={profile?.avatar_url || "https://github.com/shadcn.png"} />
                         <AvatarFallback>{profile?.username?.[0] || "U"}</AvatarFallback>
                      </Avatar>
                   </div>
                   <h3 className="mt-3 font-bold text-xl">{profile?.display_name || profile?.username || "Guest User"}</h3>
                   <p className="text-gray-400 text-sm font-medium">@{profile?.username || "guest"} • Lvl 5</p>
                   
                   <div className="flex justify-around mt-8 border-t border-white/5 pt-6 pb-2">
                      <div>
                         <p className="font-bold text-xl">120</p>
                         <p className="text-xs text-gray-400 uppercase tracking-wide">Following</p>
                      </div>
                      <div>
                         <p className="font-bold text-xl">450</p>
                         <p className="text-xs text-gray-400 uppercase tracking-wide">Followers</p>
                      </div>
                   </div>
                </CardContent>
             </Card>
           </motion.div>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
           {/* Create Post */}
           <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
             <Card className="bg-[#1c1f2a]/60 backdrop-blur-xl border-white/5 text-white rounded-3xl shadow-lg">
                <CardContent className="p-6">
                   <div className="flex gap-4">
                      <Avatar className="w-12 h-12 border border-white/10">
                         <AvatarImage src={profile?.avatar_url || "https://github.com/shadcn.png"} />
                         <AvatarFallback>{profile?.username?.[0] || "U"}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-4">
                         <Textarea 
                            placeholder="What's happening in the Epikoverse?" 
                            className="bg-transparent border-none resize-none focus-visible:ring-0 p-0 text-lg min-h-[80px] placeholder:text-gray-500"
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                         />
                         <div className="flex justify-between items-center border-t border-white/5 pt-4">
                            <div className="flex gap-2 text-[#866bff]">
                               <Button size="icon" variant="ghost" className="hover:bg-[#866bff]/10 hover:text-[#866bff] rounded-full"><ImageIcon className="w-5 h-5" /></Button>
                               <Button size="icon" variant="ghost" className="hover:bg-[#866bff]/10 hover:text-[#866bff] rounded-full"><Smile className="w-5 h-5" /></Button>
                            </div>
                            <Button 
                              onClick={handlePost}
                              disabled={!newPostContent.trim() || posting}
                              className="bg-[#866bff] hover:bg-[#7059d6] text-white rounded-full px-8 font-bold shadow-lg shadow-[#866bff]/20"
                            >
                              {posting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Post"}
                            </Button>
                         </div>
                      </div>
                   </div>
                </CardContent>
             </Card>
           </motion.div>

           {/* Posts Stream */}
           {posts.length === 0 ? (
              <EmptyState 
                icon={MessageSquare}
                title="No posts yet"
                description="Be the first to share something with the community!"
              />
            ) : (
              posts.map((post, idx) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
              >
                 <Card className="bg-[#1c1f2a]/40 backdrop-blur-md border-white/5 text-white hover:border-[#866bff]/30 transition-all rounded-3xl shadow-lg overflow-hidden">
                    <CardHeader className="flex flex-row items-start gap-4 pb-2">
                       <Avatar className="border border-white/10">
                          <AvatarImage src={post.user?.avatar_url || ""} />
                          <AvatarFallback>{post.user?.username?.[0] || "U"}</AvatarFallback>
                       </Avatar>
                       <div className="flex-1">
                          <div className="flex justify-between items-start">
                             <div className="flex flex-col">
                                <span className="font-bold text-white hover:text-[#866bff] transition-colors cursor-pointer text-base">{post.user?.display_name || post.user?.username || "Unknown"}</span>
                                <span className="text-gray-400 text-xs">@{post.user?.username || "unknown"}</span>
                             </div>
                             <span className="text-gray-500 text-xs bg-white/5 px-2 py-1 rounded-full">{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
                          </div>
                       </div>
                       <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white rounded-full"><MoreHorizontal className="w-4 h-4" /></Button>
                    </CardHeader>
                    <CardContent className="pb-2 space-y-4 pl-[72px] pr-6">
                       <p className="whitespace-pre-wrap text-gray-200 leading-relaxed text-[15px]">{post.content}</p>
                       {post.image_url && (
                          <img src={post.image_url} alt="Post content" className="rounded-2xl w-full max-h-[400px] object-cover border border-white/5 shadow-lg" />
                       )}
                    </CardContent>
                    <CardFooter className="pt-4 pb-4 pl-[72px] pr-6 flex justify-between text-gray-400 border-t border-white/5 mt-2">
                       <Button 
                          variant="ghost" 
                          className={`gap-2 hover:text-[#E91E63] hover:bg-[#E91E63]/10 rounded-full transition-colors ${post.isLiked ? 'text-[#E91E63]' : ''}`}
                          onClick={() => handleLike(post)}
                       >
                          <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} /> 
                          {post.likes_count}
                       </Button>
                       <Button variant="ghost" className="gap-2 hover:text-[#866bff] hover:bg-[#866bff]/10 rounded-full transition-colors">
                          <MessageSquare className="w-4 h-4" /> 
                          {post.comments_count}
                       </Button>
                       <Button variant="ghost" className="gap-2 hover:text-[#99ee2d] hover:bg-[#99ee2d]/10 rounded-full transition-colors">
                          <Share2 className="w-4 h-4" /> 
                          Share
                       </Button>
                    </CardFooter>
                 </Card>
              </motion.div>
           )))}
        </div>

        {/* Right Sidebar - Trending */}
        <div className="hidden lg:block space-y-6">
           <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
             <Card className="bg-[#1c1f2a]/40 backdrop-blur-xl border-white/5 text-white sticky top-24 rounded-3xl shadow-lg">
                <CardHeader className="pb-4 border-b border-white/5">
                   <h3 className="font-bold text-lg flex items-center gap-2">
                      <div className="bg-[#99ee2d]/20 p-1.5 rounded-lg">
                         <TrendingUp className="w-4 h-4 text-[#99ee2d]" /> 
                      </div>
                      Trending
                   </h3>
                </CardHeader>
                <CardContent className="space-y-1 pt-4">
                   {['EpikoRegal', 'CryptoGaming', 'NFTDrop', 'Tournament'].map((tag, i) => (
                      <div key={tag} className="flex justify-between items-center cursor-pointer group hover:bg-white/5 p-3 rounded-xl transition-colors">
                         <div>
                            <p className="font-bold text-gray-200 group-hover:text-[#866bff] transition-colors">#{tag}</p>
                            <p className="text-xs text-gray-500">{12.5 - i}k posts</p>
                         </div>
                         <MoreHorizontal className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                   ))}
                   <Button variant="outline" className="w-full border-white/10 text-[#866bff] hover:text-[#866bff] hover:bg-[#866bff]/10 mt-4 rounded-xl">
                      Show More
                   </Button>
                </CardContent>
             </Card>
           </motion.div>

           <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
             <Card className="bg-[#1c1f2a]/40 backdrop-blur-xl border-white/5 text-white rounded-3xl shadow-lg">
                <CardHeader className="pb-4 border-b border-white/5">
                   <h3 className="font-bold text-lg flex items-center gap-2">
                      <div className="bg-[#866bff]/20 p-1.5 rounded-lg">
                         <Users className="w-4 h-4 text-[#866bff]" /> 
                      </div>
                      Who to follow
                   </h3>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                   {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                         <Avatar>
                            <AvatarImage src={`https://i.pravatar.cc/150?u=${i+20}`} />
                            <AvatarFallback>U{i}</AvatarFallback>
                         </Avatar>
                         <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm truncate">ProGamer{i}</p>
                            <p className="text-xs text-gray-400 truncate">@pro_gamer_{i}</p>
                         </div>
                         <Button size="sm" className="bg-white text-black hover:bg-gray-200 h-8 rounded-full px-4 font-bold text-xs">
                            Follow
                         </Button>
                      </div>
                   ))}
                </CardContent>
             </Card>
           </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
