import { styles } from "@/public/js/styles";

export default function Line() {
  return (
    <>
      <div className="line"></div>
      <style>{`
  .line{
    width:100vw;
    height:.3rem;
    background:${styles.lineargradeint};
    position:sticky;
    top:0;
    z-index:100;
  }
  `}</style>
    </>
  );
}
