import { Link } from "react-router-dom";
import { ResultSummary } from "../components/ResultSummary";
import { loadSessionResults } from "../features/nback/storage";
import type { SessionResult } from "../features/nback/types";

function loadLatestResultFromSession(): SessionResult | null {
  try {
    const raw = sessionStorage.getItem("latest_session_result");
    if (!raw) return null;
    return JSON.parse(raw) as SessionResult;
  } catch {
    return null;
  }
}

export function ResultPage() {
  const latestSaved = loadSessionResults();
  const latest = loadLatestResultFromSession() ?? latestSaved[0] ?? null;
  const previous = latestSaved[1] ?? null;

  if (!latest) {
    return (
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Result</h2>
        <p className="text-sm text-slate-300">No completed session yet.</p>
        <Link to="/session" className="inline-block rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-slate-950">
          Start Session
        </Link>
      </section>
    );
  }

  const accuracyDelta = previous ? Math.round((latest.accuracy - previous.accuracy) * 100) : null;
  const rtDelta =
    previous && latest.avgReactionTimeMs !== null && previous.avgReactionTimeMs !== null
      ? Math.round(latest.avgReactionTimeMs - previous.avgReactionTimeMs)
      : null;

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Result</h2>
      <ResultSummary result={latest} />
      <p className="text-sm text-slate-300">
        Compared to previous: accuracy {accuracyDelta === null ? "N/A" : `${accuracyDelta > 0 ? "+" : ""}${accuracyDelta}%`} ·
        avg RT {rtDelta === null ? "N/A" : `${rtDelta > 0 ? "+" : ""}${rtDelta} ms`}
      </p>
      <div className="flex flex-wrap gap-3">
        <Link to="/session" className="rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-slate-950">
          Retry
        </Link>
        <Link to="/" className="rounded-lg border border-slate-700 px-4 py-2 text-slate-200">
          Home
        </Link>
      </div>
    </section>
  );
}
