import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OrderDelivered, singleOrder } from "./Apis/allApis";
import { ToastContainer, toast } from "react-toastify";

export default function StatusOrder({ isAdmin }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState();

  useEffect(() => {
    axios
      .get(singleOrder(id))
      .then((res) => {
        setApiData(res.data.order);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  }, []);

  function handelOrder(){
    axios.get(OrderDelivered(id))
    .then(res=>{
      console.log(res.data)
      toast.warning(res.data.msg)
    })
    .catch(err=>toast.error(err.message))
  }

  if (!isAdmin) {
    navigate("/login");
  } else {
    return (
      <>
        <ToastContainer />
        <div className="StatusOrder">
          <div className="childOrder">
            <b>Shipping Detail's</b>
            <p>Address:</p>
            {apiData ? <p>{apiData.shippingInfo.address}</p> : "loading..."}
            <p>City:</p>
            {apiData ? <p>{apiData.shippingInfo.city}</p> : "loading..."}
            <p>Country:</p>
            {apiData ? <p>{apiData.shippingInfo.country}</p> : "loading..."} 
            <p>State:</p>
            {apiData ? <p>{apiData.shippingInfo.state}</p> : "loading..."}
            <p>Phone:</p>
            {apiData ? <p>{apiData.shippingInfo.phoneNo}</p> : "loading..."} 
            <p>Pin code:</p>
            {apiData ? <p>{apiData.shippingInfo.pincode}</p> : "loading..."} 
          </div>
          <div className="childOrder">
            <b>Order Detail's</b>
            <p>Status:</p>
            {apiData ? <p><span className="badge badge-secondary badgecolor">{apiData.orderStatus}</span></p> : "loading..."}
            <p>Items:</p>
            {apiData ? <p>{apiData.orderItems.map(item=><li>{`${item.name} ${item.price} ₹`}</li>)}</p> : "loading..."}
            <p>Order to:</p>
            {apiData ? <p>{apiData.user}</p> : "loading..."}
            <button className="btn btn-success" onClick={handelOrder}>Delivered</button>
          </div>
          <div className="childOrder">
            <b>Payment Detail's</b>
            <p>Shipping Charges:</p>
            {apiData ? <p>{apiData.shippingPrice}₹</p> : "loading..."}
            <p>Tax:</p>
            {apiData ? <p>{apiData.taxPrice.toLocaleString('en-US')}₹</p> : "loading..."}
            <p>Total Order value:</p>
            {apiData ? <p>{(apiData.totalPrice).toLocaleString('en-US')}₹</p> : "loading..."}
          </div>
        </div>
      </>
    );
  }
}
