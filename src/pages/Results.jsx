import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CalendarDays, FileText, Sparkles } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ErrorState, LoadingState } from '../components/MessageState.jsx';
import { InsightList, SkillTags } from '../components/ResultList.jsx';
import ScoreCircle from '../components/ScoreCircle.jsx';
import { getAnalysis } from '../lib/api.js';

function formatDate(date) {
  return new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function Results() {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');

  async function loadAnalysis() {
    setError('');
    try {
      const payload = await getAnalysis(id);
      setAnalysis(payload.analysis);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  useEffect(() => {
    loadAnalysis();
  }, [id]);

  if (error) {
    return <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8"><ErrorState message={error} onRetry={loadAnalysis} /><Link to="/analyze" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600"><ArrowLeft size={16} /> Start a new analysis</Link></div>;
  }
  if (!analysis) {
    return <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8"><LoadingState /></div>;
  }

  const { result } = analysis;
  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link to="/analyze" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-brand-600"><ArrowLeft size={16} /> New analysis</Link>
        <Link to="/history" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700">View history <ArrowRight size={15} /></Link>
      </div>

      <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600"><FileText size={22} /></span>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-600">Your analysis is ready</p>
              <h1 className="mt-1 truncate text-xl font-bold tracking-tight text-ink sm:text-2xl">{analysis.resumeFileName}</h1>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-muted"><CalendarDays size={14} /> Analyzed {formatDate(analysis.createdAt)}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 sm:gap-9">
            <ScoreCircle score={result.matchPercentage} />
            <div className="min-w-32">
              <p className="text-xs font-medium text-muted">ATS readiness score</p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-ink">{result.atsScore}<span className="ml-1 text-base font-semibold text-slate-400">/100</span></p>
              <div className="mt-3 h-2 w-36 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-brand-500" style={{ width: `${result.atsScore}%` }} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-7 rounded-2xl bg-brand-50/70 p-4 sm:p-5">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand-800"><Sparkles size={16} className="text-brand-600" /> A quick read</div>
          <p className="text-sm leading-6 text-slate-700">{result.recommendation}</p>
        </div>
      </div>

      <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-card sm:p-7">
        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-600">Skills at a glance</p>
          <h2 className="mt-1 text-lg font-bold text-ink">Where you align—and where to grow</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div><h3 className="mb-3 text-sm font-semibold text-ink">Matching skills <span className="ml-1 text-xs font-normal text-muted">({result.matchingSkills.length})</span></h3><SkillTags items={result.matchingSkills} tone="green" /></div>
          <div><h3 className="mb-3 text-sm font-semibold text-ink">Skills to build <span className="ml-1 text-xs font-normal text-muted">({result.missingSkills.length})</span></h3><SkillTags items={result.missingSkills} tone="amber" /></div>
        </div>
        <div className="mt-6 border-t border-slate-100 pt-5">
          <h3 className="mb-3 text-sm font-semibold text-ink">Keywords to consider</h3>
          <SkillTags items={result.keywords} tone="neutral" />
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <InsightList type="strengths" items={result.strengths} />
        <InsightList type="weaknesses" items={result.weaknesses} />
        <div className="lg:col-span-2"><InsightList type="improvementSuggestions" items={result.improvementSuggestions} /></div>
      </div>
      <div className="mt-8 flex justify-center">
        <Link to="/analyze" className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">Analyze another resume <ArrowRight size={16} /></Link>
      </div>
    </div>
  );
}
