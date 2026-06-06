import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

export default function PointCloudView({ isVisible, zoom }) {
  const mountRef = useRef(null)
  const stateRef = useRef({})
  const [loadStatus, setLoadStatus] = useState('idle') // idle | loading | loaded | fallback

  useEffect(() => {
    if (!isVisible) return
    const el = mountRef.current
    if (!el) return

    const W = el.clientWidth, H = el.clientHeight
    const scene    = new THREE.Scene()
    scene.background = new THREE.Color(0x0d0d0d)

    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000)
    camera.position.set(0, 8, 20)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(W, H)
    el.appendChild(renderer.domElement)

    const grid = new THREE.GridHelper(40, 40, 0x222222, 0x1a1a1a)
    scene.add(grid)

    const axes = new THREE.AxesHelper(2)
    scene.add(axes)

    let points = null

    function buildProceduralCloud() {
      const count = 80000
      const positions = new Float32Array(count * 3)
      const colors    = new Float32Array(count * 3)

      for (let i = 0; i < count * 0.4; i++) {
        positions[i*3]   = (Math.random() - 0.5) * 30
        positions[i*3+1] = (Math.random() - 0.5) * 0.08
        positions[i*3+2] = (Math.random() - 0.5) * 30
        colors[i*3]   = 0.35; colors[i*3+1] = 0.35; colors[i*3+2] = 0.35
      }
      const wallBase = count * 0.4
      for (let i = 0; i < count * 0.2; i++) {
        const idx = wallBase + i
        positions[idx*3]   = (Math.random() - 0.5) * 30
        positions[idx*3+1] = Math.random() * 5
        positions[idx*3+2] = -15 + (Math.random() - 0.5) * 0.3
        colors[idx*3]   = 0.5; colors[idx*3+1] = 0.5; colors[idx*3+2] = 0.55
      }
      const pillarBase = wallBase + count * 0.2
      for (let i = 0; i < count * 0.1; i++) {
        const idx = pillarBase + i
        const px = Math.round((Math.random() - 0.5) * 6) * 5
        positions[idx*3]   = px + (Math.random() - 0.5) * 0.3
        positions[idx*3+1] = Math.random() * 4
        positions[idx*3+2] = (Math.random() - 0.5) * 20
        colors[idx*3]   = 0.6; colors[idx*3+1] = 0.6; colors[idx*3+2] = 0.6
      }
      const equipBase = pillarBase + count * 0.1
      for (let i = 0; i < count * 0.15; i++) {
        const idx = equipBase + i
        positions[idx*3]   = 5 + (Math.random() - 0.5) * 6
        positions[idx*3+1] = Math.random() * 1.5
        positions[idx*3+2] = (Math.random() - 0.5) * 8
        colors[idx*3]   = 0.85; colors[idx*3+1] = 0.65; colors[idx*3+2] = 0.1
      }
      const ceilBase = equipBase + count * 0.15
      for (let i = 0; i < count * 0.15; i++) {
        const idx = ceilBase + i
        positions[idx*3]   = (Math.random() - 0.5) * 28
        positions[idx*3+1] = 5 + (Math.random() - 0.5) * 0.1
        positions[idx*3+2] = (Math.random() - 0.5) * 28
        colors[idx*3]   = 0.25; colors[idx*3+1] = 0.25; colors[idx*3+2] = 0.28
      }

      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3))
      const mat = new THREE.PointsMaterial({ size: 0.06, vertexColors: true, sizeAttenuation: true })
      return new THREE.Points(geo, mat)
    }

    async function tryLoadPCD() {
      setLoadStatus('loading')
      try {
        const { PCDLoader } = await import('three/examples/jsm/loaders/PCDLoader.js')
        const loader = new PCDLoader()
        loader.load(
          '/pointcloud.pcd',
          (loaded) => {
            const box = new THREE.Box3().setFromObject(loaded)
            const center = box.getCenter(new THREE.Vector3())
            loaded.position.sub(center)
            const size = box.getSize(new THREE.Vector3()).length()
            const scale = 20 / size
            loaded.scale.setScalar(scale)
            scene.add(loaded)
            points = loaded
            setLoadStatus('loaded')
          },
          undefined,
          () => {
            points = buildProceduralCloud()
            scene.add(points)
            setLoadStatus('fallback')
          }
        )
      } catch {
        points = buildProceduralCloud()
        scene.add(points)
        setLoadStatus('fallback')
      }
    }

    tryLoadPCD()

    const robotGeo = new THREE.BoxGeometry(0.6, 0.3, 0.9)
    const robotMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: false })
    const robotMesh = new THREE.Mesh(robotGeo, robotMat)
    robotMesh.position.set(0, 0.15, 0)
    scene.add(robotMesh)

    const arrowDir = new THREE.Vector3(0, 0, -1)
    const arrowHelper = new THREE.ArrowHelper(arrowDir, robotMesh.position, 1.2, 0x60a5fa, 0.3, 0.2)
    scene.add(arrowHelper)

    let isDragging = false, lastX = 0, lastY = 0
    let theta = 0, phi = Math.PI / 4

    const onMouseDown = e => { isDragging = true; lastX = e.clientX; lastY = e.clientY }
    const onMouseMove = e => {
      if (!isDragging) return
      theta -= (e.clientX - lastX) * 0.005
      phi    = Math.max(0.1, Math.min(Math.PI / 2.2, phi - (e.clientY - lastY) * 0.005))
      lastX = e.clientX; lastY = e.clientY
    }
    const onMouseUp = () => { isDragging = false }

    renderer.domElement.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    let lastTouchX = 0, lastTouchY = 0
    renderer.domElement.addEventListener('touchstart', e => {
      lastTouchX = e.touches[0].clientX; lastTouchY = e.touches[0].clientY
    })
    renderer.domElement.addEventListener('touchmove', e => {
      theta -= (e.touches[0].clientX - lastTouchX) * 0.005
      phi    = Math.max(0.1, Math.min(Math.PI / 2.2, phi - (e.touches[0].clientY - lastTouchY) * 0.005))
      lastTouchX = e.touches[0].clientX; lastTouchY = e.touches[0].clientY
    })

    stateRef.current = { theta, phi, camera }

    let rafId
    let t = 0
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      t++

      robotMesh.scale.y = 1 + Math.sin(t * 0.04) * 0.05

      const dist = 5 + (1 - stateRef.current.zoom / 100) * 35
      camera.position.x = dist * Math.sin(stateRef.current.theta) * Math.cos(stateRef.current.phi)
      camera.position.y = dist * Math.sin(stateRef.current.phi)
      camera.position.z = dist * Math.cos(stateRef.current.theta) * Math.cos(stateRef.current.phi)
      camera.lookAt(0, 0, 0)

      stateRef.current.theta = theta
      stateRef.current.phi   = phi

      renderer.render(scene, camera)
    }
    stateRef.current.zoom = zoom
    animate()

    const ro = new ResizeObserver(() => {
      const w = el.clientWidth, h = el.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    })
    ro.observe(el)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      renderer.domElement.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [isVisible])

  useEffect(() => {
    stateRef.current.zoom = zoom
  }, [zoom])

  return (
    <div ref={mountRef} className="absolute inset-0 w-full h-full">
      {/* Status badge */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        {loadStatus === 'loading' && (
          <span className="text-[10px] text-white/40 bg-black/50 px-3 py-1 rounded-full">
            Loading point cloud…
          </span>
        )}
        {loadStatus === 'loaded' && (
          <span className="text-[10px] text-green-400/70 bg-black/50 px-3 py-1 rounded-full">
            ● PCD loaded — drag to orbit
          </span>
        )}
        {loadStatus === 'fallback' && (
          <span className="text-[10px] text-white/30 bg-black/50 px-3 py-1 rounded-full">
            Procedural cloud — drop /public/pointcloud.pcd for real data
          </span>
        )}
      </div>
      {/* Drag hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <span className="text-[9px] text-white/20 bg-black/40 px-2 py-0.5 rounded-full">
          Drag to orbit · Slider to zoom
        </span>
      </div>
    </div>
  )
}