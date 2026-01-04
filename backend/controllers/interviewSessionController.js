import InterviewSession from '../models/InterviewSession.js';
import ResumeAnalysis from '../models/ResumeAnalysis.js';
import { evaluateAnswerWithAI } from '../ai/answerEvaluator.js';

export const startInterview = async (req, res) => {
  const analysis = await ResumeAnalysis.findOne({
    resumeId: req.params.resumeId,
    userId: req.user._id,
  });

  if (
    !analysis.interviewQuestions ||
    analysis.interviewQuestions.length === 0
  ) {
    return res.status(400).json({
      message: 'No interview questions found. Run resume analysis again.',
    });
  }

  const session = await InterviewSession.create({
    userId: req.user._id,
    resumeId: req.params.resumeId,
    questions: analysis.interviewQuestions.slice(0, 5),
  });

  res.json({
    sessionId: session._id,
    question: session.questions[0],
  });
};

export const submitAnswer = async (req, res) => {
  const session = await InterviewSession.findById(req.params.sessionId);

  if (!session || session.status === 'completed') {
    return res.status(404).json({ message: 'Invalid session' });
  }

  const question = session.questions[session.currentIndex];
  const { answer } = req.body;

  const evaluation = await evaluateAnswerWithAI(question, answer);

  session.answers.push({
    question,
    answer,
    feedback: evaluation.feedback,
    score: evaluation.score,
  });

  session.totalScore += evaluation.score;
  session.currentIndex++;

  if (session.currentIndex >= session.questions.length) {
    session.status = 'completed';
  }

  await session.save();

  const isCompleted = session.status === 'completed';

  res.json({
    completed: isCompleted, // ✅ REQUIRED BY FRONTEND
    status: session.status, // keep for backend
    feedback: evaluation.feedback,
    score: evaluation.score,
    nextQuestion: isCompleted ? null : session.questions[session.currentIndex],
  });
};

export const getInterviewResult = async (req, res) => {
  const session = await InterviewSession.findById(req.params.sessionId);

  if (!session) {
    return res.status(404).json({ message: 'Session not found' });
  }

  res.json({
    status: session.status,
    totalScore: session.totalScore,
    answers: session.answers,
  });
};
