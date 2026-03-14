import { Link } from "react-router-dom";
import { loadSessionResults } from "../features/nback/storage";

const quickFacts = ["2-back", "25 trials", "1 min"];

export function HomePage() {
  const latestSession = loadSessionResults()[0] ?? null;

  return (
    <section className="space-y-10">
      <div className="space-y-7">
        <h2 className="max-w-[9ch] text-6xl sm:text-7xl font-light leading-[1.02] tracking-[-0.03em] text-slate-100">Train your working memory</h2>

        <div className="flex flex-wrap gap-3">
          {quickFacts.map((fact) => (
            <span
              key={fact}
              className="rounded-full border border-slate-700/70 bg-slate-950/70 px-6 py-2 text-sm sm:text-base font-light leading-none tracking-[-0.02em] text-slate-400"
            >
              {fact}
            </span>
          ))}
        </div>

        <p className="max-w-[30ch] text-2xl sm:text-4xl font-light leading-[1.35] text-slate-400">
          Tap <span className="font-medium text-slate-200">Match</span> when the position matches 2 turns ago.
        </p>
      </div>

      <div className="space-y-4">
        <Link
          to="/session"
          className="block rounded-3xl bg-emerald-500 px-6 py-5 text-center text-2xl sm:text-4xl font-medium tracking-[-0.01em] text-[#021015]"
        >
          Start Session
        </Link>
        <Link
          to="/history"
          className="block rounded-3xl border border-slate-800 bg-[#0b1120] px-6 py-5 text-center text-2xl sm:text-4xl font-light tracking-[-0.01em] text-slate-200"
        >
          View History
        </Link>
      </div>

      <section className="space-y-4">
        <h3 className="text-xl sm:text-2xl uppercase tracking-[0.16em] text-slate-400">Recent Activity</h3>
        {latestSession ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
            <p className="text-2xl sm:text-3xl font-light text-slate-100">Accuracy {Math.round(latestSession.accuracy * 100)}%</p>
            <p className="mt-2 text-lg sm:text-2xl font-light text-slate-400">
              {new Date(latestSession.timestamp).toLocaleString()} · {latestSession.totalTrials} trials
            </p>
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-950/50 px-6 py-10 text-center">
            <p className="text-2xl sm:text-3xl font-light text-slate-300">No sessions yet.</p>
            <p className="text-lg sm:text-2xl font-light text-slate-400">Start your first 2-back session.</p>
          </div>
        )}
      </section>
    </section>
  );
}
