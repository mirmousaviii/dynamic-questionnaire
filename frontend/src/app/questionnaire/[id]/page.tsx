'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchQuestionnaireById, submitResponses } from '@/services/api';
import { Questionnaire, Question } from '@/types';

export default function QuestionnaireDetail() {
  const { id } = useParams();
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(
    null
  );
  const [responses, setResponses] = useState<{ questionId: string; answer: string }[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchQuestionnaireById(id as string)
        .then(setQuestionnaire)
        .catch((err) => setError(err.message));
    }
  }, [id]);

  const handleChange = (questionId: string, value: string) => {
    setResponses((prev) => {
      const updatedResponses = prev.filter((resp) => resp.questionId !== questionId);
      return [...updatedResponses, { questionId, answer: value }];
    });
  };

  const handleSubmit = async () => {
    try {
      await submitResponses(id as string, responses);
      alert("Responses submitted successfully!");
    } catch {
      setError("Failed to submit responses");
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!questionnaire) return <p>Loading...</p>;

  const steps = questionnaire.steps;
  const currentStep = steps[stepIndex];
   
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">{questionnaire.title}</h1>
      <p className="text-gray-600">{questionnaire.description}</p>

      <div className="mt-6 p-4 border rounded-lg shadow">
        <h2 className="text-lg font-semibold">{currentStep.title}</h2>
        <form className="mt-4 space-y-4">
          {currentStep.questions.map((q: Question) => (
            <div key={q.id}>
              <label className="block font-medium">{q.question}</label>
              {q.type === "text" ? (
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  value={responses.find((resp) => resp.questionId === q.id)?.answer || ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                />
              ) : q.type === "radio" ? (
                q.options?.map((option: string) => (
                  <label key={option} className="block">
                    <input
                      type="radio"
                      name={q.id}
                      value={option}
                      checked={responses.find((resp) => resp.questionId === q.id)?.answer === option}
                      onChange={() => handleChange(q.id, option)}
                    />{" "}
                    {option}
                  </label>
                ))
              ) : null}
            </div>
          ))}
        </form>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          className="p-2 bg-gray-300 rounded"
          disabled={stepIndex === 0}
          onClick={() => setStepIndex((prev) => prev - 1)}
        >
          Previous
        </button>
        {stepIndex < steps.length - 1 ? (
          <button
            className="p-2 bg-blue-500 text-white rounded"
            onClick={() => setStepIndex((prev) => prev + 1)}
          >
            Next
          </button>
        ) : (
          <button
            className="p-2 bg-green-500 text-white rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </main>
  );
}