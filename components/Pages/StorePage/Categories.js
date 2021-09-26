import { styles } from "@/public/js/styles";
import { useState } from "react";
import { FaImage } from "react-icons/fa";

export default function Categories({ categories }) {
  return (
    <>
      {categories?.map((category) => (
        <Category category={category} />
      ))}
    </>
  );
}
export function Category({ category }) {
  const [shown, setShown] = useState(false);
  return (
    <>
      <div className="categoryList">
        <div className="category">
          <div onClick={() => setShown(!shown)} className="category-details">
            <div>{category.name}</div>
            <div>{category.itemsCount}</div>
          </div>
          <div className="remove">remove</div>
        </div>
        {shown && (
          <div className="items">
            {category.items?.map((item) => (
              <div className="item">
                <div>
                  <div>{item.name}</div>
                  <div>price: {item.price}$</div>
                  <div>{item.default}</div>
                </div>
                <div>
                  <div className="item-img">
                    <FaImage />
                  </div>
                  <div className="remove">edit</div>
                </div>
              </div>
            ))}
            <div className="addNewItem">
              <input className="newItem-input" placeholder="add new item" />
            </div>
          </div>
        )}
      </div>
      <style>{`
      .categoryList{
        border-bottom:1px solid ${styles.secondaryColor};
        overflow-x:hidden;
      }
      .category{
        padding:.8rem .5rem;
        justify-content:space-between;
        font-size:1.2rem;
        ${styles.flexAligncenter}
      }
      .category-details{
        ${styles.flexAligncenter}
        gap:2rem;
        cursor:pointer;
      }
      .remove{
        color:${styles.secondaryColor};
        cursor:pointer;
      }
      .items{
        padding:.5rem;
        padding-top:0;
      }
      .newItem-input{
        border:none;
        padding:.2rem;
      }
      
      .addNewItem:after{
        content:'add';
        font-size:1rem;
        transform:translateX(-2rem);
        z-index:5;
        cursor:pointer;
        color:${styles.secondaryColor};
        }
        
      .item{
        ${styles.flexAligncenter}
        -webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;
        border:solid lightgrey;
        border-width:1px 0;
        padding:.2rem;
      }
      .item-img{
        font-size:3rem;
      }
      `}</style>
    </>
  );
}
