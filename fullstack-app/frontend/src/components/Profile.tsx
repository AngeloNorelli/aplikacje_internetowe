import React, { useEffect, useState } from "react";
import { getProfile } from "../api/profile";

const Profile: React.FC = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const data = await getProfile(token);
                setEmail(data.email);
                setUsername(data.username);
                setPassword(data.password);
            } catch (err) {
                // obsłuż błąd
            }
        };
        fetchProfile();
    }, []);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-primary">
            <div className="text-center mb-4">
                <div
                    className="bg-light d-inline-flex justify-content-center align-items-center"
                    style={{ width: "128px", height: "100px" }}
                >
                    <span className="fw-bold">LOGO</span>
                </div>
            </div>
            <div className="card p-4" style={{ width: "24rem" }}>
                <h1 className="text-center mb-4" style={{ color: "white" }}>
                    Profil użytkownika
                </h1>
                <form>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="login">Login</label>
                        <input
                            type="text"
                            className="form-control"
                            id="login"
                            value={username}
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">Hasło</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password} // wyświetl pobrane hasło
                            readOnly
                        />
                    </div>
                    <button type="button" className="btn btn-warning w-100">
                        Zmień hasło
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;