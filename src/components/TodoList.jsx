import { useState, useEffect } from "react";
import mockApi from "../services/mockApi";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const { data } = await mockApi.get("/todos");
            setTodos(data);
        } catch (error) {
            console.error("Failed to fetch todos", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTodo = async (e) => {
        e.preventDefault();
        console.log("Attempting to add todo:", newTodo);
        if (!newTodo.trim()) return;

        try {
            console.log("Sending post request...");
            const { data } = await mockApi.post("/todos", { text: newTodo });
            console.log("Server response:", data);
            setTodos([...todos, data]);
            setNewTodo("");
        } catch (error) {
            console.error("Failed to add todo", error);
        }
    };

    const toggleTodo = async (id, completed) => {
        try {
            await mockApi.put(`/todos/${id}`, { completed: !completed });
            setTodos(todos.map(t =>
                t._id === id ? { ...t, completed: !completed } : t
            ));
        } catch (error) {
            console.error("Failed to update todo", error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await mockApi.delete(`/todos/${id}`);
            setTodos(todos.filter(t => t._id !== id));
        } catch (error) {
            console.error("Failed to delete todo", error);
        }
    };

    return (
        <div className="todo-container">
            <div className="todo-header">
                <h3>Tasks</h3>
                <span className="todo-count">{todos.filter(t => !t.completed).length} remaining</span>
            </div>

            <form onSubmit={handleAddTodo} className="todo-form">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task..."
                    className="todo-input"
                />
                <button type="submit" className="todo-add-btn">+</button>
            </form>

            <div className="todo-list">
                {loading ? (
                    <div className="todo-empty">Loading...</div>
                ) : todos.length === 0 ? (
                    <div className="todo-empty">No tasks yet. Add one above!</div>
                ) : (
                    todos.map(todo => (
                        <div key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                            <div
                                className="todo-checkbox"
                                onClick={() => toggleTodo(todo._id, todo.completed)}
                            >
                                {todo.completed && "✓"}
                            </div>
                            <span className="todo-text">{todo.text}</span>
                            <button
                                className="todo-delete"
                                onClick={() => deleteTodo(todo._id)}
                                aria-label="Delete task"
                            >
                                ×
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default TodoList;
