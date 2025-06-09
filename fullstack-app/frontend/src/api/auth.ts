const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

const login = async (username: string, password: string) => {
  const response = await fetch(`${BASE_URL}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Invalid username or password");
  }

const data = await response.json();
const token = data.token;
  if (!token) {
    throw new Error("Login failed. Please try again.");
  }

  return token;
};

const register = async (email: string, username: string, password: string) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      username,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Registration failed. Please try again.");
  }

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }

  return data;
};

export { login, register };
