import type { SessionResult } from "../features/nback/types";

type HistoryListProps = {
  sessions: SessionResult[];
};

export function HistoryList({ sessions }: HistoryListProps) {
  if (sessions.length === 0) {
    return <p className="text-sm text-slate-300">No sessions saved yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {sessions.map((session) => (
        <li key={session.id} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-sm">
          <p className="font-medium text-slate-100">{new Date(session.timestamp).toLocaleString()}</p>
          <p className="text-slate-300">
            N={session.config.n} · Trials={session.totalTrials} · Accuracy={Math.round(session.accuracy * 100)}% · Avg
            RT={session.avgReactionTimeMs === null ? "N/A" : `${Math.round(session.avgReactionTimeMs)} ms`}
          </p>
        </li>
      ))}
    </ul>
  );
}
