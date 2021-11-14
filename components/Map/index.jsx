import React from "react";
import "leaflet/dist/leaflet.css";

import L from "leaflet";

const Map = ({ pos, lon }) => {
  React.useEffect(() => {
    let map;
    function initMap() {
      map = L.map("map", {
        center: [pos, lon],
        zoom: 16,
      });
      const osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      L.tileLayer(osmUrl, {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      const marker = L.marker([pos, lon], {
        icon: L.icon({
          iconUrl: "/location.png",
          iconSize: [30, 30],
        }),
      }).addTo(map);
    }
    initMap();
    return () => {
      map.remove();
    };
  }, []);
  return <div id="map" className="h-96 w-[100%] lg:w-2/3"></div>;
};

export default Map;
