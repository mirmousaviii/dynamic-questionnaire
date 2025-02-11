'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchQuestionnaireById } from '@/services/api';
import { Questionnaire } from '@/types';

export default function QuestionnaireDetail() {
  const { id } = useParams();
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchQuestionnaireById(id as string)
        .then(setQuestionnaire)
        .catch((err) => setError(err.message));
    }
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!questionnaire) return <p>Loading...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">{questionnaire.title}</h1>
      <p className="text-gray-600">{questionnaire.description}</p>

      <h2 className="mt-4 text-lg font-semibold">Steps</h2>
      <ul className="mt-2 space-y-4">
        {questionnaire.steps.map((step) => (
          <li key={step.id} className="p-4 border rounded-lg shadow">
            <h3 className="text-md font-semibold">{step.title}</h3>
            <ul className="mt-2">
              {step.questions.map((q) => (
                <li key={q.id} className="text-gray-700">
                  {q.question} ({q.type})
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}
