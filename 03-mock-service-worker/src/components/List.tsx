import { Post } from "../hooks/usePosts";
import Item from "./Item";

interface ListProps {
  posts: Post[];
  onLike: (postId: string) => Promise<void>;
  onDelete: (postId: string) => Promise<void>;
}

export default function List({ posts, onLike, onDelete }: ListProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => {
        return (
          <Item key={post.id} post={post} onLike={onLike} onDelete={onDelete} />
        );
      })}
    </div>
  );
}