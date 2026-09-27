import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

function TodoApp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") {
      alert("Please enter a task");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const editTask = (id) => {
    const selectedTask = tasks.find((item) => item.id === id);

    const newText = prompt(
      "Edit task:",
      selectedTask.text
    );

    if (newText && newText.trim() !== "") {
      setTasks(
        tasks.map((item) =>
          item.id === id
            ? {
                ...item,
                text: newText,
              }
            : item
        )
      );
    }
  };

  const filteredTasks = tasks.filter((item) => {
    if (filter === "completed") {
      return item.completed;
    }

    if (filter === "pending") {
      return !item.completed;
    }

    return true;
  });

  return (
    <section className="section">

      <h2>To-Do App</h2>

      <div className="input-area">

        <input
          type="text"
          placeholder="Enter your task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
        />

        <button onClick={addTask}>
          Add Task
        </button>

      </div>

      <div className="filters">

        <button onClick={() => setFilter("all")}>
          All
        </button>

        <button onClick={() => setFilter("pending")}>
          Pending
        </button>

        <button onClick={() => setFilter("completed")}>
          Completed
        </button>

      </div>

      <div className="todo-list">

        {filteredTasks.length === 0 ? (
          <p className="empty">
            No tasks available.
          </p>
        ) : (
          filteredTasks.map((item) => (
            <TodoItem
              key={item.id}
              task={item}
              onComplete={completeTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          ))
        )}

      </div>

    </section>
  );
}

export default TodoApp;