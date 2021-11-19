import Button from "@/components/Button";
import { styles } from "@/public/js/styles";
import axios from "axios";

export default function General() {
  return (
    <>
      <div className="generalContainer">
        <div>Main</div>
        <Button
          content="Update Businesses"
          color={styles.secondaryColor}
          onclick={() => {
            axios.get("/api/management/updateBusinesses");
          }}
        />
      </div>
      <style jsx>{`
        .generalContainer {
          padding: 1rem;
        }
      `}</style>
    </>
  );
}
