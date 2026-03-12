export type SessionConfig = {
  n: number;
  totalTrials: number;
  stimulusDurationMs: number;
  interStimulusIntervalMs: number;
  targetRate: number;
};

export type TrialOutcome = "hit" | "miss" | "false_alarm" | "correct_rejection";

export type TrialRecord = {
  trialIndex: number;
  position: number;
  isTarget: boolean;
  userPressed: boolean;
  reactionTimeMs: number | null;
  outcome: TrialOutcome;
};

export type SessionResult = {
  id: string;
  timestamp: string;
  config: SessionConfig;
  totalTrials: number;
  targetTrials: number;
  hits: number;
  misses: number;
  falseAlarms: number;
  correctRejections: number;
  accuracy: number;
  avgReactionTimeMs: number | null;
  trials?: TrialRecord[];
};

export const DEFAULT_SESSION_CONFIG: SessionConfig = {
  n: 2,
  totalTrials: 25,
  stimulusDurationMs: 700,
  interStimulusIntervalMs: 1800,
  targetRate: 0.3,
};
