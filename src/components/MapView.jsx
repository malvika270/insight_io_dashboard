import React, { useRef, useEffect, useCallback } from 'react'
import { MAP_CONFIG } from '../data/config'

export default function MapView({ isVisible, robotPos, zoom }) {
  const canvasRef = useRef(null)
  const imgRef    = useRef(null)

  const drawMap = useCallback((canvas, robotPct, zoomVal) => {
    const ctx = canvas.getContext('2d')
    const W = canvas.width
    const H = canvas.height

   
    ctx.fillStyle = '#e8e4e0'
    ctx.fillRect(0, 0, W, H)

    const scale = 0.5 + (zoomVal / 100) * 1.0
    const cx = W / 2
    const cy = H / 2

    ctx.save()
    ctx.translate(cx, cy)
    ctx.scale(scale, scale)
    ctx.translate(-cx, -cy)

    ctx.strokeStyle = '#111'
    ctx.lineWidth = 3
    ctx.fillStyle = '#f0ece8'
    const rooms = [
      { x: cx - 180, y: cy - 220, w: 360, h: 440 },
    ]
    rooms.forEach(r => {
      ctx.fillRect(r.x, r.y, r.w, r.h)
      ctx.strokeRect(r.x, r.y, r.w, r.h)
    })

    const interiorWalls = [
      { x: cx - 180, y: cy - 220, w: 100, h: 130, fill: '#f7c4c4' },
      { x: cx - 80,  y: cy - 220, w: 120, h: 90,  fill: '#f7c4c4' },
      { x: cx + 60,  y: cy - 220, w: 120, h: 150, fill: '#f7c4c4' },
      { x: cx - 180, y: cy + 60,  w: 140, h: 160, fill: '#f7c4c4' },
      { x: cx + 40,  y: cy + 100, w: 140, h: 120, fill: '#f7d4c4' },
    ]
    interiorWalls.forEach(r => {
      ctx.fillStyle = r.fill
      ctx.fillRect(r.x, r.y, r.w, r.h)
      ctx.strokeStyle = '#555'
      ctx.lineWidth = 1.5
      ctx.strokeRect(r.x, r.y, r.w, r.h)
    })

    ctx.clearRect(cx - 120, cy - 92,  12, 3)
    ctx.clearRect(cx + 40,  cy - 70,  3, 12)

    const obstacles = [
      { x: cx - 60, y: cy - 60 }, { x: cx - 30, y: cy - 80 },
      { x: cx + 20, y: cy - 50 }, { x: cx + 50, y: cy - 20 },
      { x: cx - 80, y: cy + 20 }, { x: cx + 30, y: cy + 30 },
      { x: cx - 20, y: cy + 60 }, { x: cx + 70, y: cy + 60 },
      { x: cx - 100,y: cy - 120},
    ]
    obstacles.forEach(o => {
      ctx.fillStyle = '#888'
      ctx.beginPath()
      ctx.arc(o.x, o.y, 5, 0, Math.PI * 2)
      ctx.fill()
    })

    const rx = (robotPct.x / 100) * W
    const ry = (robotPct.y / 100) * H

    
    ctx.fillStyle = 'rgba(0,0,0,0.18)'
    ctx.beginPath()
    ctx.ellipse(rx, ry + 10, 11, 5, 0, 0, Math.PI * 2)
    ctx.fill()

   
    ctx.fillStyle = '#1a1a1a'
    ctx.beginPath()
    ctx.roundRect(rx - 9, ry - 12, 18, 20, 4)
    ctx.fill()

    ctx.fillStyle = '#444'
    ;[[-11, -6], [11, -6], [-11, 4], [11, 4]].forEach(([dx, dy]) => {
      ctx.beginPath()
      ctx.ellipse(rx + dx, ry + dy, 3.5, 2.5, Math.PI / 2, 0, Math.PI * 2)
      ctx.fill()
    })

   
    ctx.fillStyle = '#fff'
    ctx.beginPath()
    ctx.moveTo(rx, ry - 14)
    ctx.lineTo(rx - 4, ry - 8)
    ctx.lineTo(rx + 4, ry - 8)
    ctx.closePath()
    ctx.fill()

    const now = Date.now()
    const pulse = ((now % 1500) / 1500)
    ctx.strokeStyle = `rgba(59,130,246,${1 - pulse})`
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(rx, ry, 15 + pulse * 18, 0, Math.PI * 2)
    ctx.stroke()

    ctx.fillStyle = '#333'
    ctx.font = 'bold 11px "Inter", sans-serif'
    ctx.fillText('N ↑', cx - 175, cy - 200)

    ctx.restore()

    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.fillRect(W - 90, H - 22, 60, 3)
    ctx.fillStyle = '#333'
    ctx.font = '9px "Inter", sans-serif'
    ctx.fillText('10 m', W - 80, H - 26)
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const canvas = canvasRef.current
    if (!canvas) return

    let rafId
    const animate = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      drawMap(canvas, robotPos, zoom)
      rafId = requestAnimationFrame(animate)
    }

    const ro = new ResizeObserver(animate)
    ro.observe(canvas)
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [isVisible, robotPos, zoom, drawMap])

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        ref={imgRef}
        src="/floorplan.png"
        alt=""
        className="hidden"
        onLoad={() => {}}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}
