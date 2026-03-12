import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { generateTrials, type GeneratedTrial } from "./generator";
import { createTrialRecord, scoreSession } from "./scoring";
import type { SessionConfig, SessionResult, TrialRecord } from "./types";

export type SessionStatus = "idle" | "running" | "finished";

export function useNBackSession(config: SessionConfig) {
  const [status, setStatus] = useState<SessionStatus>("idle");
  const [generatedTrials, setGeneratedTrials] = useState<GeneratedTrial[]>([]);
  const [trialIndex, setTrialIndex] = useState(0);
  const [activePosition, setActivePosition] = useState<number | null>(null);
  const [isStimulusVisible, setIsStimulusVisible] = useState(false);
  const [records, setRecords] = useState<TrialRecord[]>([]);
  const [result, setResult] = useState<SessionResult | null>(null);

  const currentTrialRef = useRef<GeneratedTrial | null>(null);
  const trialStartTimeRef = useRef<number | null>(null);
  const pressedRef = useRef(false);
  const reactionTimeRef = useRef<number | null>(null);
  const timerRefs = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    for (const timer of timerRefs.current) {
      window.clearTimeout(timer);
    }
    timerRefs.current = [];
  }, []);

  const beginTrial = useCallback(
    (index: number, trials: GeneratedTrial[]) => {
      const trial = trials[index];
      if (!trial) {
        setStatus("finished");
        return;
      }

      currentTrialRef.current = trial;
      pressedRef.current = false;
      reactionTimeRef.current = null;
      trialStartTimeRef.current = performance.now();
      setTrialIndex(index);
      setActivePosition(trial.position);
      setIsStimulusVisible(true);

      const hideStimulusTimer = window.setTimeout(() => {
        setIsStimulusVisible(false);
      }, config.stimulusDurationMs);
      timerRefs.current.push(hideStimulusTimer);

      const totalWindowMs = config.stimulusDurationMs + config.interStimulusIntervalMs;
      const finishTrialTimer = window.setTimeout(() => {
        const current = currentTrialRef.current;
        if (!current) return;

        const record = createTrialRecord({
          trialIndex: current.trialIndex,
          position: current.position,
          isTarget: current.isTarget,
          userPressed: pressedRef.current,
          reactionTimeMs: reactionTimeRef.current,
        });

        setRecords((prev) => [...prev, record]);

        const nextIndex = index + 1;
        if (nextIndex >= trials.length) {
          currentTrialRef.current = null;
          setStatus("finished");
          setActivePosition(null);
          return;
        }

        beginTrial(nextIndex, trials);
      }, totalWindowMs);
      timerRefs.current.push(finishTrialTimer);
    },
    [config.interStimulusIntervalMs, config.stimulusDurationMs],
  );

  const start = useCallback(() => {
    clearTimers();
    const trials = generateTrials(config);
    setGeneratedTrials(trials);
    setRecords([]);
    setResult(null);
    setStatus("running");
    beginTrial(0, trials);
  }, [beginTrial, clearTimers, config]);

  const registerPress = useCallback(() => {
    if (status !== "running") return;
    if (pressedRef.current) return;

    pressedRef.current = true;
    if (trialStartTimeRef.current !== null) {
      reactionTimeRef.current = Math.max(0, Math.round(performance.now() - trialStartTimeRef.current));
    }
  }, [status]);

  useEffect(() => {
    if (status !== "finished" || generatedTrials.length === 0 || records.length !== generatedTrials.length) {
      return;
    }

    const sessionResult = scoreSession({
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      config,
      trials: records,
    });

    setResult(sessionResult);
  }, [config, generatedTrials, records, status]);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  const progressText = useMemo(
    () => `${Math.min(trialIndex + 1, config.totalTrials)} / ${config.totalTrials}`,
    [config.totalTrials, trialIndex],
  );

  return {
    status,
    activePosition: isStimulusVisible ? activePosition : null,
    progressText,
    currentTrialNumber: Math.min(trialIndex + 1, config.totalTrials),
    result,
    start,
    registerPress,
  };
}
