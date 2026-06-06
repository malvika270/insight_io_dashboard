# Insight.IO — Robot Operations Dashboard

A real-time robot monitoring dashboard built for the ERIC Robotics assignment. Visualises live sensor data from a robot including a camera feed, 2D floor plan, and 3D LiDAR point cloud.

![Dashboard Preview](public/img_lights.jpg)

---

## Features

- **Camera View** — real KITTI camera footage from an autonomous vehicle
- **2D Map View** — procedural floor plan with live robot marker, movable via joystick
- **3D Point Cloud** — real KITTI velodyne LiDAR scan rendered with Three.js
- **Joystick** — circular D-pad with keyboard arrow key support
- **Emergency Stop** — kills movement and overlays a full-screen alert
- **MiniMap pip** — bottom-left thumbnail cycles between all three views
- **Zoom Slider** — vertical slider controls map scale and 3D camera distance
- **Floating pill UI** — status, telemetry, mode toggle and mission controls

---
## Screenshots

### Camera View
![Camera View](screenshots/camera.png)

### Map View
![Map View](screenshots/map.png)

### 3D Point Cloud
![Point Cloud](screenshots/cloud.png)
## Tech Stack

- React 19 + Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite` plugin, no `tailwind.config.js`)
- Three.js + PCDLoader for 3D point cloud rendering
- lucide-react for icons
- KITTI Raw Dataset for real sensor data

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install and run

```bash
git clone <your-repo-url>
cd insight.io
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Dataset

This project uses the [KITTI Raw Dataset](http://www.cvlibs.net/datasets/kitti/raw_data.php) — specifically the `2011_09_26_drive_0005_sync` sequence (city driving, 160 frames).

The raw data was converted using the scripts in `/scripts`:

**LiDAR → PCD:**
```bash
python scripts/bin_to_pcd.py <path-to-velodyne/data/> public/pointcloud.pcd --frames 5
```

**Camera images → MP4:**
```bash
ffmpeg -framerate 10 -i "<path-to-image_02/data/>%010d.png" \
  -vf "scale=1242:374,format=yuv420p" -c:v libx264 -crf 23 \
  -preset fast -movflags +faststart public/camera-feed.mp4
```

---

## Controls

| Control | Action |
|---|---|
| MiniMap (bottom-left) | Click to cycle Camera → Map → 3D Cloud |
| Joystick / Arrow keys | Move robot on 2D map |
| Zoom slider (left edge) | Zoom in/out on map and point cloud |
| Emergency Stop | Freeze all movement, red overlay |
| MODE toggle (top-right) | Switch between AUTO and MANUAL |
| PAUSE button | Pause robot movement |

---

## Project Structure

```
src/
  components/       # All UI components (one file per component)
  data/config.js    # Centralised labels, statuses, nav items, VIEWS enum
  hooks/            # useDashboard.js — all shared state
  pages/            # Dashboard.jsx — main layout
public/
  camera-feed.mp4   # KITTI camera footage
  pointcloud.pcd    # KITTI velodyne point cloud
scripts/
  bin_to_pcd.py     # Converts KITTI .bin scans to .pcd format
```

---

## Data Attribution

Point cloud and camera data from the **KITTI Vision Benchmark Suite**:
> A. Geiger, P. Lenz, C. Stiller, R. Urtasun. *Vision meets Robotics: The KITTI Dataset.* IJRR, 2013.
