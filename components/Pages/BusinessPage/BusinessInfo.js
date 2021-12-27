import { styles } from "@/public/js/styles";
import Logo from "@/components/Logo";
import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import Label from "@/components/Label";
import { useEffect, useState } from "react";
import {
  FaDollarSign,
  FaIdCard,
  FaLocationArrow,
  FaSignOutAlt
} from "react-icons/fa";
import axios from "axios";
import Router from "next/router";
import Alert from "@/components/Alert";
import BPLayout from "./BPLayout";
import dynamic from "next/dynamic";
import TitleLine from "@/components/TitleLine";
import Onoff from "@/components/Onoff";

const Location = dynamic(() => import("@/components/Location"));

const BusinessTypes = [
  "cafe",
  "resturant",
  "resto cafe",
  "store",
  "retail",
  "online",
  "others"
];
const Currency = ["USD", "LBP", "AED", "OMR", "CAD"];

export default function BusinessInfo({
  setSelected,
  setAuth,
  back,
  business,
  setRefreshBusiness
}) {
  const [brandName, setBrandName] = useState(business?.brand?.name);
  const [businessType, setBusinessType] = useState(
    business?.businessType || "cafe"
  );
  const [exRate, setExRate] = useState(business?.exRate);
  const [currency, setCurrency] = useState(business?.currency);
  const [defaultCurrency, setDefaultCurrency] = useState();
  const [addressContent, setAddressContent] = useState(
    business?.address?.content
  );
  const [alert, setAlert] = useState("");
  const [useExchange, setUseExchange] = useState(business?.useExchange);
  const [onlyTarget, setOnlyTarget] = useState(business?.onlyTarget);

  useEffect(() => {
    !!business &&
      axios
        .get(`/api/business/getCurrency?businessCode=${business.businessCode}`)
        .then((res) => {
          res?.data?.defaultCurrency &&
            setDefaultCurrency(res?.data?.defaultCurrency || "USD");
          res?.data?.currency && setCurrency(res?.data?.currency || "USD");
        });
  }, [business]);

  const handleOnBlur = (value, business, state, v2) => {
    if (v2) {
      business?.[v2]?.[value] !== state &&
        setAlert("something is going change");
      business?.[v2]?.[value] !== state &&
        axios
          .put(
            `/api/business/${value}`,
            { [value]: state, businessCode: business?.businessCode },
            { "content-type": "application/json" }
          )
          .then((res) => {
            res.data === "done"
              ? setAlert("change done")
              : setAlert("something went wrong");
            setRefreshBusiness((refresh) => !refresh);
          });
    } else {
      business?.[value] !== state && setAlert("something is going change");
      business?.[value] !== state &&
        axios
          .put(
            `/api/business/${value}`,
            { [value]: state, businessCode: business?.businessCode },
            { "content-type": "application/json" }
          )
          .then((res) => {
            res.data === "done"
              ? setAlert("change done")
              : setAlert("something went wrong");
            setRefreshBusiness((refresh) => !refresh);
          });
    }
  };

  return (
    <>
      <BackButton setSelected={setSelected} back={back} select={"More"} />
      <BPLayout setSelected={setSelected}>
        <div className="logoContainer">
          <Logo
            uploading={true}
            businessCode={business?.businessCode}
            hasImg={business?.brand?.hasImg}
            imgLink={business?.brand?.imgLink}
            setRefreshBusiness={setRefreshBusiness}
            alert={alert}
            setAlert={setAlert}
          />
        </div>
        <TitleLine icon={<FaIdCard />} title={"profile"} />
        <Label title={"brand name"} />
        <Input
          value={brandName}
          onblur={() => handleOnBlur("name", business, brandName, "brand")}
          onchange={(e) => setBrandName(e.target.value)}
        />
        <Label title={"business type"} />
        <select
          className="selectBusiness"
          value={businessType}
          onChange={(e) => {
            handleOnBlur("businessType", business, e.target.value);
            setBusinessType(e.target.value);
          }}
        >
          {BusinessTypes.map((type, i) => (
            <option key={i} value={type}>
              {type}
            </option>
          ))}
        </select>
        <Label title={"owner number"} />
        <Input value={business?.ownerNumber} onchange={() => {}} />

        <TitleLine icon={<FaDollarSign />} title={"currency"} />
        <div className="useExchange">
          use exchange
          <Onoff
            on={useExchange}
            setOn={() => {
              setUseExchange(!useExchange);
              handleOnBlur("useExchange", business, !useExchange);
            }}
            noText={true}
          />
        </div>

        <Label title={"default currency"} />
        <div className="defCurrency">
          <div className="currencNote">
            set default currency to price your products and services in this
            currency.
          </div>
          <SelectCurrency
            business={business}
            currency={defaultCurrency}
            setCurrency={setDefaultCurrency}
            handleOnBlur={handleOnBlur}
            api="defCurrency"
          />
        </div>

        {useExchange && (
          <>
            <Label title={"exchange rate"} />
            <div className="currency">
              <Input
                value={exRate}
                onchange={(e) => setExRate(e.target.value)}
                onblur={() => handleOnBlur("exRate", business, exRate)}
              />
              <SelectCurrency
                business={business}
                currency={currency}
                setCurrency={setCurrency}
                handleOnBlur={handleOnBlur}
                api="currency"
              />
            </div>
            <div className="onlyTarget">
              only target currncy
              <Onoff
                on={onlyTarget}
                setOn={() => {
                  setOnlyTarget(!onlyTarget);
                  handleOnBlur("onlyTarget", business, !onlyTarget);
                }}
                noText={true}
              />
            </div>
          </>
        )}

        {/* Location */}
        <TitleLine icon={<FaLocationArrow />} title={"address"} />
        <Label title={"full address"} />
        <Input
          value={addressContent}
          onchange={(e) => setAddressContent(e.target.value)}
          onblur={() =>
            handleOnBlur("content", business, addressContent, "address")
          }
        />
        <Label title={"location"} />
        <Location />
        {back ? (
          <div className="after"></div>
        ) : (
          <div
            className="signout"
            onClick={() =>
              axios
                .post("/api/auth/Logout")
                .then((res) => res.data === "done" && Router.push("/"))
                .then(() => setAuth(false))
            }
          >
            <div>Log out</div>
            <div className="signoutIcon">
              <FaSignOutAlt />
            </div>
          </div>
        )}
        <Alert alert={alert} setAlert={setAlert} />
      </BPLayout>
      <style jsx>{`
        .logoContainer {
          padding: 1rem;
          ${styles.flexJustifycenter}
        }
        .signout {
          color: ${styles.secondaryColor};
          font-size: 1.2rem;
          ${styles.flexBothcenter}
          cursor: pointer;
          padding: 2rem;
        }
        .signoutIcon {
          transform: translate(0.5rem, 0.2rem);
        }
        .selectBusiness {
          background: white;
          border: none;
          height: 2.8rem;
          font-size: 1.2rem;
          border-radius: 0.5rem;
          width: 100%;
          max-width: 22rem;
          padding: 0 0.5rem;
          ${styles.boxshadow}
        }
        .useExchange {
          width: 100%;
          max-width: 22rem;
          padding-top: 1rem;
          font-size: 1.2rem;
          ${styles.flexAligncenter}
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
        }
        .onlyTarget {
          width: 100%;
          max-width: 22rem;
          padding-top: 2rem;
          font-size: 1.2rem;
          ${styles.flexAligncenter}
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
        }
        .currency {
          max-width: 22rem;
          width: 100%;
          ${styles.flexBothcenter}
          gap: 1rem;
        }
        .defCurrency {
          max-width: 22rem;
          width: 100%;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          gap: 1rem;
        }
        .currencNote {
          padding-top: 0.2rem;
          font-size: 0.8rem;
          color: ${styles.secondaryColor};
          line-height: 0.8rem;
          text-align: justify;
          text-justify: inter-word;
        }
        .after {
          padding-bottom: 4rem;
        }
      `}</style>
    </>
  );
}

export function SelectCurrency({
  business,
  currency,
  setCurrency,
  handleOnBlur,
  api
}) {
  return (
    <>
      <select
        className="selectCurrency"
        value={currency}
        onChange={(e) => {
          setCurrency(e.target.value);
          handleOnBlur(api, business, e.target.value);
        }}
      >
        {Currency.map((unit, j) => (
          <option key={j} value={unit}>
            {unit}
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
