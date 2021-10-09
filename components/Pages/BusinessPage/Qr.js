import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import LogoBar from "@/components/LogoBar";
import { styles } from "@/public/js/styles";
import { useEffect, useState } from "react";
import { toPng } from "html-to-image";
import { saveAs } from "@/util/extraFunctions";
import { FaDownload } from "react-icons/fa";
import QrCode from "@/components/QrCode";

export default function Qr({ setSelected, back, businessCode }) {
  const [tableNumber, setTableNumber] = useState(1);
  const [tables, setTables] = useState([1]);

  const exportPdf = () => {
    // const pdf = new jsPDF("p", "mm", "a5");
    // tables.map((number) =>
    //   toPng(document.getElementById("table" + number)).then((dataUrl) => {
    //     pdf.loadFile(dataUrl);
    //   })
    // );
    // pdf.save("Tables.pdf");
  };
  const exportImg = (number) => {
    toPng(document.getElementById("table" + number)).then((dataUrl) => {
      saveAs(dataUrl, `table${number}.png`);
    });
  };

  useEffect(() => {
    const t = Array.from({ length: tableNumber }, (_, i) => i + 1);
    setTables(t);
  }, [tableNumber]);

  const domain = "https://youmenu.vercel.app";

  return (
    <>
      <BackButton setSelected={setSelected} back={back} />
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
          <div onClick={() => exportPdf()} className="download">
            download all as pdf
          </div>
          <div className="qrCardList">
            {tables.map((obj, i) => (
              <div key={i} className="qrCardListChild">
                <div className="qrCardContainer" id={`table${obj}`}>
                  <div className="qrCard">
                    <div className="qrTitle">
                      <div className="qrTitle-table">table</div>
                      <div className="qrTitle-number">{obj}</div>
                    </div>
                    <div className="qrCodeContainer">
                      <QrCode
                        value={`${domain}/menu/${businessCode}?table=${obj}`}
                        width={"200"}
                      />
                    </div>
                    <div className="LogoContainer">
                      <LogoBar />
                    </div>
                  </div>
                </div>
                <div className="fadownload" onClick={() => exportImg(obj)}>
                  <FaDownload /> {"   "} table {obj}
                </div>
              </div>
            ))}
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
          padding-bottom: 2rem;
        }

        .qrCountainer {
          padding: 3.5rem 0;
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
        .qrCardList {
          flex-wrap: wrap;
          ${styles.flexAligncenter}
        }
        .qrCardListChild {
          flex: 1 1 10%;
        }
        .qrCardContainer {
          ${styles.flexBothcenter}
          overflow:hidden;
          padding: 2rem;
          background: white;
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
          background: white;
        }

        .LogoContainer {
          max-width: 22rem;
          padding-bottom: 2rem;
        }
        .fadownload {
          color: ${styles.secondaryColor};
          font-size: 1.2rem;
          text-align: center;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
