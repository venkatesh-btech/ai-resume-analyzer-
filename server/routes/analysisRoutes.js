import { Router } from 'express';
import multer from 'multer';
import { createAnalysis, getAnalysis, listAnalyses } from '../controllers/analysisController.js';
import HttpError from '../utils/HttpError.js';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 4 * 1024 * 1024, files: 1 },
  fileFilter(_req, file, callback) {
    if (!file.originalname.toLowerCase().endsWith('.pdf')) {
      callback(new HttpError(400, 'Only PDF resumes are supported.'));
      return;
    }
    callback(null, true);
  },
});

router.use((req, _res, next) => {
  const clientId = req.get('X-Client-ID');
  if (!clientId || !/^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i.test(clientId)) {
    next(new HttpError(400, 'Your browser session is missing or invalid. Refresh the page and try again.'));
    return;
  }
  req.clientId = clientId;
  next();
});

router.post('/analyze', upload.single('resume'), createAnalysis);
router.get('/analyses', listAnalyses);
router.get('/analyses/:id', getAnalysis);

export default router;
