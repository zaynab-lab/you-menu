import { styles } from "@/public/js/styles";
import Add from "@/components/icons/Add";
import More from "@/components/icons/More";
import Orders from "@/components/icons/Orders";

export default function anima() {
  return (
    <>
      <div className="container">
        <div className="inner">Hello world</div>
        <div className="btn">button</div>
        <div className="bar">
          <div className="barContent">
            {" "}
            <span className="hole"></span>
          </div>
          {/* <div>
            <Orders color="white" />
          </div>
          <div className="add">
            <Add color="white" />
          </div>
          <div>
            <More color="white" />
          </div> */}
        </div>
      </div>

      <style jsx>{`
        .bar {
          filter: contrast(20);
          position: fixed;
          bottom: 0;
          width: 100vw;
          background-color: white;
          ${styles.flexAligncenter};
          justify-content: space-evenly;
          gap: 20vw;
          overflow: hidden;
        }
        .barContent {
          width: 100%;
          height: 5rem;
          background: ${styles.secondaryColor};
          filter: blur(20);
        }
        .hole {
          width: 6rem;
          height: 6rem;
          background: white;
          background-image: linear-gradient(90deg, #fea322, #3f3af3),
            linear-gradient(90deg, #fea322, #3f3af3),
            linear-gradient(90deg, #fea322, #3f3af3);
          background-position: cover;
          background-position: 0px 10px;
          border-radius: 50%;
          position: absolute;
          left: 0;
          top: -3rem;
          right: 0;
          margin: auto;
          z-index: -2;
        }
        .container {
          height: 20rem;
          ${styles.flexBothcenter}
        }
        .inner {
          border-radius: 1rem;
          padding: 2rem;
          background: ${styles.secondaryColor};
          color: white;
          font-size: 2rem;
          clip-path: circle(5% at 90% 10%);
          transition: clip-path 0.5s ease-in-out;
        }
        .inner:hover {
          clip-path: circle(80%);
        }
        .btn {
          border: 1px solid ${styles.secondaryColor};
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .btn:before {
          content: "";
          width: 110%;
          height: 100%;
          position: absolute;
          top: 0;
          left: -10%;
          z-index: -1;
          clip-path: circle(2% at 0% 50%);
          border-radius: 0.3rem;
          background: ${styles.secondaryColor};
          transition: clip-path 0.5s ease-in-out;
        }
        .btn:hover:before {
          clip-path: circle(100%);
        }
        .btn:hover {
          color: white;
        }
      `}</style>
    </>
  );
}
