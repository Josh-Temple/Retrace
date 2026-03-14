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
    <section className="space-y-4 sm:space-y-6">
      <SessionHUD
        n={DEFAULT_SESSION_CONFIG.n}
        currentTrial={currentTrialNumber}
        totalTrials={DEFAULT_SESSION_CONFIG.totalTrials}
      />

      <div className="flex flex-col items-center gap-5 rounded-xl border border-slate-800 bg-slate-900/50 p-4 sm:gap-6 sm:p-6">
        <GridBoard activePosition={activePosition ?? -1} />
        <div className="w-full max-w-xs sm:max-w-sm">
          <MatchButton onPress={registerPress} />
        </div>
      </div>

      <p className="text-xs text-slate-400 sm:text-sm">
        Status: <span className="font-semibold text-slate-200">{status}</span>
      </p>
    </section>
  );
}
