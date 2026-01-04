import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  //   getInterviewPrep,
  getInterviewPrepByLevel,
  getPrepHistory,
} from '../controllers/interviewController.js';

const router = express.Router();

// router.get('/prep/:resumeId', protect, getInterviewPrep);
router.get('/prep/history', protect, getPrepHistory);
router.post('/prep/:resumeId', protect, getInterviewPrepByLevel);

export default router;
