import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import DashboardLayout from '../components/DashboardLayout';
import { ArrowLeft, FileSearch } from 'lucide-react';

const ATSCheck = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const runATSCheck = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await axiosInstance.post(
        API_PATHS.RESUME.ATS_CHECK(resumeId)
      );

      setReport(res.data.atsReport);
    } catch (err) {
      setError('Failed to analyze resume');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-700 transition"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FileSearch size={16} />
            ATS Analyzer
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">ATS Resume Check</h1>

        {/* Run Button */}
        <button
          onClick={runATSCheck}
          disabled={loading}
          className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Run ATS Check'}
        </button>

        {error && <p className="mt-4 text-red-600">{error}</p>}

        {/* Report */}
        {report && (
          <div className="mt-8 space-y-6 animate-fadeIn">
            {/* SCORE */}
            <div className="bg-white shadow rounded-xl p-5">
              <h2
                className={`text-xl font-bold ${getScoreColor(
                  report.atsScore
                )}`}
              >
                ATS Score: {report.atsScore}/100
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Higher score means better compatibility with Applicant Tracking
                Systems.
              </p>
            </div>

            <Section title="ATS Issues" items={report.atsIssues} />
            <Section title="Missing Sections" items={report.missingSections} />
            <Section
              title="Improvement Suggestions"
              items={report.improvementSuggestions}
            />

            {/* KEYWORDS */}
            <div className="bg-white shadow rounded-xl p-5">
              <h3 className="font-semibold mb-3">Keyword Suggestions</h3>
              <div className="flex flex-wrap gap-2">
                {report.keywordSuggestions?.map((k, idx) => (
                  <span
                    key={idx}
                    className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm hover:scale-105 transition"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

/* ===============================
   SECTION COMPONENT
================================ */
const Section = ({ title, items = [] }) => (
  <div className="bg-white shadow rounded-xl p-5 transition hover:shadow-lg">
    <h3 className="font-semibold mb-2">{title}</h3>
    {items.length === 0 ? (
      <p className="text-gray-500 text-sm">No issues found</p>
    ) : (
      <ul className="list-disc ml-6 space-y-1 text-sm">
        {items.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
    )}
  </div>
);

export default ATSCheck;
