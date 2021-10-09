import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import { styles } from "@/public/js/styles";
import { useState } from "react";
import Categories from "./Categories";
const categories = [
  {
    name: "shakes",
    items: [
      {
        name: "milkshake",
        price: "2",
        default: "banana,milk",
        toAdd: [
          { name: "banana", level: 2 },
          { name: "suger", level: 2 }
        ],
        options: [{ colors: [] }, { size: [] }]
      },
      {
        name: "choclate shake",
        price: "2",
        default: "choclate,banana,milk",
        toAdd: [
          { name: "banana", level: 2 },
          { name: "suger", level: 2 }
        ],
        options: [{ colors: [] }, { size: [] }]
      },
      {
        name: "milkshake",
        price: "2",
        default: "banana,milk",
        toAdd: [
          { name: "banana", level: 3 },
          { name: "suger", level: 2 }
        ],

        options: [{ colors: [] }, { size: [] }]
      },
      {
        name: "choclate shake",
        price: "2",
        default: "choclate,banana,milk",
        toAdd: [
          { name: "banana", level: 4 },
          { name: "suger", level: 2 }
        ],

        options: [{ colors: [] }, { size: [] }]
      }
    ],
    itemsCount: 2
  },
  { name: "cakes", itemsCount: 0 },
  { name: "cocktails", itemsCount: 0 },
  { name: "mocktails", itemsCount: 0 }
];

export default function Add({ back }) {
  const [category, setCategory] = useState("");
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
          </div>
        </div>
        <Categories categories={categories} />
      </div>
      <style>{`
        .addPage{
          padding-bottom:1rem;
        }
        .addCategory{
          padding:1rem;
          border-bottom:1px solid ${styles.secondaryColor}
        }
        .inputplus{
          ${styles.flexBothcenter};
          position:relative;
          width:100%;
        }
        .inputplus:after{
          content:'+';
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
