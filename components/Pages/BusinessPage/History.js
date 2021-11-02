import BackButton from "@/components/BackButton";
import BPLayout from "@/components/Pages/BusinessPage/BPLayout";

export default function History({ setSelected }) {
  return (
    <>
      <BackButton setSelected={setSelected} select={"More"} />
      <BPLayout>I am History page</BPLayout>
      <style jsx>{``}</style>
    </>
  );
}
