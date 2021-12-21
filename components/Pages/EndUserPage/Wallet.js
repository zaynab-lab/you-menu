import Input from "@/components/Input";
import Label from "@/components/Label";
import { styles } from "@/public/js/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  BsDownload,
  BsUpload,
  BsTag,
  BsGift,
  BsCreditCard
} from "react-icons/bs";
import dateChanger, { timeChanger } from "@/util/dateChanger";
import { FaShareAlt } from "react-icons/fa";
import Button from "@/components/Button";
import ModalContainer from "@/components/ModalContainer";

export default function Wallet() {
  const [selectedTab, setSelectedTab] = useState("transactions");
  const [transactionModal, setTransactionModal] = useState(false);
  const [actionType, setActionType] = useState();
  const [wallet, setWallet] = useState();
  useEffect(() => {
    axios.get("/api/wallet").then((res) => {
      res?.data?.ownerID && setWallet(res?.data);
    });
  }, []);

  const action = (aType) => {
    setActionType(aType);
    setTransactionModal(true);
  };
  return (
    <>
      <div className="walletPage">
        <WalletHeader wallet={wallet} action={action} />
        <WalletTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        {selectedTab === "transactions" && <Transactions wallet={wallet} />}
        <TransactionModal
          wallet={wallet}
          transactionModal={transactionModal}
          setTransactionModal={setTransactionModal}
          actionType={actionType}
        />
      </div>
      <style jsx>{``}</style>
    </>
  );
}

export function WalletHeader({ wallet, action }) {
  return (
    <>
      <div className="walletHeader">
        <div className="walletHeaderCredit">
          <div className="walletCredit">
            {wallet?.credit[0]?.amount}
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
          gap: 0.4rem;
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

const dbTransactions = [
  { trnType: "withdraw", amount: 20, currency: "USD", date: "2/3/2021" },
  { trnType: "payed", amount: 20, currency: "USD", date: "2/3/2021" },
  {
    trnType: "received",
    amount: 10,
    currency: "USD",
    date: "2/3/2020",
    from: "k3jrni33f993nfihne3ich3bcj39j"
  },
  {
    trnType: "send",
    amount: 10,
    currency: "USD",
    date: "2/3/2021",
    to: "sjfhu7g3ncpi833u92hoifh982y23883"
  },
  { trnType: "gift", amount: 1, currency: "USD", date: "2/3/2020" },
  { trnType: "services", amount: 1, currency: "USD", date: "2/3/2021" },
  { trnType: "deposit", amount: 200, currency: "USD", date: "2/3/2021" }
];

export function Transactions({ wallet }) {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    !!wallet &&
      axios
        .get("/api/wallet/transactions")
        .then((res) => Array.isArray(res.data) && setTransactions(res.data));
  }, [wallet]);
  return (
    <>
      {transactions?.map((transaction, i) => (
        <div key={i} className="transaction">
          <div className="trnAmountIcongrp">
            <div className="trnIcongrp">
              <div className="trnIcon">
                {transaction?.trnType === "services" && <BsTag />}
                {(transaction?.trnType === "send" ||
                  transaction?.trnType === "payed") && <BsUpload />}
                {transaction?.trnType === "received" && <BsDownload />}
                {transaction?.trnType === "gift" && <BsGift />}
                {(transaction?.trnType === "withdraw" ||
                  transaction?.trnType === "deposit") && <BsCreditCard />}
              </div>
              <div className="trnType">{transaction?.trnType}</div>
            </div>
            <div className="trnAmountgrp">
              <div
                className={`
                ${
                  transaction?.trnType === "services" ||
                  transaction?.trnType === "send" ||
                  transaction?.trnType === "withdraw" ||
                  transaction?.trnType === "payed"
                    ? "min"
                    : "plus"
                }
                `}
              >
                {transaction?.amount}{" "}
                <span className="currency">{transaction?.currency}</span>
              </div>
              <div className="discription">
                {transaction?.trnType === "received" && transaction?.from}
                {transaction?.trnType === "send" && transaction?.to}
              </div>
            </div>
          </div>
          <div className="date">
            <div>{timeChanger(transaction?.date)}</div>
            <div>{dateChanger(transaction?.date)}</div>
          </div>
        </div>
      ))}
      <style jsx>{`
        .trnTitle {
          text-align: center;
        }
        .transaction {
          overflow: hidden;
          padding: 1rem;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          ${styles.flexAligncenter}
          ${styles.justifyBetween}
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
          font-size: 0.8rem;
          white-space: nowrap;
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
  actionType,
  wallet
}) {
  const [targetAddress, setTargetAddress] = useState();
  const [amount, setAmount] = useState();
  const [msg, setMsg] = useState();
  return (
    <>
      <ModalContainer
        showModal={transactionModal}
        setShowModal={setTransactionModal}
        title={actionType}
      >
        {actionType === "send" ? (
          <div className="transactionBody">
            <Label title="amount" />
            <Input
              type="number"
              placeholder="amount"
              value={amount}
              onchange={(e) => {
                setMsg("");
                setAmount(e.target.value);
              }}
              font={"1.2rem"}
            />

            <Label title="wallet address" />
            <Input
              placeholder="wallet address"
              value={targetAddress}
              onchange={(e) => {
                setMsg("");
                setTargetAddress(e.target.value);
              }}
              font={"1.2rem"}
            />
            <div className="btnContainer">
              <div className="msg">{msg}</div>
              <Button
                content="send"
                onclick={() => {
                  !targetAddress && setMsg("make sure to fill in the address");
                  !amount &&
                    setMsg("set the amount of your balance you want to send");
                  amount > wallet?.credit[0]?.amount &&
                    setMsg(
                      "you have just " +
                        wallet?.credit[0]?.amount +
                        " USD in your wallet"
                    );
                }}
                noLoading={true}
              />
            </div>
          </div>
        ) : (
          <div className="transactionBody">
            <Label title="share your wallet address" />
            <div className="url">
              <div className="urlInput">
                <Input
                  value={wallet?._id}
                  onchange={() => {}}
                  font={"1.2rem"}
                />
              </div>{" "}
              <div
                className="share"
                onClick={() =>
                  navigator.share({
                    title: "url",
                    text: wallet?._id
                  })
                }
              >
                <FaShareAlt />
              </div>
            </div>
          </div>
        )}
      </ModalContainer>

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
          min-width: 22rem;
          background: white;
          font-size: 1.2rem;
          ${styles.flexAligncenter};
          justify-content: space-between;
          padding: 0.4rem 0.8rem;
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
        .btnContainer {
          width: 100%;
          text-align: center;
        }
        .url {
          ${styles.flexAligncenter};
        }

        .urlInput {
          min-width: 100%;
        }

        .share {
          transform: translateX(-2rem);
          display: inline;
          line-height: 0;
          color: ${styles.secondaryColor};
          background: white;
          cursor: pointer;
          max-height: 100%;
          padding: 0.4rem;
          border-radius: 2rem;
        }
        .msg {
          padding: 0.3rem 0rem;
          color: ${styles.secondaryColor};
          font-size: 0.8rem;
        }
      `}</style>
    </>
  );
}
