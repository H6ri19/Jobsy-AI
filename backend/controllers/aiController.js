import Resume from '../models/Resume.js';
import ResumeAnalysis from '../models/ResumeAnalysis.js';
import { analyzeResumeWithAI } from '../ai/resumeAnalyzer.js';

export const analyzeResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.resumeId,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const aiText = await analyzeResumeWithAI(resume);

    // Parse AI JSON safely
    let parsed = {};

    try {
      const jsonMatch = aiText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      }
    } catch (err) {
      console.error('AI JSON parse failed', err);
    }

    const analysis = await ResumeAnalysis.create({
      userId: req.user._id,
      resumeId: resume._id,
      strengths: parsed.strengths || [],
      weaknesses: parsed.weaknesses || [],
      missingSkills: parsed.missing_skills || [],
      suggestedRoles: parsed.suggested_roles || [],
      interviewQuestions: parsed.interview_questions || [],
      rawAIResponse: aiText,
    });

    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (err) {
    res.status(500).json({
      message: 'AI resume analysis failed',
      error: err.message,
    });
  }
};
