import { useEffect, useState } from 'react';
import { ArrowRight, Clock3, FileSearch2, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ErrorState, LoadingState } from '../components/MessageState.jsx';
import ScoreCircle from '../components/ScoreCircle.jsx';
import { getAnalyses } from '../lib/api.js';

function formatDate(date) {
  return new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function History() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadAnalyses() {
    setLoading(true);
    setError('');
    try {
      const payload = await getAnalyses();
      setAnalyses(payload.analyses);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAnalyses();
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Clock3 size={19} /></span>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">Your workspace</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-ink">Analysis history</h1>
          <p className="mt-2 text-sm text-slate-600">Pick up where you left off and revisit your past feedback.</p>
        </div>
        <Link to="/analyze" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"><FileSearch2 size={16} /> New analysis</Link>
      </div>

      {loading ? <LoadingState message="Loading your recent analyses..." /> : error ? <ErrorState message={error} onRetry={loadAnalyses} /> : analyses.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-card">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600"><FileText size={24} /></span>
          <h2 className="mt-5 text-lg font-bold text-ink">Your story starts here</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">You haven’t analyzed a resume yet. Compare one with a job description to get thoughtful, practical feedback.</p>
          <Link to="/analyze" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700">Start your first analysis <ArrowRight size={15} /></Link>
        </div>
      ) : (
        <div className="space-y-3">
          {analyses.map((analysis) => (
            <Link key={analysis._id} to={`/results/${analysis._id}`} className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-600 group-hover:bg-brand-50 group-hover:text-brand-600"><FileText size={19} /></span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink">{analysis.resumeFileName}</p>
                  <p className="mt-1 text-xs text-muted">Analyzed {formatDate(analysis.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 pl-[60px] sm:pl-0">
                <span className="text-xs text-slate-500">ATS score <strong className="ml-1 text-ink">{analysis.result.atsScore}/100</strong></span>
                <ScoreCircle score={analysis.result.matchPercentage} size="small" />
                <ArrowRight size={17} className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-brand-600" />
              </div>
            </Link>
          ))}
          {analyses.length === 50 && <p className="pt-2 text-center text-xs text-muted">Showing your 50 most recent analyses.</p>}
        </div>
      )}
    </div>
  );
}
