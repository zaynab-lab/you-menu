import { styles } from "@/public/js/styles";

export default function LogoBar({ height }) {
  return (
    <>
      <div className="logo-bar">
        <div className="you">you</div>
        <div>menu</div>
        <div className="logo-bar-line"></div>
      </div>

      <style>{`
      .logo-bar{
        color:white;
        background: ${styles.lineargradeint};
        font-size:${height ? height : "5rem"};
        padding:1rem 0 2rem 0;
        line-height:3.4rem;
        ${styles.flexAligncenter}
        -webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;
        border-radius: 0 0 .5rem .5rem;
        overflow:hidden;
        }
        
    .you{
        color:black;
        -webkit-transform:translateX(-2.4rem);-ms-transform:translateX(-2.4rem);transform:translateX(-2.4rem);
        }
    .logo-bar-line{
        height:.5rem;
        width:100vw;
        background:black;
        margin-top:.5rem;
        }
      `}</style>
    </>
  );
}
