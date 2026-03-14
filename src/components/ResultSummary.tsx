import type { SessionResult } from "../features/nback/types";

type ResultSummaryProps = {
  result: SessionResult;
};

export function ResultSummary({ result }: ResultSummaryProps) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5">
      <h2 className="mb-4 text-lg font-semibold">Session Summary</h2>

      <div className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3">
        <p className="text-xs uppercase tracking-wide text-emerald-200/90">Accuracy</p>
        <p className="text-3xl font-semibold text-emerald-300">{Math.round(result.accuracy * 100)}%</p>
      </div>

      <dl className="grid grid-cols-2 gap-2.5 text-sm sm:grid-cols-3 sm:gap-3">
        <Metric label="Hit" value={result.hits.toString()} />
        <Metric label="Miss" value={result.misses.toString()} />
        <Metric label="False Alarm" value={result.falseAlarms.toString()} />
        <Metric label="Correct Rejection" value={result.correctRejections.toString()} />
        <Metric
          label="Avg RT"
          value={result.avgReactionTimeMs === null ? "N/A" : `${Math.round(result.avgReactionTimeMs)} ms`}
        />
      </dl>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
      <dt className="text-xs uppercase tracking-wide text-slate-400">{label}</dt>
      <dd className="mt-1 text-base font-semibold text-slate-100">{value}</dd>
    </div>
  );
}
