type MatchButtonProps = {
  onPress?: () => void;
};

export function MatchButton({ onPress }: MatchButtonProps) {
  return (
    <button
      type="button"
      onClick={onPress}
      className="w-full rounded-3xl bg-emerald-500 px-4 py-5 text-3xl font-semibold tracking-[0.04em] text-[#021015] transition hover:bg-emerald-400 active:scale-[0.99]"
    >
      <span className="sm:hidden">MATCH</span>
      <span className="hidden sm:inline">MATCH (SPACE)</span>
    </button>
  );
}
