import { Router } from "express";
import { getQuestionnaires, getQuestionnaireById } from "../controllers/questionnaire.controller";

const router = Router();

// Route: GET /api/v1/questionnaires
router.get("/", getQuestionnaires);

// Route: GET /api/v1/questionnaires/:id
router.get("/:id", getQuestionnaireById);

export default router;
