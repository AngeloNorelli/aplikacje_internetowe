import { Router } from "express";
import * as Notes from "../controllers/notesController";

const router = Router();

router.get("/", Notes.getNotesList);
router.post("/", Notes.createNote);
router.put("/", Notes.updateNote);
router.patch("/", Notes.changeNoteTitle);
router.delete("/", Notes.deleteNote);

export default router;