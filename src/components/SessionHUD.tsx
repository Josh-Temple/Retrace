type SessionHUDProps = {
  n: number;
  currentTrial: number;
  totalTrials: number;
};

export function SessionHUD({ n, currentTrial, totalTrials }: SessionHUDProps) {
  const safeTrial = Math.min(currentTrial, totalTrials);
  const progress = Math.round((safeTrial / totalTrials) * 100);

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-100">{n}-back</p>
        <p className="text-sm text-slate-300">
          Trial <span className="font-semibold text-slate-100">{safeTrial}</span> / {totalTrials}
        </p>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800" aria-label="Session progress">
        <div
          className="h-full rounded-full bg-emerald-400 transition-all duration-200"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        />
      </div>
    </section>
  );
}
