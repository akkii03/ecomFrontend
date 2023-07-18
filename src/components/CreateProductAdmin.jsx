import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createProductApi } from "./Apis/allApis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateProductAdmin({ isAdmin }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [img1, setImg1] = useState();
  const [img2, setImg2] = useState();
  const [img3, setImg3] = useState();
  const [productVal, setProductVal] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
    category: "",
  });

  if (isAdmin == 'admin') {
    let name, value;
    function inputVal(e) {
      name = e.target.name;
      value = e.target.value;
      setProductVal({ ...productVal, [name]: value });
    }

    function createProduct(e) {
      setLoading(true);
      e.preventDefault();
      productVal.images = [img1, img2, img3];
      axios
        .post(createProductApi, productVal)
        .then((res) => {
          res.data.success && toast.success("😊product create successfully ! ");
          
          setLoading(false);
        })
        .catch((err) => {
          toast.error("😭 opps something went wrong");
          setLoading(false);
        });
    }

    return (
      <div>
        <ToastContainer />
        <form onSubmit={createProduct}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={(e) => inputVal(e)}
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
              onChange={(e) => inputVal(e)}
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Images 1
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setImg1(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Images 2
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setImg2(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Images 3
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setImg3(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <select
              class="form-select"
              aria-label="Default select example"
              name="category"
              onChange={(e) => inputVal(e)}
            >
              <option selected disabled>
                select category
              </option>
              <option value="Electronics">Electronics</option>
              <option value="Footwear">Footwear</option>
              <option value="Mask">Mask</option>
              <option value="Clothes">Clothes</option>
            </select>
          </div>

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Description
            </label>
            <input
              type="textfield"
              className="form-control"
              id="exampleInputPassword1"
              name="description"
              onChange={(e) => inputVal(e)}
              t
            />
          </div>

          <button
            type="submit"
            disabled={loading ? true : false}
            className="btn btn-primary"
          >
            Create
          </button>
        </form>
      </div>
    );
  } else {
    return navigate("/profile");
  }
}
