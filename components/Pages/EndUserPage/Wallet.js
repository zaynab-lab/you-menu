import Input from "@/components/Input";
import Label from "@/components/Label";
import { styles } from "@/public/js/styles";
import { useState } from "react";
import {
  BsDownload,
  BsUpload,
  BsTag,
  BsGift,
  BsCreditCard
} from "react-icons/bs";

export default function Wallet({ credit }) {
  const [selectedTab, setSelectedTab] = useState("transactions");
  const [transactionModal, setTransactionModal] = useState(false);
  const [actionType, setActionType] = useState();

  const action = (aType) => {
    setActionType(aType);
    setTransactionModal(true);
  };
  return (
    <>
      <div className="walletPage">
        <WalletHeader credit={credit} action={action} />
        <WalletTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        {selectedTab === "transactions" && <Transactions />}

        <TransactionModal
          transactionModal={transactionModal}
          setTransactionModal={setTransactionModal}
          actionType={actionType}
        />
      </div>
      <style jsx>{``}</style>
    </>
  );
}

export function WalletHeader({ credit, action }) {
  return (
    <>
      <div className="walletHeader">
        <div className="walletHeaderCredit">
          <div className="walletCredit">
            {credit}
            <span className="currency">USD</span>
          </div>
          <div className="options">
            <div className="option" onClick={() => action("send")}>
              <div className="optionIcon">
                <BsUpload />
              </div>
              <div>send</div>
            </div>

            <div className="option" onClick={() => action("receive")}>
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
      </div>

      <style jsx>{`
        .walletHeader {
          padding: 1rem;
          width: 100%;
          background: white;
          ${styles.flexBothcenter};
        }
        .walletHeaderCredit {
          width: 100%;
          padding: 2.6rem;
          border-radius: 1rem;
          background: #fefefe;
          color: ${styles.secondaryColor};
          ${styles.boxshadow}
          ${styles.flexBothcenter};
          ${styles.flexColumn}
          color: gray;
          border: 0px solid ${styles.secondaryColor};
          overflow: hidden;
        }

        .walletCredit {
          font-size: 3rem;
        }

        .options {
          ${styles.flexBothcenter}
          gap:4rem;
          padding-top: 2rem;
          font-size: 1rem;
          z-index: 2;
        }

        .option {
          ${styles.flexAligncenter};
          ${styles.flexColumn};
          cursor: pointer;
        }

        .optionIcon {
          width: 2.8rem;
          height: 2.8rem;
          font-size: 1.6rem;
          background: #fff;
          ${styles.boxshadow}
          border-radius: 50%;
          color: ${styles.secondaryColor};
          ${styles.flexBothcenter};
        }
        .currency {
          font-size: 50%;
          padding-left: 0.3rem;
        }
      `}</style>
    </>
  );
}
export function WalletTabs({ selectedTab, setSelectedTab }) {
  return (
    <>
      <div className="tabContainer">
        <div className="tabs">
          <div
            className={`tab ${selectedTab === "transactions" && "selected"}`}
            onClick={() => setSelectedTab("transactions")}
          >
            transactions
          </div>
          <div
            className={`tab ${selectedTab === "currencies" && "selected"}`}
            onClick={() => setSelectedTab("currencies")}
          >
            currencies
          </div>
        </div>
      </div>
      <style jsx>{`
        .tabContainer {
          position: sticky;
          top: 0;
          width: 100%;
          background: white;
          padding-top: 0.5rem;
        }
        .tabs {
          width: fit-content;
          margin: auto;
          background: ${styles.secondaryColor};
          color: white;
          ${styles.flexBothcenter};
          border-radius: 0.8rem;
        }
        .tab {
          font-size: 1.2rem;
          padding: 0.2rem 1.2rem;
          cursor: pointer;
        }
        .selected {
          border-radius: 0.8rem;
          background: white;
          color: ${styles.secondaryColor};
          border: 1px solid ${styles.secondaryColor};
        }
      `}</style>
    </>
  );
}

const transactions = [
  { type: "withdraw", amount: 20, currency: "USD", date: "2/3/2021" },
  { type: "pay", amount: 20, currency: "USD", date: "2/3/2021" },
  {
    type: "received",
    amount: 10,
    currency: "USD",
    date: "2/3/2020",
    from: "k3jrni33f993nfihne3ich3bcj39j"
  },
  {
    type: "send",
    amount: 10,
    currency: "USD",
    date: "2/3/2021",
    to: "sjfhu7g3ncpi833u92hoifh982y23883"
  },
  { type: "gift", amount: 1, currency: "USD", date: "2/3/2020" },
  { type: "services", amount: 1, currency: "USD", date: "2/3/2021" },
  { type: "charge", amount: 200, currency: "USD", date: "2/3/2021" }
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
                {(transaction.type === "send" ||
                  transaction.type === "pay") && <BsUpload />}
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
                  transaction.type === "withdraw" ||
                  transaction.type === "pay"
                    ? "min"
                    : "plus"
                }
                `}
              >
                {transaction.amount}{" "}
                <span className="currency">{transaction.currency}</span>
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
          overflow: hidden;
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
        .currency {
          font-size: 50%;
          padding-left: 0.2rem;
        }
      `}</style>
    </>
  );
}

export function TransactionModal({
  transactionModal,
  setTransactionModal,
  actionType
}) {
  return (
    <>
      <div
        className={`transactionModal ${
          transactionModal && "showTransactionModal"
        }`}
      >
        <div className="transactionContainer">
          <div className="Xheader">
            <div>{actionType}</div>

            <div
              className="X"
              onClick={() => {
                setTransactionModal(false);
              }}
            >
              x
            </div>
          </div>
          {actionType === "send" ? (
            <div className="transactionBody">
              <Label title="target code" />
              <Input placeholder="place the code" font={"1.2rem"} />
            </div>
          ) : (
            <div className="transactionBody">
              <Label title="share your wallet" />
              <Input
                placeholder="9328938eyhdu933299283yd932y"
                font={"1.2rem"}
              />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .transactionModal {
          position: fixed;
          top: 0;
          width: 100vw;
          height: 100vh;
          z-index: -1;
          opacity: 0;
          ${styles.flexBothcenter}
          ${styles.flexColumn}
          -webkit-transition: all 0.5s ease-in-out;
          -o-transition: all 0.5s ease-in-out;
          transition: all 0.5s ease-in-out;
        }

        .showTransactionModal {
          opacity: 100;
          z-index: 100;
          -webkit-transition: all 0.5s ease-in-out;
          -o-transition: all 0.5s ease-in-out;
          transition: all 0.5s ease-in-out;
          background: #8888;
        }

        .Xheader {
          text-align: right;
          padding: 0.2rem;
          min-width: 22rem;
          background: white;
          font-size: 1.2rem;
          ${styles.flexAligncenter};
          justify-content: space-between;
          padding: 0 0.5rem;
          border-radius: 0.7rem 0.7rem 0 0;
        }

        .X {
          font-size: 1.6rem;
          line-height: 0;
          padding-bottom: 0.4rem;
          cursor: pointer;
        }
        .transactionContainer {
          border: 1px solid ${styles.secondaryColor};
          border-radius: 0.7rem;
          z-index: 101;
          background: white;
        }
        .transactionBody {
          padding: 1rem;
        }
      `}</style>
    </>
  );
}
