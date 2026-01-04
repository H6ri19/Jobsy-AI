import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import DashboardLayout from '../components/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, PlayCircle, Brain } from 'lucide-react';

const InterviewPrep = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const [level, setLevel] = useState('easy');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const startPreparation = async () => {
    try {
      setLoading(true);
      setError('');
      setQuestions([]);

      const res = await axiosInstance.post(
        API_PATHS.INTERVIEW.PREP_BY_LEVEL(resumeId),
        { level }
      );

      setQuestions(res.data.questions || []);
    } catch (err) {
      setError('Failed to load interview preparation questions');
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
            <Brain className="text-violet-600" size={22} />
            Interview Preparation
          </h1>
        </div>

        {/* Introduction / Rules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-violet-50 border border-violet-100 rounded-xl p-5 mb-6"
        >
          <h3 className="font-semibold mb-2">How this works</h3>
          <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
            <li>Questions are generated from your resume and role.</li>
            <li>Select a difficulty level before starting.</li>
            <li>Answer honestly — this prepares you for real interviews.</li>
            <li>You can proceed to a live AI interview after preparation.</li>
          </ul>
        </motion.div>

        {/* Difficulty Selector */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border px-4 py-2 rounded-lg bg-white shadow-sm"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="veryhard">Very Hard</option>
            <option value="extreme">Extreme</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={startPreparation}
            disabled={loading}
            className={`relative overflow-hidden bg-violet-600 text-white px-6 py-2 rounded-lg font-semibold shadow
            ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-violet-700'
            }`}
          >
            {loading ? 'Preparing...' : 'Start Preparation'}
            {!loading && (
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
              translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"
              />
            )}
          </motion.button>
        </div>

        {/* Difficulty Meaning */}
        <div className="text-sm text-gray-600 mb-6">
          <strong>Level Guide:</strong> Easy – Basics • Medium – Practical •
          Hard – Scenario-based • Very Hard – Advanced • Extreme – Expert-level
        </div>

        {/* Error */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Questions */}
        <AnimatePresence>
          {questions.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {questions.map((q, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white shadow-md rounded-lg p-4"
                >
                  <strong>Q{index + 1}:</strong> {q}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Start Live Interview */}
        {questions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/interview/live/${resumeId}`)}
              className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-green-700"
            >
              <PlayCircle size={20} />
              Start Live Interview
            </motion.button>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
