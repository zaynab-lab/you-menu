import { app } from "@/util/firebase";
import { useState } from "react";

import { getStorage, ref, uploadBytes } from "firebase/storage";

export default function () {
  const [image, setImage] = useState("");
  return (
    <>
      <div>hello all</div>
      <input
        type="file"
        onChange={(e) => {
          e.target.files[0] && setImage(e.target.files[0]);
        }}
      />
      <button
        onClick={() => {
          const storage = getStorage(app);
          const storageRef = ref(storage, "/ldskfj" + image.name);
          uploadBytes(storageRef, image).then((snapshot) => {
            console.log("Uploaded a blob or file!");
          });
        }}
      >
        upload
      </button>
    </>
  );
}
