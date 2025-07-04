import {jwtDecode} from "jwt-decode";

const BASE_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000";

const getID = (token: string) => {
  const decodedToken: { id: string } = jwtDecode(token);
  const id = decodedToken.id;
  if (!id) {
    throw new Error("Invalid token: ID not found");
  } else return id;
};

const getSettings = async (token: string) => {
  const id = getID(token);
  const response = await fetch(`${BASE_URL}/settings?user=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch settings");
  }
  return response.json();
};

const updateSettings = async (token: string, settings: { theme?: string; font_size?: string; language?: string }) => {
  const id = getID(token);
  const response = await fetch(`${BASE_URL}/settings/update?user=${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(settings),
  });

  if (!response.ok) {
    throw new Error("Failed to update settings");
  }

  const data = await response.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
};

export { getSettings, updateSettings };