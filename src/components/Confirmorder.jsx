import React from 'react';
import CheckoutSteps from './CheckoutSteps';
import { useContext } from 'react';
import { globalUser } from '../App';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Confirmorder() {
    const details = JSON.parse(localStorage.getItem('shipdetail'));

    const userData = useContext(globalUser);
    const navigate = useNavigate();

    let cartItems = JSON.parse(localStorage.getItem('cartItem'));
    const subTotal =  cartItems.reduce((acc,item)=>acc+item.quantity*item.price,0)
    const shippingCharges = subTotal>500 ? 0: 200;
    const tax = subTotal * 0.18;
    const totalPrice = subTotal + shippingCharges + tax;

    function paymentHandel(){
        const cartPrices = {subTotal,shippingCharges,tax,totalPrice}
        sessionStorage.setItem('cartPrice',JSON.stringify(cartPrices));
        navigate('/payment');

    }
    
  return (
    <div className='orderMainDiv'>
    <CheckoutSteps acStep={1}/>

    <div className='orderDiv1'>
        <div className='orderChild1'>
            <h4>Shipping Details</h4>
            <div className='flex'>
                <lable className='lableHead'>Name:</lable>
                {
                    userData && <p>{userData.user.name.toUpperCase()}</p>
                }
            </div>
            <div className='flex'>
                <lable className='lableHead'>Address:</lable>
                {
                    details && <p>{details.address}</p>
                }
            </div>

            <div className='flex'>
                <lable className='lableHead'>Phone:</lable>
                {
                    details && <p>{details.phone}</p>
                }
            </div>

            <div className='cartItem'>
                {userData && <h4>{`${userData.user.name} Cart Items`}</h4>}
                <div className='items'>
                    {
                        cartItems&& cartItems.map((value,index)=>{
                            return (
                                <div className='itemsOrg'>
                               {/* <Link to={`/product/${value.id}`}> */}
                               <img src={value.image} className='productImg'/>
                                <p className='productName'>{value.name}</p>
                                <p className='productName'> {value.quantity} * {(value.price).toLocaleString('en-US')} = <b>₹{value.quantity*value.price}</b></p>
                               {/* </Link> */}
                                </div>
                            )
                        })
                    }
                    
                </div>
            </div>

        </div>



        <div className='orderChild2'>
            <h4>Order Summary</h4>
            <div className='orderSummary'><h5>Sub-Total - </h5> <p>{subTotal}</p></div>
            <div className='orderSummary'><h5>Shipping Charges - </h5> <p>{shippingCharges}</p></div>
            <div className='orderSummary'><h5>GST - </h5> <p>{tax}</p></div>
            <div className='orderSummary'><h5><b>Total -  </b></h5><b> <p className='finalPrice'>₹ {totalPrice.toLocaleString('en-US')} /-</p> </b></div>
            <button className='cartBtn' onClick={paymentHandel}>Proceed To Payment</button>
        </div>
    </div>

    </div>
  )
} 
