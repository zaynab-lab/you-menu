import { styles } from "@/public/js/styles";

export default function Arrow() {
  return (
    <svg
      width="20"
      height="30"
      viewBox="0 0 32 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="4.32167"
        y1="19.0439"
        x2="21.8215"
        y2="4.35979"
        stroke={styles.secondaryColor}
        stroke-width="6"
        stroke-linecap="round"
      />
      <line
        x1="5.38616"
        y1="20.0342"
        x2="22.4704"
        y2="34.3696"
        stroke={styles.secondaryColor}
        stroke-width="6"
        stroke-linecap="round"
      />
    </svg>
  );
}
