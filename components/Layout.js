import Head from "next/head";
import "@fontsource/reem-kufi";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>you menu</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="http://unpkg.com/css-font-family@1.0.6/css/css-font-family.min.css"
        />
      </Head>

      <div className="app">{children}</div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          text-decoration: unset;
          outline: none;
          -webkit-tap-highlight-color: transparent;
          -ms-scroll-chaining: none;
          overscroll-behavior: contain;
          -ms-overflow-style: none;
          scrollbar-width: none;
          font-family: "Reem Kufi";
        }

        *::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default Layout;
