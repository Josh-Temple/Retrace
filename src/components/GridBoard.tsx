type GridBoardProps = {
  activePosition: number;
};

export function GridBoard({ activePosition }: GridBoardProps) {
  return (
    <div className="grid w-full max-w-[22rem] grid-cols-3 gap-3 sm:max-w-[27rem] sm:gap-4">
      {Array.from({ length: 9 }, (_, index) => {
        const isActive = index === activePosition;

        return (
          <div
            key={index}
            aria-hidden
            className={[
              "aspect-square rounded-2xl border border-slate-800/80 transition-all duration-150",
              isActive
                ? "scale-[1.01] border-slate-100/80 bg-slate-200 shadow-[0_0_18px_rgba(226,240,255,0.32)]"
                : "bg-[#0c1526]",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}
