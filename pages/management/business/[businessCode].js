import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const MarketerBusinessPage = dynamic(
  import("@/components/Pages/MarketerPage/MarketerBusinessPage")
);

export default function MBPage() {
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);
  const [business, setBusiness] = useState({});
  const { businessCode } = router.query;

  useEffect(
    () =>
      axios.get(`/api/business?businessCode=${businessCode}`).then((res) => {
        res.data && setBusiness(res.data);
      }),
    [businessCode, refresh]
  );

  return (
    <>
      <MarketerBusinessPage
        refresh={refresh}
        setRefresh={setRefresh}
        business={business}
      />
    </>
  );
}
