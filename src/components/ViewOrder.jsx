import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { singleOrder } from "./Apis/allApis";
import axios from "axios";
import Loading from "./Loading";

export default function ViewOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(singleOrder(id))
      .then((res) => setOrder(res.data.order))
      .catch((err) => console.log("api failed due to", err.message));
  }, []);

  return (
    <>
      {order ? (
        <div>
          <h2 className="headingOrder" >{`#Order Details :-${id}`}<span class="badge badge-secondary badgecolor">{order.orderStatus}</span> </h2>
          <div className="viewOrderContainer">
            <div>
              <h4>Shipping Info :</h4>
              <div>
                <p className='pHeading'>Address :</p>
                <p>{order.shippingInfo.address}</p>
              </div>
              <div>
                <p className='pHeading'>City :</p>
                <p>{order.shippingInfo.city}</p>
              </div>
              <div>
                <p className='pHeading'>Pin Code :</p>
                <p>{order.shippingInfo.pincode}</p>
              </div>
              <div>
                <p className='pHeading'>Country :</p>
                <p>{order.shippingInfo.country}</p>
              </div>
            </div>
            <div>
              <h4>Order Item :</h4>
              {
                order.orderItems.map((item,index)=>{
                  return (
                    <div>
                      <p>{item.name}</p>
                      <img style={{height:"250px",width:'200px'}} src={item.image}/>
                      <p>{`${item.price} * ${item.quantity} =  ₹${item.price * item.quantity}/-`}</p>
                      </div>
                  )
                })
              }
            </div>
            <div>
              <h4>Payment Info :</h4>
              <div>
                <p className='pHeading'>Shipping Price :</p>
                <p>{order.shippingPrice}</p>
              </div>
              <div>
                <p className='pHeading'>Tax Price :</p>
                <p>{order.taxPrice}</p>
              </div>
              <div>
                <p className='pHeading'>Total Price :</p>
                <p>{`₹${order.totalPrice.toLocaleString('en-US')}/-`}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading/>
      )}
    </>
  );
}
