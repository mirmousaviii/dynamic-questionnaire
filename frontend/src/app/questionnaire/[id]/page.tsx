"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchQuestionnaireById, submitResponses } from "@/services/api";
import Link from "next/link";
import { Questionnaire, Question } from "@/types";

export default function QuestionnaireDetail() {
  const { id } = useParams();
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);
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

      // Reset the form
      setResponses([]);
      setStepIndex(0);

    } catch {
      setError("Failed to submit responses");
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!questionnaire) return <p className="text-center text-gray-600">Loading...</p>;

  const steps = questionnaire.steps;
  const currentStep = steps[stepIndex];

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-blue-600">{questionnaire.title}</h1>
      <p className="text-gray-600 text-center mt-2">{questionnaire.description}</p>


      <div className="block mt-6 text-sm text-gray-600 text-left clear-left">
        {/* LEFT - Step title*/}
        <span className="float-left">
            <span className="text-blue-500 font-semibold">Step ${(stepIndex + 1)} of {steps.length}:</span> <span className="font-medium">{currentStep.title}</span>
        </span>

        {/* Right - View responses */}
        <span className="float-right  font-semibold">
          <Link href={`/questionnaire/${id}/responses`}>[ View responses ]</Link>
        </span>

        <div className="clear-both"></div>
      </div>
      

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-6">
        <div
          className="bg-blue-500 h-2.5 rounded-full"
          style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>

      <div className="mt-6 p-6 border rounded-lg shadow bg-white">
        <h2 className="text-lg font-semibold">{currentStep.title}</h2>
        <form className="mt-4 space-y-6">
          {currentStep.questions.map((q: Question) => (
            <div key={q.id} className="space-y-2">
              <label className="block font-medium text-gray-700">{q.question}</label>
              {q.type === "text" ? (
                <input
                  type="text"
                  className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-400"
                  value={responses.find((resp) => resp.questionId === q.id)?.answer || ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                />
              ) : q.type === "radio" ? (
                q.options?.map((option: string) => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name={q.id}
                      value={option}
                      checked={responses.find((resp) => resp.questionId === q.id)?.answer === option}
                      onChange={() => handleChange(q.id, option)}
                      className="form-radio text-blue-500 focus:ring-2 focus:ring-blue-400"
                    />
                    <span>{option}</span>
                  </label>
                ))
              ) : null}
            </div>
          ))}
        </form>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          disabled={stepIndex === 0}
          onClick={() => setStepIndex((prev) => prev - 1)}
        >
          Previous
        </button>
        {stepIndex < steps.length - 1 ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={() => setStepIndex((prev) => prev + 1)}
          >
            Next
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </main>
  );
}
