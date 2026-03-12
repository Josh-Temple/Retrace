type SessionHUDProps = {
  n: number;
  currentTrial: number;
  totalTrials: number;
};

export function SessionHUD({ n, currentTrial, totalTrials }: SessionHUDProps) {
  const remainingTrials = totalTrials - currentTrial;

  return (
    <section className="grid grid-cols-1 gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4 sm:grid-cols-3">
      <Stat label="N Value" value={n.toString()} />
      <Stat label="Trial" value={`${currentTrial} / ${totalTrials}`} />
      <Stat label="Remaining" value={remainingTrials.toString()} />
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="text-lg font-semibold text-slate-100">{value}</p>
    </div>
  );
}
