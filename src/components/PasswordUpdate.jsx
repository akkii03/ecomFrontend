import React, { useState,useContext, useEffect } from "react";
import axios from "axios";
import { updatepassword } from "./Apis/allApis";
import { useNavigate } from "react-router-dom";
import { globalUser } from "../App";
import { ToastContainer, toast } from "react-toastify";
export default function PasswordUpdate() {


  const [loading, setLoading] = useState(false);
  const [error,setError] = useState('Loading...');
  const navigate = useNavigate();
  const loginUser = useContext(globalUser);
  const [signupData, setSignUpData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword:"",
    userId:""
  });

 
  function userData(e) {
    setSignUpData({ ...signupData, [e.target.name]: e.target.value });
  }

  function checkPass(){
    if(signupData.newPassword!=signupData.confirmNewPassword){
        setLoading(true)
        setError('new-Password & confirm-password Must be same')
    }else{
      setLoading(false)
      setError(false)
    }
  }


  function registerHandel(e) {
    e.preventDefault();
    setLoading(true);
    signupData.userId = loginUser.user._id
    console.log('data is posting to db',signupData)
    axios
      .put(updatepassword, signupData)
      .then((res) => {
        console.log(res.data);
        if (res.data.success == true) {
          toast.success(`😊${res.data.msg}`)
          navigate("/profile");
          toast.success(`😊${res.data.msg}`)
        }else{
          setLoading(false);
          toast.warning(`😊${res.data.msg}`)
        }
      })
      .catch((err) => {
        toast.error(`😊${error.message}`)
        setLoading(false);
      });
  }

  return (
    <div>
      <div className="signupDiv">
      <ToastContainer />
        <form
          className="loginForm"
          encType="multipart/form-data"
          onSubmit={registerHandel}
        >
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Old Password
            </label>
            <input
              type="password"
              class="form-control"
              name="oldPassword"
              onChange={userData}
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              New Password
            </label>
            <input
              type="password"
              class="form-control"
              name="newPassword"
              onChange={userData}
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Confirm New Password
            </label>
            <input
              type="password"
              class="form-control"
              name="confirmNewPassword"
              onBlur={checkPass}
              onChange={userData}
            />
          </div>

          {loading ? (
            <button type="submit" class="btn btn-primary disabled">
              {error}
            </button>
          ) : (
            <button type="submit" class="btn btn-primary">
              Update Password
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
