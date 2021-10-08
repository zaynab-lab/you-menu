import { styles } from "@/public/js/styles";
import GoogleMapReact from "google-map-react";
import { useState } from "react";
import { FaMapMarker, FaMapPin } from "react-icons/fa";

export default function Location() {
  const [center, setCenter] = useState({ lat: 33.89, lng: 35.47 });
  const [zoom, setZoom] = useState(14);
  return (
    <>
      <div className="mapContainer">
        <GoogleMapReact
          bootstrapURLKeys={
            {
              /*key:  YOUR KEY HERE */
            }
          }
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <span className="marker">
            <FaMapPin lat={33.897803} lng={35.477668} />
          </span>
        </GoogleMapReact>
      </div>

      <style jsx>{`
        .mapContainer {
          width: 100%;
          max-width: 25rem;
          height: 25rem;
          border-radius: 1rem;
          overflow: hidden;
          ${styles.boxshadow}
        }
        .marker {
          font-size: 2rem;
          color: ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
}
