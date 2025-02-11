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
export const getQuestionnaireById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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

// Store individual responses
export const submitResponses = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { questionnaireId, responses } = req.body;

  try {
    const createdResponses = await prisma.$transaction(
      responses.map(
        ({ questionId, answer }: { questionId: string; answer: string }) =>
          prisma.response.create({
            data: {
              questionId,
              answer,
            },
          })
      )
    );

    res.status(201).json({
      message: "Responses saved successfully",
      responses: createdResponses,
    });
  } catch (error) {
    console.error("Error saving responses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fetch responses by questionnaire ID
export const getResponsesByQuestionnaire = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    // Fetch questions and responses for the given questionnaire
    const questions = await prisma.question.findMany({
      where: { step: { questionnaireId: id } },
      include: { responses: true },
    });

    const formattedResponses = questions.map((question) => ({
      question: question.question,
      responses: question.responses.map((response) => ({
        answer: response.answer,
        createdAt: response.createdAt,
      })),
    }));

    res.json(formattedResponses);
  } catch (error) {
    console.error("Error fetching responses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
