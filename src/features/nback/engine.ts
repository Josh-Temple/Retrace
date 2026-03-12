import type { SessionConfig, SessionResult } from "./types";
import { generateTrials } from "./generator";
import { createTrialRecord, scoreSession } from "./scoring";

export function runSessionSimulation(config: SessionConfig): SessionResult {
  const generated = generateTrials(config);
  const trials = generated.map((trial) => {
    const simulatedPress = Math.random() < 0.4;
    const simulatedReaction = simulatedPress ? 200 + Math.round(Math.random() * 600) : null;

    return createTrialRecord({
      trialIndex: trial.trialIndex,
      position: trial.position,
      isTarget: trial.isTarget,
      userPressed: simulatedPress,
      reactionTimeMs: simulatedReaction,
    });
  });

  return scoreSession({
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    config,
    trials,
  });
}
