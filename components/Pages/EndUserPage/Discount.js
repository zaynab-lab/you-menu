import BackButton from "@/components/BackButton";
import UPLayout from "./UPLayout";

export default function ({ setSelected }) {
  return (
    <>
      <BackButton setSelected={setSelected} select={"Options"} />
      <UPLayout>This is Discount Page</UPLayout>

      <style jsx>{``}</style>
    </>
  );
}
