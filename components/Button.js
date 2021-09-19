export default function ({ content, onclick }) {
  return (
    <>
      <button className="button" onClick={onclick}>
        {content}
      </button>
      <style>{`
      .button{
        padding:.3rem .8rem;
        border:1px solid black;
        border-radius:.5rem;
        background:white;
        font-size:1.2rem;
        cursor:pointer;
        margin:1rem 0;
      }
      `}</style>
    </>
  );
}
