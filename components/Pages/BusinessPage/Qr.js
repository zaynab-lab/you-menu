import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import LogoBar from "@/components/ZAMENU";
import { styles } from "@/public/js/styles";
import { useEffect, useState } from "react";
import { toPng } from "html-to-image";
import { saveAs } from "@/util/extraFunctions";
import { FaDownload } from "react-icons/fa";
import QrCode from "@/components/QrCode";
import Share from "@/components/Share";
import Link from "next/link";
import BPLayout from "./BPLayout";

const bType = ["resturant", "cafe"];

export default function Qr({ setSelected, back, business }) {
  const [tableNumber, setTableNumber] = useState(1);
  const [tables, setTables] = useState([1]);

  const exportImg = (number) => {
    toPng(document.getElementById("table" + number)).then((dataUrl) => {
      saveAs(dataUrl, `table${number}.png`);
    });
  };

  useEffect(() => {
    const t = Array.from({ length: tableNumber }, (_, i) => i + 1);
    setTables(t);
  }, [tableNumber]);

  const domain = "https://www.za-menu.com";

  return (
    <>
      <BackButton setSelected={setSelected} back={back} select={"More"} />
      <BPLayout>
        <div>
          {bType.includes(business?.businessType) && (
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
          )}
          <Share domain={domain} businessCode={business?.businessCode} />
          <div className="qrCardList">
            {tables.map((obj, i) => (
              <div key={i} className="qrCardListChild">
                <div className="qrCardContainer" id={`table${obj}`}>
                  <div className="qrCard">
                    <div className="qrTitle">
                      <div className="qrTitle-table">
                        {bType.includes(business?.businessType) && "table"}
                      </div>
                      <div className="qrTitle-number">
                        {bType.includes(business?.businessType)
                          ? obj
                          : business?.brand?.name}
                      </div>
                    </div>
                    <Link href={`/menu/${business?.businessCode}`}>
                      <div className="qrCodeContainer">
                        <QrCode
                          value={`${domain}/menu/${business?.businessCode}?table=${obj}`}
                          width={"200"}
                        />
                      </div>
                    </Link>
                    <div className="LogoContainer">
                      <div className="qrline"></div>
                      <LogoBar size={true} />
                    </div>
                  </div>
                </div>
                <div className="fadownload" onClick={() => exportImg(obj)}>
                  <FaDownload /> {"   "}{" "}
                  {bType.includes(business?.businessType)
                    ? `table ${obj}`
                    : "QR code"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </BPLayout>
      <style jsx>{`
        .setTables {
          ${styles.flexAligncenter}
          justify-content:space-between;
          padding: 0.4rem 2rem;
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
          font-size: ${bType.includes(business?.businessType)
            ? "6rem"
            : "3rem"};
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
          padding-bottom: 2.6rem;
          width: 100%;
        }
        .qrline {
          width: 100%;
          height: 0.3rem;
          background: ${styles.secondaryColor};
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
