import { Request, Response } from "express";
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