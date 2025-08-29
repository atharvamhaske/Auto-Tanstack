import express from "express";
import oasGenerator from "express-oas-generator";

const app = express();

app.use(express.json());

oasGenerator.init(
  app,
  undefined, // No custom spec callback
  "../openapi.yaml", // Output file name at project root
  1000, // Write interval in ms
  "api-docs" // Docs route
);

// app.get("/api/users", (req, res) => {
//     res.json([{ id: 1, name: "Atharva" }, { id: 2, name: "Ram" }]);
// });

// app.post("/api/users", (req, res) => {
//     const user = { id: Date.now(), ...req.body };
//     res.status(201).json(user);
// });

// In-memory todos for demo
const todos: { id: number; title: string }[] = [
  { id: 1, title: "Sample Todo" },
];

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const title = (req.body && req.body.title) || "Untitled";
  const todo = { id: Date.now(), title };
  todos.push(todo);
  res.status(201).json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = todos.findIndex((t) => t.id === id);
  if (idx !== -1) {
    todos.splice(idx, 1);
    return res.json({ deletedId: id });
  }
  res.status(404).json({ message: "Todo not found" });
});

const PORT = 4000;

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));