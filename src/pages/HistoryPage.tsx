import { HistoryList } from "../components/HistoryList";
import { loadSessionResults } from "../features/nback/storage";

export function HistoryPage() {
  const sessions = loadSessionResults();

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">History</h2>
      <HistoryList sessions={sessions} />
    </section>
  );
}
