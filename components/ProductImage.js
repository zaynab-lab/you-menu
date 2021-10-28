import { styles } from "@/public/js/styles";
import { useState } from "react";

export default function ProductImage({ uploading, setFile }) {
  const [image, setImage] = useState();

  return (
    <>
      <label id="imglabel" htmlFor="imgInput">
        <div className="product">
          {image ? (
            <img id="img" height="100%" width="100%" alt="" src={image} />
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
              // setFile(file);
            } else if (file && file.size > 300000) {
              alert("more than 300kB is not allowed");
            } else {
              setImage();
              // setFile("");
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
