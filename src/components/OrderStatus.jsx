import React, { useEffect, useState } from "react";
import axios from "axios";
import { AllOrdersADMIN } from "./Apis/allApis";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";

export default function OrderStatus({ isAdmin }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState();
  const [amount, setAmount] = useState();

  useEffect(() => {
    axios
      .get(AllOrdersADMIN)
      .then((res) => {
        setOrder(res.data.orders);
        setAmount(res.data.totalAmount);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  }, []);

  function handelDelete(id) {}

  if (!isAdmin) {
    navigate("/login");
  } else {
    return (
      <>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {amount ? (
              <h1 style={{ textAlign: "center", padding: "2vmax" }}>
                All Orders worth value {`🤑 ${amount.toLocaleString("en-US")}`}
              </h1>
            ) : (
              ""
            )}

            <ToastContainer />
            <div className="table-responsive">
              <table className="table caption-top">
                <caption>All Orders</caption>
                <thead>
                  <tr>
                    <th scope="col">Order Id</th>
                    <th scope="col">state</th>
                    <th scope="col">customer Id</th>
                    <th scope="col">Order value</th>
                    <th scope="col">Order Status </th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {order &&
                    order.map((item) => {
                      return (
                        <tr>
                          <th scope="row">{item._id}</th>
                          <td>{item.shippingInfo.state}</td>
                          <td>{item.user}</td>
                          <td>{item.totalPrice}</td>
                          {
                            item.orderStatus=='Delivered' ? (<td>
                              <span
                                class="badge badge-secondary"
                                style={{ backgroundColor: "green" }}
                              >
                                {item.orderStatus}
                              </span>
                            </td>):(<td>
                                <span
                                  class="badge badge-secondary"
                                  style={{ backgroundColor: "red" }}
                                >
                                  {item.orderStatus}
                                </span>
                              </td>)
                          }
                         
                          <td className="actions">
                            <Link to={`/statusOrder/${item._id}`}>
                              <i className="fa-solid fa-pen-to-square editIcon"></i>
                            </Link>
                            <i
                              className="fa-solid fa-trash deletProduct"
                              onClick={() => handelDelete(item._id)}
                            ></i>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </>
    );
  }
}
