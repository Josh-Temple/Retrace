type MatchButtonProps = {
  onPress?: () => void;
};

export function MatchButton({ onPress }: MatchButtonProps) {
  return (
    <button
      type="button"
      onClick={onPress}
      className="w-full rounded-lg bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400 active:scale-[0.99]"
    >
      <span className="sm:hidden">Match</span>
      <span className="hidden sm:inline">Match (Space)</span>
    </button>
  );
}
