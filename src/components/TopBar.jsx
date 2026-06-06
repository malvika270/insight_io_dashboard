import React from 'react'
import { Pause, Play, ChevronRight, Wifi, Shield, Cpu } from 'lucide-react'
import {
  MISSION,
  STATUS_INDICATORS,
  MODES,
  STATUS_COLOR_CLASSES,
  VIEW_LABELS,
} from '../data/config'

const ICON_MAP = {
  shield: Shield,
  cpu: Cpu,
  signal: Wifi,
}

function StatusDot({ color }) {
  const { dot } = STATUS_COLOR_CLASSES[color]

  return (
    <span
      className={`inline-block w-1.5 h-1.5 rounded-full shrink-0 ${dot} animate-pulse_dot`}
    />
  )
}

function StatusIndicators({ indicators }) {
  return (
    <div className="flex items-center gap-3">
      {indicators.map((item, i) => {
        const cls = STATUS_COLOR_CLASSES[item.color]
        const Icon = ICON_MAP[item.icon]

        return (
          <React.Fragment key={item.id}>
            {i > 0 && <span className="w-px h-3 bg-white/15 shrink-0" />}

            <div className="flex items-center gap-1.5">
              {item.showBar ? (
                <div className="flex items-center gap-1.5">
                  <span className={`text-[11px] font-semibold font-mono ${cls.text}`}>
                    {item.label}
                  </span>

                  <div className="flex items-center gap-[2px]">
                    <div className="relative w-6 h-3 rounded-[3px] border border-white/30 bg-white/10 overflow-hidden">
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-green-400 rounded-[2px]"
                        style={{ width: `${item.barFill * 100}%` }}
                      />
                    </div>

                    <div className="w-[3px] h-[6px] rounded-r-[2px] bg-white/30" />
                  </div>
                </div>
              ) : item.badge ? (
                <div className="flex items-center gap-1">
                  {Icon && (
                    <Icon
                      size={11}
                      className="text-white/40"
                      strokeWidth={1.8}
                    />
                  )}

                  <span className="text-[11px] text-white/50">
                    {item.label}
                  </span>

                  <span className={`text-[11px] font-semibold ${cls.text}`}>
                    {item.badge}
                  </span>

                  <StatusDot color={item.color} />
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  {Icon && (
                    <Icon
                      size={12}
                      className={cls.text}
                      strokeWidth={2}
                    />
                  )}

                  <span className={`text-[11px] font-semibold ${cls.text}`}>
                    {item.label}
                  </span>
                </div>
              )}
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}

function Pill({ children, className = '', onClick }) {
  const Tag = onClick ? 'button' : 'div'

  return (
    <Tag
      onClick={onClick}
      className={[
        'flex items-center gap-2',
        'bg-[#1c1c1c]/90 backdrop-blur-md',
        'border border-white/[0.13]',
        'rounded-full px-3 py-[7px]',
        'shadow-[0_2px_16px_rgba(0,0,0,0.55)]',
        onClick
          ? 'cursor-pointer hover:bg-[#272727]/90 hover:border-white/20 active:scale-95 transition-all duration-150'
          : '',
        className,
      ].join(' ')}
    >
      {children}
    </Tag>
  )
}

function ArrowCircle() {
  return (
    <span className="w-6 h-6 rounded-full bg-[#2e2e2e] border border-white/10 flex items-center justify-center shrink-0">
      <ChevronRight
        size={11}
        strokeWidth={2.5}
        className="text-white/80"
      />
    </span>
  )
}

export default function TopBar({
  activeMode,
  onModeChange,
  isPaused,
  onPauseToggle,
  activeView,
}) {
  return (
    <div className="absolute inset-x-0 top-0 z-30 pointer-events-none select-none px-4 pt-3 space-y-2">
      <div className="flex items-center justify-between gap-3">
        <Pill onClick={onPauseToggle} className="pointer-events-auto">
          <StatusDot color="green" />

          <span className="text-[11px] text-white/40 font-medium">
            Status
          </span>

          <span className="text-[11px] font-bold text-white whitespace-nowrap">
            {MISSION.status} {MISSION.id}
          </span>

          <span className="w-6 h-6 rounded-full bg-[#2e2e2e] border border-white/10 flex items-center justify-center shrink-0 ml-0.5">
            {isPaused ? (
              <Play
                size={8}
                className="text-white fill-white translate-x-px"
              />
            ) : (
              <Pause
                size={8}
                className="text-white"
                strokeWidth={3}
              />
            )}
          </span>
        </Pill>

        <Pill className="pointer-events-auto">
          <StatusIndicators indicators={STATUS_INDICATORS} />
        </Pill>

        <Pill className="pointer-events-auto gap-2">
          <span className="text-[10px] text-white/30 font-bold tracking-widest uppercase">
            Mode
          </span>

          <div className="flex items-center bg-black/40 border border-white/[0.08] rounded-full p-[3px] gap-[2px]">
            {MODES.map(mode => (
              <button
                key={mode}
                onClick={() => onModeChange(mode)}
                className={[
                  'px-3 py-[3px] rounded-full text-[10px] font-bold tracking-wide transition-all duration-200 cursor-pointer',
                  activeMode === mode
                    ? 'bg-white text-black shadow-sm'
                    : 'text-white/40 hover:text-white/70',
                ].join(' ')}
              >
                {mode}
              </button>
            ))}
          </div>
        </Pill>
      </div>

      <div className="flex items-center justify-between gap-3">
        <Pill onClick={() => {}} className="pointer-events-auto">
          <span className="text-[11px] font-bold tracking-widest uppercase text-white/80">
            Quick Goal
          </span>

          <ArrowCircle />
        </Pill>

        <Pill className="pointer-events-auto">
          <span className="text-[11px] font-semibold text-white/70 tracking-wide">
            {VIEW_LABELS[activeView]}
          </span>
        </Pill>

        <Pill onClick={() => {}} className="pointer-events-auto">
          <span className="text-[11px] font-bold tracking-widest uppercase text-white/80">
            Initiate
          </span>

          <ArrowCircle />
        </Pill>
      </div>
    </div>
  )
}