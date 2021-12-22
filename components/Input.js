import { styles } from "@/public/js/styles";

export default function Input({
  value,
  onblur,
  onchange,
  type,
  placeholder,
  font
}) {
  return (
    <>
      <div className="input-container">
        <input
          className="input"
          type={type}
          value={value}
          onKeyPress={(e) => {
            e.which === 13 && e.target.blur();
          }}
          onChange={onchange}
          onBlur={onblur && onblur}
          placeholder={placeholder}
          autoComplete="none"
        />
      </div>
      <style jsx>
        {`
          .input-container {
            ${styles.boxshadow}
            height:-webkit-fit-content;
            height: -moz-fit-content;
            height: fit-content;
            border-radius: 0.5rem;
          }
          .input {
            border: none;
            border-radius: 0.5rem;
            font-size: ${font || "1.8rem"};
            max-width: 22rem;
            width: 100%;
            padding: 0 0.5rem;
          }
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type="number"] {
            -moz-appearance: textfield;
          }
        `}
      </style>
    </>
  );
}
