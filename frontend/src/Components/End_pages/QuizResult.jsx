import React from "react";
import { useNavigate } from "react-router-dom";
import Feedback from "../common/Feedback";


function QuizResult({ questions, userAnswers, onRestart }) {
    const navigate = useNavigate();

    // Calculate the score
    const score = questions.reduce((total, question, index) => {
        const userAnswer = userAnswers[index];
        // Convert to lowercase and trim for safer comparison
        if (
            userAnswer &&
            userAnswer.toString().trim().toLowerCase() ===
            question.answer.toString().trim().toLowerCase()
        ) {
            return total + 1;
        }
        return total;
    }, 0);

    const percentage = Math.round((score / questions.length) * 100);

    return (
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl w-full max-w-3xl border border-slate-100 animate-in fade-in duration-200">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Quiz Complete! 🎉</h2>
                <p className="text-slate-500 font-medium">Here is how you performed.</p>

                <div className="mt-6 inline-flex items-center justify-center w-32 h-32 rounded-full bg-indigo-50 border-4 border-indigo-100">
                    <div className="text-center">
                        <div className="text-3xl font-black text-indigo-600">{score}/{questions.length}</div>
                        <div className="text-xs font-bold text-indigo-400">{percentage}%</div>
                    </div>
                </div>
            </div>

            <div className="space-y-6 mb-10 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {questions.map((q, index) => {
                    const userAnswer = userAnswers[index];
                    const isCorrect =
                        userAnswer &&
                        userAnswer.toString().trim().toLowerCase() ===
                        q.answer.toString().trim().toLowerCase();
                    const isSkipped = !userAnswer;

                    return (
                        <div
                            key={index}
                            className={`p-5 rounded-2xl border-2 ${isCorrect ? "border-green-100 bg-green-50/30" : isSkipped ? "border-slate-100 bg-slate-50" : "border-red-100 bg-red-50/30"
                                }`}
                        >
                            <h3 className="font-bold text-slate-800 mb-3">
                                {index + 1}. {q.question}
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                <div className="p-3 rounded-lg bg-white border border-slate-100 shadow-sm">
                                    <span className="block text-xs font-bold text-slate-400 mb-1">Your Answer</span>
                                    <span className={`font-semibold ${isCorrect ? "text-green-600" : isSkipped ? "text-slate-400" : "text-red-500"}`}>
                                        {userAnswer ? userAnswer : "Not Answered"}
                                    </span>
                                </div>

                                <div className="p-3 rounded-lg bg-white border border-slate-100 shadow-sm">
                                    <span className="block text-xs font-bold text-slate-400 mb-1">Correct Answer</span>
                                    <span className="font-semibold text-green-600">{q.answer}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex gap-4">
                <button
                    onClick={onRestart}
                    className="flex-1 py-3.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold rounded-xl transition-all"
                >
                    Create New Quiz
                </button>
                <button
                    onClick={() => navigate("/HomeOptions")}
                    className="flex-1 py-3.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-md transition-all"
                >
                    Back to Dashboard
                </button>
            </div>
            <Feedback feedbackType="Quiz" />
        </div>
    );
}

export default QuizResult;