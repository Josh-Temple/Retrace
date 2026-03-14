import type { ReactElement } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AppRoutes } from "./routes";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Session", to: "/session" },
  { label: "Result", to: "/result" },
  { label: "History", to: "/history" },
];

export function App() {
  const location = useLocation();
  const isSessionRoute = location.pathname === "/session";

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100">
      <header className="border-b border-slate-900/70 bg-[#0b1120]/95 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex w-full max-w-xl items-center justify-between gap-4">
          <Link to="/" className="min-w-0 no-underline">
            <p className="text-[11px] uppercase tracking-[0.32em] text-slate-400">N-BACK TRAINER</p>
            <p className="text-[46px] font-light leading-[1.04] text-slate-100 sm:text-[48px]">Retrace</p>
          </Link>

          {isSessionRoute ? (
            <Link to="/" className="text-sm uppercase tracking-[0.12em] text-slate-500 transition hover:text-slate-300">
              Exit
            </Link>
          ) : (
            <Link
              to="/session"
              aria-label="Start session"
              className="rounded-full border border-slate-700/70 p-2 text-slate-300 transition hover:border-slate-500 hover:text-slate-100"
            >
              <GearIcon />
            </Link>
          )}
        </div>
      </header>

      <main className="mx-auto w-full max-w-xl px-6 pb-28 pt-7 sm:pb-8">
        <AppRoutes />
      </main>

      {!isSessionRoute ? (
        <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-700/70 bg-[#0b1120]/95 px-6 py-3 backdrop-blur sm:hidden">
          <div className="mx-auto flex max-w-xl items-center justify-around">
            <BottomNavLink to="/" label="Home" icon={<HomeIcon />} />
            <BottomNavLink to="/history" label="History" icon={<HistoryIcon />} />
            <BottomNavLink to="/result" label="Result" icon={<ChartIcon />} />
          </div>
        </nav>
      ) : null}

      <nav className="mx-auto hidden max-w-5xl items-center justify-center gap-1 pb-6 text-sm text-slate-300 sm:flex">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                "rounded-md px-3 py-2 transition",
                isActive ? "bg-slate-800 text-slate-100" : "text-slate-400 hover:bg-slate-900 hover:text-slate-100",
              ].join(" ")
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

type BottomNavLinkProps = {
  icon: ReactElement;
  label: string;
  to: string;
};

function BottomNavLink({ icon, label, to }: BottomNavLinkProps) {
  return (
    <NavLink to={to} className="group flex flex-col items-center gap-1.5 text-[11px] tracking-[0.08em] text-slate-500">
      {({ isActive }) => (
        <>
          <span className={isActive ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300"}>{icon}</span>
          <span className={isActive ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300"}>{label}</span>
        </>
      )}
    </NavLink>
  );
}

function GearIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.12 7.12 0 0 0-1.63-.94l-.36-2.54A.5.5 0 0 0 13.9 2h-3.8a.5.5 0 0 0-.49.42l-.36 2.54c-.58.22-1.13.53-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.71 8.48a.5.5 0 0 0 .12.64l2.03 1.58c-.04.3-.06.61-.06.94s.02.64.06.94l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32c.13.22.39.31.6.22l2.39-.96c.5.41 1.05.72 1.63.94l.36 2.54c.04.24.25.42.49.42h3.8c.24 0 .45-.18.49-.42l.36-2.54c.58-.22 1.13-.53 1.63-.94l2.39.96c.22.09.47 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3 3 10.2V21h6.4v-6.2h5.2V21H21V10.2L12 3Z" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 3h18v18H3V3Zm4 12h2V8H7v7Zm4 0h2V5h-2v10Zm4 0h2v-4h-2v4Z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6 3h12l-1 15-5 3-5-3L6 3Zm6 5.5a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4Zm0 6.4-2.8 3h5.6L12 14.9Z" />
    </svg>
  );
}
