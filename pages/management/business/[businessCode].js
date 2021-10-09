import { useRouter } from "next/router";
import MarketerBusinessPage from "@/components/Pages/MarketerPage/MarketerBusinessPage";

export default function MBPage() {
  const router = useRouter();
  const { businessCode } = router.query;
  return (
    <>
      <MarketerBusinessPage businessCode={businessCode} />
    </>
  );
}
