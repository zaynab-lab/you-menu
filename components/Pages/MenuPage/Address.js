import Button from "@/components/Button";
import Input from "@/components/Input";
import Label from "@/components/Label";
import Location from "@/components/Location";
import { styles } from "@/public/js/styles";
import axios from "axios";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

export default function Address({ user, options }) {
  const [addressModal, setAddressModal] = useState(false);
  const [address, setAddress] = useState("");
  const [selectAddress, setSelectedAddress] = useState({});
  const [edit, setEdit] = useState(false);
  return (
    <>
      <div className="addressContainer">
        {user?.addresses?.length > 0 ? (
          <select
            className="selectAddress"
            onChange={(e) => {
              setAddress(e.target.value);
              setSelectedAddress(
                ...user?.addresses.filter(
                  (address) => address.content === e.target.value
                )
              );
            }}
          >
            <option value="">choose address</option>
            {user?.addresses
              .filter((address) => !address.deleted)
              .map((address, i) => (
                <option key={i} value={address?.content}>
                  {address?.content}
                </option>
              ))}
          </select>
        ) : (
          <div>add address</div>
        )}
        <Button
          content="add address"
          onclick={() => {
            setEdit(false);
            setAddress("");
            setAddressModal(true);
          }}
          noLoading={true}
        />
      </div>
      {options && !!address && (
        <div className="btnContainer">
          <div
            className="remove"
            onClick={() =>
              axios.put(
                "/api/users/deleteAddress",
                { address },
                { "content-type": "application/json" }
              )
            }
          >
            delete address
          </div>
          <Button
            content="edit address"
            onclick={() => {
              setEdit(true);
              setAddressModal(true);
            }}
            noLoading={true}
          />
        </div>
      )}
      <AddressModal
        addressModal={addressModal}
        setAddressModal={setAddressModal}
        setAddress={setAddress}
        selectAddress={selectAddress}
        address={address}
        edit={edit}
      />

      <style jsx>{`
        .addressContainer {
          width: 100%;
          max-width: 22rem;
          padding-top: 0.4rem;
          ${styles.flexAligncenter}
          -webkit-box-pack:justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          gap: 0.3rem;
        }
        .btnContainer {
          ${styles.flexAligncenter}
          gap: 2rem;
          -webkit-transform: translateY(-1rem);
          -ms-transform: translateY(-1rem);
          transform: translateY(-1rem);
        }
        .selectAddress {
          padding: 0.2rem;
          background: white;
          width: 100%;
          font-size: 1.2rem;
          border-radius: 0.4rem;
        }
        .remove {
          color: ${styles.secondaryColor};
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
export function AddressModal({
  address,
  setAddress,
  addressModal,
  selectAddress,
  setAddressModal,
  edit
}) {
  return (
    <>
      <div className={addressModal ? "showAddressModal" : "addressModal"}>
        <div className="addressContainer">
          <div className="Xheader">
            <div>add address</div>
            <div
              className="X"
              onClick={() => {
                setAddressModal(false);
              }}
            >
              x
            </div>
          </div>
          <div className="addressBody">
            <Label title={"full address"} />
            <div className="addressInput">
              <Input
                value={address}
                onchange={(e) => setAddress(e.target.value)}
              />
              <div
                className="addressCheck"
                onClick={() => {
                  edit && !!address
                    ? axios.put(
                        "/api/users/editAddress",
                        { address, addressId: selectAddress?._id },
                        { "content-type": "application/json" }
                      )
                    : axios.put(
                        "/api/users/address",
                        { address },
                        { "content-type": "application/json" }
                      );
                }}
              >
                <FaCheck />
              </div>
            </div>
            <div className="location">
              <Location />
            </div>
            <div className="btn">
              <Button content="done" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .addressModal {
          width: 100vw;
          height: 100vh;
          position: fixed;
          top: 0;
          right: 0;
          z-index: -1;
          opacity: 0;
          ${styles.flexBothcenter};
          ${styles.flexColumn};
          -webkit-transition: all 0.5s ease-in-out;
          -o-transition: all 0.5s ease-in-out;
          transition: all 0.5s ease-in-out;
          background: #2222;
        }

        .showAddressModal {
          width: 100vw;
          height: 100vh;
          position: fixed;
          top: 0;
          right: 0;
          z-index: 100;
          opacity: 1;
          ${styles.flexBothcenter};
          ${styles.flexColumn};
          -webkit-transition: all 0.5s ease-in-out;
          -o-transition: all 0.5s ease-in-out;
          transition: all 0.5s ease-in-out;
          background: #2222;
        }

        .addressContainer {
          width: 22rem;
          max-height: 90vh;
          border: 1px solid ${styles.secondaryColor};
          background: white;
          border-radius: 0.7rem;
          padding: 0.5rem;
          ${styles.boxshadow}
          overflow:auto;
        }

        .Xheader {
          padding: 0 1rem;
          text-align: right;
          width: 100%;
          font-size: 1.2rem;
          ${styles.flexAligncenter};
          -webkit-box-pack: space-between;
          -ms-flex-pack: space-between;
          justify-content: space-between;
        }
        .X {
          cursor: pointer;
          font-size: 1.6rem;
          text-align: left;
        }
        .addressBody {
          padding: 1rem;
        }
        .addressInput {
          ${styles.flexAligncenter}
          position: relative;
        }
        .addressCheck {
          width: 3rem;
          height: 100%;
          position: absolute;
          right: 0;
          ${styles.flexBothcenter};
          color: green;
          border-radius: 0.5rem;
          cursor: pointer;
          background: white;
        }
        .location {
          padding-top: 2rem;
          padding-bottom: 1rem;
        }
        .btn {
          width: 100%;
          text-align: center;
        }
      `}</style>
    </>
  );
}
