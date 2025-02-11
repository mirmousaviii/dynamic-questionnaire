export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5011/api/v1';

// Fetch all questionnaires
export async function fetchQuestionnaires() {
  const response = await fetch(`${API_URL}/questionnaires`);
  if (!response.ok) {
    throw new Error('Failed to fetch questionnaires');
  }
  return response.json();
}

// Fetch a single questionnaire by ID
export async function fetchQuestionnaireById(id: string) {
  const response = await fetch(`${API_URL}/questionnaires/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch questionnaire details');
  }
  return response.json();
}

// Submit responses for a questionnaire
export async function submitResponses(
  questionnaireId: string,
  responses: { questionId: string; answer: string }[]
) {
  const response = await fetch(
    `${API_URL}/questionnaires/${questionnaireId}/responses`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionnaireId, responses }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to submit responses');
  }

  return response.json();
}
