import { useDashboard } from '../hooks/useDashboard'
import { VIEWS } from '../data/config'
import Sidebar        from '../components/Sidebar'
import TopBar         from '../components/TopBar'
import CameraView     from '../components/CameraView'
import MapView        from '../components/MapView'
import PointCloudView from '../components/PointCloudView'
import MiniMap        from '../components/MiniMap'
import ZoomSlider     from '../components/ZoomSlider'
import Joystick       from '../components/Joystick'
import EmergencyStop  from '../components/EmergencyStop'

export default function Dashboard() {
  const {
    activeView, toggleView,
    activeMode, setActiveMode,
    isPaused, setIsPaused,
    zoom, setZoom,
    activeNavItem, setActiveNavItem,
    robotPos,
    isEmergency, handleEmergencyStop,
    handleDpad,
  } = useDashboard()

  return (
    <div className="w-screen h-screen bg-[#0d0d0d] overflow-hidden flex text-white font-sans">
      <Sidebar activeNavItem={activeNavItem} onNavChange={setActiveNavItem} />
      <div className="relative flex-1 min-w-0 h-full">
        <TopBar
          activeMode={activeMode}
          onModeChange={setActiveMode}
          isPaused={isPaused}
          onPauseToggle={() => setIsPaused(p => !p)}
          activeView={activeView}
        />
        <div className={`absolute inset-0 transition-opacity duration-300 ${
          activeView === VIEWS.CAMERA ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <CameraView isVisible={activeView === VIEWS.CAMERA} />
        </div>
        <div className={`absolute inset-0 transition-opacity duration-300 ${
          activeView === VIEWS.MAP ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <MapView isVisible={activeView === VIEWS.MAP} robotPos={robotPos} zoom={zoom} />
        </div>
        <div className={`absolute inset-0 transition-opacity duration-300 ${
          activeView === VIEWS.CLOUD ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <PointCloudView isVisible={activeView === VIEWS.CLOUD} zoom={zoom} />
        </div>
        <ZoomSlider value={zoom} onChange={setZoom} />
        <MiniMap activeView={activeView} onSwitch={toggleView} robotPos={robotPos} />
        <div className="absolute bottom-5 right-5 flex flex-col items-center gap-5 z-20">
          <EmergencyStop isActive={isEmergency} onToggle={handleEmergencyStop} />
          <Joystick onDirection={handleDpad} disabled={isPaused || isEmergency} />
        </div>
       {isPaused && !isEmergency && (
        <div className="absolute inset-0 z-10 pointer-events-none flex items-start justify-center pt-28">
          <div className="bg-black/80 backdrop-blur-sm px-4 py-1.5 rounded-full
                          text-white text-xs font-bold tracking-widest border border-white/20
                          shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            ⏸ PAUSED
          </div>
        </div>
      )}
        {isEmergency && (
          <div className="absolute inset-0 z-10 pointer-events-none border-2 border-red-500/60
                          shadow-[inset_0_0_80px_rgba(239,68,68,0.1)] flex items-start justify-center pt-28">
            <div className="bg-red-600 backdrop-blur-sm px-4 py-1.5 rounded-full
                            text-white text-xs font-bold tracking-wider border border-red-400/50
                            shadow-[0_0_20px_rgba(239,68,68,0.6)]">
              ⚠ EMERGENCY STOP ACTIVE
            </div>
          </div>
        )}
      </div>
    </div>
  )
}