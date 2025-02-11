import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import questionnaireRoutes from "./routes/questionnaire.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Register routes
app.use("/api/v1/questionnaires", questionnaireRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Dynamic Questionnaire API is running!" });
});

export default app;
