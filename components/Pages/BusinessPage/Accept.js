import { useState } from "react";
import { styles } from "@/public/js/styles";

export default function Accept() {
  const [on, setOn] = useState(true);
  return (
    <>
      <div className="accept-container">
        <div>accept delivery orders</div>
        <div className="toggle" onClick={() => setOn(!on)}>
          {on ? (
            <>
              <div className="circle on"></div>
              <span>On</span>
            </>
          ) : (
            <>
              <span>off</span>
              <div className="circle off"></div>
            </>
          )}
        </div>
      </div>
      <style>{`
  .accept-container{
    ${styles.flexAligncenter}
    -webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;
    padding:1rem 1.2rem;
    border-bottom:1px solid ${styles.secondaryColor}
  }
  .toggle{
    width:3.4rem;
    ${styles.flexAligncenter}
    -webkit-box-pack:space-evenly;-ms-flex-pack:space-evenly;justify-content:space-evenly;
    border-radius:10rem;
    cursor:pointer;
    ${styles.boxshadow}
  }
  .circle{
    width:1rem;
    height:1rem;
    border-radius:10rem;
  }
  .on{
    background:${styles.secondaryColor}
  }
  .off{
    background:${styles.grey}
  }
  `}</style>
    </>
  );
}
