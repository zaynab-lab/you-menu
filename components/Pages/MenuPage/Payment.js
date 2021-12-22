import Onoff from "@/components/Onoff";
import { styles } from "@/public/js/styles";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Payment({
  total,
  user,
  onlyTarget,
  useExchange,
  setUseCredit,
  useCredit,
  business,
  selectedCurrency
}) {
  const [exchangeList, setExchangeList] = useState([]);
  const [usdTotal, setUSDTotal] = useState(0);

  useEffect(() => {
    !!business &&
      axios
        .get("/api/management/exchange")
        .then((res) => Array.isArray(res.data) && setExchangeList(res.data));
  }, [business]);

  useEffect(() => {
    exchangeList.length > 0 &&
      total &&
      !!business?.currency &&
      (business?.defaultCurrency === "USD"
        ? setUSDTotal(total)
        : setUSDTotal(
            Number(
              total /
                exchangeList.filter(
                  (ex) => ex.target === business?.defaultCurrency && ex.rate
                )[0]?.rate
            ).toFixed(2)
          ));
  }, [total, exchangeList, business]);
  return (
    <>
      <div className="paySection">
        <div className="payItem">
          <div>use credit</div>
          <Onoff setOn={() => setUseCredit(!useCredit)} on={useCredit} />
        </div>
        <div className="payItem">
          <div>wallet credit</div>
          <div>
            {(useCredit
              ? Number((user?.credit - usdTotal).toFixed(2)) < 0
                ? "0"
                : Number((user?.credit - usdTotal).toFixed(2))
              : Number(user?.credit?.toFixed(2))) +
              " " +
              "USD"}
          </div>
        </div>
        <div className="payItem">
          <div>should pay</div>
          <div>
            {useCredit
              ? Number((user?.credit - usdTotal).toFixed(2)) > 0
                ? "0"
                : Math.abs(Number((user?.credit - usdTotal).toFixed(2)))
              : selectedCurrency
              ? Number((total * business?.exRate).toFixed(2)) +
                " " +
                business?.currency
              : Number(total?.toFixed(2)) + " " + business?.defaultCurrency}
          </div>
        </div>
        {
          <div className={`exchangenote ${useCredit && "show"}`}>
            {business.defaultCurrency === "USD" ? (
              <>
                note: the exchange rate is {business?.exRate + " "}
                {business?.currency}/USD, and it is specificed by the business
                you are dealing with
              </>
            ) : (
              <>
                note: the exchange rate is{" "}
                {
                  exchangeList.filter(
                    (ex) => ex.target === business?.defaultCurrency && ex.rate
                  )[0]?.rate
                }
                {business?.currency}/USD
              </>
            )}
          </div>
        }
      </div>
      <style jsx>{`
        .paySection {
          padding-top: 1.2rem;
        }
        .payItem {
          font-size: 1.2rem;
          padding: 0.4rem 0;
          ${styles.flexAligncenter};
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
        }
        .selectMethod {
          background: white;
          font-size: 1.2rem;
          padding: 0rem 0.5rem;
          border-radius: 0.5rem;
        }
        .exchangenote {
          opacity: 0;
          font-size: 0.8rem;
          color: ${styles.secondaryColor};
          border: 1px solid ${styles.secondaryColor};
          padding: 0.2rem 0.4rem;
          border-radius: 0.3rem;
          background: #f9646510;
          -webkit-transition: all 1s ease-in-out;
          -o-transition: all 1s ease-in-out;
          transition: all 1s ease-in-out;
        }

        .show {
          width: 100%;
          display: block;
          opacity: 1;
          -webkit-transition: all 1s ease-in-out;
          -o-transition: all 1s ease-in-out;
          transition: all 1s ease-in-out;
        }
      `}</style>
    </>
  );
}
