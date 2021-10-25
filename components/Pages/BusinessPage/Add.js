import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import { styles } from "@/public/js/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import Categories from "./Categories";

export default function Add({ back, businessCode }) {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([0, 0, 0]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    axios.get(`/api/categories?businessCode=${businessCode}`).then((res) => {
      Array.isArray(res.data) && setCategories(res.data);
    });
  }, [businessCode, refresh]);
  return (
    <>
      <div className="addPage">
        {back && <BackButton back={back} />}
        <div className="addCategory">
          <div className="inputplus">
            <Input
              value={category}
              onchange={(e) => setCategory(e.target.value)}
              placeholder="new category"
              font="1.4rem"
            />
            <div
              className="plus"
              onClick={() => {
                setCategories([...categories, 0]);
                axios
                  .post(
                    "/api/categories",
                    { category, businessCode },
                    { "content-type": "application/json" }
                  )
                  .then((res) => {
                    res.data === "done" && setCategory("");
                    res.data === "done" && setRefresh(!refresh);
                  });
              }}
            >
              +
            </div>
          </div>
        </div>
        <Categories categories={categories} businessCode={businessCode} />
      </div>
      <style>{`
        .addPage{
          padding-top:.2rem;
          padding-bottom:1rem;
        }
        .addCategory{
          padding:1rem;
          padding-left:${back ? "4.6rem" : "2rem"};
          border-bottom:1px solid ${styles.secondaryColor}
        }
        .inputplus{
          ${styles.flexBothcenter};
          position:relative;
          width:100%;
        }
        .plus{
          width:2rem;
          height:2rem;
          font-size:2.6rem;
          padding-bottom:.5rem;
          transform:translateX(-2rem);
          z-index:5;
          cursor:pointer;
          color:${styles.secondaryColor};
          ${styles.flexBothcenter}
        }
      `}</style>
    </>
  );
}
