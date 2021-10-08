import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import LogoBar from "@/components/LogoBar";
import { styles } from "@/public/js/styles";
import { QRCode } from "react-qr-svg";

export default function Qr({ setSelected }) {
  return (
    <>
      <BackButton setSelected={setSelected} />
      <div className="form">
        <div className="qrCountainer">
          <div className="setTabels">
            <div className="setTabelsTxt">number of tables</div>
            <div className="setTabelsInput">
              <Input type={"number"} />
            </div>
          </div>
          <div className="download">download as pdf</div>
          <div className="qrCardContainer">
            <div className="qrCard">
              <div className="qrTitle">table #</div>
              <div className="qrCodeContainer">
                <QRCode value={"businessCode"} width={"200"} />
              </div>
              <div className="LogoContainer">
                <LogoBar />
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .form {
          padding: 0 1rem;
          ${styles.flexAligncenter}
          -webkit-box-orient:vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          max-width: 100vw;
          position: relative;
          height: -webkit-fit-content;
          height: -moz-fit-content;
          height: fit-content;
        }

        .qrCountainer {
          padding-top: 3.5rem;
        }
        .setTabels {
          ${styles.flexAligncenter}
          justify-content:space-between;
        }
        .setTabelsTxt {
          flex: 1 1 90%;
          font-size: 1.6rem;
        }
        .setTabelsInput {
          flex: 1 1 5rem;
        }
        .download {
          color: ${styles.secondaryColor};
          font-size: 1.2rem;
        }
        .qrCardContainer {
          ${styles.flexBothcenter}
          overflow:hidden;
          padding: 2rem 0.5rem;
        }
        .qrCard {
          border: 4px solid ${styles.secondaryColor};
          border-radius: 2rem;
          padding: 0.2rem;
          ${styles.flexBothcenter}
          flex-direction:column;
          max-width: 22rem;
        }
        .qrTitle {
          font-size: 5.5rem;
          color: ${styles.secondaryColor};
        }
        .qrCodeContainer {
          padding: 2rem;
          border-radius: 2rem;
          ${styles.boxshadow}
        }

        .LogoContainer {
          max-width: 22rem;
          padding: 2rem 0;
        }
      `}</style>
    </>
  );
}
