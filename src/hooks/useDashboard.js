import { useState, useCallback } from 'react'
import { VIEWS, MODES, MAP_CONFIG } from '../data/config'

export function useDashboard() {
  const [activeView, setActiveView]     = useState(VIEWS.CAMERA)
  const [activeMode, setActiveMode]     = useState(MODES[0])  // AUTO
  const [isPaused, setIsPaused]         = useState(false)
  const [zoom, setZoom]                 = useState(MAP_CONFIG.zoomDefault)
  const [activeNavItem, setActiveNavItem] = useState('dashboard')
  const [robotPos, setRobotPos]         = useState(MAP_CONFIG.robotInitialPosition)
  const [isEmergency, setIsEmergency]   = useState(false)

  const toggleView = useCallback(() => {
    setActiveView(v => v === VIEWS.CAMERA ? VIEWS.MAP : VIEWS.CAMERA)
  }, [])

  const handleDpad = useCallback((direction) => {
    if (isPaused || isEmergency) return
    const step = 2
    setRobotPos(pos => {
      const moves = {
        up:    { x: pos.x,        y: Math.max(5,  pos.y - step) },
        down:  { x: pos.x,        y: Math.min(95, pos.y + step) },
        left:  { x: Math.max(5,  pos.x - step), y: pos.y },
        right: { x: Math.min(95, pos.x + step), y: pos.y },
        stop:  pos,
      }
      return moves[direction] ?? pos
    })
  }, [isPaused, isEmergency])

  const handleEmergencyStop = useCallback(() => {
    setIsEmergency(e => !e)
    setIsPaused(true)
  }, [])

  return {
    activeView, setActiveView,
    activeMode, setActiveMode,
    isPaused, setIsPaused,
    zoom, setZoom,
    activeNavItem, setActiveNavItem,
    robotPos,
    isEmergency, handleEmergencyStop,
    toggleView,
    handleDpad,
  }
}
