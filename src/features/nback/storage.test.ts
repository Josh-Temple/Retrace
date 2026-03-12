import { beforeEach, describe, expect, it } from "vitest";
import { loadSessionResults, saveSessionResult, SESSION_RESULTS_KEY } from "./storage";
import type { SessionResult } from "./types";

const LEGACY_KEY = "nback_session_results";

function createResult(id: string): SessionResult {
  return {
    id,
    timestamp: "2026-01-01T00:00:00.000Z",
    config: {
      n: 2,
      totalTrials: 25,
      stimulusDurationMs: 700,
      interStimulusIntervalMs: 1800,
      targetRate: 0.3,
    },
    totalTrials: 25,
    targetTrials: 8,
    hits: 6,
    misses: 2,
    falseAlarms: 1,
    correctRejections: 16,
    accuracy: 0.88,
    avgReactionTimeMs: 420,
  };
}

function installLocalStorageMock() {
  const store = new Map<string, string>();

  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
      clear: () => {
        store.clear();
      },
    },
  });

  return store;
}

describe("storage", () => {
  let backingStore: Map<string, string>;

  beforeEach(() => {
    backingStore = installLocalStorageMock();
  });

  it("loads from the canonical key when present", () => {
    const stored = [createResult("latest")];
    backingStore.set(SESSION_RESULTS_KEY, JSON.stringify(stored));

    const loaded = loadSessionResults();

    expect(loaded).toEqual(stored);
  });

  it("migrates legacy results when canonical key is absent", () => {
    const legacy = [createResult("legacy")];
    backingStore.set(LEGACY_KEY, JSON.stringify(legacy));

    const loaded = loadSessionResults();

    expect(loaded).toEqual(legacy);
    expect(backingStore.get(SESSION_RESULTS_KEY)).toBe(JSON.stringify(legacy));
  });

  it("returns empty list when stored payload is malformed", () => {
    backingStore.set(SESSION_RESULTS_KEY, "{\"bad\":true}");

    expect(loadSessionResults()).toEqual([]);
  });

  it("prepends and persists new results", () => {
    const existing = createResult("existing");
    const latest = createResult("latest");
    backingStore.set(SESSION_RESULTS_KEY, JSON.stringify([existing]));

    const saved = saveSessionResult(latest);

    expect(saved).toEqual([latest, existing]);
    expect(backingStore.get(SESSION_RESULTS_KEY)).toBe(JSON.stringify([latest, existing]));
  });
});
