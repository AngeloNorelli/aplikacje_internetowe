import { Router } from "express";
import { getSettings, updateSettings } from "../controllers/settingController";
import { verifyJWTandUser } from "../middleware/auth";

const router = Router();
router.get("/", verifyJWTandUser, getSettings);
router.patch("/update", verifyJWTandUser, updateSettings);

export default router;