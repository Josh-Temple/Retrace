import { Link } from "react-router-dom";
import { ResultSummary } from "../components/ResultSummary";
import { loadSessionResults } from "../features/nback/storage";

export function HomePage() {
  const latestSession = loadSessionResults()[0] ?? null;

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Train your working memory</h2>
        <p className="text-sm text-slate-300">
          Retrace (N-Back Trainer) is a position-based 2-back trainer. Press Space on desktop or use the Match button on mobile.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/session" className="rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-slate-950">
          Start Session
        </Link>
        <Link to="/history" className="rounded-lg border border-slate-700 px-4 py-2 text-slate-200">
          View History
        </Link>
      </div>

      {latestSession ? (
        <ResultSummary result={latestSession} />
      ) : (
        <p className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300">
          No session yet. Start your first 2-back session.
        </p>
      )}
    </section>
  );
}
