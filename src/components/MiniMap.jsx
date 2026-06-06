import React, { useRef, useEffect } from 'react'
import { VIEWS, VIEW_LABELS } from '../data/config'

export default function ThumbnailPip({ activeView, onSwitch, robotPos }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (activeView !== VIEWS.CAMERA) return

    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = canvas.offsetWidth || 160
    canvas.height = canvas.offsetHeight || 110

    const ctx = canvas.getContext('2d')
    const W = canvas.width
    const H = canvas.height

    ctx.fillStyle = '#dedad6'
    ctx.fillRect(0, 0, W, H)

    ctx.fillStyle = '#ece8e4'
    ctx.strokeStyle = '#222'
    ctx.lineWidth = 2
    ctx.fillRect(W * 0.08, H * 0.06, W * 0.84, H * 0.88)
    ctx.strokeRect(W * 0.08, H * 0.06, W * 0.84, H * 0.88)

    const rooms = [
      [0.08, 0.06, 0.26, 0.35],
      [0.66, 0.06, 0.26, 0.40],
      [0.08, 0.58, 0.34, 0.36],
      [0.50, 0.55, 0.42, 0.39],
    ]

    rooms.forEach(([x, y, w, h]) => {
      ctx.fillStyle = 'rgba(240,180,180,0.55)'
      ctx.fillRect(W * x, H * y, W * w, H * h)

      ctx.strokeStyle = '#aaa'
      ctx.lineWidth = 1
      ctx.strokeRect(W * x, H * y, W * w, H * h)
    })

    const rx = (robotPos.x / 100) * W
    const ry = (robotPos.y / 100) * H

    ctx.fillStyle = '#111'
    ctx.beginPath()
    ctx.arc(rx, ry, 4, 0, Math.PI * 2)
    ctx.fill()

    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 1.5
    ctx.stroke()

    ctx.fillStyle = '#fff'
    ctx.beginPath()
    ctx.moveTo(rx, ry - 7)
    ctx.lineTo(rx - 2.5, ry - 3)
    ctx.lineTo(rx + 2.5, ry - 3)
    ctx.closePath()
    ctx.fill()
  }, [activeView, robotPos])

const altLabel =
    activeView === VIEWS.CAMERA
      ? VIEW_LABELS[VIEWS.MAP]
      : activeView === VIEWS.MAP
      ? VIEW_LABELS[VIEWS.CLOUD]
      : VIEW_LABELS[VIEWS.CAMERA]

  return (
    <div
      onClick={onSwitch}
      className="absolute bottom-5 left-14 z-20 cursor-pointer group"
      style={{ width: 160, height: 110 }}
    >
      <div className="absolute inset-0 rounded-2xl border border-white/25 shadow-[0_4px_24px_rgba(0,0,0,0.6)] overflow-hidden bg-black">
        {activeView === VIEWS.CAMERA && (
          <canvas ref={canvasRef} className="w-full h-full" />
        )}

        {activeView === VIEWS.MAP && (
          <div className="w-full h-full bg-[#2a2520] flex items-center justify-center">
            <video
              className="w-full h-full object-cover"
              src="/camera-feed.mp4"
              autoPlay
              loop
              muted
              playsInline
              onError={e => {
                e.target.style.display = 'none'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#3a3530] to-[#b8b0a0] opacity-80" />
          </div>
        )}
        {activeView === VIEWS.CLOUD && (
          <div className="w-full h-full bg-[#0d0d0d] flex items-center justify-center">
            <span className="text-white/20 text-[9px]">3D CLOUD</span>
          </div>
        )}

        <div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200
                     flex items-center justify-center"
        >
          <span
            className="text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100
                       transition-opacity duration-200 bg-black/70 px-2.5 py-1 rounded-full
                       border border-white/20 whitespace-nowrap"
          >
            Click to enter {altLabel.toLowerCase()}
          </span>
        </div>
      </div>
    </div>
  )
}