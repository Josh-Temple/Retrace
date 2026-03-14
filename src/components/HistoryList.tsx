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
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <Chip label="2-back" />
            <Chip label={`${session.totalTrials} trials`} />
            <Chip label={`Accuracy ${Math.round(session.accuracy * 100)}%`} />
            <Chip
              label={
                session.avgReactionTimeMs === null ? "Avg RT N/A" : `Avg RT ${Math.round(session.avgReactionTimeMs)} ms`
              }
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Chip({ label }: { label: string }) {
  return <span className="rounded-full border border-slate-700 bg-slate-950 px-2.5 py-1 text-slate-300">{label}</span>;
}
