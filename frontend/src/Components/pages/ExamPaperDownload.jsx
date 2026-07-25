import React, { useState } from "react";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";

function ExamPaperDownload() {
    const generatedContent = useSelector((s) => s.pdf.generatedContent);
    const backgroundImage = useSelector((s) => s.pdf.backgroundImage);

    console.log("backgroundImage type:", typeof backgroundImage);
    console.log("backgroundImage exists:", !!backgroundImage);
    if (backgroundImage) {
        console.log("backgroundImage first 50 chars:", backgroundImage.substring(0, 50));
    }

    const [isDownloading, setIsDownloading] = useState(false);

    const examData = generatedContent?.exam_header ||
        generatedContent?.questions?.exam_header || {};

    const questionsList = Array.isArray(generatedContent?.questions)
        ? generatedContent.questions
        : generatedContent?.questions?.questions || [];

    const answerKey = generatedContent?.answer_key ||
        generatedContent?.questions?.answer_key || [];

    /**
     * Add watermark/background image with proper opacity
     * Using setProperties with opacity instead of setGlobalAlpha
     */
    function addWatermarkToPage(doc) {
        if (!backgroundImage) {
            console.warn("No background image available");
            return;
        }

        try {
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();

            // Set opacity using GState (proper jsPDF way)
            // This creates a graphics state with reduced opacity
            const gstate = new doc.GState({ opacity: 0.2 });
            doc.setGState(gstate);

            // Add image centered on page
            doc.addImage(
                backgroundImage,
                "PNG",
                pageWidth / 6,      // x position
                pageHeight / 4,     // y position
                pageWidth * 0.67,   // width (67% of page width)
                pageHeight * 0.6    // height (60% of page height)
            );

            // Reset to full opacity for text
            const gstate_text = new doc.GState({ opacity: 1 });
            doc.setGState(gstate_text);

            console.log("✅ Watermark added successfully");
        } catch (error) {
            console.error("❌ Error adding watermark:", error);
        }
    }

    /**
     * Add centered header to PDF
     */
    function addHeader(doc, examData) {
        const pageWidth = doc.internal.pageSize.getWidth();
        let y = 15;

        // Institute Name (largest, centered)
        doc.setFontSize(20);
        doc.setFont(undefined, "bold");
        doc.setTextColor(20, 20, 60);

        if (examData.institute_name) {
            const instituteName = String(examData.institute_name);
            doc.text(instituteName, pageWidth / 2, y, { align: "center" });
            y += 8;
        }

        // Subject (large, centered)
        doc.setFontSize(14);
        doc.setFont(undefined, "normal");
        doc.setTextColor(60, 60, 60);

        if (examData.subject) {
            const subject = String(examData.subject);
            doc.text(subject, pageWidth / 2, y, { align: "left" });
            y += 8;
        }

        // Course/Standard
        doc.setFontSize(10);
        doc.setFont(undefined, "normal");
        doc.setTextColor(60, 60, 60);

        const courseStandard = examData.course_standard ?
            `Course: ${examData.course_standard}` : "";

        if (courseStandard) {
            doc.text(courseStandard, pageWidth / 2, y, { align: "left" });
            y += 5;
        }

        // Exam Details
        doc.setFontSize(9);
        doc.setTextColor(80, 80, 80);

        const detailsArray = [];
        if (examData.time_duration) {
            detailsArray.push(`Duration: ${examData.time_duration}`);
        }
        if (examData.total_marks) {
            detailsArray.push(`Total Marks: ${examData.total_marks}`);
        }

        const detailsText = detailsArray.join(" | ");
        if (detailsText) {
            doc.text(detailsText, pageWidth / 2, y, { align: "right" });
            y += 6;
        }

        // Horizontal line separator
        y += 2;
        doc.setDrawColor(20, 20, 60);
        doc.setLineWidth(0.5);
        doc.line(15, y, pageWidth - 15, y);

        return y + 8;
    }

    /**
     * Generate Exam Paper PDF
     */
    async function generateExamPaperPDF() {
        try {
            setIsDownloading(true);

            const doc = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4"
            });

            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 15;
            const maxWidth = pageWidth - margin * 2;

            let y = margin;
            let pageNum = 1;

            // ========== Page 1: Add Watermark FIRST, then Header ==========
            if (backgroundImage) {
                addWatermarkToPage(doc);
            } else {
                console.warn("No background image to add");
            }

            y = addHeader(doc, examData);

            // ========== Add Questions ==========
            if (!questionsList || questionsList.length === 0) {
                doc.setFontSize(10);
                doc.setTextColor(100, 100, 100);
                doc.text("No questions generated.", margin, y);
            } else {
                doc.setFontSize(11);
                doc.setFont(undefined, "normal");
                doc.setTextColor(0, 0, 0);

                questionsList.forEach((q, index) => {
                    // Check if need new page
                    if (y > pageHeight - 30) {
                        doc.addPage();

                        // Add watermark to new page
                        if (backgroundImage) {
                            addWatermarkToPage(doc);
                        }

                        // Add small header on new pages
                        doc.setFontSize(9);
                        doc.setTextColor(150, 150, 150);
                        doc.text(
                            `${examData.subject || "Exam"} - Continued...`,
                            margin,
                            margin
                        );

                        y = margin + 10;
                        pageNum++;
                    }

                    // Question number and text
                    const questionNumber = q.id || index + 1;
                    const questionText = String(q.question_text || q.question || "");

                    doc.setFont(undefined, "bold");
                    doc.setTextColor(0, 0, 0);
                    doc.setFontSize(11);

                    const wrappedQuestion = doc.splitTextToSize(
                        `${questionNumber}. ${questionText}`,
                        maxWidth
                    );

                    doc.text(wrappedQuestion, margin, y);
                    y += wrappedQuestion.length * 6 + 2;

                    // Question type tag
                    if (q.question_type) {
                        doc.setFontSize(8);
                        doc.setFont(undefined, "italic");
                        doc.setTextColor(100, 100, 100);

                        const typeMap = {
                            "mcq": "MCQ (1 mark)",
                            "true_false": "True/False (1 mark)",
                            "one_liner": "Short Answer (2-3 marks)",
                            "long_question": "Long Answer (5+ marks)"
                        };
                        const typeLabel = typeMap[q.question_type] || q.question_type;
                        doc.text(`[${typeLabel}]`, margin + 2, y);
                        y += 4;
                    }

                    // Options (for MCQ and True/False)
                    if (q.options && Array.isArray(q.options) && q.options.length > 0) {
                        doc.setFontSize(10);
                        doc.setFont(undefined, "normal");
                        doc.setTextColor(40, 40, 40);

                        q.options.forEach((option) => {
                            if (y > pageHeight - 20) {
                                doc.addPage();
                                if (backgroundImage) {
                                    addWatermarkToPage(doc);
                                }
                                y = margin + 10;
                                pageNum++;
                            }

                            const optionText = doc.splitTextToSize(
                                `  ${option}`,
                                maxWidth - 5
                            );
                            doc.text(optionText, margin + 2, y);
                            y += optionText.length * 5 + 1;
                        });

                        y += 3;
                    } else {
                        y += 15;
                    }

                    // Marks display
                    if (q.marks) {
                        doc.setFontSize(9);
                        doc.setFont(undefined, "italic");
                        doc.setTextColor(100, 100, 100);
                        doc.text(`[${q.marks} marks]`, pageWidth - margin - 25, y - 3);
                    }

                    y += 4;
                });
            }

            // ========== Footer ==========
            const totalPages = doc.internal.pages.length - 1;
            for (let i = 1; i <= totalPages; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(150, 150, 150);
                doc.text(
                    `Page ${i} of ${totalPages}`,
                    pageWidth - margin - 20,
                    pageHeight - 10
                );
            }

            // Save PDF
            const fileName = `${examData.subject || "exam"}-questions.pdf`;
            doc.save(fileName);

            console.log("✅ Exam paper PDF generated successfully");
        } catch (error) {
            console.error("❌ Error generating exam paper:", error);
            alert("❌ Failed to download exam paper. Check console for details.");
        } finally {
            setIsDownloading(false);
        }
    }

    /**
     * Generate Answer Sheet PDF
     */
    async function generateAnswerSheetPDF() {
        try {
            setIsDownloading(true);

            const doc = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4"
            });

            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 15;
            const maxWidth = pageWidth - margin * 2;

            let y = 15;

            // ========== Header with Watermark ==========
            if (backgroundImage) {
                addWatermarkToPage(doc);
            }

            // Title
            doc.setFontSize(18);
            doc.setFont(undefined, "bold");
            doc.setTextColor(20, 20, 60);
            doc.text("ANSWER KEY", pageWidth / 2, y, { align: "center" });
            y += 8;

            // Exam Details
            doc.setFontSize(10);
            doc.setFont(undefined, "normal");
            doc.setTextColor(60, 60, 60);

            if (examData.subject) {
                doc.text(`Subject: ${examData.subject}`, pageWidth / 2, y, { align: "center" });
                y += 5;
            }

            if (examData.course_standard) {
                doc.text(`Course: ${examData.course_standard}`, pageWidth / 2, y, { align: "center" });
                y += 5;
            }

            // Separator line
            y += 2;
            doc.setDrawColor(50, 100, 200);
            doc.setLineWidth(0.5);
            doc.line(15, y, pageWidth - 15, y);
            y += 8;

            // ========== Answer Key Content ==========
            if (!answerKey || answerKey.length === 0) {
                doc.setFontSize(10);
                doc.setTextColor(100, 100, 100);
                doc.text("No answer key available.", margin, y);
            } else {
                doc.setFontSize(10);
                doc.setFont(undefined, "normal");
                doc.setTextColor(0, 0, 0);

                answerKey.forEach((item, index) => {
                    // Check if need new page
                    if (y > pageHeight - 25) {
                        doc.addPage();
                        if (backgroundImage) {
                            addWatermarkToPage(doc);
                        }
                        y = margin;
                    }

                    const questionNum = item.id || item.question_id || index + 1;

                    // Question number and answer
                    doc.setFont(undefined, "bold");
                    doc.setTextColor(0, 0, 0);

                    const answerText = `Q${questionNum}: ${item.answer || "N/A"}`;
                    doc.text(answerText, margin, y);
                    y += 6;

                    // Explanation if available
                    if (item.explanation) {
                        doc.setFont(undefined, "normal");
                        doc.setTextColor(80, 80, 80);
                        doc.setFontSize(9);

                        const explanationLines = doc.splitTextToSize(
                            `Explanation: ${item.explanation}`,
                            maxWidth
                        );

                        doc.text(explanationLines, margin + 5, y);
                        y += explanationLines.length * 5 + 3;

                        doc.setFontSize(10);
                    } else {
                        y += 2;
                    }

                    y += 2;
                });
            }

            // ========== Footer ==========
            const totalPages = doc.internal.pages.length - 1;
            for (let i = 1; i <= totalPages; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(150, 150, 150);
                doc.text(
                    `Page ${i} of ${totalPages}`,
                    pageWidth - margin - 20,
                    pageHeight - 10
                );
                doc.text(
                    `Confidential - Answer Key`,
                    margin,
                    pageHeight - 10
                );
            }

            // Save PDF
            const fileName = `${examData.subject || "exam"}-answer-key.pdf`;
            doc.save(fileName);

            console.log("✅ Answer sheet PDF generated successfully");
            alert("✅ Answer sheet downloaded successfully!");
        } catch (error) {
            console.error("❌ Error generating answer sheet:", error);
            alert("❌ Failed to download answer sheet. Check console for details.");
        } finally {
            setIsDownloading(false);
        }
    }

    // ==================== RENDER UI ====================

    if (!generatedContent) {
        return (
            <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md mx-auto text-center">
                <h1 className="text-2xl font-bold mb-3">⚠️ No Data</h1>
                <p className="text-gray-600">No exam paper data available to download.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-2xl mx-auto">
            {/* Main Title */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2 text-indigo-600">📄 Exam Paper Ready</h1>
                <p className="text-gray-500">Your exam paper is ready to download</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
                    <p className="text-gray-600 text-sm">Questions</p>
                    <p className="text-2xl font-bold text-blue-600">{questionsList.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center border border-green-200">
                    <p className="text-gray-600 text-sm">Total Marks</p>
                    <p className="text-2xl font-bold text-green-600">{examData.total_marks || 0}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center border border-purple-200">
                    <p className="text-gray-600 text-sm">Answers</p>
                    <p className="text-2xl font-bold text-purple-600">{answerKey.length}</p>
                </div>
            </div>

            {/* Exam Details */}
            {(examData.institute_name || examData.subject) && (
                <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-5 rounded-2xl mb-8 border border-slate-200">
                    <h3 className="font-bold text-slate-800 mb-3">📋 Exam Details</h3>
                    <div className="space-y-2 text-sm">
                        {examData.institute_name && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Institute:</span>
                                <span className="font-semibold text-gray-800">{examData.institute_name}</span>
                            </div>
                        )}
                        {examData.subject && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subject:</span>
                                <span className="font-semibold text-gray-800">{examData.subject}</span>
                            </div>
                        )}
                        {examData.course_standard && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Course:</span>
                                <span className="font-semibold text-gray-800">{examData.course_standard}</span>
                            </div>
                        )}
                        {examData.time_duration && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Duration:</span>
                                <span className="font-semibold text-gray-800">{examData.time_duration}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Download Buttons */}
            <div className="space-y-3 mb-6">
                {/* Exam Paper Download */}
                <button
                    onClick={generateExamPaperPDF}
                    disabled={isDownloading}
                    className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 ${isDownloading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        }`}
                >
                    {isDownloading ? (
                        <>
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Generating...
                        </>
                    ) : (
                        <>
                            <span>📥 Download Exam Paper</span>
                            <span className="text-sm">(Questions Only)</span>
                        </>
                    )}
                </button>

                {/* Answer Sheet Download */}
                <button
                    onClick={generateAnswerSheetPDF}
                    disabled={isDownloading || answerKey.length === 0}
                    className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 ${isDownloading || answerKey.length === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        }`}
                >
                    {isDownloading ? (
                        <>
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Generating...
                        </>
                    ) : answerKey.length === 0 ? (
                        <>
                            <span>🔐 Answer Sheet</span>
                            <span className="text-sm">(No Answers Available)</span>
                        </>
                    ) : (
                        <>
                            <span>🔐 Download Answer Sheet</span>
                            <span className="text-sm">({answerKey.length} Answers)</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default ExamPaperDownload;