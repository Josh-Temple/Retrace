import { DEFAULT_SESSION_CONFIG, type SessionConfig } from "./types";

export const SESSION_CONFIG_KEY = "retrace_session_config";

const ALLOWED_N_LEVELS = new Set([1, 2, 3]);
const LIMITS = {
  totalTrials: { min: 10, max: 100 },
  stimulusDurationMs: { min: 200, max: 5000 },
  interStimulusIntervalMs: { min: 200, max: 5000 },
  targetRate: { min: 0.1, max: 0.9 },
} as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function normalizeInteger(value: unknown, fallback: number, min: number, max: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }

  return clamp(Math.round(value), min, max);
}

function normalizeRate(value: unknown, fallback: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }

  return Number(clamp(value, LIMITS.targetRate.min, LIMITS.targetRate.max).toFixed(2));
}

export function normalizeSessionConfig(value: unknown): SessionConfig {
  const candidate = (value && typeof value === "object" ? value : {}) as Partial<SessionConfig>;

  return {
    n: typeof candidate.n === "number" && ALLOWED_N_LEVELS.has(Math.round(candidate.n)) ? Math.round(candidate.n) : DEFAULT_SESSION_CONFIG.n,
    totalTrials: normalizeInteger(
      candidate.totalTrials,
      DEFAULT_SESSION_CONFIG.totalTrials,
      LIMITS.totalTrials.min,
      LIMITS.totalTrials.max,
    ),
    stimulusDurationMs: normalizeInteger(
      candidate.stimulusDurationMs,
      DEFAULT_SESSION_CONFIG.stimulusDurationMs,
      LIMITS.stimulusDurationMs.min,
      LIMITS.stimulusDurationMs.max,
    ),
    interStimulusIntervalMs: normalizeInteger(
      candidate.interStimulusIntervalMs,
      DEFAULT_SESSION_CONFIG.interStimulusIntervalMs,
      LIMITS.interStimulusIntervalMs.min,
      LIMITS.interStimulusIntervalMs.max,
    ),
    targetRate: normalizeRate(candidate.targetRate, DEFAULT_SESSION_CONFIG.targetRate),
  };
}

export function loadSessionConfig(): SessionConfig {
  try {
    const raw = localStorage.getItem(SESSION_CONFIG_KEY);
    if (!raw) {
      return DEFAULT_SESSION_CONFIG;
    }

    return normalizeSessionConfig(JSON.parse(raw));
  } catch {
    return DEFAULT_SESSION_CONFIG;
  }
}

export function saveSessionConfig(config: SessionConfig): SessionConfig {
  const normalizedConfig = normalizeSessionConfig(config);
  localStorage.setItem(SESSION_CONFIG_KEY, JSON.stringify(normalizedConfig));
  return normalizedConfig;
}

export function resetSessionConfig(): SessionConfig {
  localStorage.removeItem(SESSION_CONFIG_KEY);
  return DEFAULT_SESSION_CONFIG;
}
