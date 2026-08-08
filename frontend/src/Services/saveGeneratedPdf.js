export const saveGeneratedPdf = async (doc, type, title) => {
  try {
    const blob = doc.output("blob");
    const formData = new FormData();
    formData.append("pdf", blob, `${title}.pdf`);
    formData.append("type", type);
    formData.append("title", title);

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/saved-pdfs`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      },
    );

    const data = await response.json();

    console.log(data);
    
  } catch (err) {
    console.error("Auto-save to Saved Services failed:", err);
  }
};