import mongoose from 'mongoose';

const ResumeAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true,
    },
    strengths: [String],
    weaknesses: [String],
    missingSkills: [String],
    suggestedRoles: [String],
    interviewQuestions: [String],
    rawAIResponse: String,
    atsScore: { type: Number, default: 0 },
    atsIssues: [String],
    missingSections: [String],
    improvementSuggestions: [String],
    keywordSuggestions: [String],
  },
  { timestamps: true }
);

export default mongoose.model('ResumeAnalysis', ResumeAnalysisSchema);
