export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

//utils/apiPath.js
export const API_PATHS = {
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    GET_PROFILE: '/api/auth/profile',
  },
  RESUME: {
    CREATE: '/api/resume',
    GET_ALL: '/api/resume',
    GET_BY_ID: (id) => `/api/resume/${id}`,
    UPDATE: (id) => `/api/resume/${id}`,
    DELETE: (id) => `/api/resume/${id}`,
    ATS_CHECK: (id) => `/api/resume/${id}/ats-check`,
    UPLOAD_IMAGES: (id) => `/api/resume/${id}/upload-images`,
  },
  image: {
    UPLOAD_IMAGE: 'api/auth/upload-image',
  },
  INTERVIEW: {
    PREP_BY_LEVEL: (resumeId) => `/api/interview/prep/${resumeId}`,
    START: (resumeId) => `/api/interview/start/${resumeId}`,
    ANSWER: (sessionId) => `/api/interview/answer/${sessionId}`,
    RESULT: (sessionId) => `/api/interview/result/${sessionId}`,
    DOWNLOAD_PDF: (sessionId) => `/api/interview/result/${sessionId}/pdf`,
    HISTORY: '/api/interview/prep/history',
  },
  AI: {
    ANALYZE_RESUME: (resumeId) => `/api/ai/resume/${resumeId}/analyze`,
  },
};
