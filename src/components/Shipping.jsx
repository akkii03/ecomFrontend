import React, { useState } from "react";
import MetaData from "./MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export default function Shipping() {
  const navigate = useNavigate();
  const [shipData, setShipData] = useState({
    address: "",
    city: "",
    state: "",
    phone: "",
    country: "",
  });

  let name,
    value = "";

  function handelInput(e) {
    name = e.target.name;
    value = e.target.value;
    setShipData({ ...shipData, [name]: value });
  }

  function handelShip(e) {
    e.preventDefault();
    if (shipData.phone.length != 10) {
      toast.warning(`🤕${"phone number must be 10 digit"}`);
    }
    if (
      shipData.address &&
      shipData.city &&
      shipData.state &&
      shipData.phone &&
      shipData.country
    ) {
      localStorage.removeItem("shipdetail");
      localStorage.setItem("shipdetail", JSON.stringify(shipData));
      navigate("/confirmOrder");
    } else {
      toast.error(`😔${"all the fields are mandatory"}`);
    }
  }

  return (
    <div className="shippingDiv">
      <MetaData title="Shipping details" />
      <CheckoutSteps acStep={0} />
      <ToastContainer />
      <h1>Shipping details</h1>
      <form className="shipping_mainDiv">
        <div>
          <i class="fa-solid fa-house icons"></i>
          <input
            type="text"
            className="shippingInput"
            placeholder="address"
            name="address"
            onChange={handelInput}
          />
        </div>
        <div>
          <i class="fa-solid fa-city icons"></i>
          <input
            type="text"
            className="shippingInput"
            placeholder="city"
            name="city"
            onChange={handelInput}
          />
        </div>
        <div>
          <i class="fa-solid fa-location-dot icons"></i>
          <input
            type="text"
            className="shippingInput"
            placeholder="state"
            name="state"
            onChange={handelInput}
          />
        </div>

        <div>
        <i class="fa-solid fa-truck-fast icons"></i>
          
          <input
            type="text"
            name="pin"
            className="shippingInput"
            placeholder="pin code"
            onChange={handelInput}
            pattern="[0-9]{6}"
            maxlength="6"
          />
        </div>

        <div>
          <i class="fa-solid fa-phone icons"></i>
          <input
            type="tel"
            className="shippingInput"
            placeholder="phone"
            minlength="10"
            maxlength="10"
            name="phone"
            onChange={handelInput}
          />
        </div>
        <div>
          <i class="fa-solid fa-earth-americas icons"></i>
          <input
            type="text"
            className="shippingInput"
            placeholder="country"
            name="country"
            onChange={handelInput}
          />
        </div>

        <div className="btnDiv">
          <button className="cartBtn shipBtn" onClick={(e) => handelShip(e)}>
            Ship
          </button>
        </div>
      </form>
    </div>
  );
}
