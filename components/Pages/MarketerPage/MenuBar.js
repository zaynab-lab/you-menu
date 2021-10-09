import { styles } from "@/public/js/styles";
import Add from "@/components/icons/Add";
import Qr from "@/components/icons/Qr";
import Home from "@/components/icons/Home";

export default function MenuBar({ selected, setSelected }) {
  return (
    <>
      <div className="menu-container">
        <div className="mouth">
          <div className="center">
            <div></div>
          </div>
        </div>

        <div onClick={() => setSelected("Home")} className="icon">
          <Home
            color={selected === "Home" ? styles.secondaryColor : styles.grey}
          />
        </div>

        <div onClick={() => setSelected("Add")} className="icon add">
          <Add
            color={selected === "Add" ? styles.secondaryColor : styles.grey}
          />
        </div>

        <div onClick={() => setSelected("Qr")} className="icon">
          <Qr color={selected === "Qr" ? styles.secondaryColor : styles.grey} />
        </div>
      </div>

      <style jsx>
        {`
          .menu-container {
            width: 100vw;
            position: fixed;
            bottom: 0;
            ${styles.flexAligncenter}
            z-index:3;
            background: white;
          }

          .mouth {
            position: absolute;
            bottom: 0;
            width: 100vw;
            height: 100%;
            z-index: -1;
            ${styles.flexJustifycenter}
          }

          .center {
            background: white;
            width: 6rem;
            border-radius: 0 0 6rem 6rem;
            border: 1px solid ${styles.secondaryColor};
            border-top: 0;
            bottom: 0;
            margin-bottom: 0.6rem;
          }

          .center:before {
            content: "";
            display: block;
            position: absolute;
            right: 0;
            top: 0;
            background: white;
            width: calc(50vw - 3rem + 2px);
            height: 30%;
            border-radius: 100rem 0 0 0;
            border: solid ${styles.secondaryColor};
            border-width: 1px 0 0 1px;
          }

          .center:after {
            content: "";
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            background: white;
            width: calc(50vw - 3rem + 2.5px);
            height: 30%;
            border-radius: 0 100rem 0 0;
            border: solid ${styles.secondaryColor};
            border-width: 1px 1px 0 0;
          }

          .center div {
            background: white;
            width: calc(6rem + 3px);
            height: 20%;
            -webkit-transform: translateX(-4px);
            -ms-transform: translateX(-4px);
            transform: translateX(-4px);
          }

          .icon {
            padding: 0rem 2rem;
            flex: 1 1 100%;
            text-align: center;
            cursor: pointer;
          }

          .add {
            -webkit-transform: translateY(-1rem);
            -ms-transform: translateY(-1rem);
            transform: translateY(-1rem);
          }
        `}
      </style>
    </>
  );
}
