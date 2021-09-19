import { styles } from "../public/js/styles";

export default function () {
  return (
    <>
      <div className="logo-bar">
        <div className="you">you</div>
        <div>menu</div>
        <div className="line"></div>
      </div>

      <style>{`
      .logo-bar{
        color:white;
        background: ${styles.lineargradeint};
        font-size:4.2rem;
        padding:1rem 0 2rem 0;
        line-height:2.7rem;
        display:flex;
        align-items:center;
        flex-direction:column;
        border-radius: 0 0 .5rem .5rem;
        }
        
    .you{
        color:black;
        -webkit-transform:translateX(-2rem);
        -ms-transform:translateX(-2rem);
        transform:translateX(-2rem);
        }
    .line{
        height:.5rem;
        width:100vw;
        background:black;
        margin-top:.5rem;
        }
      `}</style>
    </>
  );
}
