import React, { useState } from "react";
import { createNote, changeNoteTitle, deleteNote } from "../../api/notes";
import { useToast } from "../../context/ToastContext";

type Note = {
  id: number;
  title: string;
  note?: string;
};

type NotesListProps = {
  notes: Note[];
  selectedId?: number;
  onSelect?: (id: number) => void;
  onNoteCreated?: (note: Note) => void;
  onNoteDeleted?: (id: number) => void;
  onNoteTitleChanged?: (id: number, title: string) => void;
}

const NotesList: React.FC<
  NotesListProps
> = ({
  notes, 
  selectedId, 
  onSelect, 
  onNoteCreated, 
  onNoteDeleted, 
  onNoteTitleChanged
}) => {
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editNoteId, setEditNoteId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const { setErrorMessage } = useToast();
  const { setSuccessMessage } = useToast();

  const handleCreateNote = () => {
    setModalMode("create");
    setNewTitle("");
    setShowModal(true);
  };

  const handleEditTitle = (id: number, currentTitle: string) => {
    setModalMode("edit");
    setEditNoteId(id);
    setNewTitle(currentTitle);
    setShowModal(true);
  }

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("You must be logged in to create notes.");
      return;
    }
    if (!newTitle.trim()) {
      setErrorMessage("Note title cannot be empty.");
      return;
    }
    try {
      let response;
      if (modalMode === "create") {
        response = await createNote(token, {title: newTitle});    
        onNoteCreated?.(response as Note);
        setSuccessMessage("Note created successfully.");
      } else if (modalMode === "edit") {
        await changeNoteTitle(token, { id: editNoteId!, title: newTitle });
        onNoteTitleChanged?.(editNoteId!, newTitle);
        setSuccessMessage("Note title updated successfully.");
      }
      setShowModal(false);
    } catch (error) {
      console.error("Failed to create note:", error);
      setErrorMessage("Failed to create note. Please try again.");
    }
  };

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
          onClick={ handleCreateNote }
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
                  onClick={() => { 
                    setMenuOpenId(null);
                    const token = localStorage.getItem("token");
                    if (!token) {
                      setErrorMessage("You must be logged in to delete notes.");
                      return;
                    }

                    if (!note.id) {
                      setErrorMessage("Note ID is required to delete a note.");
                      return;
                    }

                    try {
                      deleteNote(token, note.id);
                      onNoteDeleted?.(note.id);
                      setSuccessMessage("Note deleted successfully.");
                    } catch (error) {
                      console.error("Failed to delete note:", error);
                      setErrorMessage("Failed to delete note. Please try again.");
                    }
                  }}
                >
                  delete note
                </button>
                <button
                  className="dopdown-item btn"
                  style={{ color: "white" }}
                  onClick={() => { 
                    setMenuOpenId(null);
                    handleEditTitle(note.id, note.title);
                  }}
                >
                  change name
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {showModal && (
        <div
          className="modal-backdrop d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 2000,
          }}
          onClick={() => setShowModal(false)}
        >
          <form
            className="form-new-note d-flex flex-column"
            onSubmit={handleModalSubmit}
            onClick={e => e.stopPropagation()}
          >
            <label style={{ color: "var(--primary)", fontWeight: 600 }}>
              Note title:{' '}
              <input
                className="form-control mt-2"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                autoFocus
              />
            </label>
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn"
                style={{ color: "var(--primary)" }}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {modalMode === "create" ? "Create": "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default NotesList;
