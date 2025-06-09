import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "Twoja MaMa" });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});