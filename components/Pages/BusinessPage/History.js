import BackButton from "@/components/BackButton";

export default function History({ setSelected }) {
  return (
    <>
      <BackButton setSelected={setSelected} />
      <div>I am history page</div>
      <style jsx>{``}</style>
    </>
  );
}
