import { styles } from "@/public/js/styles";
import { useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "@/util/firebase";
import axios from "axios";
import Image from "next/image";
import { firebaseLink } from "@/util/links";

export default function Logo({
  uploading,
  businessCode,
  hasImg,
  imgLink,
  setRefreshBusiness,
  setAlert
}) {
  const [image, setImage] = useState();

  const setFile = (image, Link) => {
    const newLink = Link ? Link + 1 : 1;
    setAlert("something is going change");
    if (image) {
      const storage = getStorage(app);
      const storageRef = ref(
        storage,
        "/" + businessCode + `/Logo${newLink}.png`
      );
      uploadBytes(storageRef, image).then((snapshot) => {
        snapshot?.metadata?.name === `Logo${newLink}.png`
          ? axios
              .put(
                `/api/business/img`,
                { imgLink: newLink, businessCode: businessCode },
                { "content-type": "application/json" }
              )
              .then((res) => {
                setRefreshBusiness((refresh) => !refresh);
                res.data === "done"
                  ? setAlert("change done")
                  : setAlert("something went wrong");
              })
          : setAlert("something went wrong");
      });
    } else {
      setAlert("something went wrong");
    }
  };

  return (
    <>
      <label id="imglabel" htmlFor="imgInput">
        <div className="logo">
          {image ? (
            <img id="img" alt="" height="100%" width="100%" src={image} />
          ) : hasImg && businessCode && imgLink ? (
            <Image
              id="img"
              alt="za menu"
              width="130"
              height="130"
              loader={({ src, width }) =>
                `${
                  firebaseLink +
                  src +
                  `%2FLogo${imgLink}.png?alt=media&tr=w-${width}`
                }`
              }
              src={businessCode || "noImg"}
            />
          ) : (
            "logo"
          )}
        </div>
      </label>
      {uploading && (
        <input
          type="file"
          id="imgInput"
          onChange={(e) => {
            var file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
              reader.readyState === 2 && setImage(reader.result);
            };
            if (file && file.size < 300000) {
              reader.readAsDataURL(file);
              var blob = file.slice(0, file.size);
              var newFile = new File([blob], "file");
              setImage(newFile);
              setFile(file, imgLink);
            } else if (file && file.size > 300000) {
              setAlert("more than 300k is not allowed");
            } else {
              setImage();
              setFile();
            }
          }}
        />
      )}
      <style jsx>{`
        #imgInput {
          opacity: 0;
          position: absolute;
          z-index: -1;
          width: 5rem;
        }
        #imglabel,
        #img,
        .logo {
          width: 8rem;
          min-width: 8rem;
          height: 8rem;
          background: ${hasImg ? "white" : "#eee"};
          font-size: 3rem;
          border-radius: 2rem;
          color: ${styles.grey};
          ${styles.flexBothcenter}
          ${styles.boxshadow}
          cursor: pointer;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
