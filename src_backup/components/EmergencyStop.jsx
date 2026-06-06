export default function EmergencyStop() {
  return (
    <button
      style={{
        position: "absolute",
        right: "60px",
        bottom: "250px",
        width: "110px",
        height: "110px",
        borderRadius: "50%",
        background: "red",
        border: "none",
        color: "white",
        fontWeight: "bold",
        fontSize: "28px",
        cursor: "pointer",
      }}
    >
      STOP
    </button>
  );
}