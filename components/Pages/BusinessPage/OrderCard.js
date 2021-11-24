import { styles } from "@/public/js/styles";
import Button from "@/components/Button";
import { useState } from "react";
import Image from "next/image";
import { firebaseLink } from "@/util/links";

export default function OrderCard({ order, businessCode }) {
  const [time, setTime] = useState(10);
  return (
    <>
      <div className="orderCard">
        <div className="orderCard-item">
          <div className="orderType">{order.orderType}</div>
          <div>{order.table && "table " + order.table}</div>
          <div className="orderItems">
            {order?.products?.map((product, i) => (
              <div key={i} className="product">
                {product?.hasImg ? (
                  <div className="productPartImg">
                    <Image
                      height="100"
                      width="100"
                      loader={({ src, width }) =>
                        `${
                          firebaseLink +
                          src +
                          `%2F${
                            product?.defaultID + product?.imgLink
                          }.png?alt=media&tr=w-${width}`
                        }`
                      }
                      src={businessCode}
                      alt={product?.name}
                    />
                  </div>
                ) : (
                  <div>product</div>
                )}
                <div>x{product.quantity}</div>
                <div>{product.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="information">
          <div>total: {order?.total?.amount} $</div>
          <div>should pay: {order.shouldPay} $</div>
          <div className="preperationTime">
            <div>prepration time </div>
            <div className="timeControlar">
              <div
                className="cbtn min"
                onClick={() => time > 5 && setTime(time - 5)}
              >
                -
              </div>
              <div>{time}</div>
              <div
                className="cbtn plus"
                onClick={() => time < 90 && setTime(time + 5)}
              >
                +
              </div>
              <div>min</div>
            </div>
          </div>
        </div>

        <div className="buttonContainer">
          <Button
            content={"decline"}
            onclick={() => {
              alert("removed");
            }}
          />

          <Button color={styles.secondaryColor} content={"confirm"} />
        </div>
      </div>

      <style>{`
    .orderCard{
      border-radius:.5rem;
      ${styles.boxshadow}
      margin:.8rem;
    }
    .orderCard-item{
      padding:.5rem
    }
    .orderItems{
      overflow:auto;
      ${styles.flexAligncenter}
      gap:.5rem
    }
    .orderItem{
      white-space:nowrap;
    }
    .buttonContainer{
      ${styles.flexJustifycenter}
      gap:.8rem;
    }
    .information{
      border:solid ${styles.secondaryColor};
      border-width:1px 0;
      padding:.5rem;
    }
    .preperationTime{
      justify-content:space-between;
      ${styles.flexAligncenter}
    }
    .timeControlar{
      ${styles.flexAligncenter}
      gap:.5rem
    }
    .cbtn{
      width:1.6rem;
      height:1.6rem;
      border-radius:10rem;
      font-size:1.6rem;
      ${styles.flexBothcenter};
      padding-bottom:.2rem;
      cursor:pointer;
    }
    .plus{
      color:white;
      background:${styles.secondaryColor};
    }
    .min{
      color:${styles.secondaryColor};
      border:1px solid ${styles.secondaryColor};
    }


  `}</style>
    </>
  );
}
