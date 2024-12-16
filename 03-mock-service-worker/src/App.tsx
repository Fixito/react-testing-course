import Form from "./components/Form";
import List from "./components/List";
import { usePosts } from "./hooks/usePosts";

export default function App() {
  const { posts, error, handleCreatePost, handleDelete, handleLike } =
    usePosts();

  return (
    <div className="mx-auto mt-10 max-w-3xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Gestionnaire de postes</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <Form onSubmit={handleCreatePost} />
      <List posts={posts} onLike={handleLike} onDelete={handleDelete} />
    </div>
  );
}
