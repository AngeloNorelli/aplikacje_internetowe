import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { User } from "../model/User";

const googleRoutes = Router();

googleRoutes.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"],
}));

googleRoutes.get("/google/callback",
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

export default googleRoutes;