import React from "react";

export default function RiskGauge({ score }) {
  const rotation = (score / 100) * 180 - 90;

  const getColor = () => {
    if (score < 40) return "#22c55e"; // green
    if (score < 70) return "#facc15"; // yellow
    return "#ef4444"; // red
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Risk Score</h2>

      <div style={styles.gauge}>
        <div style={styles.arc}></div>

        <div
          style={{
            ...styles.needle,
            transform: `rotate(${rotation}deg)`,
            backgroundColor: getColor(),
          }}
        />

        <div style={styles.center}></div>
      </div>

      <p style={{ ...styles.score, color: getColor() }}>
        {score} / 100
      </p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  title: {
    marginBottom: "10px",
  },
  gauge: {
    position: "relative",
    width: "200px",
    height: "100px",
    margin: "auto",
  },
  arc: {
    width: "200px",
    height: "100px",
    borderTopLeftRadius: "200px",
    borderTopRightRadius: "200px",
    background: "linear-gradient(to right, #22c55e, #facc15, #ef4444)",
  },
  needle: {
    position: "absolute",
    bottom: "0",
    left: "50%",
    width: "4px",
    height: "90px",
    transformOrigin: "bottom",
    transition: "transform 0.8s ease",
  },
  center: {
    position: "absolute",
    bottom: "-5px",
    left: "50%",
    width: "14px",
    height: "14px",
    backgroundColor: "#111",
    borderRadius: "50%",
    transform: "translateX(-50%)",
  },
  score: {
    marginTop: "10px",
    fontSize: "18px",
    fontWeight: "bold",
  },
};
