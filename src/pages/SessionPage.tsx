import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GridBoard } from "../components/GridBoard";
import { MatchButton } from "../components/MatchButton";
import { SessionHUD } from "../components/SessionHUD";
import { saveSessionResult } from "../features/nback/storage";
import { DEFAULT_SESSION_CONFIG } from "../features/nback/types";
import { useNBackSession } from "../features/nback/useNBackSession";

export function SessionPage() {
  const navigate = useNavigate();
  const { status, activePosition, currentTrialNumber, result, start, registerPress } = useNBackSession(DEFAULT_SESSION_CONFIG);

  useEffect(() => {
    start();
  }, [start]);

  useEffect(() => {
    if (!result) return;

    saveSessionResult(result);
    sessionStorage.setItem("latest_session_result", JSON.stringify(result));
    navigate("/result");
  }, [navigate, result]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        registerPress();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [registerPress]);

  return (
    <section className="space-y-8">
      <SessionHUD
        n={DEFAULT_SESSION_CONFIG.n}
        currentTrial={currentTrialNumber}
        totalTrials={DEFAULT_SESSION_CONFIG.totalTrials}
      />

      <div className="flex min-h-[65vh] flex-col items-center justify-between rounded-3xl border border-slate-900 bg-[#0d1424] px-4 py-6 sm:px-6 sm:py-8">
        <GridBoard activePosition={activePosition ?? -1} />
        <div className="w-full max-w-lg">
          <MatchButton onPress={registerPress} />
        </div>
      </div>

      <p className="text-center text-sm uppercase tracking-[0.2em] text-slate-500">
        <span className="mr-2 text-emerald-500">●</span>
        Status: <span className="text-slate-400">{status}</span>
      </p>
    </section>
  );
}
