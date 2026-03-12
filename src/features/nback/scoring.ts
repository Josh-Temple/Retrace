import type { SessionResult, TrialRecord } from "./types";

export function createTrialRecord(args: {
  trialIndex: number;
  position: number;
  isTarget: boolean;
  userPressed: boolean;
  reactionTimeMs: number | null;
}): TrialRecord {
  const { trialIndex, position, isTarget, userPressed, reactionTimeMs } = args;

  if (isTarget && userPressed) {
    return { trialIndex, position, isTarget, userPressed, reactionTimeMs, outcome: "hit" };
  }
  if (isTarget && !userPressed) {
    return { trialIndex, position, isTarget, userPressed, reactionTimeMs: null, outcome: "miss" };
  }
  if (!isTarget && userPressed) {
    return { trialIndex, position, isTarget, userPressed, reactionTimeMs, outcome: "false_alarm" };
  }

  return { trialIndex, position, isTarget, userPressed, reactionTimeMs: null, outcome: "correct_rejection" };
}

export function scoreSession(args: {
  id: string;
  timestamp: string;
  config: SessionResult["config"];
  trials: TrialRecord[];
}): SessionResult {
  const { id, timestamp, config, trials } = args;
  let hits = 0;
  let misses = 0;
  let falseAlarms = 0;
  let correctRejections = 0;
  let targetTrials = 0;

  const reactionTimes: number[] = [];

  for (const trial of trials) {
    if (trial.isTarget) {
      targetTrials += 1;
    }

    if (trial.reactionTimeMs !== null) {
      reactionTimes.push(trial.reactionTimeMs);
    }

    if (trial.outcome === "hit") hits += 1;
    if (trial.outcome === "miss") misses += 1;
    if (trial.outcome === "false_alarm") falseAlarms += 1;
    if (trial.outcome === "correct_rejection") correctRejections += 1;
  }

  const totalTrials = trials.length;
  const accuracy = totalTrials === 0 ? 0 : (hits + correctRejections) / totalTrials;
  const avgReactionTimeMs =
    reactionTimes.length === 0
      ? null
      : reactionTimes.reduce((sum, value) => sum + value, 0) / reactionTimes.length;

  return {
    id,
    timestamp,
    config,
    totalTrials,
    targetTrials,
    hits,
    misses,
    falseAlarms,
    correctRejections,
    accuracy,
    avgReactionTimeMs,
    trials,
  };
}
