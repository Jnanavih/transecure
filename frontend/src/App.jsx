import { useState } from "react";
import TransactionMap from "./components/TransactionMap";
import "./App.css";

export default function App() {
  const [cardNumber, setCardNumber] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeCard = async () => {
    if (!cardNumber) {
      alert("Enter a card number");
      return;
    }

    setLoading(true);
    setData(null);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/analyze-card/${cardNumber}`
      );

      if (!res.ok) throw new Error("Backend error");

      const json = await res.json();
      setData(json);
    } catch (err) {
      alert("Backend not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      {/* LEFT PANEL */}
      <div className="sidebar">
        <h1>TransSecure</h1>
        <p className="subtitle">Credit Card Fraud Intelligence System</p>

        <input
          type="text"
          placeholder="Enter card number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />

        <button onClick={analyzeCard} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Card"}
        </button>
      </div>

      {/* RIGHT PANEL */}
      <div className="content">
        {!data && <p className="hint">Enter a card number to analyze</p>}

        {data && (
          <>
            {/* RISK SCORE */}
            <div className="card">
              <h3>Risk Score</h3>
              <h2 className="risk">{data.analysis.overall_risk_score} / 100</h2>
            </div>

            {/* STATUS */}
            <div className="card">
              <h3>Transaction Analysis</h3>
              <p>
                <b>Status:</b>{" "}
                <span
                  style={{
                    color:
                      data.analysis.status === "SAFE" ? "green" : "red",
                  }}
                >
                  {data.analysis.status}
                </span>
              </p>
              <p>
                <b>Reason:</b> {data.analysis.reason}
              </p>
            </div>

            {/* TIMELINE */}
            <div className="card">
              <h3>Transaction Timeline</h3>
              <ul>
                {data.transactions.map((t, i) => (
                  <li key={i}>
                    {t.time} — {t.city} — ₹{t.amount}
                  </li>
                ))}
              </ul>
            </div>

            {/* MAP */}
            <div className="card">
              <h3>Transaction Map</h3>
              <TransactionMap
  transactions={data.transactions}
  status={data.analysis.status}
/>

            </div>
          </>
        )}
      </div>
    </div>
  );
}
