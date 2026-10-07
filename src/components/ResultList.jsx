import { Check, Lightbulb, Minus, Sparkles, Target, X } from 'lucide-react';

const listStyles = {
  matchingSkills: { title: 'Your matching skills', icon: Check, color: 'green' },
  missingSkills: { title: 'Skills to build', icon: Target, color: 'amber' },
  strengths: { title: 'What stands out', icon: Sparkles, color: 'purple' },
  weaknesses: { title: 'Areas to strengthen', icon: Minus, color: 'rose' },
  improvementSuggestions: { title: 'Ways to improve', icon: Lightbulb, color: 'blue' },
};

export function SkillTags({ items = [], tone = 'green' }) {
  const toneClass = {
    green: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
    amber: 'bg-amber-50 text-amber-800 ring-amber-200',
  }[tone] || 'bg-slate-100 text-slate-700 ring-slate-200';

  if (!items.length) {
    return <p className="text-sm text-muted">Nothing to show here yet.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className={`rounded-lg px-3 py-1.5 text-xs font-medium ring-1 ring-inset ${toneClass}`}>
          {item}
        </span>
      ))}
    </div>
  );
}

export function InsightList({ type, items = [] }) {
  const config = listStyles[type];
  const Icon = config.icon;
  const colors = {
    green: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    purple: 'bg-violet-50 text-violet-700',
    rose: 'bg-rose-50 text-rose-700',
    blue: 'bg-blue-50 text-blue-700',
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${colors[config.color]}`}>
          <Icon size={18} />
        </span>
        <h2 className="font-semibold text-ink">{config.title}</h2>
      </div>
      {items.length ? (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={`${item}-${index}`} className="flex items-start gap-2.5 text-sm leading-6 text-slate-600">
              {type === 'weaknesses' ? (
                <X size={15} className="mt-1 shrink-0 text-rose-500" />
              ) : (
                <Check size={15} className="mt-1 shrink-0 text-emerald-600" />
              )}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted">No items to show.</p>
      )}
    </section>
  );
}
