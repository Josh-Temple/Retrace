import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  loadSessionConfig,
  resetSessionConfig,
  saveSessionConfig,
} from "../features/nback/configStorage";
import { DEFAULT_SESSION_CONFIG, type SessionConfig } from "../features/nback/types";

type ConfigField = Exclude<keyof SessionConfig, "n">;

const numberFieldConfig: Array<{ key: ConfigField; label: string; min: number; max: number; step: number }> = [
  { key: "totalTrials", label: "Total trials", min: 10, max: 100, step: 1 },
  { key: "stimulusDurationMs", label: "Stimulus duration (ms)", min: 200, max: 5000, step: 50 },
  { key: "interStimulusIntervalMs", label: "Inter-stimulus interval (ms)", min: 200, max: 5000, step: 50 },
  { key: "targetRate", label: "Target rate", min: 0.1, max: 0.9, step: 0.05 },
];

export function SettingsPage() {
  const navigate = useNavigate();
  const [formConfig, setFormConfig] = useState<SessionConfig>(() => loadSessionConfig());

  const estimatedDurationLabel = useMemo(() => {
    const totalMs = formConfig.totalTrials * (formConfig.stimulusDurationMs + formConfig.interStimulusIntervalMs);
    const seconds = Math.round(totalMs / 1000);
    return seconds < 60 ? `~${seconds}s session` : `~${Math.round(seconds / 6) / 10}m session`;
  }, [formConfig]);

  const handleFieldChange = (key: ConfigField, value: string) => {
    const parsedValue = Number(value);
    setFormConfig((current) => ({
      ...current,
      [key]: Number.isFinite(parsedValue) ? parsedValue : current[key],
    }));
  };

  const handleStartSession = () => {
    saveSessionConfig(formConfig);
    navigate("/session");
  };

  const handleReset = () => {
    const resetConfig = resetSessionConfig();
    setFormConfig(resetConfig);
  };

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Session Settings</p>
        <h2 className="text-4xl font-light tracking-[-0.03em] text-slate-100">Tune the next run.</h2>
        <p className="text-base text-slate-400">Compact controls, saved locally, ready to start.</p>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-5 sm:p-6">
        <div className="mb-6 flex flex-wrap gap-3">
          {[1, 2, 3].map((nValue) => {
            const isActive = formConfig.n === nValue;
            return (
              <button
                key={nValue}
                type="button"
                onClick={() => setFormConfig((current) => ({ ...current, n: nValue }))}
                className={[
                  "rounded-full border px-5 py-2 text-sm font-medium transition",
                  isActive
                    ? "border-emerald-400 bg-emerald-400 text-slate-950"
                    : "border-slate-700 bg-slate-900/80 text-slate-300 hover:border-slate-500 hover:text-slate-100",
                ].join(" ")}
              >
                {nValue}-back
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          {numberFieldConfig.map((field) => (
            <label key={field.key} className="block space-y-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm uppercase tracking-[0.14em] text-slate-400">{field.label}</span>
                <span className="text-sm text-slate-500">Default {DEFAULT_SESSION_CONFIG[field.key]}</span>
              </div>
              <input
                type="number"
                inputMode="decimal"
                min={field.min}
                max={field.max}
                step={field.step}
                value={formConfig[field.key]}
                onChange={(event) => handleFieldChange(field.key, event.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-[#0d1424] px-4 py-3 text-lg text-slate-100 outline-none transition focus:border-emerald-400"
              />
            </label>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-[#0d1424] px-4 py-3 text-sm text-slate-400">
          <p className="text-slate-200">{estimatedDurationLabel}</p>
          <p>N {formConfig.n} · {formConfig.totalTrials} trials · target rate {Math.round(formConfig.targetRate * 100)}%</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleStartSession}
          className="flex-1 rounded-3xl bg-emerald-500 px-6 py-4 text-lg font-medium text-[#021015]"
        >
          Start Session
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-3xl border border-slate-700 px-6 py-4 text-lg font-light text-slate-200"
        >
          Reset Defaults
        </button>
      </div>

      <Link to="/" className="inline-flex text-sm uppercase tracking-[0.16em] text-slate-500 transition hover:text-slate-300">
        Back Home
      </Link>
    </section>
  );
}
