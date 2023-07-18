import React,{useEffect,useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import { AllOrdersADMIN, AllProducts, AllUsersADMIN } from "../Apis/allApis";
import { ToastContainer, toast } from "react-toastify";
export default function Dashboard({isAdmin}) {
  const navigate = useNavigate();
  const [products, setProducts] = useState();
  const [totalUser,setTotalUser] = useState();
  const[orders,setOrders] = useState();
  const [Instock,setInstock] = useState(0);

  useEffect(() => {

    // product api
    // axios
    //   .get(AllProducts)
    //   .then((res) => {
    //     setProducts(res.data.products);
    //     sessionStorage.setItem('allproducts',JSON.stringify(res.data.products));
    //   })
    //   .catch((err) => toast.error(`😔'${err.message}`));

    //   // orders api
    //     // axios
    //     // .get(AllOrdersADMIN)
    //     // .then((res) => {
    //     //   setOrders(res.data.orders)
    //     //   sessionStorage.setItem('allorders',JSON.stringify(res.data.orders));
    //     // })
    //     // .catch((err) => toast.error(`😔'${err.message}`));


    //     // // all users api
    //     // axios
    //     // .get(AllUsersADMIN)
    //     // .then((res) => {
    //     //   setTotalUser(res.data.users)
    //     //   sessionStorage.setItem('allusers',JSON.stringify(res.data.users));

    //     // })
    //     // .catch((err) =>toast.error(`😔'${err.message}`));

  }, []);

  products && products.map((item)=>{
    item.stock<1 && setInstock(Instock+1)})


  if(isAdmin== 'admin'){
    
    return (
      <div>
        <h1 className="adminHeading">Admin Panel</h1>
        <ToastContainer/>
        <div className="cards">
          <Link to="/createProduct">
            <div className="innerCard card1">
              <h4>Create Product</h4>
              <p className="number">{products && products.length}</p>
            </div>
          </Link>
          <Link to="/editProduct">
            <div className="innerCard card2">
              <h4>Edit Product</h4>
            </div>
          </Link>
          <Link to="/Alluser">
            <div className="innerCard card3">
              <h4>User's</h4>
              <p className="number">{ totalUser && totalUser.length }</p>
            </div>
          </Link>
          <Link to="/orderStatus">
            <div className="innerCard card4">
              <h4>Orders</h4>
              <p className="number">{ orders &&  orders.length}</p>
            </div>
          </Link>
  
          {/* <div className="innerCard card5">
            <h4>Inventory</h4>
            <Link to="/productstock">
              <div>
                <p>Stock {products && (products.length-Instock)}</p>
              </div>
            </Link>
            
            <Link to='/productOutofStock'>
              <div>
                <p>OutOfStock {Instock}</p>
              </div>
            </Link>
          </div> */}
        </div>
      </div>
    );
  }else{
    return navigate('/profile')
  }
  
}
