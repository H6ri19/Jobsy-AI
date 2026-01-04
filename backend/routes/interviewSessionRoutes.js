import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  startInterview,
  submitAnswer,
  getInterviewResult,
} from '../controllers/interviewSessionController.js';

const router = express.Router();

router.post('/start/:resumeId', protect, startInterview);
router.post('/answer/:sessionId', protect, submitAnswer);
router.get('/result/:sessionId', protect, getInterviewResult);

export default router;
