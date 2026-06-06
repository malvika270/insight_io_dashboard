export default function Status() {
  return (
    <div
      className="
      absolute
      top-20
      left-[62%]

      rounded-xl
      bg-slate-900/70
      backdrop-blur-xl

      border border-white/10

      px-5
      py-3

      text-white
      z-50
      "
    >
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
        Active
      </div>
    </div>
  );
}