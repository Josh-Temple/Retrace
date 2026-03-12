type GridBoardProps = {
  activePosition: number;
};

export function GridBoard({ activePosition }: GridBoardProps) {
  return (
    <div className="grid w-full max-w-xs grid-cols-3 gap-2 sm:max-w-sm">
      {Array.from({ length: 9 }, (_, index) => {
        const isActive = index === activePosition;
        return (
          <div
            key={index}
            className={[
              "aspect-square rounded-lg border transition",
              isActive
                ? "border-emerald-400 bg-emerald-500/30"
                : "border-slate-700 bg-slate-900",
            ].join(" ")}
          />
        );
      })}
    </div>
  );
}
