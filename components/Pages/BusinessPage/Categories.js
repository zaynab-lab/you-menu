import { FaImage, FaTrashAlt } from "react-icons/fa";
import { styles } from "@/public/js/styles";
import { useState } from "react";

export default function Categories({ categories }) {
  const [currentCat, setCurrentCat] = useState(categories?.[0]?.name);
  const [categoryItems, setCategoryItems] = useState(categories?.[0]?.items);
  return (
    <>
      <div className="categoryBar">
        {categories?.map((category, i) => (
          <div
            key={i}
            onClick={() => {
              setCurrentCat(category.name);
              setCategoryItems(category.items);
            }}
            className={`categoryContainer ${
              currentCat === category.name && "active"
            }`}
          >
            <div>{category.name}</div>
            <div className="count">{category.itemsCount}</div>
          </div>
        ))}
      </div>
      <Category categoryItems={categoryItems} currentCat={currentCat} />
      <style>{`
      .categoryBar{
        position:sticky;position: -webkit-sticky;
        top:.3rem;
        padding:.6rem;
        overflow:auto;
        background:white;
        ${styles.flexAligncenter}
      }
      .categoryContainer{
        border-radius:5rem;
        white-space:nowrap;
        padding:.1rem .5rem;
        margin:0 .3rem;
        cursor:pointer;
        ${styles.flexAligncenter}
        gap:.5rem;
        -webkit-box-shadow: 0 0px 5px 0 grey;box-shadow: 0 0px 5px 0 grey;
      }
      .count{
        width:1.2rem;
        height:1.2rem;
        border-radius:20rem;
        color:white;
        margin:0 .2rem;
        font-size:.8rem;
        background:${styles.secondaryColor};
        -webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;
        ${styles.flexAligncenter}
        }
      .active{
        -webkit-box-shadow: 0 0px 5px 0 ${styles.secondaryColor};box-shadow: 0 0px 5px 0 ${styles.secondaryColor};
        }
          
      `}</style>
    </>
  );
}

export function Category({ categoryItems, currentCat }) {
  return (
    <>
      {currentCat && (
        <>
          <div className="categoryList">
            <div className="items">
              {categoryItems?.map((item, i) => (
                <div key={i} className="item">
                  <div>
                    <div className="namePrice">
                      <div className="name">{item.name}</div>
                      <div>{item.price}$</div>
                    </div>
                    <div>default: {item.default}</div>
                    <div className="toAdd">
                      add:{" "}
                      {item.toAdd?.map((add, j) => (
                        <div key={j}>{add.name}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="item-img">
                      <FaImage />
                    </div>
                    <div>edit</div>
                  </div>
                </div>
              ))}
              <div className="addNewItem">
                <input className="newItem-input" placeholder="new item" />
              </div>
            </div>
          </div>
          <div className="remove">
            <div className="trash">
              <FaTrashAlt />
            </div>
            <div>remove category</div>
          </div>
        </>
      )}
      <style>{`
      .categoryList{
        border-bottom:1px solid ${styles.secondaryColor};
        overflow-x:hidden;
      }
      .items{
        padding-top:0;
      }
      .newItem-input{
        border:none;
        padding:.5rem;
        font-size:1.1rem;
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
        border-bottom:1px solid lightgrey;
        padding:.2rem 1rem;
      }
      .name{
        font-size:1.2rem;
      }
      .namePrice{
        ${styles.flexAligncenter}
        gap:.4rem;
        color:${styles.secondaryColor}
      }
      .item-img{
        font-size:3rem;
        color:grey;
      }
      .remove{
        color:${styles.secondaryColor};
        padding-bottom:5rem;
        cursor:pointer;
        ${styles.flexBothcenter}
        gap:.6rem
      }
      .trash{
        padding-top:.3rem;
      }
      .toAdd{
        ${styles.flexAligncenter}
        gap:.2rem;
      }
      `}</style>
    </>
  );
}
