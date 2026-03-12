import type { SessionConfig } from "./types";

export type GeneratedTrial = {
  trialIndex: number;
  position: number;
  isTarget: boolean;
};

function randomInt(maxExclusive: number): number {
  return Math.floor(Math.random() * maxExclusive);
}

function pickDifferentPosition(forbidden: number): number {
  let next = randomInt(9);
  while (next === forbidden) {
    next = randomInt(9);
  }
  return next;
}

export function generateTrials(config: SessionConfig): GeneratedTrial[] {
  const { n, totalTrials, targetRate } = config;
  const trials: GeneratedTrial[] = [];
  const targetCount = Math.round(totalTrials * targetRate);
  let assignedTargets = 0;

  for (let trialIndex = 0; trialIndex < totalTrials; trialIndex += 1) {
    if (trialIndex < n) {
      const position = randomInt(9);
      trials.push({ trialIndex, position, isTarget: false });
      continue;
    }

    const remainingTrials = totalTrials - trialIndex;
    const remainingTargetBudget = targetCount - assignedTargets;
    const mustAssignTarget = remainingTargetBudget >= remainingTrials;
    const shouldTryTarget = mustAssignTarget || (remainingTargetBudget > 0 && Math.random() < targetRate);

    const nBackPosition = trials[trialIndex - n].position;
    let isTarget = false;
    let position: number;

    if (shouldTryTarget) {
      isTarget = true;
      position = nBackPosition;
      assignedTargets += 1;
    } else {
      position = pickDifferentPosition(nBackPosition);
    }

    trials.push({ trialIndex, position, isTarget });
  }

  return trials;
}
