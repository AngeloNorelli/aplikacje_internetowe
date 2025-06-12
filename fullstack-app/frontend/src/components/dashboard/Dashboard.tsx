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

  const selectedNote = notes.find(note => note.id === selectedId);

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <NotesList
          notes={notes}
          selectedId={selectedId ?? undefined} 
          onSelect={setSelectedId} 
        />
        <NoteBoard note={selectedNote}/>
      </div>
    </div>
  );
};

export default DashboardPage;