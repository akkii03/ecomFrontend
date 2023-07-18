import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {AllProducts, DELETEPRODUCT } from "../Apis/allApis";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function EditOrder({isAdmin}) {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
      axios.get(AllProducts)
      .then(res=>{
        setProducts(res.data.products);
        setLoading(false)
      })
      .catch(err=>{toast.error(err.message)
        setLoading(false)
      })
  }, []);

  function HandleDelete(id) {
    axios
      .delete(DELETEPRODUCT(id))
      .then((res) => {
        setProducts(res.data.products)
        JSON.stringify(sessionStorage.setItem("allproducts",res.data.products));
        toast.success("product delete successfully !");
      })
      .catch((err) => console.log(err.message));
  }

  if(isAdmin!='admin'){
    return navigate('/login')
  }else{
    return (
      <>
      <ToastContainer/>
        {loading ? (
          <Loading />
        ) : (
         <div className="table-responsive">
           <table className="table caption-top">
            <caption>All Products</caption>
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((item) => {
                  return (
                    <tr>
                      <th scope="row">{item._id}</th>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.stock}</td>
                      <td className="actions">
                        <Link to={`/productedit/${item._id}`}>
                          <i className="fa-solid fa-pen-to-square editIcon"></i>
                        </Link>
                        <i
                          className="fa-solid fa-trash deletProduct"
                          onClick={() => HandleDelete(item._id)}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
         </div>
        )}
      </>
    );
  }
}
