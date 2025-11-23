import React, { useState } from "react";

export default function LocationPicker({ locations = [], onSelect }) {
  const [selected, setSelected] = useState("");

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setSelected(coords);
          console.log(coords);
        },
        (err) => {
          console.error("Location error:", err);
        }
      );
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Dropdown */}
      {JSON.stringify(selected)}
      <select
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          onSelect(e.target.value);
        }}
        className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white"
      >
        <option value="">Select Location</option>
        {locations.map((loc, idx) => (
          <option key={idx} value={loc.value}>
            {loc.label}
          </option>
        ))}
      </select>

      {/* Detect Button */}
      <button
        onClick={handleDetectLocation}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
      >
        📍 Detect
      </button>
    </div>
  );
}
