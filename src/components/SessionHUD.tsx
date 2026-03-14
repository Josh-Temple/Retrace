type SessionHUDProps = {
  n: number;
  currentTrial: number;
  totalTrials: number;
};

export function SessionHUD({ n, currentTrial, totalTrials }: SessionHUDProps) {
  const safeTrial = Math.min(currentTrial, totalTrials);
  const progress = Math.round((safeTrial / totalTrials) * 100);

  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <p className="text-5xl font-light tracking-[-0.02em] text-slate-100">{n}-back</p>
        <p className="pb-1 text-xl font-light tracking-[0.08em] text-slate-500">
          Trial <span className="text-slate-300">{safeTrial}</span> / {totalTrials}
        </p>
      </div>

      <div className="h-1 overflow-hidden rounded-full bg-slate-900" aria-label="Session progress">
        <div
          className="h-full rounded-full bg-slate-100 transition-all duration-200"
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
