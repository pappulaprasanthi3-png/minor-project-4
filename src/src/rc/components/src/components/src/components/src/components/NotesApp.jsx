import { useEffect, useState } from "react";
import NoteItem from "./NoteItem";

function NotesApp() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");

    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (
      title.trim() === "" ||
      content.trim() === ""
    ) {
      alert("Please enter title and content");
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title,
      content: content,
      date: new Date().toLocaleString(),
    };

    setNotes([newNote, ...notes]);

    setTitle("");
    setContent("");
  };

  const deleteNote = (id) => {
    setNotes(
      notes.filter((note) => note.id !== id)
    );
  };

  const editNote = (id) => {
    const selectedNote = notes.find(
      (note) => note.id === id
    );

    const newTitle = prompt(
      "Edit title:",
      selectedNote.title
    );

    const newContent = prompt(
      "Edit content:",
      selectedNote.content
    );

    if (
      newTitle &&
      newContent &&
      newTitle.trim() !== "" &&
      newContent.trim() !== ""
    ) {
      setNotes(
        notes.map((note) =>
          note.id === id
            ? {
                ...note,
                title: newTitle,
                content: newContent,
                date: new Date().toLocaleString(),
              }
            : note
        )
      );
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      note.content
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <section className="section">

      <h2>Notes App</h2>

      <div className="note-form">

        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
        />

        <button onClick={addNote}>
          Add Note
        </button>

      </div>

      <div className="search-box">

        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <div className="notes-grid">

        {filteredNotes.length === 0 ? (
          <p className="empty">
            No notes available.
          </p>
        ) : (
          filteredNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onEdit={editNote}
              onDelete={deleteNote}
            />
          ))
        )}

      </div>

    </section>
  );
}

export default NotesApp;