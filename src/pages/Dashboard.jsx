import CameraFeed from "../components/CameraFeed";
import EmergencyStop from "../components/EmergencyStop";
import Joystick from "../components/Joystick";
import MiniMap from "../components/MiniMap";
import Sidebar from "../components/Sidebar";
import StatusBar from "../components/StatusBar";

export default function Dashboard() {
     return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#071330",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Sidebar />

      <StatusBar />

      {/* Camera Feed Area */}
      <div
        style={{
          position: "absolute",
          left: "80px",
          right: "0",
          top: "0",
          bottom: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "60px",
          fontWeight: "700",
        }}
      >
        Camera Feed
      </div>

      {/* Point Cloud Viewer */}
      <div
        style={{
          position: "absolute",
          left: "110px",
          bottom: "40px",
          width: "320px",
          height: "220px",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        POINT CLOUD VIEWER
      </div>

      <EmergencyStop />

      <Joystick />
    </div>
  );
    }  
