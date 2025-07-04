import express from "express";
import cors from "cors";
import { connectToDatabase } from "./db/database";
import authRoutes from "./routes/authRoutes";
import notesRoutes from "./routes/notesRoutes";
import profileRoutes from "./routes/profileRoutes";
import settingRoutes from "./routes/settingRoutes";

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
}));

connectToDatabase();

app.use(express.json());
app.use("/", authRoutes);
app.use("/notes", notesRoutes);
app.use("/profile", profileRoutes);
app.use("/settings", settingRoutes);

app.get("/", (req, res) => {
  res.json({ status: "Twoja MaMa" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});