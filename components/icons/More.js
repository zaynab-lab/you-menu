export default function More({ color }) {
  return (
    <>
      <svg
        width="32"
        height="22"
        viewBox="0 0 32 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 1C0 0.447715 0.447715 0 1 0H31C31.5523 0 32 0.447715 32 1C32 1.55228 31.5523 2 31 2H1C0.447715 2 0 1.55228 0 1Z"
          fill={color}
        />

        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 11C0 10.4477 0.447715 10 1 10H31C31.5523 10 32 10.4477 32 11C32 11.5523 31.5523 12 31 12H1C0.447715 12 0 11.5523 0 11Z"
          fill={color}
        />

        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 21C0 20.4477 0.447715 20 1 20H31C31.5523 20 32 20.4477 32 21C32 21.5523 31.5523 22 31 22H1C0.447715 22 0 21.5523 0 21Z"
          fill={color}
        />
      </svg>
    </>
  );
}
