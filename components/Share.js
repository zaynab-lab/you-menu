import Label from "@/components/Label";
import { styles } from "@/public/js/styles";
import { FaShareAlt } from "react-icons/fa";
import Input from "./Input";

export default function Share({ domain, businessCode }) {
  return (
    <>
      <div className="shareYourLink">
        <Label title={"share your link"} />

        <div className="url">
          <div className="urlInput">
            <Input
              value={`${domain}/menu/${businessCode}`}
              onchange={() => {}}
              font={"1.2rem"}
            />
          </div>

          <div
            className="share"
            onClick={() =>
              navigator.share({
                title: "url",
                text: `${domain}/menu/${businessCode}`
              })
            }
          >
            <FaShareAlt />
          </div>
        </div>
      </div>
      <style jsx>{`
        .shareYourLink {
          padding: 1rem 2rem 0.5rem 2rem;
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
      `}</style>
    </>
  );
}
