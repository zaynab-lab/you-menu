import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import LogoBar from "@/components/LogoBar";
import { styles } from "@/public/js/styles";
import { useEffect, useState } from "react";
import { QRCode } from "react-qr-svg";
export default function Qr({ setSelected }) {
  const [tableNumber, setTableNumber] = useState(1);
  const [tables, setTables] = useState([1]);

  useEffect(() => {
    const t = Array.from({ length: tableNumber }, (_, i) => i + 1);
    setTables(t);
  }, [tableNumber]);

  const domain = "https://mogetee.vercel.app";

  return (
    <>
      <BackButton setSelected={setSelected} />
      <div className="form">
        <div className="qrCountainer">
          <div className="setTables">
            <div className="setTablesTxt">number of tables</div>
            <div className="setTablesInput">
              <Input
                type={"number"}
                value={tableNumber}
                onchange={(e) => {
                  e.target.value <= 50
                    ? setTableNumber(e.target.value)
                    : alert("50 table allowed");
                }}
              />
            </div>
          </div>
          <div className="download">download as pdf</div>
          {tables.map((obj) => (
            <div className="qrCardContainer">
              <div className="qrCard">
                <div className="qrTitle">
                  <div className="qrTitle-table">table</div>
                  <div className="qrTitle-number">{obj}</div>
                </div>
                <div className="qrCodeContainer">
                  <QRCode
                    value={`${domain}/menu/businessCode?table=${obj}`}
                    width={"200"}
                  />
                </div>
                <div className="LogoContainer">
                  <LogoBar />
                </div>
              </div>
            </div>
          ))}
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
        .setTables {
          ${styles.flexAligncenter}
          justify-content:space-between;
        }

        .setTablesTxt {
          flex: 1 1 90%;
          font-size: 1.6rem;
        }
        .setTablesInput {
          flex: 1 1 5rem;
        }
        .download {
          color: ${styles.secondaryColor};
          font-size: 1.2rem;
          cursor: pointer;
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
          ${styles.flexColumn}
          max-width: 22rem;
          width: 22rem;
        }
        .qrTitle {
          width: 100%;
          font-size: 7rem;
          padding-top: 1rem;
          color: ${styles.secondaryColor};
          ${styles.flexAligncenter}
          ${styles.flexColumn}
        }
        .qrTitle-table {
          font-size: 1.6rem;
          line-height: 1rem;
          padding-bottom: 1rem;
        }
        .qrTitle-number {
          width: 102%;
          text-align: center;
          line-height: 6rem;
          color: white;
          background: ${styles.lineargradeint};
        }

        .qrCodeContainer {
          padding: 2rem;
          border-radius: 2rem;
          ${styles.boxshadow};
          margin: 2rem;
        }

        .LogoContainer {
          max-width: 22rem;
          padding-bottom: 2rem;
        }
      `}</style>
    </>
  );
}
