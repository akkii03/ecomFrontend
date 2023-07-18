import React, { useRef, useContext, useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import MetaData from "./MetaData";
import { ToastContainer, toast } from "react-toastify";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import { globalUser } from "../App";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { createOrderApi } from "./Apis/allApis";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
// import order from '../../../backend/models/order'

export default function Payment() {
  const orderInfo = JSON.parse(sessionStorage.getItem("cartPrice"));
  const payBtn = useRef(null);
  const userId = useContext(globalUser);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [cardDetail,setCardDetail] = useState({
    cardNumber : '',
    expiry:'',
    cvv:''
  })

  {
    window.onload = function () {
      let ccNumberInput = document.querySelector(".cc-number-input"),
        ccNumberPattern = /^\d{0,16}$/g,
        ccNumberSeparator = " ",
        ccNumberInputOldValue,
        ccNumberInputOldCursor,
        ccExpiryInput = document.querySelector(".cc-expiry-input"),
        ccExpiryPattern = /^\d{0,4}$/g,
        ccExpirySeparator = "/",
        ccExpiryInputOldValue,
        ccExpiryInputOldCursor,
        ccCVCInput = document.querySelector(".cc-cvc-input"),
        ccCVCPattern = /^\d{0,3}$/g,
        mask = (value, limit, separator) => {
          var output = [];
          for (let i = 0; i < value.length; i++) {
            if (i !== 0 && i % limit === 0) {
              output.push(separator);
            }

            output.push(value[i]);
          }

          return output.join("");
        },
        unmask = (value) => value.replace(/[^\d]/g, ""),
        checkSeparator = (position, interval) =>
          Math.floor(position / (interval + 1)),
        ccNumberInputKeyDownHandler = (e) => {
          let el = e.target;
          ccNumberInputOldValue = el.value;
          ccNumberInputOldCursor = el.selectionEnd;
        },
        ccNumberInputInputHandler = (e) => {
          let el = e.target,
            newValue = unmask(el.value),
            newCursorPosition;

          if (newValue.match(ccNumberPattern)) {
            newValue = mask(newValue, 4, ccNumberSeparator);

            newCursorPosition =
              ccNumberInputOldCursor -
              checkSeparator(ccNumberInputOldCursor, 4) +
              checkSeparator(
                ccNumberInputOldCursor +
                  (newValue.length - ccNumberInputOldValue.length),
                4
              ) +
              (unmask(newValue).length - unmask(ccNumberInputOldValue).length);

            el.value = newValue !== "" ? newValue : "";
          } else {
            el.value = ccNumberInputOldValue;
            newCursorPosition = ccNumberInputOldCursor;
          }

          el.setSelectionRange(newCursorPosition, newCursorPosition);

          highlightCC(el.value);
        },
        highlightCC = (ccValue) => {
          let ccCardType = "",
            ccCardTypePatterns = {
              amex: /^3/,
              visa: /^4/,
              mastercard: /^5/,
              disc: /^6/,

              genric: /(^1|^2|^7|^8|^9|^0)/,
            };

          for (const cardType in ccCardTypePatterns) {
            if (ccCardTypePatterns[cardType].test(ccValue)) {
              ccCardType = cardType;
              break;
            }
          }

          let activeCC = document.querySelector(".cc-types__img--active"),
            newActiveCC = document.querySelector(
              `.cc-types__img--${ccCardType}`
            );

          if (activeCC) activeCC.classList.remove("cc-types__img--active");
          if (newActiveCC) newActiveCC.classList.add("cc-types__img--active");
        },
        ccExpiryInputKeyDownHandler = (e) => {
          let el = e.target;
          ccExpiryInputOldValue = el.value;
          ccExpiryInputOldCursor = el.selectionEnd;
        },
        ccExpiryInputInputHandler = (e) => {
          let el = e.target,
            newValue = el.value;

          newValue = unmask(newValue);
          if (newValue.match(ccExpiryPattern)) {
            newValue = mask(newValue, 2, ccExpirySeparator);
            el.value = newValue;
          } else {
            el.value = ccExpiryInputOldValue;
          }
        };

      ccNumberInput.addEventListener("keydown", ccNumberInputKeyDownHandler);
      ccNumberInput.addEventListener("input", ccNumberInputInputHandler);

      ccExpiryInput.addEventListener("keydown", ccExpiryInputKeyDownHandler);
      ccExpiryInput.addEventListener("input", ccExpiryInputInputHandler);
    };
  }

  let name , value = '';
  function handelInput(e){
    name = e.target.name;
    value = e.target.value;
    setCardDetail({...cardDetail,[name]:value})
  }

  async function paymentFormHandler(e) {
    e.preventDefault();
    payBtn.current.disabled = true;
    
    // if card value empty then return with error
    if(!cardDetail.cardNumber && !cardDetail.expiry && !cardDetail.cvv){
        payBtn.current.disabled = false;
       return  toast.error('card details are mandatory');
    }

    else{
    setLoading(true);
    const shippingDetails = JSON.parse(localStorage.getItem("shipdetail"));
    const cartItem = JSON.parse(localStorage.getItem("cartItem"));
    const paymentInfo = JSON.parse(sessionStorage.getItem("cartPrice"));

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    let orderItems = [];

    cartItem &&
      cartItem.map((item, value) => {
        return orderItems.push(item);
      });

    const orderDetails = {
      shippingInfo: {
        address: shippingDetails.address,
        city: shippingDetails.city,
        state: shippingDetails.state,
        country: shippingDetails.country,
        pincode: shippingDetails.pin,
        phoneNo: shippingDetails.phone,
      },

      orderItems,
      paymentInfo: paymentInfo.subTotal,
      taxPrice: paymentInfo.tax,
      shippingPrice: paymentInfo.shippingCharges,
      totalPrice: paymentInfo.totalPrice,
      userId: userId.user._id,
    };

    axios
      .post(createOrderApi, orderDetails, config)
      .then((res) => {
        setLoading(false);
        toast.success(`Payment Successfully Done`);
        setTimeout(() => {
            navigate('/order');
        }, 2000);
      })
      .catch((err) => {
        payBtn.current.disabled = false;
        return toast.error(`order create api failed due to ${err.message}`);
      });
    }
  }

  return (
    <div>
      <MetaData title="Ecom payment" />
      <CheckoutSteps acStep={2} />
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : (
        <div className="paymentDiv">
          <h1 className="payment_heading">Payment Info</h1>

          <form className="paymentform" onSubmit={(e) => paymentFormHandler(e)}>
            <div>
              <CreditCardIcon />
              <input
                name = 'cardNumber'
                className="paymentInput cc-number-input"
                placeholder="1234 5678 9101 1213"
                type="text"
                maxlength="19"
                onChange={handelInput}
              />
            </div>
            <div>
              <EventIcon />
              <input
                name = 'expiry'
                className="paymentInput cc-expiry-input"
                placeholder="MM/YY"
                type="text"
                maxlength="5"
                onChange={handelInput}
              />
            </div>
            <div>
              <VpnKeyIcon />
              <input
                name = 'cvv'
                className="paymentInput cc-cvc-input"
                placeholder="cvv"
                type="text"
                maxlength="3"
                onChange={handelInput}
              />
            </div>
            <input
              type="submit"
              ref={payBtn}
              className="paymentFromBtn"
              value={`Pay - ₹ ${
                orderInfo && orderInfo.totalPrice.toLocaleString("en-US")
              }`}
            />
          </form>
        </div>
      )}
    </div>
  );
}
