export default function TopStatus() {
  return (
   <div
 className="
 absolute
 top-4
 left-1/2
 -translate-x-1/2

 flex
 gap-8

 px-8
 py-3

 rounded-full

 bg-slate-900/70
 backdrop-blur-xl

 border
 border-white/10
 "
>
      <div>
        <p className="text-xs text-slate-400">Battery</p>
        <p>87%</p>
      </div>

      <div>
        <p className="text-xs text-slate-400">Signal</p>
        <p>Strong</p>
      </div>

      <div>
        <p className="text-xs text-slate-400">Robot</p>
        <p>Online</p>
      </div>
    </div>
  );
}