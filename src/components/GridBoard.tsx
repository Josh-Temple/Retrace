type GridBoardProps = {
  activePosition: number;
};

export function GridBoard({ activePosition }: GridBoardProps) {
  return (
    <div className="grid w-full max-w-[18rem] grid-cols-3 gap-2.5 sm:max-w-sm sm:gap-3">
      {Array.from({ length: 9 }, (_, index) => {
        const isActive = index === activePosition;

        return (
          <div
            key={index}
            aria-hidden
            className={[
              "aspect-square rounded-xl border transition-all duration-150",
              isActive
                ? "scale-[1.03] border-emerald-300 bg-emerald-400/45 shadow-[0_0_0_1px_rgba(16,185,129,0.32),0_0_20px_rgba(16,185,129,0.28)]"
                : "border-slate-800 bg-slate-900/70",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}
