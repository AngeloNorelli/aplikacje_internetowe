import express from 'express';
import { setUserRoutes } from './routes/userRoutes';
import { connectToDatabase } from "./database";

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(express.json());

connectToDatabase();

setUserRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});