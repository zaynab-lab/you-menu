import { styles } from "../../../public/js/styles";
import Add from "../../icons/Add";
import More from "../../icons/More";
import Orders from "../../icons/Orders";

export default function () {
  return (
    <>
      <div className="menu-container">
        <div className="icon">
          <Orders color={styles.primaryColor} />
        </div>
        <div className="icon">
          <Add color={styles.grey} />
        </div>
        <div className="icon">
          <More color={styles.grey} />
        </div>
      </div>
      <style>{`
      .menu-container{
        width:100vw;
        position:absolute;
        bottom:0;
        border-top:1px solid ${styles.primaryColor};
        display:flex;
        align-items:center;
      }
      .icon{
        padding:.3rem 2rem;
        flex:1 1 100%;
        text-align:center;
      }
      `}</style>
    </>
  );
}
