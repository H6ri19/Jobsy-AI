import path from 'path';
import fs from 'fs';
import InterviewSession from '../models/InterviewSession.js';
import Resume from '../models/Resume.js';
import { generateInterviewPDF } from '../utils/interviewPdfGenerator.js';

export const downloadInterviewResultPDF = async (req, res) => {
  try {
    const session = await InterviewSession.findById(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    const resume = await Resume.findById(session.resumeId);
    const candidateName = resume?.profileInfo?.fullName || 'Candidate';

    const pdfDir = path.join(process.cwd(), 'pdfs');
    if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir);

    const filePath = path.join(pdfDir, `Interview_Result_${session._id}.pdf`);

    await generateInterviewPDF(session, candidateName, filePath);

    res.download(filePath, () => fs.unlinkSync(filePath));
  } catch (err) {
    res.status(500).json({
      message: 'PDF generation failed',
      error: err.message,
    });
  }
};
