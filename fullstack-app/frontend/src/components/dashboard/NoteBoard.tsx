import React, { useEffect, useState } from "react";
import { updateNote } from "../../api/notes";
import { useToast } from "../../context/ToastContext";
import { useSettings } from "../../context/SettingsContext";
import translations from "../../assets/translations";

type Note = {
  id: number;
  title: string;
  note?: string;
};

type NoteBoardProps = {
  note?: Note;
  onNoteEdited?: (note: Note) => void;
};

const NoteBoard: React.FC<NoteBoardProps> = ({note, onNoteEdited}) => {
  const [id, setId] = useState<number | null>(note?.id ?? null);
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.note ?? "");
  const { setErrorMessage } = useToast();
  const { setSuccessMessage } = useToast();
  const { language } = useSettings();
  const { fontSize } = useSettings();

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
              boxShadow: "none",
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
            fontSize: fontSize,
            marginTop: 16,
            resize: "none",
            color: "var(--note-color)",
            outline: "none",
            boxShadow: "none"
          }}
        />
      </form>
    </div>
  );
};

export default NoteBoard;