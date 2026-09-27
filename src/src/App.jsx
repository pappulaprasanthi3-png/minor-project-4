import { useState } from "react";
import TodoApp from "./components/TodoApp";
import NotesApp from "./components/NotesApp";
import "./App.css";

function App() {
  const [page, setPage] = useState("todo");

  return (
    <div className="app">

      <header>
        <h1>My Productivity App</h1>

        <nav>
          <button
            className={page === "todo" ? "active" : ""}
            onClick={() => setPage("todo")}
          >
            To-Do
          </button>

          <button
            className={page === "notes" ? "active" : ""}
            onClick={() => setPage("notes")}
          >
            Notes
          </button>
        </nav>
      </header>

      <main>
        {page === "todo" ? <TodoApp /> : <NotesApp />}
      </main>

    </div>
  );
}

export default App;