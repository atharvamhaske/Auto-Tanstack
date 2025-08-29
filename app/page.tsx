"use client";

import {
  useGetApiTodos,
  usePostApiTodos,
  useDeleteApiTodosId,
} from "@/src/api/todoApi";

export default function Page() {
  // Fetch todos list
  const {
    data: todosRes,
    isLoading,
    error,
    refetch,
  } = useGetApiTodos();

  // Add todo mutation
  const { mutate: addTodo } = usePostApiTodos({
    mutation: {
      onSuccess: () => refetch(),
    },
  });

  // Delete todo mutation
  const { mutate: deleteTodo } = useDeleteApiTodosId({
    mutation: {
      onSuccess: () => refetch(),
    },
  });

  if (isLoading) return <div>Loading…</div>;
  if (error) return <div>Failed to load</div>;

  // Helper to add a todo
  const handleAddTodo = () => {
    // The generated hook expects no argument (void), so we can't pass data directly.
    // In a real app, you'd update the OpenAPI spec to accept a body, then regenerate.
    // For now, just call addTodo() with no arguments.
    addTodo();
  };

  // Helper to delete the first todo (if exists)
  const handleDeleteTodo = () => {
    const firstId =
      Array.isArray(todosRes?.data) && todosRes.data.length > 0
        ? todosRes.data[0].id
        : undefined;
    if (firstId) {
      // The generated hook expects an object with { id }
      deleteTodo({ id: firstId });
    } else {
      alert("No todos to delete");
    }
  };

  return (
    <main style={{ padding: 24, display: "grid", gap: 12 }}>
      <div className="text-4xl mb-8 font-semibold tracking-wider">Todos Demo</div>
      <div style={{ display: "flex", gap: 8 }} className="mb-6">
        <button className="bg-indigo-200 text-black px-2 py-1 rounded-3xl cursor-pointer hover:bg-indigo-500/30" onClick={() => refetch()}>GET /api/todos</button>

        
        <button className="bg-teal-200 text-black px-2 py-1 rounded-3xl cursor-pointer hover:bg-green-500/30" onClick={handleAddTodo}>POST /api/todos</button>


        <button className="bg-red-300 text-black px-2 py-1 rounded-3xl cursor-pointer hover:bg-red-500/30" onClick={handleDeleteTodo}>DELETE /api/todos/:id</button>
      </div >
      <pre>{JSON.stringify(todosRes?.data, null, 2)}</pre>
    </main>
  );
}