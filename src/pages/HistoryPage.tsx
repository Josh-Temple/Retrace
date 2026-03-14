import { HistoryList } from "../components/HistoryList";
import { loadSessionResults } from "../features/nback/storage";

export function HistoryPage() {
  const sessions = loadSessionResults();

  return (
    <section className="space-y-5 sm:space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">History</h2>
        <p className="text-sm text-slate-300">Review recent sessions and keep your training streak going.</p>
      </div>
      <HistoryList sessions={sessions} />
    </section>
  );
}
