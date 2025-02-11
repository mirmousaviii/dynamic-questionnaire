'use client';

import { useEffect, useState } from 'react';
import { fetchQuestionnaires } from '@/services/api';
import Link from 'next/link';
import { Questionnaire } from '@/types';

export default function Home() {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[] | null>(
    null
  );
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuestionnaires()
      .then(setQuestionnaires)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Questionnaires</h1>
      <ul className="space-y-4">
        {questionnaires?.map((q) => (
          <li key={q.id} className="p-4 border rounded-lg shadow">
            <Link
              href={`/questionnaire/${q.id}`}
              className="text-lg font-semibold hover:underline"
            >
              {q.title}
            </Link>
            <p className="text-gray-600">{q.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
