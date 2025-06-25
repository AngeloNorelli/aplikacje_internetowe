import React, { useEffect, useState } from "react";
import { updateNote } from "../../api/notes";
import { useToast } from "../../context/ToastContext";
import { useLanguage } from "../../context/LanguageContext";

type Note = {
  id: number;
  title: string;
  note?: string;
};

type NoteBoardProps = {
  note?: Note;
  onNoteEdited?: (note: Note) => void;
};

const translations = {
  en: {
    select: "Select a note to view or edit its content.",
    notLoggedError: "You must be logged in to save notes.",
    noNoteIDerror: "Note ID is not set. Cannot update note.",
    noteUpdateSuccess: "Note updated successfully!",
    noteUpdateError: "Failed to update note. Please try again.",
    save: "save",
  },
  pl: {
    select: "Wybierz notatkę aby zobaczyć i edytować jej zawartość.",
    notLoggedError: "Mysisz być zalogowany, aby zapisać notatki.",
    noNoteIDerror: "ID notatki nie jest ustawione. Nie można zaktualizować notatki.",
    noteUpdateSuccess: "Notatka została pomyślnie zaktualizowana!",
    noteUpdateError: "Nie udało się zaktualizować notatki. Spróbuj ponownie.",
    save: "zapisz",
  }
};

const NoteBoard: React.FC<NoteBoardProps> = ({note, onNoteEdited}) => {
  const [id, setId] = useState<number | null>(note?.id ?? null);
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.note ?? "");
  const { setErrorMessage } = useToast();
  const { setSuccessMessage } = useToast();
  const { language } = useLanguage();

  useEffect(() => {
    setId(note?.id ?? null);
    setTitle(note?.title ?? "");
    setContent(note?.note ?? "");
  }, [note]);

  if (!note) {
    return (
      <div
      style={{
        flex: 1,
        background: "#f5f7fa",
        height: "calc(100vh - 60px)",
        padding: "32px 24px"
      }}
    >
      {translations[language].select}
    </div>
    )
  }

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage(translations[language].notLoggedError);
      return;
    }

    if (id === null) {
      setErrorMessage(translations[language].noNoteIDerror);
      return;
    }
    
    try {
      await updateNote(token, {id, title, content});
      setSuccessMessage(translations[language].noteUpdateSuccess);
      onNoteEdited?.({ id, title, note: content } as Note);
    } catch (error) {
      setErrorMessage(translations[language].noteUpdateError);
      console.error("Update note error:", error);
      return;
    }
  }

  return (
    <div
      style={{
        flex: 1,
        background: "var(--note-bg)",
        height: "calc(100vh - 60px)",
        padding: "32px 24px"
      }}
    >
      <form>
        <div className="d-flex align-items-center mb-2" style={{ gap: 8 }}>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="form-control"
            style={{
              fontSize: 20,
              border: "none",
              borderBottom: "2px solid #5c62a6",
              background: "transparent",
              outline: "none",
              color: "var(--note-color)",
              flex: 1
            }}
          />
          <button
            type="button"
            className="btn btn-primary"
            style={{
              borderRadius: 8,
              padding: "4px 16px",
              fontSize: 14
            }}
            onClick={ handleSave }
          >
            {translations[language].save}
          </button>
        </div>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="form-control"
          style={{
            width: "100%",
            height: "calc(100vh - 160px)",
            border: "none",
            background: "transparent",
            fontSize: 18,
            marginTop: 16,
            resize: "none",
            color: "var(--note-color)",
            outline: "none"
          }}
        />
      </form>
    </div>
  );
};

export default NoteBoard;