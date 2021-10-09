export default function Add({ color }) {
  return (
    <>
      <svg
        width="55"
        height="55"
        viewBox="0 0 57 57"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="28.5" cy="28.5" r="28.5" fill={color} />

        <line
          x1="16"
          y1="28"
          x2="42"
          y2="28"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
        />

        <line
          x1="29"
          y1="42"
          x2="29"
          y2="16"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
}
