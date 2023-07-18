import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ProductDetail from "./components/ProductDetail";
import SearchProduct from "./components/SearchProduct";
import Login from "./components/login/Login";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Header2 from "./components/Header2";
import Profile from "./components/Profile";
import {serverApi, stripeKeyApi } from "./components/Apis/allApis";
import PageNotFound from "./components/PageNotFound";
import UpdateProfile from "./components/UpdateProfile";
import PasswordUpdate from "./components/PasswordUpdate";
import Cart from "./components/Cart";
import Shipping from "./components/Shipping";
import Confirmorder from "./components/Confirmorder";
import Payment from "./components/Payment";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import Orders from "./components/Orders";
import ViewOrder from "./components/ViewOrder";
import Dashboard from "./components/Admin/Dashboard";
import EditOrder from "./components/Admin/EditOrder";
import CreateProductAdmin from "./components/CreateProductAdmin";
import OrderEdit from "./components/OrderEdit";
import AllUsersAdmin from "./AllUsersAdmin";
import UserEdit from "./UserEdit";
import OrderStatus from "./components/OrderStatus";
import StatusOrder from "./components/StatusOrder";

export const globalUser = createContext();
function App() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);
  // const [stripeKey, setStripeKey] = useState(null);

  function loginUser() {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios
        .get(`${serverApi}/me/${token}`)
        .then((res) => {
          setUser(res.data);
          setLogin(true);
        })
        .catch((err) => console.log("api falied due to ", err));
    } else {
      setLogin(false);
    }
  }

  useEffect(() => {
    loginUser();
    
  }, [login]);

  return (
    <globalUser.Provider value={user}>
      {login ? <Header /> : <Header2 />}
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/name/:query" element={<SearchProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/me/update" element={<UpdateProfile />} />
        <Route path="/password/update" element={<PasswordUpdate />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/confirmOrder" element={<Confirmorder />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route exact path="/order" element={<Orders />} />
        <Route exact path="/viewOrder/:id" element={<ViewOrder />} />
        <Route path="/dashboard" element={<Dashboard isAdmin={user && user.user.role} />} />
        <Route
          path="/createProduct"
          element={<CreateProductAdmin isAdmin={user && user.user.role} />}
        />
        <Route
          path="/Alluser"
          element={<AllUsersAdmin isAdmin={user && user.user.role} />}
        />
        <Route path="/editProduct" element={<EditOrder isAdmin={user && user.user.role} />} />
        <Route path="/userEdit/:id" element={<UserEdit isAdmin={user && user.user.role} />} />
        <Route path="/orderStatus" element={<OrderStatus isAdmin={user && user.user.role} />} />
        <Route path="/statusOrder/:id" element={<StatusOrder isAdmin={user && user.user.role} />} />
        <Route
          exact
          path="/productedit/:id"
          element={<OrderEdit isAdmin={user && user.user.role} />}
        />

        {/* {
          stripeKey && <Elements stripe={loadStripe(stripeKey)}>
          <Route path="/payment" element={<Payment/>}/>
        </Elements>
        } */}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </globalUser.Provider>
  );
}

export default App;
