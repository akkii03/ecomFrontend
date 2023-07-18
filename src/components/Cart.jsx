import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  let cartItems = JSON.parse(localStorage.getItem("cartItem"));

  let totalVal = 0;
  let formatted;
  if (cartItems) {
    for (const key in cartItems) {
      totalVal += parseInt(cartItems[key].quantity * cartItems[key].price);
    }

    formatted = totalVal.toLocaleString("en-US");
    totalVal = totalVal.toLocaleString("en-US");
  }

  function deletefn(val) {
    const updateArr = cartItems.filter((item) => item.product != val.product);
    localStorage.setItem("cartItem", JSON.stringify(updateArr));
    window.location.reload();
  }

  return (
    <>
      {cartItems && cartItems.length > 0 ? (
        <div className="cartDiv">
          <div className="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                {cartItems ? (
                  cartItems.map((value, index) => {
                    return (
                      <>
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{value.name}</td>
                          <td>
                            <img
                              src={value.image}
                              style={{ width: "150px", height: "200px" }}
                            />
                          </td>
                          <td>{value.quantity}</td>
                          <td className="tablePrice">
                            <b>
                              ₹
                              {(value.price * value.quantity).toLocaleString(
                                "en-US"
                              )}
                            </b>
                          </td>
                          <td>
                            <i
                              class="fa-sharp fa-solid fa-trash delete"
                              onClick={() => deletefn(value)}
                            ></i>
                          </td>
                        </tr>
                      </>
                    );
                  })
                ) : (
                  <h1 className="heading">👎Nothing in cart</h1>
                )}
              </tbody>
              <div className="totalParentCart">
                <div className=" div1"></div>
                <div className="divs right">
                  <p className="totalvalue">
                    <b>Gross Total :-</b>
                  </p>
                  <p>
                    <b>{`₹ ${totalVal} /-`}</b>
                  </p>
                </div>
              </div>
            </table>
          </div>
          <Link className="Btn" to="/shipping">
            <button className="Btn">check-out</button>
          </Link>
        </div>
      ) : (
        <div className="cartEmpty">
          <h1>😔Nothing in cart</h1>
          <p>please shop </p>
        </div>
      )}
    </>
  );
}
