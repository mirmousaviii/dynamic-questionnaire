"use client";

import { useEffect, useState } from "react";
import { fetchQuestionnaires } from "@/services/api";

export default function Home() {
  const [questionnaires, setQuestionnaires] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuestionnaires()
      .then(setQuestionnaires)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Questionnaires</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {questionnaires.map((q) => (
          <li key={q.questionnaire_id} className="p-4 border rounded-lg shadow">
            <h2 className="text-lg font-semibold">{q.title}</h2>
            <p className="text-gray-600">{q.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
