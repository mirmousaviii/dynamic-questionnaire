import { Router } from "express";
import { getQuestionnaires } from "../controllers/questionnaire.controller";

const router = Router();

// Route: GET /api/v1/questionnaires
router.get("/", getQuestionnaires);

export default router;
