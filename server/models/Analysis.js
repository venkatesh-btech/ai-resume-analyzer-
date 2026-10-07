import mongoose from 'mongoose';

const analysisResultSchema = new mongoose.Schema(
  {
    atsScore: { type: Number, required: true, min: 0, max: 100 },
    matchPercentage: { type: Number, required: true, min: 0, max: 100 },
    matchingSkills: { type: [String], default: [] },
    missingSkills: { type: [String], default: [] },
    strengths: { type: [String], default: [] },
    weaknesses: { type: [String], default: [] },
    keywords: { type: [String], default: [] },
    improvementSuggestions: { type: [String], default: [] },
    recommendation: { type: String, required: true },
  },
  { _id: false },
);

const analysisSchema = new mongoose.Schema(
  {
    clientId: { type: String, required: true, select: false },
    jobDescription: { type: String, required: true, maxlength: 15000 },
    resumeFileName: { type: String, required: true, maxlength: 255 },
    result: { type: analysisResultSchema, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_document, value) {
        delete value.clientId;
        delete value.__v;
        return value;
      },
    },
  },
);

analysisSchema.index({ clientId: 1, createdAt: -1 });

export default mongoose.models.Analysis
  || mongoose.model('Analysis', analysisSchema);
