import { useRouter } from "next/router";
import Head from "next/head";
import LogoLoader from "@/components/Loaders/LogoLoader";
import dynamic from "next/dynamic";

const Menu = dynamic(() => import("@/components/Pages/MenuPage/Menu.server"));

export default function Index() {
  const businessName = "za menu";
  const router = useRouter();
  const { businessCode } = router.query;

  return (
    <>
      <Head>
        <title>{businessName}</title>
      </Head>
      <LogoLoader />
      <Menu businessCode={businessCode} />
    </>
  );
}
