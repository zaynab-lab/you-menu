import Button from "@/components/Button";
import { styles } from "@/public/js/styles";

export default function Address({ user }) {
  return (
    <>
      <div className="addressContainer">
        {user?.address?.length > 0 ? (
          <select className="selectAdress">
            <option>choose address</option>
          </select>
        ) : (
          <div>add your address</div>
        )}
        <Button content="add address" />
      </div>

      <style jsx>{`
        .addressContainer {
          padding-top: 0.4rem;
          ${styles.flexAligncenter}
          -webkit-box-pack:justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          gap: 0.3rem;
        }
        .selectAdress {
          padding: 0.2rem;
          background: white;
          width: 100%;
          font-size: 1.2rem;
          border-radius: 0.4rem;
        }
      `}</style>
    </>
  );
}
