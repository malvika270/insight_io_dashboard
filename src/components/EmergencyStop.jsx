import React from 'react'
import { RotateCcw } from 'lucide-react'

export default function EmergencyStop({ isActive, onToggle }) {
  return (
    <button
      onClick={onToggle}
      title={isActive ? 'Release Emergency Stop' : 'Emergency Stop'}
      className={[
        'relative w-14 h-14 rounded-full flex flex-col items-center justify-center',
        'border-4 transition-all duration-200 select-none active:scale-95',
        'shadow-[0_0_20px_rgba(0,0,0,0.6)]',
        isActive
          ? 'bg-red-700 border-red-900 shadow-[0_0_20px_rgba(220,38,38,0.5)]'
          : 'bg-red-500 border-yellow-400 hover:bg-red-600',
      ].join(' ')}
    >
      <div className="absolute inset-[-6px] rounded-full border-2 border-yellow-400/60" />

      <RotateCcw
        size={20}
        strokeWidth={2.5}
        className={`text-white ${isActive ? '' : 'animate-spin_slow'}`}
        style={{ animationPlayState: isActive ? 'paused' : 'running' }}
      />

      <span className="text-[7px] font-bold text-white/90 mt-0.5 leading-none tracking-wider">
        {isActive ? 'RELEASE' : 'STOP'}
      </span>

      <div className="absolute top-[-18px] left-1/2 -translate-x-1/2 text-[7px] font-bold text-yellow-400/80 tracking-[3px] whitespace-nowrap">
        EMERGENCY
      </div>
    </button>
  )
}
