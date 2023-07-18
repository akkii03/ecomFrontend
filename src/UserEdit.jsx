import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {EDITUSERADMIN, GETSINGLEUSER} from './components/Apis/allApis';

export default function UserEdit() {
  const [loading, setLoading] = useState(false);
  const [imagePath, setImagePath] = useState(null);
  const { id } = useParams();

  const [signupData, setSignUpData] = useState({
    name: "",
    email: "",
    image: "",
    phone:""
  });

  useEffect(()=>{
    axios.get(GETSINGLEUSER(id))
    .then(res=>{
      setSignUpData({
        name:res.data.user.name,
        email:res.data.user.email,
        phone:res.data.user.phone,
      })
    });
  },[])

  function userData(e) {
    if (e.target.name === "image") {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePath(reader.result);
        }
      };
    } else {
      setSignUpData({ ...signupData, [e.target.name]: e.target.value });
    }
  }

  async function registerHandel(e) {
    e.preventDefault();
    signupData.image = imagePath;
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    setLoading(true);
    axios
      .put(EDITUSERADMIN(id),signupData, config)
      .then((res) => {
        setLoading(false);
        if(res.data.success)toast.success(`😊${"user edit successfully !"}`);
        else toast.error(`👎 ${res.data.msg}`)
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(`🙏${err.message}`);
        setLoading(false);
      });
  }
  
  return (
    <div className="signupDiv">
      <ToastContainer />
      <form
        className="loginForm"
        encType="multipart/form-data"
        onSubmit={registerHandel}
      >
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            name="name"
            value={signupData && signupData.name}
            onChange={userData}
          />
        </div>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={signupData && signupData.email}
            onChange={userData}
          />
        
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            class="form-control upload"
            name="image"
            onChange={userData}
          />
          {imagePath == null ? (
            ""
          ) : (
            <img src={imagePath} height={100} width={100} />
          )}
        </div>

        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Phone Number
          </label>
          <input
            type="number"
            class="form-control"
            id="exampleInputPassword1"
            name="phone"
            value={signupData && signupData.phone}
            onChange={userData}
          />
        </div>

        {loading ? (
          <button type="submit" class="btn btn-primary" disabled>
            Loading...
          </button>
        ) : (
          <button type="submit" class="btn btn-primary">
            Edit User
          </button>
        )}
      </form>
    </div>
  );
}
