import { Request, Response } from "express";
import { User } from "../model/User";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        // Sprawdź, czy użytkownik już istnieje
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        // Hashowanie hasła
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tworzenie nowego użytkownika
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "User registered successfully.", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred during registration." });
    }
};