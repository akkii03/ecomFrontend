import * as React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { myOrdersApi } from "./Apis/allApis";
import { useContext } from "react";
import { globalUser } from "../App";
import { Link } from "react-router-dom";
import Loading from "./Loading";

export default function Orders() {
  const [ordersData, setOrders] = React.useState();
  const [loading, setLoading] = React.useState();
  const [msg, setMsg] = React.useState();

  const loggedUser = useContext(globalUser);
  React.useEffect(() => {
    if (loggedUser) {
      axios
        .get(myOrdersApi(loggedUser.user._id))
        .then((res) => {
          setOrders(res.data.orders);
          if (res.data.msg) {
            setMsg(res.data.msg);
          }
          setLoading(false);
        })
        .catch((err) => {
          toast.error(`😔 something went wrong ${err.message}`);
          setLoading(false);
        });
    }
  }, [loggedUser]);

  //createdAt

  return (
    <>
      { loggedUser && loggedUser.user ? (
        <div>
          <ToastContainer />

          {<h3>Orders</h3>}

          {loading ? (
            <Loading className="orderLoading" />
          ) : (
            <div className="row">
              <div className="col-md-8 col-xs-12">
              <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Order_id</th>
                    <th scope="col">Status</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Created at</th>
                    <th scope="col">View</th>
                  </tr>
                </thead>

                {ordersData ? (
                  <tbody>
                    {ordersData &&
                      ordersData.map((item, index) => {
                        return (
                          <tr>
                            <th>{index + 1}</th>
                            <td>{item._id}</td>
                            <td>{item.orderStatus}</td>
                            <td>{item.orderItems.length}</td>
                            <td>{item.totalPrice}</td>
                            <td>{item.createdAt}</td>
                            <td>
                              <Link to={`/viewOrder/${item._id}`}>
                                <i class="fa-regular fa-eye view"></i>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                ) : (
                  <h1 style={{ textAlign: "center" }}>
                    You haven't placed any order yet
                  </h1>
                )}
              </table>
                </div>
            </div>
            </div>
          )}
        </div>
      ) : (
        <h1 className="noteHead"> '🙏Please login first</h1>
      )}
    </>
  );
}

// ayush i
