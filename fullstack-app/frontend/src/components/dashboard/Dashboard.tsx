import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import NotesList from "./NotesList";
import NoteBoard from "./NoteBoard";
import * as Notes from "../../api/notes";

const DashboardPage: React.FC = () => {
  const [notes, setNotes] = useState<{ id: number, title: string, note: string }[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    document.title = "2Note - Dashboard";
  }, []);

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

  const handleNoteCreated = (note: { id: number, title: string, note?: string }) => {
    setNotes(prev => [... prev, { ...note, note: note.note ?? "" }]);
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

  const handleNoteEdited = (note: { id: number, title: string, note?: string }) => {
    setNotes(prev =>
      prev.map(n =>
        n.id === note.id ? { ...n, title: note.title, note: note.note ?? "" } : n
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