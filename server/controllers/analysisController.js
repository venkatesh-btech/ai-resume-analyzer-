import mongoose from 'mongoose';
import pdf from 'pdf-parse';
import Analysis from '../models/Analysis.js';
import { analyzeResume } from '../services/aiAnalyzer.js';
import HttpError from '../utils/HttpError.js';

const MAX_JOB_DESCRIPTION_LENGTH = 15000;
const MAX_RESUME_TEXT_LENGTH = 30000;

export async function createAnalysis(req, res, next) {
  try {
    const jobDescription = typeof req.body.jobDescription === 'string'
      ? req.body.jobDescription.trim()
      : '';

    if (jobDescription.length < 30) {
      throw new HttpError(400, 'Please enter a job description with at least 30 characters.');
    }
    if (jobDescription.length > MAX_JOB_DESCRIPTION_LENGTH) {
      throw new HttpError(400, 'The job description must be 15,000 characters or fewer.');
    }
    if (!req.file) {
      throw new HttpError(400, 'Please upload a PDF resume.');
    }
    if (req.file.buffer.subarray(0, 5).toString() !== '%PDF-') {
      throw new HttpError(400, 'This file is not a valid PDF. Please choose a PDF resume.');
    }

    let resumeText;
    try {
      const parsedPdf = await pdf(req.file.buffer);
      resumeText = parsedPdf.text.trim().slice(0, MAX_RESUME_TEXT_LENGTH);
    } catch {
      throw new HttpError(400, 'We could not read this PDF. Try exporting it again or use a text-based PDF.');
    }
    if (resumeText.length < 50) {
      throw new HttpError(400, 'This PDF does not contain enough readable text. Please upload a text-based resume.');
    }

    const result = await analyzeResume(jobDescription, resumeText);
    const analysis = await Analysis.create({
      clientId: req.clientId,
      jobDescription,
      resumeFileName: req.file.originalname.slice(0, 255),
      result,
    });

    res.status(201).json({ analysis });
  } catch (error) {
    next(error);
  }
}

export async function listAnalyses(req, res, next) {
  try {
    const analyses = await Analysis.find({ clientId: req.clientId })
      .sort({ createdAt: -1 })
      .limit(50)
      .select('resumeFileName result createdAt')
      .lean();
    res.json({ analyses });
  } catch (error) {
    next(error);
  }
}

export async function getAnalysis(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw new HttpError(400, 'That analysis ID is not valid.');
    }

    const analysis = await Analysis.findOne({
      _id: req.params.id,
      clientId: req.clientId,
    }).select('-clientId').lean();
    if (!analysis) {
      throw new HttpError(404, 'Analysis not found.');
    }
    res.json({ analysis });
  } catch (error) {
    next(error);
  }
}
