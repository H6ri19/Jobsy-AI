import ResumeAnalysis from '../models/ResumeAnalysis.js';
import Resume from '../models/Resume.js';
import { generatePrepQuestions } from '../ai/prepQuestionGenerator.js';
import PrepHistory from '../models/PrepHistory.js';

// export const getInterviewPrep = async (req, res) => {
//   try {
//     const analysis = await ResumeAnalysis.findOne({
//       resumeId: req.params.resumeId,
//       userId: req.user._id,
//     });

//     if (!analysis) {
//       return res.status(404).json({
//         message: 'Resume analysis not found. Run AI analysis first.',
//       });
//     }

//     res.status(200).json({
//       success: true,
//       roleSuggestions: analysis.suggestedRoles,
//       strengths: analysis.strengths,
//       weaknesses: analysis.weaknesses,
//       practiceQuestions: analysis.interviewQuestions,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: 'Interview preparation failed',
//       error: err.message,
//     });
//   }
// };

export const getInterviewPrepByLevel = async (req, res) => {
  try {
    const { level } = req.body;

    const allowedLevels = ['easy', 'medium', 'hard', 'veryhard', 'extreme'];
    if (!allowedLevels.includes(level)) {
      return res.status(400).json({ message: 'Invalid level' });
    }

    const resume = await Resume.findOne({
      _id: req.params.resumeId,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const questions = await generatePrepQuestions(resume, level);

    // ✅ Save preparation history
    await PrepHistory.create({
      userId: req.user._id,
      resumeId: resume._id,
      level,
      questions,
    });

    res.json({
      success: true,
      level,
      questions,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Interview preparation failed',
      error: err.message,
    });
  }
};

export const getPrepHistory = async (req, res) => {
  try {
    const history = await PrepHistory.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      history,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch preparation history',
      error: err.message,
    });
  }
};
