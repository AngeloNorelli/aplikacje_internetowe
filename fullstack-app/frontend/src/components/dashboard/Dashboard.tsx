import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import NotesList from "./NotesList";
import NoteBoard from "./NoteBoard";
import * as Notes from "../../api/notes";

const notesExample = [
  { id: 1, title: "Note 1", content: "Content of Note 1" },
  { id: 2, title: "Note 2", content: "Content of Note 2" },
  { id: 3, title: "Note 3", content: "Content of Note 3" },
];

const DashboardPage: React.FC = () => {
  const [notes, setNotes] = useState<{ id: number, title: string, content: string }[]>(notesExample);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    Notes.getNotesList(token)
      .then(data => {
        setNotes(data);
        if (data.length > 0) setSelectedId(data[0].id);
      })
      .catch(console.error);
  }, []);

  const handleNoteCreated = (note: { id: number, title: string, content?: string }) => {
    setNotes(prev => [... prev, { ...note, content: note.content ?? "" }]);
    setSelectedId(note.id);
  };

  const handleNoteDeleted = (id: number) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    setSelectedId(prev => {
      if (prev === id) {
        const remaining = notes.filter(note => note.id !== id);
        return remaining.length > 0 ? remaining[0].id : null;
      }
      return prev;
    });
  };

  const handleNoteEdited = (note: { id: number, title:string, content?: string }) => {
    setNotes(prev =>
      prev.map(n =>
        n.id === note.id ? { ...n, title: note.title, content: note.content ?? "" } : n
      )
    );
  };

  const handleNoteTitleChanged = (id: number, title: string) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id ? { ...note, title } : note
      )
    );
  };

  const selectedNote = notes.find(note => note.id === selectedId);

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <NotesList
          notes={notes}
          selectedId={selectedId ?? undefined} 
          onSelect={setSelectedId}
          onNoteCreated={handleNoteCreated}
          onNoteDeleted={handleNoteDeleted}
          onNoteTitleChanged={handleNoteTitleChanged}
        />
        <NoteBoard note={selectedNote} onNoteEdited={handleNoteEdited}/>
      </div>
    </div>
  );
};

export default DashboardPage;