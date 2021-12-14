import Button from "@/components/Button";
import TextArea from "@/components/TextArea";
import Label from "@/components/Label";
import { styles } from "@/public/js/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowCircleRight, FaTrashAlt } from "react-icons/fa";
import dynamic from "next/dynamic";

const Location = dynamic(() => import("@/components/Location"));

export default function Address({
  user,
  options,
  setOrderAddress,
  setRefreshUser,
  setAlert
}) {
  const [selectAddress, setSelectedAddress] = useState({});
  const [addressModal, setAddressModal] = useState(false);
  const [addressId, setAddressId] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    !!user && setAddressId("");
  }, [user]);

  useEffect(() => {
    setOrderAddress && setOrderAddress(selectAddress);
  }, [selectAddress, setOrderAddress]);

  return (
    <>
      <div className="addressContainer">
        {user?.addresses?.length > 0 ? (
          <select
            className="selectAddress"
            value={!!addressId && user?.addresses[addressId]}
            onChange={(e) => {
              setAddressId(e.target.value);
              setSelectedAddress(
                ...user?.addresses.filter(
                  (address) => address._id === e.target.value
                )
              );
            }}
          >
            <option value="">choose address</option>
            {user?.addresses
              ?.filter((address) => !address.deleted)
              .map((address, i) => (
                <option key={i} value={address?._id}>
                  {address?.content}
                </option>
              ))}
          </select>
        ) : (
          <div className="adadres">
            <div>add address</div> <FaArrowCircleRight />
          </div>
        )}
        <Button
          content="add address"
          onclick={() => {
            setEdit(false);
            setAddressId("");
            setAddressModal(true);
          }}
          noLoading={true}
        />
      </div>
      {options && !!addressId && (
        <div className="optionbtnContainer">
          <div
            className="remove"
            onClick={() =>
              axios
                .put(
                  "/api/users/deleteAddress",
                  { addressId },
                  { "content-type": "application/json" }
                )
                .then((res) => {
                  res.data === "done"
                    ? setAlert("remove done")
                    : setAlert("something went wrong");
                  setRefreshUser((refresh) => !refresh);
                })
            }
          >
            <div className="trash">
              <FaTrashAlt />
            </div>
            <div>delete address</div>
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
        selectAddress={selectAddress}
        addressId={addressId}
        edit={edit}
        addresses={user?.addresses}
        setRefreshUser={setRefreshUser}
        setAlert={setAlert}
      />

      <style jsx>{`
        .addressContainer {
          width: 100%;
          max-width: 22rem;
          padding-top: 0.4rem;
          ${styles.flexAligncenter}
          ${styles.justifyBetween}
          gap: 0.3rem;
        }
        .optionbtnContainer {
          width: 100%;
          max-width: 22rem;
          padding-left: 0.5rem;
          ${styles.flexAligncenter}
          ${styles.justifyBetween}
          white-space: nowrap;
          -webkit-transform: translateY(-1rem);
          -ms-transform: translateY(-1rem);
          transform: translateY(-1rem);
        }
        .adadres {
          gap: 1rem;
          color: ${styles.secondaryColor};
          ${styles.flexAligncenter};
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
          gap: 0.5rem;
          ${styles.flexAligncenter}
        }
        .trash {
          padding-top: 0.3rem;
        }
      `}</style>
    </>
  );
}
export function AddressModal({
  addressId,
  addressModal,
  setAddressModal,
  addresses,
  selectAddress,
  setRefreshUser,
  setAlert,
  edit
}) {
  const [address, setAddress] = useState();

  useEffect(() => {
    !!addressId
      ? setAddress(
          addresses?.filter((address) => address._id === addressId)[0].content
        )
      : setAddress("");
  }, [addressId, addresses]);
  return (
    <>
      <div className={addressModal ? "showAddressModal" : "addressModal"}>
        <div className="modalAddressContainer">
          <div className="Xheader">
            <div>{edit ? "edit" : "add"} address</div>
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
              <TextArea
                font={"1rem"}
                value={address}
                onchange={(e) => setAddress(e.target.value)}
                onblur={() => {
                  edit
                    ? address !== selectAddress?.content &&
                      setAlert("something is going to change")
                    : setAlert("something is going to change");
                  edit && !!addressId
                    ? !!address &&
                      address !== selectAddress?.content &&
                      axios
                        .put(
                          "/api/users/editAddress",
                          { address, addressId },
                          { "content-type": "application/json" }
                        )
                        .then((res) => {
                          setAddressModal(false);
                          res.data === "done" &&
                            setRefreshUser((refresh) => !refresh);
                          res.data === "done"
                            ? setAlert("change done")
                            : setAlert("something went wrong");
                        })
                    : !!address &&
                      axios
                        .put(
                          "/api/users/addAddress",
                          { address },
                          { "content-type": "application/json" }
                        )
                        .then((res) => {
                          setAddressModal(false);
                          res.data === "done" &&
                            setRefreshUser((refresh) => !refresh);
                          res.data === "done"
                            ? setAlert("change done")
                            : setAlert("something went wrong");
                        });
                }}
              />
            </div>
            <div className="location">{/* <Location /> */}</div>

            <div className="btn">
              <Button
                content="done"
                onclick={() => {
                  setAddressModal(false);
                }}
              />
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

        .modalAddressContainer {
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
          ${styles.userSelect}
        }
        .addressBody {
          padding: 1rem;
        }
        .addressInput {
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
