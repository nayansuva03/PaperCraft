import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { generateContent } from "../../services/generateContent";
import { setGeneratedContent, setLoading, setBackgroundImage } from "../../Redux/pdfSlice";
import Loading from "../pages/Loading";

function ExamPaperOptions() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Text = useSelector((state) => state.pdf.UsableExtractedText);
  const isLoading = useSelector((state) => state.pdf.isLoading);


  const [formData, setFormData] = useState({
    instituteName: "",
    bgImage: null,
    courseStandard: "",
    subject: "",
    timeDuration: "",
    totalMarks: "",
    difficulty: "Medium",
    questionTypes: {
      mcq: { checked: false, extra: 0 },        // Changed extra to numeric state
      trueFalse: { checked: false, extra: 0 },  // Changed extra to numeric state
      oneLiner: { checked: false, extra: 0 },   // Changed extra to numeric state
      longQuestion: { checked: false, extra: 0 },// Changed extra to numeric state
    },
  });

  // Handle standard text, number, and select input adjustments
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Handle image/media file targets safely
  function handleFileChange(e) {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  }

  // Handle nested matrix checkbox evaluations
  function handleCheckboxChange(type, field) {
    setFormData((prev) => {
      const nextCheckedValue = !prev.questionTypes[type][field];
      return {
        ...prev,
        questionTypes: {
          ...prev.questionTypes,
          [type]: {
            ...prev.questionTypes[type],
            [field]: nextCheckedValue,
            // Automatically clear extra count back to 0 if unchecked
            extra: nextCheckedValue ? prev.questionTypes[type].extra : 0,
          },
        },
      };
    });
  }

  // NEW: Handles changes for the extra questions counter with a strict max cap of 5
  function handleExtraCountChange(type, value) {
    if (value === "") {
      setFormData((prev) => ({
        ...prev,
        questionTypes: {
          ...prev.questionTypes,
          [type]: { ...prev.questionTypes[type], extra: "" },
        },
      }));
      return;
    }

    let numValue = parseInt(value, 10);
    if (numValue > 5) numValue = 5; // Cap maximum at 5
    if (numValue < 0) numValue = 0; // Prevent negative inputs

    setFormData((prev) => ({
      ...prev,
      questionTypes: {
        ...prev.questionTypes,
        [type]: {
          ...prev.questionTypes[type],
          extra: numValue,
        },
      },
    }));
  }

  function handleSubmit(e) {
  e.preventDefault();

  if (
    !formData.instituteName ||
    !formData.subject ||
    !formData.totalMarks
  ) {
    alert(
      "Please fill Institute Name, Subject and Total Marks."
    );
    return;
  }

  const hasQuestionType = Object.values(
    formData.questionTypes
  ).some((q) => q.checked);

  if (!hasQuestionType) {
    alert("Please select at least one question type.");
    return;
  }

  handleFinalFunction();
}

  function fileToBase64(file){
    return new Promise((resolve, reject)=>{
      const reader = new FileReader();
      reader.onload =() => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    })
  }

  async function handleFinalFunction() {
    const prompt = `
You MUST return ONLY valid JSON. Do NOT include any markdown, code blocks, or extra text.

Create an exam paper with the following configuration:
- Institute Name: ${formData.instituteName}
- Course / Standard: ${formData.courseStandard}
- Subject: ${formData.subject}
- Time Duration: ${formData.timeDuration}
- Total Marks: ${formData.totalMarks}

Generate questions based on this text:
${Text}

Return ONLY this JSON structure, nothing else:
{
  "exam_header": {
    "institute_name": "${formData.instituteName}",
    "course_standard": "${formData.courseStandard}",
    "subject": "${formData.subject}",
    "time_duration": "${formData.timeDuration}",
    "total_marks": ${formData.totalMarks},
    "difficulty": "${formData.difficulty}"
  },
  "questions": [
    {
      "id": 1,
      "question_text": "Question text here",
      "question_type": "mcq",
      "marks": 1,
      "options": ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"]
    }
  ],
  "answer_key": [
    {
      "id": 1,
      "answer": "B",
      "explanation": "Explanation here"
    }
  ]
}

Important Rules:
1. Include MCQs: ${formData.questionTypes.mcq.checked} (${formData.questionTypes.mcq.extra} extra)
2. Include True/False: ${formData.questionTypes.trueFalse.checked} (${formData.questionTypes.trueFalse.extra} extra)
3. Include One Liner: ${formData.questionTypes.oneLiner.checked} (${formData.questionTypes.oneLiner.extra} extra)
4. Include Long Questions: ${formData.questionTypes.longQuestion.checked} (${formData.questionTypes.longQuestion.extra} extra)
5. For each question type, set question_type field to: "mcq", "true_false", "one_liner", or "long_question"
6. Return ONLY the JSON. No explanations, no markdown backticks.
`;

    try {
      dispatch(setLoading(true));
      console.log(prompt);

      // Convert background image to Base64 if provided
      let backgroundImageBase64 = null;
      if (formData.bgImage) {
        try {
          backgroundImageBase64 = await fileToBase64(formData.bgImage);
          console.log("Background image converted to Base64");
          dispatch(setBackgroundImage(backgroundImageBase64));
        } catch (error) {
          console.warn("Could not convert background image:", error);
        }
      }

      const result = await generateContent(prompt);
      console.log("Result from Gemini:", result);

      // Add background image to the result
      dispatch(setGeneratedContent({
        questions: result,
      }));

      navigate("/examPaperDownload");
    } catch (err) {
      console.error(err);
      alert("Failed to generate exam paper.");
    } finally {
      dispatch(setLoading(false));
    }
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loading />
      </div>
    );
  }


  return (
    <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl w-full max-w-2xl border border-slate-100 animate-in fade-in duration-200">
      <NavLink to="/HomeOptions" className="text-slate-400 hover:text-slate-600 font-semibold text-xs flex items-center gap-1 mb-6 transition-colors">
        ← Back
      </NavLink>

      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-slate-800">Exam Paper Parameters</h2>
        <p className="text-slate-500 text-sm mt-1">Configure structural layout properties and content metrics for evaluation.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Core Identity Parameters Context Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-slate-700 font-bold text-sm mb-1.5">Institute Name</label>
            <input
              type="text"
              name="instituteName"
              value={formData.instituteName}
              onChange={handleInputChange}
              placeholder="e.g. Stanford University or ABC High School"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 text-sm font-medium transition-shadow"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold text-sm mb-1.5">Background Watermark / Image</label>
            <input
              type="file"
              name="bgImage"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 cursor-pointer border border-slate-200 p-1 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold text-sm mb-1.5">Course / Standard</label>
            <input
              type="text"
              name="courseStandard"
              value={formData.courseStandard}
              onChange={handleInputChange}
              placeholder="e.g. B.Tech Semester IV or Class 12"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 text-sm font-medium transition-shadow"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold text-sm mb-1.5">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="e.g. Database Management Systems"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 text-sm font-medium transition-shadow"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold text-sm mb-1.5">Time Duration</label>
            <input
              type="text"
              name="timeDuration"
              value={formData.timeDuration}
              onChange={handleInputChange}
              placeholder="e.g. 3 Hours or 90 Mins"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 text-sm font-medium transition-shadow"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold text-sm mb-1.5">Total Marks</label>
            <input
              type="number"
              name="totalMarks"
              value={formData.totalMarks}
              onChange={handleInputChange}
              placeholder="e.g. 70 or 100"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 text-sm font-medium transition-shadow"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-slate-700 font-bold text-sm mb-1.5">Difficulty Profile</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 text-sm font-medium bg-white transition-shadow"
            >
              <option value="Easy">Easy (Conceptual Fundamentals)</option>
              <option value="Medium">Medium (Balanced Analysis)</option>
              <option value="Hard">Hard (Complex Architecture Problems)</option>
            </select>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Specialized Structural Checkbox Selection Layer */}
        <div>
          <label className="block text-slate-700 font-bold text-sm mb-3">Questions Structural Configuration Matrix</label>
          <div className="bg-slate-50 rounded-2xl border border-slate-200 divide-y divide-slate-200 overflow-hidden">

            {[
              { id: "mcq", label: "MCQs" },
              { id: "trueFalse", label: "True / False" },
              { id: "oneLiner", label: "One Liner Questions" },
              { id: "longQuestion", label: "Long Questions" },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50/50 hover:bg-white transition-colors duration-150">
                {/* Main Checkbox Context */}
                <label className="flex items-center gap-3 cursor-pointer select-none font-semibold text-slate-700 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.questionTypes[item.id].checked}
                    onChange={() => handleCheckboxChange(item.id, "checked")}
                    className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 transition-colors"
                  />
                  {item.label}
                </label>

                {/* MODIFIED: Replaced Sub-Checkbox with Number Input field (max 5) */}
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-medium transition-colors duration-150 ${formData.questionTypes[item.id].checked ? "text-slate-600" : "text-slate-300"
                      }`}
                  >
                    Extra / Optional count:
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    disabled={!formData.questionTypes[item.id].checked}
                    value={formData.questionTypes[item.id].extra}
                    onChange={(e) => handleExtraCountChange(item.id, e.target.value)}
                    className="w-14 px-2 py-1 text-center text-xs font-bold rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white disabled:bg-slate-100 disabled:text-slate-300 transition-all shadow-sm"
                  />
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Process Initiation Action Engine Button */}
        <button
          type="submit"
          className="w-full mt-2 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          Generate Exam Paper 🚀
        </button>
      </form>
    </div>
  );
}

export default ExamPaperOptions;