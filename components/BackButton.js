import Arrow from "./icons/Arrow";
import { styles } from "@/public/js/styles";
import Link from "next/link";
import More from "./icons/More";

export default function BackButton({ setSelected, back, select }) {
  return (
    <>
      {back ? (
        <div className="backBar">
          <Link href={back} replace>
            <div className="circulBack">
              <Arrow />
            </div>
          </Link>
        </div>
      ) : (
        <div className="backBar">
          <div onClick={() => setSelected(select)} className="circulBack">
            <Arrow />
          </div>
        </div>
      )}
      <style jsx>{`
        .backBar {
          padding: ${select === "Options" ? "0rem" : "0.8rem"} 0 0 1rem;
          position: fixed;
          z-index: 8;
        }
        .circulBack {
          width: 2.6rem;
          height: 2.6rem;
          border-radius: 50rem;
          ${styles.boxshadow};
          ${styles.flexBothcenter}
          background:white;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}

export function BurgerButton({ setOpenModal }) {
  return (
    <>
      <div className="burger">
        <div className="circulBack" onClick={() => setOpenModal(true)}>
          <More color={styles.secondaryColor} />
        </div>
      </div>
      <style jsx>{`
        .burger {
          padding: 1rem;
          position: fixed;
          z-index: 8;
        }

        .circulBack {
          width: 2.6rem;
          height: 2.6rem;
          border-radius: 50rem;
          ${styles.boxshadow};
          ${styles.flexBothcenter}
          background:white;
          cursor: pointer;
          padding: 0.5rem;
        }
      `}</style>
    </>
  );
}
