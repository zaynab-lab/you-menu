import Line from "@/components/Line";
import { styles } from "@/public/js/styles";
import SignBusiness from "./SignBusiness";

export default function MarketerPage() {
  return (
    <>
      <Line />
      <div className="motivation">dear you-menu marketer do your best ❤</div>
      <SignBusiness />
      <style jsx>{`
        .motivation {
          font-size: 1.2rem;
          width: 100%;
          text-align: center;
          padding: 0.5rem;
          color: ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
}
