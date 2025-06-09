import { jwtDecode } from "jwt-decode";

const BASE_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000";

const getID = (token: string) => {
  const decodedToken: { id: string } = jwtDecode(token);
  const id = decodedToken.id;
  if (!id) {
    throw new Error("Invalid token: ID not found");
  } else return id;
}

const getNotesList = async (token: string) => {
  const id = getID(token);
  const response = await fetch(`${BASE_URL}/notes?user=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }
  return response.json();
};

const createNote = async (token: string, note: { title: string; content: string }) => {
  const id = getID(token);
  const response = await fetch(`${BASE_URL}/notes?user=${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    throw new Error("Failed to create note");
  }
  return response.json();
};

const updateNote = async (token: string, noteID: string, note: { title: string; content: string }) => {
  const id = getID(token);
  const response = await fetch(`${BASE_URL}/notes?user=${id}&note=${noteID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    throw new Error("Failed to update note");
  }
  return response.json();
};

const deleteNote = async (token: string, noteID: string) => {
  const id = getID(token);
  const response = await fetch(`${BASE_URL}/notes?user=${id}&note=${noteID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete note");
  }
  return response.json();
};

export { getNotesList, createNote, updateNote, deleteNote };