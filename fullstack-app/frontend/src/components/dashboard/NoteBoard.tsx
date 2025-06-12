import React, { useEffect, useState } from "react";
import { updateNote } from "../../api/notes";
import { useToast } from "../../context/ToastContext";

type Note = {
  id: number;
  title: string;
  content?: string;
};

const NoteBoard: React.FC<{note?: Note}> = ({note}) => {
  const [id, setId] = useState<number | null>(note?.id ?? null);
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const { setErrorMessage } = useToast();
  const { setSuccessMessage } = useToast();

  useEffect(() => {
    setId(note?.id ?? null);
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
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
      Select a note to view or edit its content.
    </div>
    )
  }

  return (
    <div
      style={{
        flex: 1,
        background: "#f5f7fa",
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
            onClick={ () => {
              const token = localStorage.getItem("token");
              if (!token) {
                setErrorMessage("You must be logged in to save notes.");
                return;
              }

              if (id === null) {
                setErrorMessage("Note ID is not set. Cannot update note.");
                return;
              }
              
              try {
                updateNote(token, {id, title, content});
                setSuccessMessage("Note updated successfully!");
              } catch (error) {
                setErrorMessage("Failed to update note. Please try again.");
                console.error("Update note error:", error);
                return;
              }
            }}
          >
            save
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
            outline: "none"
          }}
        />
      </form>
    </div>
  );
};

export default NoteBoard;