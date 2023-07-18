import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";



export default function Product({ product,key }) {  
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "red",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <Link className="item" to={`product/${product._id}`}>
      <div className='product_container' key={key}>
      <img className="product_img" alt={product.name} src={product.images[0]}/>
      <span className="products_div">
      <h3>{product.name}</h3>
      <div> <ReactStars {...options}/><span>({product.numOfReviews})</span></div>
      <div className="price">₹{product.price.toLocaleString('en-US')}</div>
      </span>
      </div>
    </Link>
  );
}
