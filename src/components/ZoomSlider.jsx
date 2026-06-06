import React from 'react'
import { MAP_CONFIG } from '../data/config'

export default function ZoomSlider({ value, onChange }) {
  const { zoomMin, zoomMax } = MAP_CONFIG

  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-20 select-none">
      <div className="w-1.5 h-1.5 rounded-full bg-white/30" />

      <div className="relative h-28 w-1 rounded-full bg-white/15">
        <div
          className="absolute bottom-0 left-0 w-full rounded-full bg-white/50 transition-none"
          style={{ height: `${(value / zoomMax) * 100}%` }}
        />

        <input
          type="range"
          min={zoomMin}
          max={zoomMax}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute appearance-none cursor-pointer bg-transparent"
          style={{
            writingMode: 'vertical-lr',
            direction: 'rtl',
            width: '24px',
            height: '112px',
            left: '-11px',
          }}
          aria-label="Zoom level"
        />
      </div>

      <div className="w-1.5 h-1.5 rounded-full bg-white/30" />

      <style>{`
        input[type=range][style*="vertical-lr"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 13px;
          height: 13px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 0 3px rgba(255,255,255,0.15);
        }

        input[type=range][style*="vertical-lr"]::-moz-range-thumb {
          width: 13px;
          height: 13px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 0 3px rgba(255,255,255,0.15);
        }
      `}</style>
    </div>
  )
}