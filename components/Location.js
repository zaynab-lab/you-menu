import { styles } from "@/public/js/styles";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { BiTargetLock } from "react-icons/bi";
import { GiSelect } from "react-icons/gi";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Location() {
  const position = [25.269312, 55.278024];
  const [currentPosition, setCurrentPosition] = useState();

  return (
    <>
      <div className="mapContainer">
        <div className="currentLocation">
          <BiTargetLock />
        </div>
        <div className="selectLocation">
          <GiSelect />
        </div>

        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.{" "}
            </Popup>{" "}
          </Marker>
        </MapContainer>
      </div>

      <style jsx>{`
        .mapContainer {
          width: 100%;
          max-width: 22rem;
          height: 22rem;
          border-radius: 1rem;
          overflow: hidden;
          -ms-scroll-chaining: none;
          overscroll-behavior: none;
          position: relative;
          ${styles.boxshadow}
        }
        .currentLocation {
          width: 2.6rem;
          height: 2.6rem;
          font-size: 1.6rem;
          position: absolute;
          top: 0.6rem;
          right: 0.6rem;
          z-index: 401;
          background: #f9f9fa;
          color: #555;
          border: 1px solid gray;
          border-radius: 50%;
          ${styles.flexBothcenter};
          cursor: pointer;
        }
        .selectLocation {
          cursor: pointer;
          width: 2.6rem;
          height: 2.6rem;
          font-size: 1.6rem;
          position: absolute;
          top: 3.6rem;
          right: 0.6rem;
          z-index: 401;
          background: #f9f9fa;
          color: #555;
          border: 1px solid gray;
          border-radius: 50%;
          ${styles.flexBothcenter};
        }
      `}</style>
    </>
  );
}
