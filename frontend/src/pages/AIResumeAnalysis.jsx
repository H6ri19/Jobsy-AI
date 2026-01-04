import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import DashboardLayout from '../components/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';

const AIResumeAnalysis = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const runAnalysis = async () => {
    try {
      setLoading(true);
      setError('');
      setAnalysis(null);

      const res = await axiosInstance.post(
        API_PATHS.AI.ANALYZE_RESUME(resumeId)
      );

      setAnalysis(res.data.analysis);
    } catch (err) {
      setError('Failed to analyze resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-700"
          >
            <ArrowLeft size={16} />
            Back
          </motion.button>

          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="text-violet-600" size={22} />
            AI Resume Analysis
          </h1>
        </div>

        {/* Action Button */}
        <motion.button
          onClick={runAnalysis}
          disabled={loading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`relative overflow-hidden bg-violet-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg
          ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-violet-700'}`}
        >
          {loading ? 'Analyzing...' : 'Run AI Resume Analysis'}

          {/* Shimmer */}
          {!loading && (
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
            translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"
            />
          )}
        </motion.button>

        {/* Status */}
        {error && <p className="text-red-500 mt-4 font-medium">{error}</p>}

        {/* Result */}
        <AnimatePresence>
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 space-y-5"
            >
              <AnalysisSection title="Strengths" items={analysis.strengths} />
              <AnalysisSection title="Weaknesses" items={analysis.weaknesses} />
              <AnalysisSection
                title="Missing Skills"
                items={analysis.missingSkills}
              />
              <AnalysisSection
                title="Suggested Roles"
                items={analysis.suggestedRoles}
              />
              <AnalysisSection
                title="Interview Questions"
                items={analysis.interviewQuestions}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

const AnalysisSection = ({ title, items }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-xl shadow-md p-5 border border-gray-100"
  >
    <h3 className="font-semibold text-lg mb-3">{title}</h3>
    <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
      {items?.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </motion.div>
);

export default AIResumeAnalysis;
