import React, { useState } from "react";
import Navbar from "./Navbar";
import NotesList from "./NotesList";
import NoteBoard from "./NoteBoard";

const DashboardPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(1);

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <NotesList selectedId={selectedId} onSelect={setSelectedId} />
        <NoteBoard />
      </div>
    </div>
  );
};

export default DashboardPage;