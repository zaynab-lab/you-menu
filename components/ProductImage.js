import { styles } from "@/public/js/styles";
import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "@/util/firebase";
import axios from "axios";

export default function ProductImage({
  uploading,
  businessCode,
  setAlert,
  setRefreshProducts,
  state
}) {
  const [image, setImage] = useState();

  useEffect(() => {
    setImage();
  }, [state]);

  const firebaseLink =
    "https://firebasestorage.googleapis.com/v0/b/za-menu-images.appspot.com/o/";

  const uploadImg = (image, Link, businessCode, productID) => {
    const newLink = Link ? Link + 1 : 1;
    if (image) {
      const storage = getStorage(app);
      const storageRef = ref(
        storage,
        "/" + businessCode + `/${productID + newLink}.png`
      );
      uploadBytes(storageRef, image).then((snapshot) => {
        console.log(snapshot?.metadata?.name);

        snapshot?.metadata?.name === `${productID + newLink}.png`
          ? axios
              .put(
                `/api/products/img`,
                {
                  hasImg: true,
                  imgLink: newLink,
                  businessCode: businessCode,
                  productID
                },
                { "content-type": "application/json" }
              )
              .then((res) => {
                setRefreshProducts((refresh) => !refresh);
                res.data === "done"
                  ? setAlert("change done")
                  : setAlert("something went wrong");
              })
          : setAlert("something went wrong");
      });
    } else {
      setAlert("no change will happen");
      setRefreshProducts((refresh) => !refresh);
    }
  };

  return (
    <>
      <label id="imglabel" htmlFor="imgInput">
        <div className="product">
          {image ? (
            <img id="img" height="100%" width="100%" alt="" src={image} />
          ) : state?.hasImg ? (
            <img
              id="img"
              alt=""
              height="100%"
              width="100%"
              src={`${
                firebaseLink +
                businessCode +
                `%2F${state?._id + state?.imgLink}.png?alt=media`
              }`}
            />
          ) : (
            "product"
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
              uploadImg(file, state?.imgLink, businessCode, state?._id);
            } else if (file && file.size > 300000) {
              setAlert("more than 300k is not allowed");
            } else {
              setImage();
              uploadImg();
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
        .product {
          width: 7rem;
          min-width: 7rem;
          height: 7rem;
          background: #eee;
          font-size: 1.7rem;
          border-radius: 2rem;
          color: ${styles.grey};
          ${styles.flexBothcenter}
          ${styles.boxshadow}
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
