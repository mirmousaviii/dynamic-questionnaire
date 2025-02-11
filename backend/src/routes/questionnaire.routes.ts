import { Router } from "express";
import {
  getQuestionnaires,
  getQuestionnaireById,
  getResponsesByQuestionnaire,
} from "../controllers/questionnaire.controller";
import { submitResponses } from "../controllers/questionnaire.controller";

const router = Router();

// Route: GET /api/v1/questionnaires
router.get("/", getQuestionnaires);

// Route: GET /api/v1/questionnaires/:id
router.get("/:id", getQuestionnaireById);

// Route: POST /api/v1/questionnaires/:id/responses
router.post("/:id/responses", submitResponses);

// Route: GET /api/v1/questionnaires/:id/responses
router.get("/:id/responses", getResponsesByQuestionnaire);

export default router;
