import dynamic from "next/dynamic";
const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

export default function Scan({ camera, setCamera, url, setUrl }) {
  return (
    <>
      {camera && (
        <>
          <div>scan the qr code to to verify</div>

          <QrReader
            delay={300}
            onError={(err) => console.error(err)}
            onScan={(data) => {
              data && setUrl(data);
              data === url && setCamera(false);
              data === url && console.log(url);
            }}
            style={{ width: "100%" }}
          />
        </>
      )}
    </>
  );
}
