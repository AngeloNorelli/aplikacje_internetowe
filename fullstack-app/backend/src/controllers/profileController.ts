import { Response, Request } from "express";
import { User } from "../model/User";

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
            password: user.password // tylko do testów!
        });
    } catch {
        res.status(500).json({ message: "Server error" });
    }
};