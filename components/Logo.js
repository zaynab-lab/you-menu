import { styles } from "@/public/js/styles";
import { useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "@/util/firebase";

export default function Logo({ uploading, businessCode, hasImg }) {
  const [image, setImage] = useState();

  const firebaseLink =
    "https://firebasestorage.googleapis.com/v0/b/za-menu-images.appspot.com/o/";

  const setFile = (image) => {
    if (image) {
      const storage = getStorage(app);
      const storageRef = ref(storage, "/" + businessCode + "/Logo.png");
      uploadBytes(storageRef, image).then((snapshot) => {
        console.log(snapshot);
      });
    }
  };

  return (
    <>
      <label id="imglabel" htmlFor="imgInput">
        <div className="logo">
          {image ? (
            <img id="img" alt="" height="100%" width="100%" src={image} />
          ) : hasImg ? (
            <img
              id="img"
              alt=""
              height="100%"
              width="100%"
              src={`${firebaseLink + businessCode + "%2FLogo.png?alt=media"}`}
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
              setFile(file);
            } else if (file && file.size > 300000) {
              alert("more than 300kB is not allowed");
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
          background: #eee;
          font-size: 3rem;
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
