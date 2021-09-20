import { styles } from "../../../public/js/styles";

export default function ({ waiting, phone, setPhone }) {
  return (
    <>
      <div className="label">phone number</div>
      <div className="main-container">
        <div className="input-container">
          <select className="select" disabled={waiting}>
            <option>{"🇱🇧 +961"}</option>
            <option>{"🇨🇦 +1"}</option>
          </select>
        </div>
        <div className="input-container">
          <input
            type="number"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            className="input"
            disabled={waiting}
          />
        </div>
      </div>
      <style>{`
      .label{
        font-size:1.2rem;
        margin:.5rem 0 .2rem 0;
        width:100%;
        align-text:left;
        max-width:25rem;
      }
      .main-container{
        ${styles.flexAligncenter}
        gap:.5rem;
        max-width:25rem;
      }
      .select{
        background:white;
        border:none;
        height:2.8rem;
        font-size:1.2rem;
        border-radius:.5rem;
      }
      .input-container{
        ${styles.boxshadow}
        height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;
        border-radius:.5rem;
      }
      .input{
        border:none;
        border-radius:.5rem;
        font-size:2rem;
        max-width:100%;
        width:100%;
        padding: 0 .5rem;
      }
      `}</style>
    </>
  );
}
