import { useRouter } from "next/dist/client/router";

export async function getServerSideProps() {
  const response = await fetch("https://royo3.sse.codesandbox.io/api/test");
  const data = await response.json();
  return {
    props: { test: data.hello }
  };
}

export default function page({ test }) {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <>
      Hiii {test}
      <div onClick={() => refreshData()}>refresh</div>
    </>
  );
}
