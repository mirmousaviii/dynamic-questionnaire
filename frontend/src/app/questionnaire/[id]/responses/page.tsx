"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchResponsesByQuestionnaire } from "@/services/api";
import { Questionnaire } from "@/types";

export default function QuestionnaireResponses() {
  const { id } = useParams();
  const [responses, setResponses] = useState<Questionnaire[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchResponsesByQuestionnaire(id as string)
        .then(setResponses)
        .catch((err) => setError(err.message));
    }
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!responses.length) return <p>Loading responses...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Responses</h1>

      <div className="mt-6 p-4 border rounded-lg shadow">
        {responses.map((response: Questionnaire, index: number) => (
          <div key={index} className="p-3 border-b">
            <h2 className="font-semibold">{response.question}</h2>
            <ul className="ml-4">
              {response.responses.map((res: any, i: number) => (
                <li key={i} className="text-gray-600">
                  {res.answer} <span className="text-xs text-gray-400">({new Date(res.createdAt).toLocaleString()})</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
