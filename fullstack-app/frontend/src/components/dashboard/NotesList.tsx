import React, { useState } from "react";

type Note = {
  id: number;
  title: string;
  content?: string;
};

const NotesList: React.FC<{
  notes: Note[];
  selectedId?: number;
  onSelect?: (id: number) => void;
}> = ({notes, selectedId, onSelect }) => {
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

  React.useEffect(() => {
    const close = () => setMenuOpenId(null);
    window.addEventListener("click", close);
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("click", close);
    };
  }, []);
  
  return (
    <div 
      className="d-flex flex-column w-auto"
      style={{ 
        backgroundColor: "var(--accent)", 
        color: "white"
      }}
    >
      <div className="d-flex justify-content-between align-items-center px-2 pt-2">
        <span className="span mx-2">Notes</span>
        <button
          className="btn p-0 mx-2"
          style={{ color: "white" }}
          // TODO: Implement create note functionality
        >
          +
        </button>
      </div>
      <ul 
        className="list-group list-group-flush mt-2 mx-2 rounded"
        style={{ backgroundColor: "var(--light)" }}
      >
        {notes.map((note) => (
          <li
            key={note.id}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{
              backgroundColor: selectedId === note.id ? "var(--secondary)" : "var(--light)",
            }}
            // TODO: note selection logic
            onClick={() => onSelect?.(note.id)}
          >
            <span style={{ color: "white" }}>{note.title}</span>
            <div className="dropdown ms-4 relative">
              <button
                className="btn btn-sm pl-2"
                onClick={e => {
                  e.stopPropagation();
                  setMenuOpenId(menuOpenId === note.id ? null : note.id);
                }}
              >
                <span style={{ fontWeight: "bold" }}>⋮</span>
              </button>
              <div
                className={`dropdown-menu dropdown-menu-end shadow${menuOpenId === note.id ? " show" : ""}`}
                style={{ 
                  backgroundColor: "var(--light)",
                  position: "absolute",
                  top: "-20%",
                  left: "250%",
                  minWidth: "130px",
                }}
              >
                <button
                  className="dopdown-item btn"
                  style={{ color: "white" }}
                  // TODO: delete note logic
                  onClick={() => { setMenuOpenId(null)} }
                >
                  delete note
                </button>
                <button
                  className="dopdown-item btn"
                  style={{ color: "white" }}
                  // TODO: change name logic
                  onClick={() => { setMenuOpenId(null)} }
                >
                  change name
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
