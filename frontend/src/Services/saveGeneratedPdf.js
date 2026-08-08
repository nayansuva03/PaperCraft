import axios from "axios";

/**
 * Uploads a jsPDF document to your backend, which stores it in Cloudinary + MongoDB.
 * @param {jsPDF} doc - the jsPDF instance after content is added
 * @param {"maxquestion"|"exampaper"|"quiz"} type
 * @param {string} title
 */
export const saveGeneratedPdf = async (doc, type, title) => {
  try {
    const blob = doc.output("blob");
    const formData = new FormData();
    formData.append("pdf", blob, `${title}.pdf`);
    formData.append("type", type);
    formData.append("title", title);

    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/saved-pdfs`,
      formData,
      {
        withCredentials: true, // sends the httpOnly JWT cookie
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
  } catch (err) {
    // Don't block the user's download if saving fails silently in the background
    console.error("Auto-save to Saved Services failed:", err);
  }
};