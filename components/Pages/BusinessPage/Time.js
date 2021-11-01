import BackButton from "@/components/BackButton";
import BPLayout from "./BPLayout";

export default function Time({ setSelected }) {
  return (
    <>
      <BackButton setSelected={setSelected} select="More" />
      <BPLayout>I am Time page</BPLayout>
      <style jsx>{``}</style>
    </>
  );
}
