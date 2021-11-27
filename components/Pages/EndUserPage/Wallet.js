import { styles } from "@/public/js/styles";
import {
  BsDownload,
  BsUpload,
  BsTag,
  BsGift,
  BsCreditCard
} from "react-icons/bs";

export default function Wallet({ credit }) {
  return (
    <>
      <div className="walletPage">
        <WalletHeader credit={credit} />
        <Transactions />
      </div>
      <style jsx>{`
        .walletPage {
          overflow: hidden;
        }
      `}</style>
    </>
  );
}

export function WalletHeader({ credit }) {
  return (
    <>
      <div className="walletHeader">
        <div>your wallet</div>

        <div className="walletCredit">$ {credit}</div>

        <div className="options">
          <div className="option">
            <div className="optionIcon">
              <BsUpload />
            </div>

            <div>send</div>
          </div>

          <div className="option">
            <div className="optionIcon">
              <BsDownload />
            </div>

            <div>receive</div>
          </div>

          <div className="option">
            <div className="optionIcon">
              <BsTag />
            </div>

            <div>services</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .walletHeader {
          padding: 2rem 0;
          width: 100%;
          background: ${styles.lineargradeint};
          ${styles.flexBothcenter};
          ${styles.flexColumn}
          color: white;
        }

        .walletCredit {
          font-size: 2.6rem;
        }

        .options {
          ${styles.flexBothcenter}
          gap:4rem;
          padding-top: 3rem;
          font-size: 1rem;
        }

        .option {
          ${styles.flexAligncenter}
          ${styles.flexColumn}
        }

        .optionIcon {
          width: 2.8rem;
          height: 2.8rem;
          font-size: 1.6rem;
          background: #ffcfd7;
          border-radius: 50%;
          color: ${styles.secondaryColor};
          ${styles.flexBothcenter};
        }
      `}</style>
    </>
  );
}
const transactions = [
  { type: "withdraw", amount: 20, currency: "$", date: "2/3/2021" },
  {
    type: "received",
    amount: 10,
    currency: "$",
    date: "2/3/2020",
    from: "k3jrni33f993nfihne3ich3bcj39j"
  },
  {
    type: "send",
    amount: 10,
    currency: "$",
    date: "2/3/2021",
    to: "sjfhu7g3ncpi833u92hoifh982y23883"
  },
  { type: "gift", amount: 1, currency: "$", date: "2/3/2020" },
  { type: "services", amount: 1, currency: "$", date: "2/3/2021" },
  { type: "charge", amount: 200, currency: "$", date: "2/3/2021" }
];

export function Transactions() {
  return (
    <>
      {transactions.map((transaction, i) => (
        <div key={i} className="transaction">
          <div className="trnAmountIcongrp">
            <div className="trnIcongrp">
              <div className="trnIcon">
                {transaction.type === "services" && <BsTag />}
                {transaction.type === "send" && <BsUpload />}
                {transaction.type === "received" && <BsDownload />}
                {transaction.type === "gift" && <BsGift />}
                {(transaction.type === "withdraw" ||
                  transaction.type === "charge") && <BsCreditCard />}
              </div>
              <div className="trnType">{transaction.type}</div>
            </div>
            <div className="trnAmountgrp">
              <div
                className={`
                ${
                  transaction.type === "services" ||
                  transaction.type === "send" ||
                  transaction.type === "withdraw"
                    ? "min"
                    : "plus"
                }
                `}
              >
                {transaction.amount + " " + transaction.currency}
              </div>
              <div className="discription">
                {transaction.type === "received" && transaction.from}
                {transaction.type === "send" && transaction.to}
              </div>
            </div>
          </div>
          <div className="date">{transaction.date}</div>
        </div>
      ))}
      <style jsx>{`
        .trnTitle {
          text-align: center;
        }
        .transaction {
          padding: 1rem;
          ${styles.flexAligncenter}
          justify-content:space-between;
        }
        .trnIcongrp {
          width: 3.6rem;
          ${styles.flexAligncenter};
          ${styles.flexColumn}
        }

        .trnIcon {
          width: 2.6rem;
          height: 2.6rem;
          ${styles.flexBothcenter}
          border: 2px solid gray;
          border-radius: 50%;
          color: gray;
        }
        .trnAmountgrp {
          font-size: 1.8rem;
        }
        .trnAmountIcongrp {
          ${styles.flexAligncenter}
          gap:2rem;
          font-size: 1.4rem;
        }

        .trnType {
          font-size: 0.8rem;
          color: gray;
        }
        .min {
          color: ${styles.secondaryColor};
        }
        .min:before {
          content: "- ";
        }
        .plus {
          color: green;
        }
        .plus:before {
          content: "+ ";
        }
        .date {
          color: gray;
        }
        .discription {
          width: 9rem;
          font-size: 0.8rem;
          color: gray;
          overflow: auto;
        }
      `}</style>
    </>
  );
}
