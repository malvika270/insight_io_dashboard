import numpy as np
import sys
from pathlib import Path


def bin_to_pcd(bin_path, pcd_path):
    points = np.fromfile(bin_path, dtype=np.float32).reshape(-1, 4)
    xyz = points[:, :3]
    intensity = points[:, 3]
    n = len(xyz)
    with open(pcd_path, "w") as f:
        f.write("# .PCD v0.7 - Point Cloud Data file format\n")
        f.write("VERSION 0.7\n")
        f.write("FIELDS x y z intensity\n")
        f.write("SIZE 4 4 4 4\n")
        f.write("TYPE F F F F\n")
        f.write("COUNT 1 1 1 1\n")
        f.write(f"WIDTH {n}\n")
        f.write("HEIGHT 1\n")
        f.write("VIEWPOINT 0 0 0 1 0 0 0\n")
        f.write(f"POINTS {n}\n")
        f.write("DATA ascii\n")
        for i in range(n):
            x, y, z = xyz[i]
            r = intensity[i]
            f.write(f"{x:.6f} {y:.6f} {z:.6f} {r:.6f}\n")
    print(f"Wrote {n} points -> {pcd_path}")


def merge_frames(bin_dir, pcd_out, max_frames=5):
    files = sorted(Path(bin_dir).glob("*.bin"))[:max_frames]
    if not files:
        print(f"No .bin files found in {bin_dir}")
        sys.exit(1)
    all_points = []
    for f in files:
        pts = np.fromfile(str(f), dtype=np.float32).reshape(-1, 4)
        all_points.append(pts)
        print(f"  Loaded {len(pts)} points from {f.name}")
    merged = np.vstack(all_points)
    n = len(merged)
    with open(pcd_out, "w") as f:
        f.write("# .PCD v0.7 - Point Cloud Data file format\n")
        f.write("VERSION 0.7\n")
        f.write("FIELDS x y z intensity\n")
        f.write("SIZE 4 4 4 4\n")
        f.write("TYPE F F F F\n")
        f.write("COUNT 1 1 1 1\n")
        f.write(f"WIDTH {n}\n")
        f.write("HEIGHT 1\n")
        f.write("VIEWPOINT 0 0 0 1 0 0 0\n")
        f.write(f"POINTS {n}\n")
        f.write("DATA ascii\n")
        for i in range(n):
            x, y, z, r = merged[i]
            f.write(f"{x:.6f} {y:.6f} {z:.6f} {r:.6f}\n")
    print(f"Merged {len(files)} frames -> {n} total points -> {pcd_out}")


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("input")
    parser.add_argument("output")
    parser.add_argument("--frames", type=int, default=5)
    args = parser.parse_args()
    inp = Path(args.input)
    if inp.is_dir():
        merge_frames(str(inp), args.output, args.frames)
    elif inp.suffix == ".bin":
        bin_to_pcd(str(inp), args.output)
    else:
        print("ERROR: input must be a .bin file or directory")
        sys.exit(1)
