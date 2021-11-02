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
