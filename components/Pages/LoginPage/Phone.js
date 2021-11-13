import { styles } from "@/public/js/styles";
import { countries } from "@/util/countryCode";

export default function Phone({
  waiting,
  phone,
  setPhone,
  setMsg,
  label = "phone number",
  setCcode
}) {
  const handleChange = (e) => {
    setMsg(" ");
    if (phone === "") {
      e.target.value !== "0" && setPhone(e.target.value);
      e.target.value === "0" && setMsg("start number whithout zero");
    } else {
      setPhone(e.target.value);
    }
  };
  return (
    <>
      <div className="label">{label}</div>
      <div className="main-container">
        <div className="input-container">
          <select
            className="select"
            onChange={(e) => setCcode(e.target.value)}
            disabled={waiting}
          >
            {countries.map((country, i) => (
              <option key={i} value={country.usedCode}>
                {country.flag + " " + country.dial_code}
              </option>
            ))}
          </select>
        </div>
        <div className="input-container">
          <input
            type="number"
            onChange={(e) => handleChange(e)}
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
