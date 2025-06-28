import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../api/profile";
import { useToast } from "../context/ToastContext";
import { useLanguage } from "../context/LanguageContext";
import { useFontSize } from "../context/FontSizeProvicer";


const translations = {
    pl: {
        userProfile: "Profil użytkownika",
        editProfile: "Edytuj profil",
        saveChanges: "Zapisz zmiany",
        returnToDashboard: "Powrót na główny panel",
        cancel: "Anuluj",
        newPassword: "Nowe hasło",
        password: "Hasło",
    },
    en: {
        userProfile: "User profile",
        editProfile: "Edit profile",
        saveChanges: "Save changes",
        returnToDashboard: "Return to dashboard",
        cancel: "Cancel",
        newPassword: "New password",
        password: "Password",
    },
};
const Profile: React.FC = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [editMode, setEditMode] = useState(false);

    const [newEmail, setNewEmail] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");

    const { setErrorMessage } = useToast();
    const { setSuccessMessage } = useToast();
    const { language } = useLanguage();
    const { fontSize } = useFontSize();


    const navigate = useNavigate();

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
                <h1 className="text-center mb-4" style={{ color: "white"}}>
                    {translations[language].userProfile}
                </h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <form>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email"  style={{ fontSize: fontSize}}>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            style={{ fontSize: fontSize}}
                            value={editMode ? newEmail : email}
                            onChange={e => setNewEmail(e.target.value)}
                            readOnly={!editMode}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="login" style={{ fontSize: fontSize}}>Login</label>
                        <input
                            type="text"
                            className="form-control"
                            id="login"
                            style={{ fontSize: fontSize}}
                            value={editMode ? newUsername : username}
                            onChange={e => setNewUsername(e.target.value)}
                            readOnly={!editMode}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="password" style={{ fontSize: fontSize}}>{translations[language].password}</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            style={{ fontSize: fontSize}}
                            value={editMode ? newPassword : ""}
                            onChange={e => setNewPassword(e.target.value)}
                            placeholder={editMode ? "Nowe hasło" : "********"}
                            readOnly={!editMode}
                        />
                    </div>
                    {editMode ? (
                        <>
                            <button type="button" className="btn btn-success w-100 mb-2" style={{ fontSize: fontSize}}onClick={handleSave}>
                                {translations[language].saveChanges}
                            </button>
                            <button type="button" className="btn btn-secondary w-100" style={{ fontSize: fontSize}}onClick={() => setEditMode(false)}>
                                {translations[language].cancel}
                            </button>
                        </>
                    ) : (
                        <button type="button" className="btn btn-warning w-100" style={{ fontSize: fontSize}}onClick={() => setEditMode(true)}>
                            {translations[language].editProfile}
                        </button>
                    )}
                </form>
                <button
                    type="button"
                    className="btn btn-light w-100 mt-3"
                    onClick={() => navigate("/dashboard")}
                >
                    {translations[language].returnToDashboard}
                </button>
            </div>
        </div>
    );
};

export default Profile;