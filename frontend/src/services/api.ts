export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5011/api/v1";

export async function fetchQuestionnaires() {
  const response = await fetch(`${API_URL}/questionnaires`);
  if (!response.ok) {
    throw new Error("Failed to fetch questionnaires");
  }
  return response.json();
}