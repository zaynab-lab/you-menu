import { styles } from "@/public/js/styles";

export default function BPLayout({ children }) {
  return (
    <>
      <div className="pageContainer">{children}</div>
      <style jsx>{`
        .pageContainer {
          padding: 1rem;
          ${styles.flexAligncenter}
          -webkit-box-orient:vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          max-width: 100vw;
          position: relative;
          height: -webkit-fit-content;
          height: -moz-fit-content;
          height: fit-content;
          padding-bottom: 2rem;
          padding: 3.5rem 1rem;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
