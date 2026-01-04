import mongoose from 'mongoose';

const PrepHistorySchema = new mongoose.Schema(
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
    level: {
      type: String,
      enum: ['easy', 'medium', 'hard', 'veryhard', 'extreme'],
    },
    questions: [String],
  },
  { timestamps: true }
);

export default mongoose.model('PrepHistory', PrepHistorySchema);
