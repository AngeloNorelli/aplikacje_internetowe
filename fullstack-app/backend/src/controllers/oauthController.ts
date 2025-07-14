import passport from "passport";
import { Strategy as GoogleStrategy, Profile as GoogleProfile, VerifyCallback as GoogleVerifyCallback } from "passport-google-oauth20";
import { Strategy as GitHubStrategy, Profile as GitHubProfile } from "passport-github2";
import { User } from "../model/User";
import "./oauthController";
import dotenv from "dotenv";
dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: "/auth/google/callback"
}, async (
  accessToken: string, 
  refreshToken: string, 
  profile: GoogleProfile, 
  done: GoogleVerifyCallback
) => {
  let user = await User.findOne({ where: { email: profile.emails![0].value } })
    ?? await User.create({
        username: profile.displayName,
        email: profile.emails![0].value,
        password: "",
      });
  return done(null, user);
}));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  callbackURL: "/auth/github/callback",
  scope: ["user:email"]
}, async (
  accessToken: string, 
  refreshToken: string, 
  profile: GitHubProfile, 
  done: (error: any, user?: any) => void
) => {
  const email = profile.emails?.[0]?.value;
  console.log("GitHub profile:", profile);
  if (!email) {
    return done(new Error("No email found in GitHub profile"));
  }
  let user = await User.findOne({ where: { email } })
    ?? await User.create({
        username: profile.username ?? profile.displayName ?? profile.emails![0].value,
        email: profile.emails![0].value,
        password: "",
      });
  return done(null, user);
}));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id: number, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});