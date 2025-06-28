import { Response, Request } from "express";
import { User } from "../model/User";
import bcrypt from "bcrypt";

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userID = Number(req.query.user);
        if (!userID) return res.status(400).json({ message: "User ID is required." });

        const user = await User.findByPk(userID, {
            attributes: ["email", "username", "password"]
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            email: user.email,
            username: user.username,
            password: user.password
        });
    } catch {
        res.status(500).json({ message: "Server error" });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userID = Number(req.query.user);
        if (!userID) return res.status(401).json({ message: "Unauthorized" });

        const { email, username, password } = req.body;

        const existing = await User.findOne({ where: { email } });
        if (existing && existing.id !== userID) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const user = await User.findByPk(userID);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.email = email;
        user.username = username;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        await user.save();

        res.json({ message: "Profile updated" });
    } catch {
        res.status(500).json({ message: "Server error" });
    }
};