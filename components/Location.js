import { styles } from "@/public/js/styles";

export default function Location() {
  const position = [25.269312, 55.278024];

  return (
    <>
      <div className="mapContainer"></div>

      <style jsx>{`
        .mapContainer {
          width: 100%;
          max-width: 22rem;
          height: 22rem;
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
