export default function Label({ title }) {
  return (
    <>
      <div className="label">{title}</div>

      <style jsx>{`
        .label {
          font-size: 1.2rem;
          margin: 0.5rem 0 0.2rem 0;
          width: 100%;
          align-text: left;
          max-width: 25rem;
        }
      `}</style>
    </>
  );
}
