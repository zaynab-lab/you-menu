import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Label from "@/components/Label";
import { styles } from "@/public/js/styles";
import Link from "next/link";
import { FaSearchDollar, FaStore } from "react-icons/fa";
import UPLayout from "@/components/Pages/EndUserPage/UPLayout";

export default function ({ setSelected }) {
  return (
    <>
      <BackButton setSelected={setSelected} select={"Options"} />
      <UPLayout className="pageContainer">
        <div className="form">
          <Label title={"full name"} />
          <Input />
          <Label title={"phone number"} />
          <Input />

          <Button content="confirm" />

          <Link href="/business">
            <div className="Bbtn">
              <div className="Bbtn-icon">
                <FaStore />
              </div>
              <div>business account</div>
            </div>
          </Link>
          <Link href="/management">
            <div className="Bbtn">
              <div className="Bbtn-icon">
                <FaSearchDollar />
              </div>
              <div>marketing account</div>
            </div>
          </Link>
        </div>
      </UPLayout>
      <style jsx>{`
        .form {
          min-width: 100%;
          ${styles.flexAligncenter}
          -webkit-box-orient:vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          max-width: 25rem;
          position: relative;
          height: -webkit-fit-content;
          height: -moz-fit-content;
          height: fit-content;
          padding-bottom: 5rem;
          overflow: scroll;
          background: white;
        }
        .Bbtn {
          width: 18rem;
          border-radius: 2rem;
          border: 1px solid ${styles.secondaryColor};
          ${styles.flexBothcenter}
          gap:1rem;
          color: ${styles.secondaryColor};
        }
        .Bbtn-icon {
          padding-top: 0.3rem;
        }
      `}</style>
    </>
  );
}
