import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import Product from "./Product";
import MetaData from "./MetaData";
import { getProduct } from "./actions/productAction";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { allproductAPi } from "../components/Apis/allApis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";
import Pagination from 'react-js-pagination';
import { Typography,Slider } from "@mui/material";


export default function Home() {
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const[productCount,setProductCount] = useState(0);
  const[resultPerPage,setResultPerPage] = useState(10);
  const[currentPage,setCurrentPage] = useState(1);
  const[price,setPrice] = useState([0,100000]);

  const categories = ['Electronics','Footwear','Mask','Clothes',];
  const [category,setCategory] = useState();


  function setCurrentPageNo(e){
    setCurrentPage(e);
  }

  const priceHandler = (e,newPrice)=>{
    setPrice(newPrice)
  }


  useEffect(() => {
    let link = `${allproductAPi}?page=${currentPage}&price=${price[0]}&price=${price[1]}`;
    if(category){
      link = `${allproductAPi}?page=${currentPage}&price=${price[0]}&price=${price[1]}&category=${category}`
    }
    if(category==null) {
      link = `${allproductAPi}?page=${currentPage}&price=${price[0]}&price=${price[1]}`
    }
    
    axios
      .get(link)
      .then((res) => {
        setProductCount(res.data.productCount)
        setApiData(res.data.product);
        setLoading(false);
      })
      .catch((err) => toast.error(err.message));
  }, [currentPage,price,category]);

  return (
    <div className="banner">
      <MetaData title="A2Z Store" />
      
      {
        loading?(<Loading/>):(<>
          <Carousel className="carousel">
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100"
              src="https://rukminim1.flixcart.com/fk-p-flap/844/140/image/8a46c76763c1eaf6.jpg?q=50"
              alt="Image One"
            />
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100 slider_2"
              src="https://cdn.mos.cms.futurecdn.net/56166cc33115642046e1db89e171bd49-1200-80.jpg"
              alt="Image 2"
            />
          </Carousel.Item>
        </Carousel>
        <div className="displayProduct">
          <h3 className="title">Featured Product's</h3>

          <div className="filterBox">
            <p className="price">Price</p>
            <Slider
            value={price}
            onChange={priceHandler}
            valueLabelDisplay='auto'
            aria-labelledby="range-slider"
            min={0}
            max={100000}
            />
            <span className="clearFilter" onClick={()=>{setCategory(null)
            
            }}>clear filter<i class="fa-solid fa-xmark"></i></span>
            <p>Category :</p>
           <ul className="categoryBox">
            {
              categories.map((cate)=>{
                return (<>
                <li key={cate} className='categoryList' onClick={()=>{
                  console.log(cate.toLowerCase())
                  setCategory(cate.toLowerCase())}} >{cate}</li>
                </>)
              })
            }
            </ul>
          </div>
  
          <div className="productsCard">
          
              {
                apiData.length>0?(apiData.map((item, index) => {
                  return <Product key={index} product={item} />;
                })):(
                  <h1> 🙏Sorry No product found </h1>
                )
              }
          </div>

          {
            resultPerPage<productCount && (
              <div className="pagination_box">
              <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productCount}
              onChange={setCurrentPageNo}
              nextPageText='Next'
              prevPageText='Prev'
              firstPageText='1st'
              lastPageText='Last'
              itemClass='page-item'
              linkClass ='page-link'
              activeClass= 'pageItemActive'
              activeLinkClass="pageLinkActive"
            />
          </div>
            )
          }

          </div>
          </>)
      }


        {/* <button
          onClick={() =>
            toast.info("😊 login Successfully", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
          }
        >
          toast
        </button>
        <ToastContainer></ToastContainer> */}
      </div>
    
  );
}
