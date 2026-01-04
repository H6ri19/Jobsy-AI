import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { analyzeResume } from '../controllers/aiController.js';

const router = express.Router();

router.post('/resume/:resumeId/analyze', protect, analyzeResume);

export default router;
