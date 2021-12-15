import { styles } from "@/public/js/styles";

export default function TitleLine({ icon, title }) {
  return (
    <>
      <div className="titleContainer">
        <div className="titleicon">{icon}</div>
        <div>{title}</div>
        <div className="Titleline"></div>
      </div>
      <style jsx>{`
        .titleContainer {
          width: 100%;
          max-width: 25rem;
          color: lightgray;
          padding-top: 2rem;
          ${styles.flexAligncenter};
          gap: 0.2rem;
          white-space: nowrap;
        }
        .titleicon {
          padding-top: 0.4rem;
        }

        .Titleline {
          height: 0.5rem;
          width: 100%;
          border-bottom: 1px dashed;
        }
      `}</style>
    </>
  );
}
