import React, { useState } from "react";
import { createNote, changeNoteTitle, deleteNote } from "../../api/notes";
import { useToast } from "../../context/ToastContext";
import { useLanguage } from "../../context/LanguageContext";

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
};

const translations = {
  en: {
    notes: "Notes",
    create: "create Note",
    delete: "delete Note",
    changeName: "change Name",
    noteTitle: "Note Title",
    noteTitlePlaceholder: "Enter note title",
    cancel: "cancel",
    save: "save",
    noteCreated: "Note created successfully.",
    noteDeleted: "Note deleted successfully.",
    noteTitleUpdated: "Note title updated successfully.",
    notLoggedIn: "You must be logged in to perform this action.",
    emptyTitle: "Note title cannot be empty.",
    noteCreateError: "Failed to create note. Please try again.",
    noteDeleteError: "Failed to delete note. Please try again.",
  },
  pl: {
    notes: "Notatki",
    create: "utwórz notatkę",
    delete: "usuń notatkę",
    changeName: "amień nazwę",
    noteTitle: "Tytuł notatki",
    noteTitlePlaceholder: "Wprowadź tytuł notatki",
    cancel: "anuluj",
    save: "zapisz",
    noteCreated: "Notatka została pomyślnie utworzona.",
    noteDeleted: "Notatka została pomyślnie usunięta.",
    noteTitleUpdated: "Tytuł notatki został pomyślnie zaktualizowany.",
    notLoggedIn: "Musisz być zalogowany, aby wykonać tę czynność.",
    emptyTitle: "Tytuł notatki nie może być pusty.",
    noteCreateError: "Nie udało się utworzyć notatki. Spróbuj ponownie.",
    noteDeleteError: "Nie udało się usunąć notatki. Spróbuj ponownie.",
  }
};

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
  const { language } = useLanguage();

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

  const truncate = (str: string, maxLength: number) =>
    str.length > maxLength ? str.slice(0, maxLength) + "..." : str;

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage(translations[language].notLoggedIn);
      return;
    }
    if (!newTitle.trim()) {
      setErrorMessage(translations[language].emptyTitle);
      return;
    }
    try {
      let response;
      if (modalMode === "create") {
        response = await createNote(token, {title: newTitle});    
        onNoteCreated?.(response as Note);
        setSuccessMessage(translations[language].noteCreated);
      } else if (modalMode === "edit") {
        await changeNoteTitle(token, { id: editNoteId!, title: newTitle });
        onNoteTitleChanged?.(editNoteId!, newTitle);
        setSuccessMessage(translations[language].noteTitleUpdated);
      }
      setShowModal(false);
    } catch (error) {
      console.error("Failed to create note:", error);
      setErrorMessage(translations[language].noteCreateError);
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
        color: "white",
        maxWidth: 200,
      }}
    >
      <div className="d-flex justify-content-between align-items-center px-2 pt-2">
        <span className="span mx-2">
          {translations[language].notes}
        </span>
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
            <span style={{ color: "white" }}>{truncate(note.title, 10)}</span>
            <div className="dropdown ms-4 relative">
              <button
                className="btn btn-sm pl-2"
                onClick={e => {
                  e.stopPropagation();
                  setMenuOpenId(menuOpenId === note.id ? null : note.id);
                }}
              >
                <span style={{ fontWeight: "bold", color: "white" }}>⋮</span>
              </button>
              <div
                className={`dropdown-menu dropdown-menu-end shadow${menuOpenId === note.id ? " show" : ""}`}
                style={{ 
                  backgroundColor: "var(--light)",
                  position: "absolute",
                  top: "-20%",
                  left: "250%",
                  minWidth: "150px",
                }}
              >
                <button
                  className="dopdown-item btn"
                  style={{ color: "white" }}
                  onClick={() => { 
                    setMenuOpenId(null);
                    const token = localStorage.getItem("token");
                    if (!token) {
                      setErrorMessage(translations[language].notLoggedIn);
                      return;
                    }

                    if (!note.id) {
                      setErrorMessage("Note ID is required to delete a note.");
                      return;
                    }

                    try {
                      deleteNote(token, note.id);
                      onNoteDeleted?.(note.id);
                      setSuccessMessage(translations[language].noteDeleted);
                    } catch (error) {
                      console.error("Failed to delete note:", error);
                      setErrorMessage(translations[language].noteDeleteError);
                    }
                  }}
                >
                  {translations[language].delete}
                </button>
                <button
                  className="dopdown-item btn"
                  style={{ color: "white" }}
                  onClick={() => { 
                    setMenuOpenId(null);
                    handleEditTitle(note.id, note.title);
                  }}
                >
                  {translations[language].changeName}
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
              {translations[language].noteTitle}{' '}
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
                {translations[language].cancel}
              </button>
              <button type="submit" className="btn btn-primary">
                {modalMode === "create" ? translations[language].create: translations[language].save}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default NotesList;
