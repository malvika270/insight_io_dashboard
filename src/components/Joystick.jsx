import { useState, useEffect, useCallback } from 'react'
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Joystick({ onDirection, disabled }) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (disabled) return
    const MAP = { ArrowUp:'up', ArrowDown:'down', ArrowLeft:'left', ArrowRight:'right' }
    const down = e => { if (MAP[e.key]) { e.preventDefault(); setActive(MAP[e.key]); onDirection(MAP[e.key]) } }
    const up = e => { if (MAP[e.key]) setActive(null) }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  }, [disabled, onDirection])

  const press = useCallback((dir, e) => {
    e.preventDefault()
    if (!disabled) { setActive(dir); onDirection(dir) }
  }, [disabled, onDirection])

  const release = useCallback(() => setActive(null), [])

  const btn = (dir, Icon, style) => (
    <button
      style={style}
      disabled={disabled}
      className={[
        'absolute w-8 h-8 flex items-center justify-center rounded-full',
        'transition-all duration-100 select-none cursor-pointer',
        disabled ? 'opacity-30' : active === dir ? 'text-white scale-90' : 'text-white/60 hover:text-white',
      ].join(' ')}
      onPointerDown={e => press(dir, e)}
      onPointerUp={release}
      onPointerLeave={release}
    >
      <Icon size={16} strokeWidth={2.5} />
    </button>
  )

  return (
    <div className={`relative w-[100px] h-[100px] ${disabled ? 'opacity-40' : ''}`}>
      <div className="absolute inset-0 rounded-full bg-[#1a1a1a]/80 border border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]" />
      <div className="absolute inset-[14px] rounded-full border border-white/[0.07]" />
      <div className="absolute inset-[38px] rounded-full bg-white/10 border border-white/15" />
      {btn('up',    ChevronUp,    { top: 4,    left: '50%', transform: 'translateX(-50%)' })}
      {btn('down',  ChevronDown,  { bottom: 4, left: '50%', transform: 'translateX(-50%)' })}
      {btn('left',  ChevronLeft,  { left: 4,   top: '50%',  transform: 'translateY(-50%)' })}
      {btn('right', ChevronRight, { right: 4,  top: '50%',  transform: 'translateY(-50%)' })}
      {[
        { l:'N', s:{ top:13,    left:'50%', transform:'translateX(-50%)' } },
        { l:'S', s:{ bottom:13, left:'50%', transform:'translateX(-50%)' } },
        { l:'W', s:{ left:13,   top:'50%',  transform:'translateY(-50%)' } },
        { l:'E', s:{ right:13,  top:'50%',  transform:'translateY(-50%)' } },
      ].map(({l,s}) => (
        <span key={l} style={s} className="absolute text-[8px] font-bold text-white/20 pointer-events-none">{l}</span>
      ))}
    </div>
  )
}