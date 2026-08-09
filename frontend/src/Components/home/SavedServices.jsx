import { useEffect, useState } from "react";
import { useSelector, useNavigate } from "react-router-dom";

function SavedServices() {
  const isLoggedIn = useSelector(
    (state) => state.user.isLoggedIn
  );

  const navigate = useNavigate();

  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn) return;

    async function fetchSavedPdfs() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/saved-pdfs`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch saved PDFs"
          );
        }

        setPdfs(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSavedPdfs();
  }, [isLoggedIn]);

  async function handleDelete(id) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/saved-pdfs/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete PDF"
        );
      }

      setPdfs((current) =>
        current.filter((pdf) => pdf._id !== id)
      );
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  if (!isLoggedIn) {
    return (
      <div>
        <h2>Feature Locked</h2>

        <p>
          Please sign in to use Saved Services.
        </p>

        <button onClick={() => navigate("/signIn")}>
          Sign In
        </button>
      </div>
    );
  }

  if (loading) {
    return <p>Loading saved PDFs...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (pdfs.length === 0) {
    return (
      <div>
        <h2>No saved PDFs yet</h2>
        <p>
          Generate a Max Question paper, Exam Paper,
          or Quiz Result and it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Saved Services</h1>

      <div>
        {pdfs.map((pdf) => (
          <div key={pdf._id}>
            <h2>{pdf.title}</h2>

            <p>{pdf.type}</p>

            <p>
              {new Date(
                pdf.createdAt
              ).toLocaleDateString()}
            </p>

            <a
              href={pdf.cloudinaryUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View PDF
            </a>

            <button
              onClick={() =>
                handleDelete(pdf._id)
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedServices;