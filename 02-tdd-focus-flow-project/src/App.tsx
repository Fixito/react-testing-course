import Form from "./components/Form";
import List from "./components/List";
import { useFlowManager } from "./utils";

export default function App() {
  const { items, handleAddItem, handleDeleteItem } = useFlowManager();

  return (
    <main className="container mx-auto max-w-6xl p-4">
      <h1 className="mb-8 text-3xl font-bold">Focus Flow</h1>
      <Form onSubmit={handleAddItem} />
      <List items={items} onDelete={handleDeleteItem} />
    </main>
  );
}
