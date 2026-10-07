import { useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, FileText, Info, LoaderCircle, ShieldCheck, Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createAnalysis } from '../lib/api.js';
import { ErrorState } from '../components/MessageState.jsx';

const MAX_FILE_SIZE = 4 * 1024 * 1024;

export default function Analyzer() {
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const [jobDescription, setJobDescription] = useState('');
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function chooseFile(candidate) {
    setError('');
    if (!candidate) return;
    if (!candidate.name.toLowerCase().endsWith('.pdf')) {
      setError('Please choose a PDF file.');
      return;
    }
    if (candidate.size > MAX_FILE_SIZE) {
      setError('Your PDF must be 4 MB or smaller.');
      return;
    }
    if (candidate.size === 0) {
      setError('That file is empty. Please choose another PDF.');
      return;
    }
    setFile(candidate);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    const description = jobDescription.trim();
    if (description.length < 30) {
      setError('Please add a job description with at least 30 characters.');
      return;
    }
    if (!file) {
      setError('Please upload your resume as a PDF.');
      return;
    }

    const formData = new FormData();
    formData.append('jobDescription', description);
    formData.append('resume', file);
    setLoading(true);
    try {
      const { analysis } = await createAnalysis(formData);
      navigate(`/results/${analysis._id}`);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600"><FileText size={21} /></span>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">Resume analyzer</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Let’s find your best fit.</h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600">Share the job description and your resume. We’ll compare the two and give you clear next steps.</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label htmlFor="job-description" className="text-sm font-semibold text-ink">Job description</label>
              <span className={`text-xs ${jobDescription.length > 15000 ? 'text-rose-600' : 'text-muted'}`}>{jobDescription.length.toLocaleString()} / 15,000</span>
            </div>
            <textarea
              id="job-description"
              required
              minLength={30}
              maxLength={15000}
              rows={8}
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              placeholder="Paste the job description here. Include the responsibilities and qualifications so we can give you the most useful feedback..."
              className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm leading-6 text-ink outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
            />
            <p className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-muted"><Info size={14} className="mt-0.5 shrink-0" /> At least 30 characters. Remove personal details you don’t want included.</p>
          </div>

          <div className="mt-7">
            <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="resume-file">Your resume</label>
            <input
              ref={fileInput}
              id="resume-file"
              type="file"
              accept="application/pdf,.pdf"
              className="sr-only"
              onChange={(event) => chooseFile(event.target.files?.[0])}
            />
            {file ? (
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700"><FileText size={19} /></span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{file.name}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB · PDF document</p>
                  </div>
                </div>
                <button type="button" onClick={() => { setFile(null); if (fileInput.current) fileInput.current.value = ''; }} className="rounded-lg p-2 text-slate-500 transition hover:bg-white hover:text-rose-600" aria-label="Remove resume"><X size={18} /></button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInput.current?.click()}
                onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(event) => { event.preventDefault(); setDragging(false); chooseFile(event.dataTransfer.files?.[0]); }}
                className={`flex min-h-44 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-7 text-center transition ${dragging ? 'border-brand-500 bg-brand-50' : 'border-slate-200 bg-slate-50/50 hover:border-brand-300 hover:bg-brand-50/40'}`}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm"><Upload size={20} /></span>
                <span className="mt-3 text-sm font-semibold text-ink">Click to upload <span className="font-normal text-slate-500">or drag and drop</span></span>
                <span className="mt-1 text-xs text-muted">PDF only · Up to 4 MB</span>
              </button>
            )}
          </div>

          {error && <div className="mt-5"><ErrorState message={error} /></div>}

          <div className="mt-7 flex flex-col-reverse items-center justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row">
            <p className="flex items-center gap-1.5 text-xs text-muted"><ShieldCheck size={15} className="text-emerald-600" /> We don’t store your resume text</p>
            <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-brand-600/15 transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-65 sm:w-auto">
              {loading ? <><LoaderCircle size={17} className="animate-spin" /> Analyzing your resume...</> : <>Analyze my resume <ArrowRight size={17} /> </>}
            </button>
          </div>
          {loading && (
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-3 text-xs text-brand-800">
              <CheckCircle2 size={15} className="text-brand-600" />
              We’re reading your resume and comparing it to the role. This usually takes a few moments.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
