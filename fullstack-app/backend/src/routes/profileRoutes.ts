import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/profileController";

const router = Router();
router.get("/", getProfile);
router.patch("/update", updateProfile);

export default router;