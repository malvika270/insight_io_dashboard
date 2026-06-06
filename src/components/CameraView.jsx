import React, { useRef, useEffect } from 'react'

export default function CameraView({ isVisible }) {
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)

  
  useEffect(() => {
    if (!isVisible) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let t = 0
    function draw() {
      const { width: W, height: H } = canvas
      const bg = ctx.createLinearGradient(0, 0, 0, H)
      bg.addColorStop(0, '#3a3530')
      bg.addColorStop(0.45, '#5a5248')
      bg.addColorStop(0.46, '#8a8070')
      bg.addColorStop(1, '#b8b0a0')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)


      ctx.strokeStyle = 'rgba(200,190,170,0.15)'
      ctx.lineWidth = 1
      for (let i = 0; i <= 8; i++) {
        const x = (W / 8) * i
        ctx.beginPath()
        ctx.moveTo(W / 2, H * 0.45)
        ctx.lineTo(x, H)
        ctx.stroke()
      }
      for (let j = 1; j <= 6; j++) {
        const y = H * 0.45 + (H * 0.55) * (j / 6)
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(W, y)
        ctx.stroke()
      }


      const railColor = '#d4a800'
      const drawRail = (x1, y1, x2, y2, w) => {
        ctx.strokeStyle = railColor
        ctx.lineWidth = w
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }
      drawRail(W * 0.55, H * 0.38, W * 0.98, H * 0.38, 4)
      drawRail(W * 0.55, H * 0.52, W * 0.98, H * 0.52, 4)
      drawRail(W * 0.55, H * 0.66, W * 0.98, H * 0.66, 4)
      const posts = [0.58, 0.68, 0.78, 0.88, 0.97]
      posts.forEach(xf => {
        drawRail(W * xf, H * 0.36, W * xf, H * 0.68, 5)
      })

      ctx.fillStyle = '#4a4540'
      ctx.fillRect(W * 0.28, H * 0.1, W * 0.055, H * 0.55)
      ctx.fillStyle = 'rgba(255,255,255,0.06)'
      ctx.fillRect(W * 0.28, H * 0.1, W * 0.008, H * 0.55)

      for (let sy = 0; sy < H; sy += 3) {
        ctx.fillStyle = 'rgba(0,0,0,0.04)'
        ctx.fillRect(0, sy, W, 1)
      }

      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.25, W / 2, H / 2, H * 0.85)
      vig.addColorStop(0, 'rgba(0,0,0,0)')
      vig.addColorStop(1, 'rgba(0,0,0,0.45)')
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, W, H)

      const alpha = 0.6 + Math.sin(t * 0.05) * 0.2
      ctx.fillStyle = `rgba(255,60,60,${alpha})`
      ctx.beginPath()
      ctx.arc(W - 18, 18, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = `rgba(255,255,255,${alpha * 0.9})`
      ctx.font = 'bold 10px "JetBrains Mono", monospace'
      ctx.fillText('REC', W - 38, 22)

      const now = new Date()
      const ts = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`
      ctx.fillStyle = 'rgba(255,255,255,0.55)'
      ctx.font = '10px "JetBrains Mono", monospace'
      ctx.fillText(`CAM-01  ${ts}`, 12, H - 12)

      t++
      rafRef.current = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(() => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    })
    ro.observe(canvas)
    canvas.width  = canvas.offsetWidth  || 800
    canvas.height = canvas.offsetHeight || 500
    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [isVisible])

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#2a2520]">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/camera-feed.mp4"
        autoPlay
        loop
        muted
        playsInline
        onError={e => {
        e.target.style.display = 'none'
        canvasRef.current.style.display = 'block'
      }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'none' }}
      />
    </div>
  )
}
