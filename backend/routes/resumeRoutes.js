import express from 'express';
import {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
  runATSCheck,
} from '../controllers/resumeController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { uploadResumeImages } from '../controllers/uploadImages.js';

const router = express.Router();

router.post('/', protect, createResume);
router.get('/', protect, getUserResumes);
router.get('/:id', protect, getResumeById);
router.put('/:id', protect, updateResume);
router.put('/:id/upload-images', protect, uploadResumeImages);
router.post('/:resumeId/ats-check', protect, runATSCheck);

router.delete('/:id', protect, deleteResume);

export default router;
