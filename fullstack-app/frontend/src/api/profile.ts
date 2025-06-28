import {jwtDecode} from "jwt-decode";

const BASE_URL = "http://localhost:5000";
const getID = (token: string) => {
    const decodedToken: { id: string } = jwtDecode(token);
    const id = decodedToken.id;
    if (!id) {
        throw new Error("Invalid token: ID not found");
    } else return id;
}

const getProfile = async (token: string) => {
    const id = getID(token);
    const response = await fetch(`${BASE_URL}/profile?user=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Nie udało się pobrać profilu");
    }
    return response.json();
};

const updateProfile = async (token: string, newEmail: string, newUsername: string, newPassword: string) => {
    if (!token) return;
    const id = getID(token);
    try {
        const res = await fetch(`http://localhost:5000/profile/update?user=${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                email: newEmail,
                username: newUsername,
                password: newPassword
            })
        });
        if (res.status === 409) {
            setError("Podany email już istnieje w bazie.");
            return;
        }
        if (!res.ok) throw new Error("Błąd zapisu profilu");
        setEmail(newEmail);
        setUsername(newUsername);
        setPassword(""); // nie wyświetlaj hasła po zmianie
        setEditMode(false);
    } catch {
        throw new Error("Wystąpił błąd podczas zapisu.");
    }
}

export { getProfile, updateProfile };