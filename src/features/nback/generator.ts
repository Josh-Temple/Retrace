import type { SessionConfig } from "./types";

const GRID_CELLS = 9;

export type GeneratedTrial = {
  trialIndex: number;
  position: number;
  isTarget: boolean;
};

function randomInt(maxExclusive: number, random: () => number): number {
  return Math.floor(random() * maxExclusive);
}

function pickDifferentPosition(forbidden: number, random: () => number): number {
  let next = randomInt(GRID_CELLS, random);
  while (next === forbidden) {
    next = randomInt(GRID_CELLS, random);
  }
  return next;
}

function shouldAssignTarget(args: {
  remainingTrials: number;
  remainingTargetBudget: number;
  targetRate: number;
  random: () => number;
}): boolean {
  const { remainingTrials, remainingTargetBudget, targetRate, random } = args;

  if (remainingTargetBudget <= 0) {
    return false;
  }

  if (remainingTargetBudget >= remainingTrials) {
    return true;
  }

  return random() < targetRate;
}

export function generateTrials(config: SessionConfig, random: () => number = Math.random): GeneratedTrial[] {
  const { n, totalTrials, targetRate } = config;
  const trials: GeneratedTrial[] = [];
  const targetCount = Math.round(totalTrials * targetRate);
  let assignedTargets = 0;

  for (let trialIndex = 0; trialIndex < totalTrials; trialIndex += 1) {
    if (trialIndex < n) {
      trials.push({
        trialIndex,
        position: randomInt(GRID_CELLS, random),
        isTarget: false,
      });
      continue;
    }

    const remainingTrials = totalTrials - trialIndex;
    const remainingTargetBudget = targetCount - assignedTargets;
    const nBackPosition = trials[trialIndex - n].position;

    const isTarget = shouldAssignTarget({
      remainingTrials,
      remainingTargetBudget,
      targetRate,
      random,
    });

    const position = isTarget ? nBackPosition : pickDifferentPosition(nBackPosition, random);

    if (isTarget) {
      assignedTargets += 1;
    }

    trials.push({ trialIndex, position, isTarget });
  }

  return trials;
}
