import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import DashboardLayout from '../components/DashboardLayout';
import { ArrowLeft, Clock } from 'lucide-react';

const LiveInterview = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const [sessionId, setSessionId] = useState(null);
  const [question, setQuestion] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  /* ⏱ TIMER STATE */
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  /* ===============================
     START INTERVIEW
  =============================== */
  useEffect(() => {
    const startInterview = async () => {
      try {
        const res = await axiosInstance.post(
          API_PATHS.INTERVIEW.START(resumeId)
        );

        if (!res.data.sessionId) {
          throw new Error('Session ID not returned');
        }

        setSessionId(res.data.sessionId);
        setQuestion(res.data.question);
        setQuestionIndex(1);
        resetTimer();
      } catch (err) {
        alert('Failed to start interview');
      } finally {
        setLoading(false);
      }
    };

    startInterview();

    return () => clearInterval(timerRef.current);
  }, [resumeId]);

  /* ===============================
     TIMER LOGIC
  =============================== */
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setSeconds(0);

    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  /* ===============================
     SUBMIT ANSWER
  =============================== */
  const submitAnswer = async () => {
    if (!answer.trim()) {
      alert('Please enter an answer');
      return;
    }

    try {
      setSubmitting(true);

      const res = await axiosInstance.post(
        API_PATHS.INTERVIEW.ANSWER(sessionId),
        { answer }
      );

      if (res.data.completed) {
        clearInterval(timerRef.current);
        navigate(`/interview/result/${sessionId}`);
      } else {
        setQuestion(res.data.nextQuestion);
        setQuestionIndex((prev) => prev + 1);
        setAnswer('');
        resetTimer();
      }
    } catch (err) {
      alert('Failed to submit answer');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p className="p-6">Starting interview...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-700"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={16} />
            Time: <strong>{formatTime(seconds)}</strong>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2">Live Interview</h1>

        <p className="text-gray-500 mb-4">
          Question <strong>{questionIndex}</strong>
        </p>

        {/* Question */}
        <div className="bg-white shadow rounded-xl p-5 mb-6">
          <p className="font-medium text-gray-800">{question}</p>
        </div>

        {/* Answer Box */}
        <textarea
          rows={6}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full border rounded-xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-violet-400"
        />

        {/* Submit */}
        <button
          onClick={submitAnswer}
          disabled={submitting}
          className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Answer'}
        </button>
      </div>
    </DashboardLayout>
  );
};

export default LiveInterview;
