import type { SessionResult, TrialOutcome, TrialRecord } from "./types";

type TrialInput = {
  trialIndex: number;
  position: number;
  isTarget: boolean;
  userPressed: boolean;
  reactionTimeMs: number | null;
};

function determineOutcome(isTarget: boolean, userPressed: boolean): TrialOutcome {
  if (isTarget && userPressed) {
    return "hit";
  }
  if (isTarget && !userPressed) {
    return "miss";
  }
  if (!isTarget && userPressed) {
    return "false_alarm";
  }
  return "correct_rejection";
}

export function createTrialRecord(args: TrialInput): TrialRecord {
  const { trialIndex, position, isTarget, userPressed, reactionTimeMs } = args;
  const outcome = determineOutcome(isTarget, userPressed);

  return {
    trialIndex,
    position,
    isTarget,
    userPressed,
    reactionTimeMs: userPressed ? reactionTimeMs : null,
    outcome,
  };
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
  let reactionTimeTotal = 0;
  let reactionTimeCount = 0;

  for (const trial of trials) {
    if (trial.isTarget) {
      targetTrials += 1;
    }

    if (trial.reactionTimeMs !== null) {
      reactionTimeTotal += trial.reactionTimeMs;
      reactionTimeCount += 1;
    }

    switch (trial.outcome) {
      case "hit":
        hits += 1;
        break;
      case "miss":
        misses += 1;
        break;
      case "false_alarm":
        falseAlarms += 1;
        break;
      case "correct_rejection":
        correctRejections += 1;
        break;
    }
  }

  const totalTrials = trials.length;
  const accuracy = totalTrials === 0 ? 0 : (hits + correctRejections) / totalTrials;
  const avgReactionTimeMs = reactionTimeCount === 0 ? null : reactionTimeTotal / reactionTimeCount;

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
