import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/profile";

const Profile: React.FC = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [editMode, setEditMode] = useState(false);

    // Stany edycyjne
    const [newEmail, setNewEmail] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;
            try {
                const data = await getProfile(token);
                setEmail(data.email);
                setUsername(data.username);
                setPassword(data.password);
                setNewEmail(data.email);
                setNewUsername(data.username);
                setNewPassword("");
            } catch (err) {}
        };
        fetchProfile();
    }, []);

    const handleSave = async () => {
        setError("");
        const token = localStorage.getItem("token");
        updateProfile(token, newEmail, newUsername, newPassword);
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-primary">
            <div className="text-center mb-4">
                <div className="bg-light d-inline-flex justify-content-center align-items-center" style={{ width: "128px", height: "100px" }}>
                    <span className="fw-bold">LOGO</span>
                </div>
            </div>
            <div className="card p-4" style={{ width: "24rem" }}>
                <h1 className="text-center mb-4" style={{ color: "white" }}>
                    Profil użytkownika
                </h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <form>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={editMode ? newEmail : email}
                            onChange={e => setNewEmail(e.target.value)}
                            readOnly={!editMode}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="login">Login</label>
                        <input
                            type="text"
                            className="form-control"
                            id="login"
                            value={editMode ? newUsername : username}
                            onChange={e => setNewUsername(e.target.value)}
                            readOnly={!editMode}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">Hasło</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={editMode ? newPassword : ""}
                            onChange={e => setNewPassword(e.target.value)}
                            placeholder={editMode ? "Nowe hasło" : "********"}
                            readOnly={!editMode}
                        />
                    </div>
                    {editMode ? (
                        <>
                            <button type="button" className="btn btn-success w-100 mb-2" onClick={handleSave}>
                                Zapisz zmiany
                            </button>
                            <button type="button" className="btn btn-secondary w-100" onClick={() => setEditMode(false)}>
                                Anuluj
                            </button>
                        </>
                    ) : (
                        <button type="button" className="btn btn-warning w-100" onClick={() => setEditMode(true)}>
                            Edytuj profil
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Profile;