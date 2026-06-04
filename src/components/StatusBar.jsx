export default function StatusCard() {
  return (
   <div className="
absolute top-5 left-1/2
-z-0
flex items-center gap-10
-translate-x-1/2
rounded-2xl
bg-slate-900/90
px-10 py-4
backdrop-blur-xl
border border-white/10
">
  <div>
    <span>Battery</span>
    <h3>87%</h3>
  </div>

  <div>
    <span>Network</span>
    <h3 className="green">Strong</h3>
  </div>

  <div>
    <span>Mission</span>
    <h3>#001</h3>
  </div>
</div>
  );
}