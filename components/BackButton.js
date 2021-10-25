import Arrow from "./icons/Arrow";
import { styles } from "@/public/js/styles";
import Link from "next/link";

export default function BackButton({ setSelected, back }) {
  return (
    <>
      {back ? (
        <div className="backBar">
          <Link href={back}>
            <div className="circulBack">
              <Arrow />
            </div>
          </Link>
        </div>
      ) : (
        <div className="backBar">
          <div onClick={() => setSelected("More")} className="circulBack">
            <Arrow />
          </div>
        </div>
      )}
      <style jsx>{`
        .backBar {
          padding: 0.8rem 0 0 1rem;
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
