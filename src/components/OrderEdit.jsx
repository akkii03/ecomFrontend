import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UpdateProduct, product_Id_Api } from "./Apis/allApis";
import { ToastContainer, toast } from "react-toastify";

export default function OrderEdit() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [EditProduct, setEditProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
  });

  function inputValue(e) {
    setEditProduct({ ...EditProduct, [e.target.name]: e.target.value });
  }

  async function EditOrderHandel(e) {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    setLoading(true);
    axios
      .put(UpdateProduct(id), EditProduct, config)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          toast.success(`😊${"Product edit successfully !"}`);
          setEditProduct({
            name: "",
            category: "",
            description: "",
            price: "",
            stock: "",
          });
        } else toast.error(`👎 ${res.data.msg}`);
      })
      .catch((err) => {
        toast.error(`🙏${err.message}`);
        setLoading(false);
      });
  }

  useEffect(() => {
    axios
      .get(product_Id_Api(id))
      .then((res) => {
        setEditProduct({
          name: res.data.product.name,
          category: res.data.product.category,
          description: res.data.product.description,
          price: res.data.product.price,
          stock: res.data.product.stock,
        });
      })
      .catch((err) => toast.error(`🙏${err.message}`));
  }, []);

  return (
    <div classNameName="signupDiv">
      <ToastContainer />
      <form
        classNameName="loginForm"
        encType="multipart/form-data"
        onSubmit={EditOrderHandel}
      >
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={EditProduct ? EditProduct.name : ""}
            onChange={inputValue}
          />
        </div>

        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Category
          </label>
          <select
            type=""
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="category"
            value={EditProduct ? EditProduct.category : ""}
            onChange={inputValue}
          >
            <option disabled selected>
              Choose Category
            </option>
            <option value="Electronics">Electronics</option>
            <option value="Footwear">Footwear</option>
            <option value="Mask">Mask</option>
            <option value="Clothes">Clothes</option>
          </select>
        </div>

        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Stock
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPassword1"
            name="stock"
            value={EditProduct ? EditProduct.stock : ""}
            onChange={inputValue}
          />
        </div>

        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPassword1"
            name="price"
            value={EditProduct ? EditProduct.price : ""}
            onChange={inputValue}
          />
        </div>

        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            name="description"
            value={EditProduct ? EditProduct.description : ""}
            onChange={inputValue}
          />
        </div>

        {loading ? (
          <button type="submit" className="btn btn-primary" disabled>
            Loading...
          </button>
        ) : (
          <button type="submit" className="btn btn-primary">
            Update Product
          </button>
        )}
      </form>
    </div>
  );
}
