import { ArrowRight, Check, FileText, ScanSearch, ShieldCheck, Sparkles, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: ScanSearch,
    title: 'Know your match',
    description: 'See how closely your experience lines up with the role you want.',
    color: 'bg-brand-50 text-brand-600',
  },
  {
    icon: Target,
    title: 'Find what’s missing',
    description: 'Spot skills and keywords you may want to highlight or develop.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Sparkles,
    title: 'Get practical feedback',
    description: 'Leave with clear suggestions you can put to work right away.',
    color: 'bg-emerald-50 text-emerald-600',
  },
];

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="hero-glow pointer-events-none absolute inset-0 -z-10" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-28">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-3.5 py-2 text-xs font-semibold text-brand-700 shadow-sm">
              <Sparkles size={14} />
              Your next opportunity, one better resume away
            </div>
            <h1 className="text-4xl font-bold leading-[1.12] tracking-[-0.04em] text-ink sm:text-5xl lg:text-[60px]">
              Make your resume
              <span className="block text-brand-600">work for you.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              See how your resume stacks up against a job description. Get a clear match score and friendly, actionable feedback—without the guesswork.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/analyze" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:-translate-y-0.5 hover:bg-brand-700">
                Analyze my resume <ArrowRight size={17} />
              </Link>
              <Link to="/history" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                View past analyses
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-500">
              <span className="inline-flex items-center gap-1.5"><Check size={14} className="text-emerald-600" /> Free to use</span>
              <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-600" /> Your resume isn’t stored</span>
              <span className="inline-flex items-center gap-1.5"><FileText size={14} className="text-emerald-600" /> PDF upload</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[490px]">
            <div className="absolute -left-5 top-10 h-28 w-28 rounded-full bg-brand-200/60 blur-3xl" />
            <div className="absolute -right-7 bottom-4 h-36 w-36 rounded-full bg-violet-200/70 blur-3xl" />
            <div className="relative rounded-[28px] border border-white bg-white/90 p-5 shadow-[0_28px_90px_rgba(66,76,156,0.17)] backdrop-blur sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted">Your resume overview</p>
                  <h2 className="mt-1 text-lg font-bold text-ink">Product Designer</h2>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><FileText size={19} /></div>
              </div>
              <div className="mt-7 flex items-center gap-5 rounded-2xl bg-slate-50 p-4">
                <div className="relative flex h-[92px] w-[92px] shrink-0 items-center justify-center rounded-full" style={{ background: 'conic-gradient(#5965ec 0% 82%, #e8eaf4 82% 100%)' }}>
                  <div className="flex h-[72px] w-[72px] flex-col items-center justify-center rounded-full bg-white">
                    <span className="text-2xl font-bold text-ink">82</span>
                    <span className="text-[9px] text-muted">match score</span>
                  </div>
                </div>
                <div className="min-w-0">
                  <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">Strong match</span>
                  <p className="mt-2 text-xs leading-5 text-slate-600">Your experience aligns well with the role. A few targeted updates could make your application even stronger.</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-100 p-3.5">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted">Skills matched</p>
                  <p className="mt-1.5 text-xl font-bold text-ink">8 <span className="text-xs font-medium text-muted">skills</span></p>
                </div>
                <div className="rounded-xl border border-slate-100 p-3.5">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted">Ways to improve</p>
                  <p className="mt-1.5 text-xl font-bold text-ink">3 <span className="text-xs font-medium text-muted">suggestions</span></p>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-brand-100 bg-brand-50/70 px-3.5 py-3 text-xs font-medium text-brand-800">
                <Sparkles size={15} className="shrink-0 text-brand-600" />
                Helpful insights, tailored to the role you want.
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-24">
        <div className="mb-9 max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">A clearer next step</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">A little insight goes a long way.</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Understand your resume through the lens of the role—not just a generic checklist.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description, color }, index) => (
            <article key={title} className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}><Icon size={20} /></span>
              <p className="mt-5 text-xs font-semibold text-brand-600">0{index + 1}</p>
              <h3 className="mt-1 text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
