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

  it("supports deterministic generation with a custom random function", () => {
    const sequence = [0.1, 0.6, 0.2, 0.8];
    let cursor = 0;
    const seededRandom = () => {
      const value = sequence[cursor % sequence.length];
      cursor += 1;
      return value;
    };

    const trials = generateTrials(config, seededRandom);

    expect(trials).toHaveLength(config.totalTrials);
    expect(trials[0].position).toBe(0);
    expect(trials[1].position).toBe(5);
    expect(trials[2].isTarget).toBe(true);
    expect(trials[2].position).toBe(trials[0].position);
  });
});
