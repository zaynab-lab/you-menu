import { useState } from "react";
import { styles } from "../../../public/js/styles";
import Add from "../../icons/Add";
import More from "../../icons/More";
import Orders from "../../icons/Orders";

export default function ({ selected, setSelected }) {
  return (
    <>
      <div className="menu-container">
        <div className="mouth">
          <div className="center">
            <div></div>
          </div>
        </div>
        <div onClick={() => setSelected("Orders")} className="icon">
          <Orders
            color={selected === "Orders" ? styles.primaryColor : styles.grey}
          />
        </div>
        <div onClick={() => setSelected("Add")} className="icon add">
          <Add color={selected === "Add" ? styles.primaryColor : styles.grey} />
        </div>
        <div onClick={() => setSelected("More")} className="icon">
          <More
            color={selected === "More" ? styles.primaryColor : styles.grey}
          />
        </div>
      </div>
      <style>
        {`
      .menu-container{
        width:100vw;
        position:absolute;
        bottom:0;
        display:flex;
        align-items:center;
        z-index:1;
      }
      .mouth{
        position:absolute;
        bottom:0;
        width:100vw;
        height:100% ;
        z-index:-1;
        display:flex;
        -webkit-box-pack:center;
        -ms-flex-pack:center;
        justify-content:center;
      }
      .center{
        background: white;
        width:6rem;
        border-radius:0 0 6rem 6rem;
        border:1px solid #dd6b4d;
        border-top:0;
        bottom:0;
        margin-bottom:.6rem;
      }
      .center:before{
        content:'';
        background: #dd6b4d;
        display:block;
        position: absolute;
        right:0;
        top:0;
        background:white;
        width:calc(50vw - 3rem + 2px);
        height:30%;
        border-radius:100rem 0 0 0 ;
        border:solid #dd6b4d;
        border-width: 1px 0 0 1px;
      }
    
      .center:after{
        content:'';
        background: #dd6b4d;
        display:block;
        position: absolute;
        left:0;
        top:0;
        background:white;
        width:calc(50vw - 3rem + 2.5px);
        height:30%;
        border-radius:0 100rem 0 0 ;
        border:solid #dd6b4d;
        border-width: 1px 1px 0 0;
         }
        .center div{
          background:white;
          width:calc(6rem + 3px);
          height:20%;
          transform:translateX(-4px)
        }
  
      .icon{
        padding:0rem 2rem;
        flex:1 1 100%;
        text-align:center;
        cursor:pointer;
      }
      .add{
        transform:translateY(-1rem);
      }
      `}
      </style>
    </>
  );
}
