import React from 'react'
import {
  LayoutGrid, Map, MapPin, Crop, Crosshair, TrendingUp, User
} from 'lucide-react'
import { NAV_ITEMS } from '../data/config'

const ICON_MAP = {
  'grid': LayoutGrid,
  'map': Map,
  'map-pin': MapPin,
  'crop': Crop,
  'crosshair': Crosshair,
  'trending-up': TrendingUp,
  'user': User,
}

export default function Sidebar({ activeNavItem, onNavChange }) {
  return (
    <aside className="flex flex-col w-14 shrink-0 bg-[#111] border-r border-white/[0.07] z-20">
      <div className="h-14 flex items-center justify-center border-b border-white/[0.07]">
        <span className="text-white font-bold text-sm tracking-widest select-none">ERIC</span>
      </div>

      <nav className="flex flex-col items-center gap-1 pt-3 flex-1">
        {NAV_ITEMS.map(item => {
          const Icon = ICON_MAP[item.icon]
          const isActive = activeNavItem === item.id

          return (
            <button
              key={item.id}
              title={item.label}
              onClick={() => onNavChange(item.id)}
              className={[
                'w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-150 group relative',
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-white/35 hover:text-white/70 hover:bg-white/[0.06]',
              ].join(' ')}
            >
              {Icon && <Icon size={17} strokeWidth={isActive ? 2.2 : 1.8} />}

              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-white rounded-r-full" />
              )}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
