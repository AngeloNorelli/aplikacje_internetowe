import { Express } from "express";
import { getUsers, createUser } from "../controller/userController";

export function setUserRoutes(app: Express) {
  app.get("/users", getUsers);
  app.post("/users", createUser);
}