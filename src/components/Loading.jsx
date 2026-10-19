
export default function Loader({ loading }) {
  if (!loading) return null;

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    background: "rgba(255, 255, 255, 0.95)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  };

  const spinnerStyle = {
    width: "50px",
    height: "50px",
    border: "5px solid #ddd",
    borderTop: "5px solid var(--gold)",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <div style={overlayStyle}>
      <div style={spinnerStyle}></div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
