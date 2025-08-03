import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import extractRoute from "./routes/extract";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/extract", extractRoute);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
