import React, { useState } from "react";

const NoteBoard: React.FC = () => {
  const [title, setTitle] = useState("note_1");
  const [content, setContent] = useState("example note xd");

  return (
    <div
      style={{
        flex: 1,
        background: "#f5f7fa",
        height: "calc(100vh - 56px)",
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
            height: "calc(100vh - 140px)",
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