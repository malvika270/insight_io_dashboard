// ─── Mission & Status ───────────────────────────────────────────────────────

export const MISSION = {
  id: '1234',
  status: 'On Mission',
}
export const STATUS_INDICATORS = [
  {
    id: 'battery',
    label: '100%',
    icon: 'battery',
    color: 'green',   // 'green' | 'yellow' | 'red'
    showBar: true,
    barFill: 1.0,
  },
  {
    id: 'signal',
    label: 'Strong',
    icon: 'signal',
    color: 'green',
    showBar: false,
  },
  {
    id: 'failsafe',
    label: 'Failsafe',
    badge: 'Okay',
    color: 'green',
    icon: 'shield',
  },
  {
    id: 'system',
    label: 'System',
    badge: 'Okay',
    color: 'green',
    icon: 'cpu',
  },
]

// ─── Modes ───────────────────────────────────────────────────────────────────

export const MODES = ['AUTO', 'MANUAL']

// ─── Views ───────────────────────────────────────────────────────────────────

export const VIEWS = {
  CAMERA: 'camera',
  MAP: 'map',
}

export const VIEW_LABELS = {
  [VIEWS.CAMERA]: 'Camera View',
  [VIEWS.MAP]: 'Map View',
}

// ─── Sidebar Navigation ──────────────────────────────────────────────────────

export const NAV_ITEMS = [
  { id: 'dashboard', icon: 'grid',       label: 'Dashboard',  active: true  },
  { id: 'map',       icon: 'map',        label: 'Map',        active: false },
  { id: 'location',  icon: 'map-pin',    label: 'Location',   active: false },
  { id: 'crop',      icon: 'crop',       label: 'Zones',      active: false },
  { id: 'target',    icon: 'crosshair',  label: 'Targets',    active: false },
  { id: 'analytics', icon: 'trending-up',label: 'Analytics',  active: false },
  { id: 'profile',   icon: 'user',       label: 'Profile',    active: false },
]

// ─── D-Pad directions ────────────────────────────────────────────────────────

export const DPAD_DIRECTIONS = [
  { id: 'up',    label: '▲', row: 1, col: 2 },
  { id: 'left',  label: '◀', row: 2, col: 1 },
  { id: 'stop',  label: '●', row: 2, col: 2 },
  { id: 'right', label: '▶', row: 2, col: 3 },
  { id: 'down',  label: '▼', row: 3, col: 2 },
]

// ─── Map config ──────────────────────────────────────────────────────────────

export const MAP_CONFIG = {
  // Robot initial position as % of map canvas
  robotInitialPosition: { x: 46, y: 55 },
  // Zoom range
  zoomMin: 0,
  zoomMax: 100,
  zoomDefault: 50,
}

// ─── Color helpers ────────────────────────────────────────────────────────────

export const STATUS_COLOR_CLASSES = {
  green:  { dot: 'bg-green-400',  text: 'text-green-400',  badge: 'bg-green-500/20 text-green-400' },
  yellow: { dot: 'bg-yellow-400', text: 'text-yellow-400', badge: 'bg-yellow-500/20 text-yellow-400' },
  red:    { dot: 'bg-red-400',    text: 'text-red-400',    badge: 'bg-red-500/20 text-red-400' },
}
