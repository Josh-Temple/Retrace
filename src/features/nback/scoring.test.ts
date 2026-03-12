import { describe, expect, it } from "vitest";
import { createTrialRecord, scoreSession } from "./scoring";
import { DEFAULT_SESSION_CONFIG } from "./types";

describe("scoring", () => {
  it("computes summary metrics", () => {
    const trials = [
      createTrialRecord({ trialIndex: 0, position: 1, isTarget: true, userPressed: true, reactionTimeMs: 400 }),
      createTrialRecord({ trialIndex: 1, position: 2, isTarget: true, userPressed: false, reactionTimeMs: null }),
      createTrialRecord({ trialIndex: 2, position: 3, isTarget: false, userPressed: true, reactionTimeMs: 500 }),
      createTrialRecord({ trialIndex: 3, position: 4, isTarget: false, userPressed: false, reactionTimeMs: null }),
    ];

    const result = scoreSession({
      id: "test-id",
      timestamp: "2025-01-01T00:00:00.000Z",
      config: DEFAULT_SESSION_CONFIG,
      trials,
    });

    expect(result.hits).toBe(1);
    expect(result.misses).toBe(1);
    expect(result.falseAlarms).toBe(1);
    expect(result.correctRejections).toBe(1);
    expect(result.accuracy).toBe(0.5);
    expect(result.avgReactionTimeMs).toBe(450);
  });

  it("normalizes reaction time to null when user did not press", () => {
    const missedTarget = createTrialRecord({
      trialIndex: 0,
      position: 1,
      isTarget: true,
      userPressed: false,
      reactionTimeMs: 321,
    });

    expect(missedTarget.outcome).toBe("miss");
    expect(missedTarget.reactionTimeMs).toBeNull();
  });
});
