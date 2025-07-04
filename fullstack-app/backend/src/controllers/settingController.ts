import { Response, Request } from "express";
import { User } from "../model/User";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const getSettings = async (req: Request, res: Response) => {
  try {
    const userID = Number(req.query.user);
    if (!userID) return res.status(400).json({ message: "User ID is required." });

    const user = await User.findByPk(userID, {
      attributes: ["theme", "font_size", "language"]
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      theme: user.theme,
      font_size: user.font_size,
      language: user.language
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const userID = Number(req.query.user);
    if (!userID) return res.status(401).json({ message: "Unauthorized" });

    const { theme, font_size, language } = req.body;

    const user = await User.findByPk(userID);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.theme = theme ?? user.theme;
    user.font_size = font_size ?? user.font_size;
    user.language = language ?? user.language;
    
    await user.save();

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        theme: user.theme,
        font_size: user.font_size,
        langage: user.language
      },
      JWT_SECRET,
      { expiresIn: "6h" }
    );

    res.json({ message: "Settings updated successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};