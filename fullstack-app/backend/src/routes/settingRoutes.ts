import { Router } from "express";
import { getSettings, updateSettings } from "../controllers/settingController";

const router = Router();
router.get("/", getSettings);
router.patch("/update", updateSettings);

export default router;