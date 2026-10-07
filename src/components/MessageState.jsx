import { AlertCircle, LoaderCircle } from 'lucide-react';

export function LoadingState({ message = 'Loading your analysis...' }) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-card">
      <LoaderCircle className="animate-spin text-brand-600" size={30} />
      <p className="text-sm font-medium text-ink">{message}</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5" role="alert">
      <div className="flex items-start gap-3">
        <AlertCircle size={20} className="mt-0.5 shrink-0 text-rose-600" />
        <div>
          <p className="font-semibold text-rose-900">We hit a snag</p>
          <p className="mt-1 text-sm leading-6 text-rose-800">{message}</p>
          {onRetry && (
            <button onClick={onRetry} className="mt-3 text-sm font-semibold text-rose-900 underline underline-offset-4">
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
