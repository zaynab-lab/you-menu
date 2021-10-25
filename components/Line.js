import { styles } from "@/public/js/styles";

export default function Line() {
  return (
    <>
      <div className="line"></div>
      <style>{`
  .line{
    width:100vw;
    height:.4rem;
    background:${styles.lineargradeint};
    position:fixed;
    top:0;
    z-index:100;
  }
  `}</style>
    </>
  );
}
