import { useState } from "react";
import Navbar from "./Components/common/Navbar";
import PdfUploadPage from "./Components/home/PdfUploadPage";
import About from "./Components/home/AboutPage";
import SavedServices from "./Components/home/SavedServices";
import HomeOptions from "./Components/home/HomeOptions";
import MaxQuestOption from "./Components/Option_pages/MaxQuestOption";
import OnlineQuizOptions from "./Components/Option_pages/OnlineQuizOptions";
import ExamPaperOptions from "./Components/Option_pages/ExamPaperOptions";
import MaxQuestDownload from "./Components/End_pages/MaxQuestDownload";
import ExamPaperDownload from "./Components/End_pages/ExamPaperDownload";
import QuizResult from "./Components/End_pages/QuizResult";
import OnlineQuiz from "./Components/End_pages/OnlineQuiz"
import LogIn from "./Components/common/Log_In";
import SignIn from "./Components/common/Sign_In"
import ForgotPassword from "./Components/common/Forgot_password";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-10">
        <Routes>
          <Route path="/" element={<PdfUploadPage />} />
          <Route path="/SavedServices" element={<SavedServices />} />
          <Route path="/About" element={<About />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/HomeOptions" element={<HomeOptions />} />
          <Route path="/HomeOptions/MaxQuestOption" element={<MaxQuestOption />} />
          <Route path="/HomeOptions/OnlineQuizOptions" element={<OnlineQuizOptions />} />
          <Route path="/HomeOptions/ExamPaperOptions" element={<ExamPaperOptions />} />
          <Route path="/MaxQuestDownload" element={<MaxQuestDownload />} />
          <Route path="/examPaperDownload" element={<ExamPaperDownload />} />
          <Route path="/onlinequiz" element={<OnlineQuiz />} />
          <Route path="/QuizResult" element={<QuizResult />} />
        </Routes>
      </div>
    </>
  );
}

export default App;