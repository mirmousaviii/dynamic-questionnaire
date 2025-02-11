import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch all questionnaires
export const getQuestionnaires = async (req: Request, res: Response) => {
  try {
    const questionnaires = await prisma.questionnaire.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        totalSteps: true,
      },
    });

    res.json(questionnaires);
  } catch (error) {
    console.error("Error fetching questionnaires:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fetch questionnaire details by ID
export const getQuestionnaireById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const questionnaire = await prisma.questionnaire.findUnique({
      where: { id },
      include: { steps: { include: { questions: true } } },
    });

    res.json(questionnaire);
  } catch (error) {
    console.error("Error fetching questionnaire:", error);
    next(error);
  }
};