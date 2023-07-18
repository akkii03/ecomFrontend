import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SubmitReviewApi, product_Id_Api } from "./Apis/allApis";
import { useNavigate, useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";
import MetaData from "./MetaData";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import { globalUser } from "../App";
import {
  Dialog,
  DialogActions,
  DailogContent,
  DailogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { DialogContent, DialogTitle } from "@mui/material";

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const user = useContext(globalUser);
  const navigate = useNavigate();
  const [reviewLoading, setReviewLoading] = useState(false);
  useEffect(() => {
    axios
      .get(product_Id_Api(id))
      .then((res) => {
        setProduct(res.data.product);
        setLoading(false);
      })
      .catch((err) => toast.error(err.message));
  }, [comment,rating]);

  function handelQuantity(e) {
    setQuantity(e.target.value);
  }

  function handelMinus() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      toast.warning("🙏quantity can not be 0");
    }
  }

  function handelPlus() {
    if (product.stock > quantity) {
      setQuantity(quantity + 1);
    } else {
      toast.error("😔Quantity can not be greater than stock");
    }
  }

  if (product) {
    var options = {
      edit: false,
      color: "rgba(20,20,20,0.1)",
      activeColor: "red",
      size: window.innerWidth < 600 ? 20 : 25,
      value: product.ratings,
      isHalf: true,
    };
  }

  let cartarr = [];
  function Add2cart() {
    if (user) {
      const itemProduct = {
        quantity,
        name: product.name,
        product: id,
        image: product.images[0],
        price: product.price,
      };
      const item = localStorage.getItem("cartItem");
      // jb cart have already something
      if (item) {
        const arr = JSON.parse(item);
        arr.map((item2) => cartarr.push(item2));
        cartarr.push(itemProduct);
      }
      // cart is empty
      else {
        cartarr.push(itemProduct);
      }
      localStorage.setItem("cartItem", JSON.stringify(cartarr));

      toast.success(`😄${product.name} is added successfully in cart`);
    } else {
      navigate("/login");
    }
  }

  function submitReviewToggle() {
    open ? setOpen(false) : setOpen(true);
  }

  function reviewHander() {
    const review = {
      comment,
      rating,
      productId: id,
      userName: user.user.name,
      userId: user.user._id,
    };
    setReviewLoading(true);
    axios
      .put(SubmitReviewApi, review)
      .then((res) => {
        toast.success(`😊${res.data.msg}`);
        setReviewLoading(false);
        window.location.reload();
      })
      .catch((err) =>{
        toast.error(`😭 network issue please try after sometime`)
        setReviewLoading(false);
      }
      );
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="productDetails">
            <MetaData title={`${product.name} on A2Z Store`} />
            <ToastContainer />
            <div className="product_slider">
              <Carousel>
                {product.images &&
                  product.images.map((item, index) => {
                    return (
                      <img
                        className=" imagesSlider"
                        alt={item}
                        src={item}
                        key={index}
                      />
                    );
                  })}
              </Carousel>
            </div>
            <div className="product_details">
              <div className="detailsBlock-1">
                <h4>{product.name}</h4>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>
                  (<spanc className="info">{product.numOfReviews}</spanc>{" "}
                  Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1 className="price mainPrice">₹{product.price.toLocaleString('en-US')}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button className="cart" onClick={handelMinus}>
                      <i class="fa-solid fa-minus"></i>
                    </button>
                    <input
                      type="number"
                      readOnly
                      onChange={(e) => handelQuantity(e)}
                      value={quantity}
                    />
                    <button className="cart" onClick={handelPlus}>
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    className="cartBtn"
                    onClick={Add2cart}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <p>
                <span className="info">Status:</span>
                {"  "}
                {
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                }
              </p>
              <div className="detailsBlock-4">
                <span className="info"> Description:</span> {"  "}
                {product.description}
              </div>
              <button className="reviewBtn" onClick={submitReviewToggle}>
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewHeading">Review's</h3>

          <Dialog
            aria-labelleadby="simple-dailog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDailogTextArea"
                cols="30"
                row="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} className="secondary">
                Cancel
              </Button>
              {
                reviewLoading ? ('loading...'):(<Button className="primary" onClick={reviewHander}>
                Submit
              </Button>)
              }
            </DialogActions>
          </Dialog>

          <div className="reviews">
            {product.reviews.length > 0 ? (
              product.reviews.map((rev) => {
                return <ReviewCard review={rev} />;
              })
            ) : (
              <p className="noReview">👎 No Reviews Yet</p>
            )}
          </div>
        </>
      )}
    </>
  );
}
