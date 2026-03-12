import type { SessionResult } from "./types";

export const SESSION_RESULTS_KEY = "nback_session_results";

export function loadSessionResults(): SessionResult[] {
  try {
    const rawValue = localStorage.getItem(SESSION_RESULTS_KEY);
    if (!rawValue) {
      return [];
    }

    const parsed = JSON.parse(rawValue) as SessionResult[];
    return Array.isArray(parsed) ? parsed : [];
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
