import { styles } from "@/public/js/styles";

export default function Input({ value, onblur, onchange, font }) {
  return (
    <>
      <div className="textAreaContainer">
        <textarea
          className="textArea"
          value={value}
          onKeyPress={(e) => {
            e.which === 13 && e.target.blur();
          }}
          onChange={onchange}
          onBlur={onblur && onblur}
          autoComplete="none"
        />
      </div>

      <style jsx>
        {`
          .textAreaContainer {
            ${styles.boxshadow}
            height:-webkit-fit-content;
            height: -moz-fit-content;
            height: fit-content;
            border-radius: 0.5rem;
          }

          .textArea {
            border: none;
            border-radius: 0.5rem;
            font-size: ${font ? font : "1.8rem"};
            max-width: 22rem;
            width: 100%;
            padding: 0 0.5rem;
          }
        `}
      </style>
    </>
  );
}
