import Button from "@/components/Button";
import { styles } from "@/public/js/styles";

export default function Questions({ content, setState, Q }) {
  return (
    <>
      <div className="question">
        {content}

        <div className="btns">
          <Button
            content="no"
            onclick={() => {
              setState((state) => ({ ...state, [Q]: "no" }));
            }}
          />
          <Button
            content="yes"
            onclick={() => {
              setState((state) => ({ ...state, [Q]: "yes" }));
            }}
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
