import type { SessionResult } from "./types";

const LEGACY_SESSION_RESULTS_KEY = "nback_session_results";
export const SESSION_RESULTS_KEY = "retrace_session_results";

function parseResults(raw: string | null): SessionResult[] | null {
  if (!raw) {
    return null;
  }

  const parsed = JSON.parse(raw) as unknown;
  if (!Array.isArray(parsed)) {
    return null;
  }

  return parsed as SessionResult[];
}

export function loadSessionResults(): SessionResult[] {
  try {
    const currentValue = parseResults(localStorage.getItem(SESSION_RESULTS_KEY));
    if (currentValue) {
      return currentValue;
    }

    const legacyValue = parseResults(localStorage.getItem(LEGACY_SESSION_RESULTS_KEY));
    if (!legacyValue) {
      return [];
    }

    localStorage.setItem(SESSION_RESULTS_KEY, JSON.stringify(legacyValue));
    return legacyValue;
  } catch {
    return [];
  }
}

export function saveSessionResult(result: SessionResult): SessionResult[] {
  const results = loadSessionResults();
  const updatedResults = [result, ...results];
  localStorage.setItem(SESSION_RESULTS_KEY, JSON.stringify(updatedResults));
  return updatedResults;
}
