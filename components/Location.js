import { styles } from "@/public/js/styles";
import { useEffect, useState } from "react";
export default function Location() {
  useEffect(() => {
    // navigator.geolocation &&
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     setCenter({
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     });
    //   });
  }, []);
  return (
    <>
      <div className="mapContainer">
        <div className="mapouter">
          <div className="gmap_canvas">
            <iframe
              title="map"
              width="400"
              height="200"
              src="https://maps.google.com/maps?q=Habbouch&t=&z=12&ie=UTF8&iwloc=&output=embed"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .mapContainer {
          width: 100%;
          max-width: 25rem;
          height: 10rem;
          border-radius: 1rem;
          overflow: hidden;
          ${styles.boxshadow}
        }
        .marker {
          font-size: 2rem;
          color: ${styles.secondaryColor};
        }
        .mapouter {
          position: relative;
          text-align: right;
          height: 10rem;
          width: 25rem;
        }
        .gmap_canvas {
          overflow: hidden;
          background: none !important;
          height: 10rem;
          width: 25rem;
        }
      `}</style>
    </>
  );
}
