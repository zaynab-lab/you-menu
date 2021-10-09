import { useRouter } from "next/router";

export default function Menu() {
  const router = useRouter();
  const { businessCode } = router.query;
  return <>I am the menu of the business with code{businessCode}</>;
}
