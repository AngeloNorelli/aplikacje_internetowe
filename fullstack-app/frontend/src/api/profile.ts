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

export { getProfile };