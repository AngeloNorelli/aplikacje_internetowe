import { Router } from "express";
import * as Notes from "../controllers/notesController";
import { verifyJWTandUser } from "../middleware/auth";

const router = Router();

router.get("/", verifyJWTandUser, Notes.getNotesList);
router.post("/", verifyJWTandUser, Notes.createNote);
router.put("/", verifyJWTandUser, Notes.updateNote);
router.patch("/", verifyJWTandUser, Notes.changeNoteTitle);
router.delete("/", verifyJWTandUser, Notes.deleteNote);

export default router;