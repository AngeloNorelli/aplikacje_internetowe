import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { User } from "../model/User";

const oauth = Router();

oauth.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"],
}));

oauth.get("/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    const user = req.user as User;
    const token = jwt.sign({ 
      id: user.id, 
      username: user.username, 
      email: user.email,
      theme: user.theme,
      font_size: user.font_size,
      language: user.language
    }, process.env.JWT_SECRET!, { expiresIn: "6h" });

    res.redirect(`http://localhost:5173/auth/google/callback?token=${token}`);
  }
);

oauth.get("/github", passport.authenticate("github", {
  scope: ["user:email"],
}));

oauth.get("/github/callback",
  passport.authenticate("github", { session: false, failureRedirect: "/" }),
  (req, res) => {
    const user = req.user as User;
    const token = jwt.sign({ 
      id: user.id, 
      username: user.username, 
      email: user.email,
      theme: user.theme,
      font_size: user.font_size,
      language: user.language
    }, process.env.JWT_SECRET!, { expiresIn: "6h" });

    res.redirect(`http://localhost:5173/auth/github/callback?token=${token}`);
  }
);

export default oauth;