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
        toAdd: [{ banana: "" }, { suger: 2 }],
        options: [{ colors: [] }, { size: [] }]
      },
      {
        name: "choclate shake",
        price: "2",
        default: "choclate,banana,milk",
        toAdd: [{ banana: "" }, { suger: 2 }],
        options: [{ colors: [] }, { size: [] }]
      }
    ],
    itemsCount: 2
  },
  { name: "cakes", itemsCount: 0 },
  { name: "cocktails", itemsCount: 0 },
  { name: "mocktails", itemsCount: 0 },
  { name: "mocktails", itemsCount: 0 },
  { name: "mocktails", itemsCount: 0 }
];

export default function Add() {
  const [category, setCategory] = useState("");
  return (
    <>
      <div className="addPage">
        <div className="addCategory">
          <div className="label">new category</div>
          <div className="inputplus">
            <Input
              value={category}
              onchange={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>
        <Categories categories={categories} />
      </div>
      <style>{`
        .addPage{
          overflow:scroll;
          padding-bottom:1rem;
        }
        .addCategory{
          padding:1rem;
          border-bottom:1px solid ${styles.secondaryColor}
        }
        .inputplus{
          ${styles.flexAligncenter};
          position:relative;
        }
        .label{
          font-size:1.2rem;
          margin:.2rem;
          margin-top:0;
          width:100%;
          align-text:left;
          max-width:25rem;
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
