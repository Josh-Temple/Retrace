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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800/80 bg-slate-950/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
          <Link to="/" className="min-w-0 no-underline">
            <p className="text-lg font-semibold leading-tight text-slate-100">Retrace</p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">N-Back Trainer</p>
          </Link>

          <nav className="hidden items-center gap-1 text-sm text-slate-300 sm:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    "rounded-md px-3 py-2 transition",
                    isActive ? "bg-slate-800 text-slate-100" : "text-slate-300 hover:bg-slate-900 hover:text-slate-100",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:hidden">
            {isSessionRoute ? (
              <Link
                to="/"
                className="rounded-md border border-slate-700 px-2.5 py-1.5 text-xs font-medium text-slate-200"
              >
                Exit
              </Link>
            ) : (
              <>
                <MobileNavLink to="/session">Session</MobileNavLink>
                <MobileNavLink to="/history">History</MobileNavLink>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-5 sm:py-8">
        <AppRoutes />
      </main>
    </div>
  );
}

type MobileNavLinkProps = {
  children: string;
  to: string;
};

function MobileNavLink({ children, to }: MobileNavLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "rounded-md px-2.5 py-1.5 text-xs font-medium transition",
          isActive ? "bg-slate-800 text-slate-100" : "border border-slate-700 text-slate-200",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}
