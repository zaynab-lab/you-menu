import BackButton from "@/components/BackButton";
import UPLayout from "./UPLayout";
export default function ({ setSelected }) {
  return (
    <>
      <BackButton setSelected={setSelected} select={"Options"} />
      <UPLayout className="pageContainer">This is Order History Page</UPLayout>
      <style jsx>{``}</style>
    </>
  );
}
