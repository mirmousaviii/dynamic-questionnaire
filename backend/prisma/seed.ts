import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create sample questionnaires
  const questionnaire1 = await prisma.questionnaire.create({
    data: {
      title: "Personal Information",
      description: "A basic personal information questionnaire",
      totalSteps: 2,
      steps: {
        create: [
          {
            title: "Basic Info",
            questions: {
              create: [
                { question: "What is your name?", type: "text", options: [] },
                { question: "Where do you live?", type: "text", options: [] },
              ],
            },
          },
          {
            title: "Preferences",
            questions: {
              create: [
                {
                  question: "Do you like coffee?",
                  type: "radio",
                  options: ["Yes", "No"],
                },
                {
                  question: "What is your favorite color?",
                  type: "select",
                  options: ["Red", "Blue", "Green", "Other"],
                },
              ],
            },
          },
        ],
      },
    },
  });

  const questionnaire2 = await prisma.questionnaire.create({
    data: {
      title: "Employee Feedback Survey",
      description: "An internal feedback survey for employees",
      totalSteps: 1,
      steps: {
        create: [
          {
            title: "General Feedback",
            questions: {
              create: [
                {
                  question: "How satisfied are you with your job?",
                  type: "radio",
                  options: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied"],
                },
                {
                  question: "Any suggestions for improvement?",
                  type: "text",
                  options: [],
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("✅ Seeding complete:", questionnaire1, questionnaire2);
}

main()
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
