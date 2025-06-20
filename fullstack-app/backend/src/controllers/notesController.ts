import { Request, Response } from "express";
import { Note } from "../model/Note";

const getNotesList = async (req: Request, res: Response) => {
  const userID = Number(req.query.user);
  if (!userID) return res.status(400).json({ message: "User ID is required." });
  const notes = await Note.findAll({ where: { userID } });
  res.json(notes);
};

const createNote = async (req: Request, res: Response) => {
  const userID = Number(req.query.user);
  const { title } = req.body;
  if (!userID || !title) return res.status(400).json({ message: "User ID is required." });
  const note = await Note.create({ userID, title, note: "start writing" });
  res.status(201).json(note);
};

const updateNote = async (req: Request, res: Response) => {
  const userID = Number(req.query.user);
  const noteID = Number(req.query.note);
  const { title, content } = req.body;
  
  if (!userID || !noteID || !title || !content) {
    return res.status(400).json({ message: "Missing data." });
  }
  
  const note = await Note.findOne({ where: { id: noteID } });
  if (!note) {
    return res.status(404).json({ message: "Note not found." });
  }

  note.note = content;
  note.title = title;
  await note.save();
  res.status(200).send({ message: "Note updated successfully." });
};

const changeNoteTitle = async (req: Request, res: Response) => {
  const userID = Number(req.query.user);
  const noteID = Number(req.query.note);
  const { title } = req.body;

  if (!userID || !noteID || !title) {
    return res.status(400).json({ message: "Missing data." });
  }

  const note = await Note.findOne({ where: { id: noteID, userID } });
  if (!note) {
    return res.status(404).json({ message: "Note not found." });
  }

  note.title = title;
  await note.save();
  res.status(200).send({ success: true });
};

const deleteNote = async (req: Request, res: Response) => {
  const userID = Number(req.query.user);
  const noteID = Number(req.query.note);

  if (!userID || !noteID) {
    return res.status(400).json({ message: "User ID and Note ID are required." });
  }

  const note = await Note.findOne({ where: { id: noteID, userID } });
  if (!note) {
    return res.status(404).json({ message: "Note not found." });
  }

  await note.destroy();
  res.json({ success: true });
};

export { getNotesList, createNote, updateNote, changeNoteTitle, deleteNote };