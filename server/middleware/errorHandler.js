import multer from 'multer';

export function notFound(_req, res) {
  res.status(404).json({ error: 'Route not found.' });
}

export function errorHandler(error, _req, res, _next) {
  if (error instanceof multer.MulterError) {
    const message = error.code === 'LIMIT_FILE_SIZE'
      ? 'Your PDF must be 5 MB or smaller.'
      : 'Upload exactly one PDF resume.';
    res.status(400).json({ error: message });
    return;
  }

  const statusCode = error.statusCode || 500;
  if (statusCode >= 500) {
    console.error('Request failed:', error.message);
  }
  res.status(statusCode).json({
    error: error.expose
      ? error.message
      : 'Something went wrong while processing your request. Please try again.',
  });
}
