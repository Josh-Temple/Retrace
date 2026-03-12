import { describe, expect, it } from "vitest";
import { generateTrials } from "./generator";
import type { SessionConfig } from "./types";

const config: SessionConfig = {
  n: 2,
  totalTrials: 25,
  stimulusDurationMs: 700,
  interStimulusIntervalMs: 1800,
  targetRate: 0.3,
};

describe("generateTrials", () => {
  it("ensures first N trials are non-target", () => {
    const trials = generateTrials(config);
    expect(trials[0].isTarget).toBe(false);
    expect(trials[1].isTarget).toBe(false);
  });

  it("matches N-back condition for target and non-target trials", () => {
    const trials = generateTrials(config);

    for (let i = config.n; i < trials.length; i += 1) {
      const nBack = trials[i - config.n].position;
      if (trials[i].isTarget) {
        expect(trials[i].position).toBe(nBack);
      } else {
        expect(trials[i].position).not.toBe(nBack);
      }
    }
  });
});
