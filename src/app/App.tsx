import { Link } from "react-router-dom";
import { AppRoutes } from "./routes";

export function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 px-4 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <h1 className="text-xl font-semibold">Retrace</h1>
          <nav className="flex items-center gap-4 text-sm text-slate-300">
            <Link to="/">Home</Link>
            <Link to="/session">Session</Link>
            <Link to="/result">Result</Link>
            <Link to="/history">History</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <AppRoutes />
      </main>
    </div>
  );
}
