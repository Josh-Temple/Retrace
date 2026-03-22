import { beforeEach, describe, expect, it } from "vitest";
import {
  loadSessionConfig,
  normalizeSessionConfig,
  resetSessionConfig,
  saveSessionConfig,
  SESSION_CONFIG_KEY,
} from "./configStorage";
import { DEFAULT_SESSION_CONFIG, type SessionConfig } from "./types";

function installLocalStorageMock() {
  const store = new Map<string, string>();

  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
      removeItem: (key: string) => {
        store.delete(key);
      },
      clear: () => {
        store.clear();
      },
    },
  });

  return store;
}

describe("configStorage", () => {
  let backingStore: Map<string, string>;

  beforeEach(() => {
    backingStore = installLocalStorageMock();
  });

  it("loads the default config when nothing has been stored", () => {
    expect(loadSessionConfig()).toEqual(DEFAULT_SESSION_CONFIG);
  });

  it("saves and reloads a normalized config", () => {
    const customConfig: SessionConfig = {
      n: 3,
      totalTrials: 40,
      stimulusDurationMs: 900,
      interStimulusIntervalMs: 1500,
      targetRate: 0.45,
    };

    const saved = saveSessionConfig(customConfig);

    expect(saved).toEqual(customConfig);
    expect(loadSessionConfig()).toEqual(customConfig);
    expect(backingStore.get(SESSION_CONFIG_KEY)).toBe(JSON.stringify(customConfig));
  });

  it("falls back to defaults when the stored payload is malformed", () => {
    backingStore.set(SESSION_CONFIG_KEY, "{bad json");

    expect(loadSessionConfig()).toEqual(DEFAULT_SESSION_CONFIG);
  });

  it("normalizes invalid fields instead of trusting storage blindly", () => {
    expect(
      normalizeSessionConfig({
        n: 9,
        totalTrials: -4,
        stimulusDurationMs: "700",
        interStimulusIntervalMs: 15000,
        targetRate: 2,
      }),
    ).toEqual({
      n: DEFAULT_SESSION_CONFIG.n,
      totalTrials: 10,
      stimulusDurationMs: DEFAULT_SESSION_CONFIG.stimulusDurationMs,
      interStimulusIntervalMs: 5000,
      targetRate: 0.9,
    });
  });

  it("resets back to defaults and removes the stored key", () => {
    saveSessionConfig({
      n: 1,
      totalTrials: 30,
      stimulusDurationMs: 800,
      interStimulusIntervalMs: 1200,
      targetRate: 0.25,
    });

    const reset = resetSessionConfig();

    expect(reset).toEqual(DEFAULT_SESSION_CONFIG);
    expect(backingStore.has(SESSION_CONFIG_KEY)).toBe(false);
    expect(loadSessionConfig()).toEqual(DEFAULT_SESSION_CONFIG);
  });
});
