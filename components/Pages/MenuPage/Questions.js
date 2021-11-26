import Button from "@/components/Button";
import { styles } from "@/public/js/styles";

export default function Questions({ content, setState, yes, no }) {
  return (
    <>
      <div className="question">
        {content}

        <div className="btns">
          <Button
            content="no"
            onclick={() => {
              setState(no);
            }}
            noLoading={true}
          />
          <Button
            content="yes"
            onclick={() => {
              setState(yes);
            }}
            noLoading={true}
          />
        </div>
      </div>
      <style jsx>{`
        .btns {
          ${styles.flexBothcenter}
          gap:1rem;
        }

        .question {
          color: black;
          text-align: center;
          padding-top: 2rem;
        }
      `}</style>
    </>
  );
}
