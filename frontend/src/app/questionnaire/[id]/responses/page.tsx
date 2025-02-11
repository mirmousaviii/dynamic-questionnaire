'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchResponsesByQuestionnaire } from '@/services/api';
import Link from 'next/link';
import { ResponsesData } from '@/types';

export default function QuestionnaireResponses() {
  const { id } = useParams();

  const [responses, setResponses] = useState<ResponsesData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchResponsesByQuestionnaire(id as string)
      .then((data) => setResponses(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!responses.length) return <p>Loading responses...</p>;

  return (
    <main className="p-6">
      <h3 className="block mt-6 font-semibold text-blue-500 float-left">Responses</h3>

      {/* Link to back */}
      <span className="block mt-6 font-semibold text-gray-600 float-right">
        {/* link to the questioner */}
        <Link href={`/questionnaire/${id}`}>Back</Link>
      </span>
      <div className="clear-both"></div>


      <div className="mt-6 p-4 border rounded-lg shadow">
        {responses.map((response, index) => (
          <div key={index} className="p-3 border-b">
            <h2 className="font-semibold">
              {response.question || 'No question title'}
            </h2>
            <ul className="ml-4">
              {response.responses.map(
                (res: { answer: string; createdAt: string }, i: number) => (
                  <li key={i} className="text-gray-600">
                    {res.answer || 'No answer title'}{' '}
                    <span className="text-xs text-gray-400">
                      ({new Date(res.createdAt).toLocaleString()})
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
