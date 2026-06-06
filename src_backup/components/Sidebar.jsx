import {
  FaThLarge,
  FaMapMarkedAlt,
  FaVideo,
  FaChartLine,
  FaUser
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside
      className="
      absolute left-0 top-0 z-50
      flex h-full w-24 flex-col
      bg-slate-950/95
      border-r border-white/10
      "
    >
      <div className="py-6 text-center">
        <h1 className="text-2xl font-bold text-white">
          Insight.io
        </h1>
      </div>

      <nav className="mt-8 flex flex-col items-center gap-10 text-white">
        <FaThLarge size={22}/>
        <FaMapMarkedAlt size={22}/>
        <FaVideo size={22}/>
        <FaChartLine size={22}/>
        <FaUser size={22}/>
      </nav>
    </aside>
  );
}