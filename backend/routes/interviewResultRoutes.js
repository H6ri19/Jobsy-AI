import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { downloadInterviewResultPDF } from '../controllers/interviewResultController.js';

const router = express.Router();

router.get('/result/:sessionId/pdf', protect, downloadInterviewResultPDF);

export default router;
