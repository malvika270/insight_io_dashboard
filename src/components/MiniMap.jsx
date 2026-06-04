export default function MiniMap() {
  return (
    <div
            className="
            absolute
            bottom-10
            left-32
            w-[420px]
            h-[240px]
            z-50
            border
            border-white/10
            backdrop-blur-md
            bg-slate-900/70
            backdrop-blur-xl
            rounded-2xl
    "
    >
      <div className="flex h-full items-center justify-center text-white">
        POINT CLOUD VIEWER
      </div>
    </div>
  );
}