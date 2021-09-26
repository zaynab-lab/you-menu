import { styles } from "@/public/js/styles";

export default function Input({ value, onchange, type }) {
  return (
    <>
      <div className="input-container">
        <input
          className="input"
          type={type}
          value={value}
          onChange={onchange}
        />
      </div>
      <style>
        {`
        .input-container{
          ${styles.boxshadow}
          height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;
          border-radius:.5rem;
          }
          .input{
          border:none;
          border-radius:.5rem;
          font-size:2rem;
          max-width:25rem;
          width:100%;
          padding: 0 .5rem;
          }
          `}
      </style>
    </>
  );
}
