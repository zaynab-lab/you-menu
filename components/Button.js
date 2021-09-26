export default function Button({ content, onclick, color }) {
  return (
    <>
      <button
        className={`button ${color ? "color" : "black"}`}
        onClick={onclick}
      >
        {content}
      </button>
      <style>{`
      .button{
        padding:.2rem .8rem;
        border:1px solid black;
        border-radius:.5rem;
        background:white;
        font-size:1.2rem;
        cursor:pointer;
        margin:1rem 0;
      }
      .color{
        border:1px solid ${color};
        color: ${color}
      }
      `}</style>
    </>
  );
}
