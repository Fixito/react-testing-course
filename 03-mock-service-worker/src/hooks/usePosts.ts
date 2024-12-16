import axios from "axios";
import { useEffect, useState } from "react";

export interface Post {
  id: string;
  title: string;
  likes: number;
}

export type PostWithoutID = Omit<Post, "id">;

const API_URL = "http://localhost:5000/posts";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string>("");

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get<Post[]>(API_URL);
      setPosts(data);
    } catch {
      setError("Échec lors de la récupération des postes");
    }
  };

  const handleCreatePost = async (postData: PostWithoutID) => {
    try {
      await axios.post<Post>(API_URL, postData);
      await fetchPosts();
      setError("");
    } catch {
      setError("Échec lors de la création du poste");
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const post = posts.find((p) => p.id === postId);
      if (!post) throw new Error("Poste introuvable");
      await axios.patch<Post>(`${API_URL}/${postId}`, {
        ...post,
        likes: post.likes + 1,
      });
      await fetchPosts();
      setError("");
    } catch {
      setError("Échec lors de la mise à jour du poste");
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      const post = posts.find((p) => p.id === postId);
      if (!post) throw new Error("Poste introuvable");
      await axios.delete<Post>(`${API_URL}/${postId}`);
      await fetchPosts();
      setError("");
    } catch {
      setError("Échec lors de la suppression du poste");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    error,
    fetchPosts,
    handleCreatePost,
    handleLike,
    handleDelete,
  };
}
