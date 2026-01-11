import { useState } from "react";
import { analyzeTransaction } from "../services/api";

export default function Dashboard() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function runAnalysis() {
    setLoading(true);

    const sampleTransaction = {
      lat1: 28.6139,
      lon1: 77.2090,
      lat2: 51.5074,
      lon2: -0.1278,
      time1: "2026-01-11 10:00:00",
      time2: "2026-01-11 10:30:00",
    };

    try {
      const response = await analyzeTransaction(sampleTransaction);
      setResult(response);
    } catch (error) {
      alert("Failed to analyze transaction");
    }

    setLoading(false);
  }

  return (
    <div className="page">
      <h1>TransSecure</h1>
      <p className="subtitle">
        Geolocation & Time-Based Fraud Detection System
      </p>

      <button onClick={runAnalysis} disabled={loading}>
        {loading ? "Analyzing..." : "Run Fraud Analysis"}
      </button>

      {result && (
  <div className={`result-box ${result.status.toLowerCase()}`}>
    <h3>Transaction Status: {result.status}</h3>

    <div className="result-grid">
      <div>
        <strong>Risk Score</strong>
        <p>{result.risk_score}</p>
      </div>
      <div>
        <strong>Distance (km)</strong>
        <p>{result.distance_km}</p>
      </div>
      <div>
        <strong>Required Speed (km/h)</strong>
        <p>{result.required_speed_kmph}</p>
      </div>
      <div>
        <strong>Time Difference (min)</strong>
        <p>{result.time_difference_minutes}</p>
      </div>
    </div>

    <div className="explanation">
      <strong>Why flagged:</strong>
      <ul>
        {result.explanation.length === 0 ? (
          <li>No suspicious behavior detected</li>
        ) : (
          result.explanation.map((e, i) => <li key={i}>{e}</li>)
        )}
      </ul>
    </div>
  </div>
)}

    </div>
  );
}
