// src/my_map.tsx
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer as LeafletMap,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import React, { useState, useEffect } from "react";

export function my_map({ data, key }) {
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    if (map) {
      const geoJson = L.geoJSON(JSON.parse(data.df), {
        onEachFeature: (feature, layer) => {
          layer.on("click", () => {
            setSelectedMarker(feature);
          });
        },
        pointToLayer: (feature, latlng) => {
          return L.circleMarker(latlng, {
            radius: feature.properties.mag * 2,
            fillColor: "#ff7800",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8,
          });
        },
      });

      geoJson.addTo(map);
    }
  }, [map, data]);

  useEffect(() => {
    if (map && selectedMarker) {
      map.flyTo(
        [
          selectedMarker.geometry.coordinates[1],
          selectedMarker.geometry.coordinates[0],
        ],
        10
      );
    }
  }, [map, selectedMarker]);

  const position = [0, 0];

  return (
    <LeafletMap
      style={{ height: "600px", width: "100%" }}
      center={position}
      zoom={2}
      whenCreated={setMap}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {selectedMarker && (
        <Marker
          position={[
            selectedMarker.geometry.coordinates[1],
            selectedMarker.geometry.coordinates[0],
          ]}
        >
          <Popup>
            <div>
              <strong>Magnitude:</strong> {selectedMarker.properties.mag}
            </div>
            <div>
              <strong>Location:</strong> {selectedMarker.properties.place}
            </div>
          </Popup>
        </Marker>
      )}
    </LeafletMap>
  );
}
