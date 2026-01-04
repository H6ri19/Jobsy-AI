import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

const InterviewResult = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  /* ===============================
     SAFETY GUARD
  =============================== */
  if (!sessionId) {
    return (
      <div className="p-6 text-red-600 font-semibold">
        Invalid interview session. Please restart the interview.
      </div>
    );
  }

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  /* ===============================
     FETCH INTERVIEW RESULT
  =============================== */
  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axiosInstance.get(
          API_PATHS.INTERVIEW.RESULT(sessionId)
        );
        setResult(res.data);
      } catch (err) {
        alert('Failed to load interview result');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [sessionId]);

  /* ===============================
     DOWNLOAD PDF (AUTH SAFE)
  =============================== */
  const downloadPDF = async () => {
    try {
      setDownloading(true);

      const res = await axiosInstance.get(
        API_PATHS.INTERVIEW.DOWNLOAD_PDF(sessionId),
        { responseType: 'blob' } // 🔑 IMPORTANT
      );

      const blob = new Blob([res.data], {
        type: 'application/pdf',
      });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `interview_${sessionId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to download PDF');
    } finally {
      setDownloading(false);
    }
  };

  /* ===============================
     UI STATES
  =============================== */
  if (loading) return <p className="p-6">Loading result...</p>;
  if (!result) return <p className="p-6">No result found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Interview Result</h1>

      <p className="mb-4 text-lg">
        <strong>Total Score:</strong> {result.totalScore}
      </p>

      <div className="space-y-4">
        {result.answers.map((item, index) => (
          <div key={index} className="bg-white shadow p-4 rounded">
            <p>
              <strong>Q{index + 1}:</strong> {item.question}
            </p>
            <p className="mt-1">
              <strong>Your Answer:</strong> {item.answer}
            </p>
            <p className="mt-1 text-green-600">Score: {item.score}/10</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-8">
        {/* 📄 DOWNLOAD PDF */}
        <button
          onClick={downloadPDF}
          disabled={downloading}
          className="bg-violet-600 text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {downloading ? 'Downloading...' : 'Download PDF'}
        </button>

        {/* ⬅ BACK */}
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gray-600 text-white px-6 py-2 rounded"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default InterviewResult;
