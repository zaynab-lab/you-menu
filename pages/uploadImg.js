import { app } from "@/util/firebase";
import { useState } from "react";

import { getStorage, ref, uploadBytes } from "firebase/storage";

export default function () {
  const [image, setImage] = useState("");
  const firebaseLink =
    "https://firebasestorage.googleapis.com/v0/b/za-menu-images.appspot.com/o/";

  const businessCode = "adkjfd";
  const productName = "water";
  console.log(`${firebaseLink + businessCode}%2Fwater.png?alt=media`);
  return (
    <>
      <div>hello all</div>
      <input
        type="file"
        onChange={(e) => {
          e.target.files[0] && setImage(e.target.files[0]);
        }}
        accept="image/png, image/jpg, image/jpeg"
      />
      <button
        onClick={() => {
          const storage = getStorage(app);
          const storageRef = ref(
            storage,
            "/" + businessCode + `/${productName}.png`
          );
          uploadBytes(storageRef, image).then((snapshot) => {
            console.log(snapshot);
          });
        }}
      >
        upload
      </button>
      <img
        width="200px"
        alt=""
        src={`${firebaseLink + businessCode}%2F${productName}.png?alt=media`}
      />
    </>
  );
}
