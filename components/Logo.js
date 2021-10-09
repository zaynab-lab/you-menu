import { styles } from "@/public/js/styles";

export default function Logo() {
  return (
    <>
      <div className="logo">logo</div>
      <style jsx>{`
        .logo {
          width: 8rem;
          height: 8rem;
          background: #eee;
          font-size: 3rem;
          border-radius: 2rem;
          color: ${styles.grey};
          ${styles.flexBothcenter}
          ${styles.boxshadow}
        }
      `}</style>
    </>
  );
}
