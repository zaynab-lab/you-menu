import { styles } from "@/public/js/styles";
import Link from "next/link";

export default function ContuctUs() {
  return (
    <>
      <Link href="https://wa.me/+96181026095?text=There are some points: ">
        <div className="contact">contact us on Whatsapp</div>
      </Link>
      <style>{`
    .contact{
      color:${styles.secondaryColor};
      width:100vw;
      text-align:center;
      position:absolute;
      bottom:0;
      cursor:pointer;
    }
    `}</style>
    </>
  );
}
