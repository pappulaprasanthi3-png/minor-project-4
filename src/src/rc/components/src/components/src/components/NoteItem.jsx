function NoteItem({ note, onEdit, onDelete }) {
  return (
    <div className="note-card">

      <h3>{note.title}</h3>

      <p>{note.content}</p>

      <small>
        {note.date}
      </small>

      <div className="note-buttons">

        <button onClick={() => onEdit(note.id)}>
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default NoteItem;