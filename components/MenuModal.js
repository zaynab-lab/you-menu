import { styles } from "@/public/js/styles";
import Link from "next/link";

export default function MenuModal({ openModal, setOpenModal }) {
  return (
    <>
      <div className={`modal ${openModal && "show"}`}>
        <div className="X" onClick={() => setOpenModal(false)}>
          x
        </div>
        <div className={`swipe1 ${openModal && "In"}`}>
          <Link href="/business">go to business page</Link>
        </div>
        <div className={`swipe2 ${openModal && "In"}`}>
          <Link href="/management">go to marketer Page</Link>
        </div>
      </div>

      <style jsx>{`
        .modal {
          width: 100vw;
          max-width: 30rem;
          height: 100vh;
          background: white;
          position: fixed;
          top: 100vh;
          right: 0;
          border-left: 1px solid ${styles.secondaryColor};
          z-index: 100;
          padding: 1rem;
          transition: all 0.5s ease-out;
          font-size: 1.2rem;
          overflow: hidden;
        }

        .modal.show {
          top: 0vh;
          transition: all 0.2s ease-out;
        }

        .X {
          text-align: right;
          font-size: 1.6rem;
          line-height: 0;
          padding-bottom: 0.4rem;
          cursor: pointer;
        }

        .swipe1 {
          position: relative;
          left: -20rem;
          transition: 0.2s all 0.2s cubic-bezier(0.76, -0.48, 0.61, 1.5);
          text-align: center;
        }
        .swipe2 {
          position: relative;
          left: -20rem;
          transition: 0.4s all 0.2s cubic-bezier(0.76, -0.48, 0.61, 1.5);
          text-align: center;
        }

        .In {
          left: 0rem;
        }
      `}</style>
    </>
  );
}
