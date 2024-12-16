import { Post } from "../hooks/usePosts";

interface ItemProps {
  post: Post;
  onLike: (postId: string) => Promise<void>;
  onDelete: (postId: string) => Promise<void>;
}

export default function Item({ post, onLike, onDelete }: ItemProps) {
  const { id, likes, title } = post;

  return (
    <article className="flex items-center justify-between rounded border p-4">
      <h3 className="text-lg">{title}</h3>{" "}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onLike(id)}
            className="rounded bg-teal-500 px-3 py-1 text-white hover:bg-teal-600"
          >
            👍 {likes}
          </button>
          <button
            onClick={() => onDelete(id)}
            className="rounded bg-gray-700 px-3 py-1 text-white hover:bg-gray-800"
          >
            Supprimer
          </button>
        </div>
      </div>
    </article>
  );
}
