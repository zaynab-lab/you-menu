import Button from "@/components/Button";
import Input from "@/components/Input";
import { styles } from "@/public/js/styles";
import { countries } from "@/util/countryCode";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";

export default function ListOfExchanges() {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [rate, setRate] = useState();
  const [exchanges, setExchanges] = useState([]);
  const [refreshExs, setRefreshExs] = useState(false);
  const [exID, setExID] = useState("");

  useEffect(() => {
    const tExchange = exchanges?.filter(
      (ex) => ex.base === baseCurrency && ex.target === targetCurrency
    );
    tExchange.length > 0 && setExID(tExchange[0]?._id);
    tExchange.length > 0 && setRate(tExchange[0]?.rate);
  }, [exchanges, baseCurrency, targetCurrency]);

  useEffect(
    () =>
      axios.get("/api/management/exchange").then((res) => {
        Array.isArray(res.data) && setExchanges(res.data);
      }),
    [refreshExs]
  );
  return (
    <>
      <div className="ListofEx">
        <div className="control">
          <SelectCurrency
            currency={baseCurrency}
            setCurrency={setBaseCurrency}
          />
          <Input
            placeholder="rate"
            type="Number"
            value={rate}
            onchange={(e) => setRate(e.target.value)}
          />
          <SelectCurrency
            currency={targetCurrency}
            setCurrency={setTargetCurrency}
          />
          <Button
            content="ok"
            color={styles.secondaryColor}
            onclick={() =>
              !!rate && !!exID
                ? axios
                    .put("/api/management/exchange", {
                      rate,
                      exchangeID: exID
                    })
                    .then(
                      (res) => res.data === "done" && setRefreshExs(!refreshExs)
                    )
                : axios
                    .post("/api/management/exchange", {
                      rate,
                      base: baseCurrency,
                      target: targetCurrency
                    })
                    .then(
                      (res) => res.data === "done" && setRefreshExs(!refreshExs)
                    )
            }
          />
        </div>
        <div>
          {exchanges?.map((ex, i) => (
            <div
              key={i}
              className="exRow"
              onClick={() => {
                setTargetCurrency(ex.target);
                setBaseCurrency(ex.baseCurrency);
                setExID(ex._id);
                setRate(ex.rate);
              }}
            >
              <span className="icon">
                <FaExchangeAlt />
              </span>{" "}
              {ex.rate}{" "}
              <span className="currency">{ex.target + "/" + ex.base}</span>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .ListofEx {
          width: 100%;
        }
        .icon {
          width: 2.6rem;
          height: 2.6rem;
          font-size: 1.4rem;
          color: gray;
          border: 1px solid gray;
          border-radius: 50%;
          padding: 0.1rem;
          ${styles.flexBothcenter}
        }
        .control {
          width: 23rem;
          margin: auto;
          ${styles.flexAligncenter}
          gap:1rem;
        }
        .exRow {
          padding: 0.6rem 1rem;
          font-size: 1.6rem;
          color: ${styles.secondaryColor};
          ${styles.flexAligncenter};
          gap: 0.6rem;
        }
        .currency {
          padding-right: 0.3rem;
          font-size: 80%;
          color: gray;
        }
      `}</style>
    </>
  );
}

export function SelectCurrency({ currency, setCurrency }) {
  return (
    <>
      <select
        className="selectCurrency"
        value={currency}
        onChange={(e) => {
          setCurrency(e.target.value);
        }}
      >
        {[{ currency: "USD" }, ...countries].map((country, j) => (
          <option key={j} value={country.currency}>
            {country.currency}
          </option>
        ))}
      </select>

      <style jsx>{`
        .selectCurrency {
          background: white;
          border: none;
          height: 2.8rem;
          font-size: 1.2rem;
          border-radius: 0.5rem;
          width: 5rem;
          padding: 0 0.5rem;
          ${styles.boxshadow}
        }
      `}</style>
    </>
  );
}
