function TodoItem({ task, onComplete, onDelete, onEdit }) {
  return (
    <div className="todo-item">

      <div className="todo-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onComplete(task.id)}
        />

        <span className={task.completed ? "completed" : ""}>
          {task.text}
        </span>

        <small>
          {task.completed ? "Completed" : "Pending"}
        </small>
      </div>

      <div className="todo-buttons">
        <button onClick={() => onEdit(task.id)}>
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>

    </div>
  );
}

export default TodoItem;