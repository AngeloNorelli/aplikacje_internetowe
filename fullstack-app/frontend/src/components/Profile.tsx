import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/profile";
import { useToast } from "../context/ToastContext";
import { useSettings } from "../context/SettingsContext";
import Navbar from "./dashboard/Navbar";
import { setToken } from "../api/auth";
import translations from "../assets/translations";

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
    const { language } = useSettings();
    const { fontSize } = useSettings();

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

  useEffect(() => {
    document.title = "2Note - Profile";
  }, []);

    const handleSave = async () => {
        setError("");
        const token = localStorage.getItem("token") as string;
        if (!token) setErrorMessage(translations[language].noTokenError);
        try {
          const data = await updateProfile(token, newEmail, newUsername, newPassword) as any;
          setToken(data.token);
          setSuccessMessage(translations[language].updatePrifleSuccess);
        } catch (error) {
          console.error("Update profile error:", error);
          setErrorMessage(translations[language].updateProfileError);
        }        
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-primary">
            <div className="w-25">
                <Navbar />
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
                        <label className="form-label" htmlFor="password" style={{ fontSize: fontSize}}>{translations[language].passwordBig}</label>
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
                                {translations[language].cancelBig}
                            </button>
                        </>
                    ) : (
                        <button type="button" className="btn btn-warning w-100" style={{ fontSize: fontSize}}onClick={() => setEditMode(true)}>
                            {translations[language].editProfile}
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Profile;