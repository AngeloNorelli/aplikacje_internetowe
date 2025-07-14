import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/profileController";
import { verifyJWTandUser } from "../middleware/auth";

const router = Router();
router.get("/", verifyJWTandUser, getProfile);
router.patch("/update", verifyJWTandUser, updateProfile);

export default router;