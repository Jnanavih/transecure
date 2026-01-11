import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function TransactionMap({ transactions, status }) {
  if (!transactions || transactions.length < 2) return null;

  const points = transactions.map((t) => [t.lat, t.lon]);

  // ✅ Line color logic
  let lineColor = "green";
  if (status === "LIKELY FRAUD") lineColor = "orange";
  if (status === "FRAUD") lineColor = "red";

  return (
    <MapContainer
      center={points[0]}
      zoom={4}
      style={{ height: "350px", width: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Markers */}
      {points.map((pos, idx) => (
        <Marker key={idx} position={pos} />
      ))}

      {/* ✅ Always draw the line */}
      <Polyline
        positions={points}
        pathOptions={{
          color: lineColor,
          weight: 4,
          opacity: 0.9,
        }}
      />
    </MapContainer>
  );
}
