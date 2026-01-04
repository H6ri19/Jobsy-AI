import mongoose from 'mongoose';

const InterviewSessionSchema = new mongoose.Schema(
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
    questions: [String],
    answers: [
      {
        question: String,
        answer: String,
        feedback: String,
        score: Number,
      },
    ],
    currentIndex: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['ongoing', 'completed'],
      default: 'ongoing',
    },
    totalScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('InterviewSession', InterviewSessionSchema);
