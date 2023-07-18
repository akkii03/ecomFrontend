import { Tabs } from "antd";
import { useState } from "react";
import { loginApi, register } from "../Apis/allApis";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const onChange = (key) => {};
const items = [
  {
    key: "1",
    label: `Login`,
    children: <LoginCom />,
  },
  {
    key: "2",
    label: `Signup`,
    children: <Signup />,
  },
];
const Login = () => (
  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
);

function LoginCom() {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let name, value;

  function getInfo(e) {
    name = e.target.name;
    value = e.target.value;
    setUserInfo({ ...userInfo, [name]: value });
  }

  async function loginHandel(e) {
    e.preventDefault();
    setLoading(true);
    axios
      .post(loginApi, userInfo)
      .then((res) => {
        if (res.data.token) {
          document.cookie = `token=${res.data.token}`;
          sessionStorage.setItem("token", res.data.token);
          toast.success(`😊${"login successfull"}`);
          // navigate("/");
          window.location.reload("/");
        } else {
          toast.error(`😔${res.data.error}`);
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error(`😔${err.message}`);
        setLoading(false);
      });
  }

  return (
    <div className="loginDiv">
      <form className="loginForm" onSubmit={loginHandel}>
        <ToastContainer />
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            name="email"
            onChange={getInfo}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            name="password"
            onChange={getInfo}
            id="exampleInputPassword1"
          />
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          disabled={loading ? true : false}
        >
          Login
        </button>
      </form>
    </div>
  );
}

function Signup() {
  const [loading, setLoading] = useState(false);
  const [imagePath, setImagePath] = useState(null);
  const navigate = useNavigate();
  const [invalid, setInvalid] = useState(false);
  const [signupData, setSignUpData] = useState({
    name: "",
    email: "",
    image: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

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

  function passwordCheck() {
    if (signupData.password != signupData.confirmPassword) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  }

  async function registerHandel(e) {
    e.preventDefault();
    signupData.image = imagePath;
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    setLoading(true);
    axios
      .post(register, signupData, config)
      .then((res) => {
        if (res.data.token) {
          toast.success(`😊${"Register successfully !"}`);
          document.cookie = `token=${res.data.token}`;
          sessionStorage.setItem("token", res.data.token);
          window.location.reload("/");
          // navigate('/');
        }
       else{
        toast.error(`🤕${res.data.error}`);
        setLoading(false);
       }
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(`🙏${err.message}`);
        setLoading(false);
      });
  }

  return (
    <>
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
              onChange={userData}
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
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
              onChange={userData}
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={userData}
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Confirm-Password
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              name="confirmPassword"
              onBlur={passwordCheck}
              onChange={userData}
            />
          </div>
          {invalid ? (
            <p
              style={{
                color: "red",
                textAlign: "center",
                fontWeight: "bolder",
              }}
            >
              Password must be same
            </p>
          ) : loading ? (
            <button type="submit" class="btn btn-primary" disabled>
              Loading...
            </button>
          ) : (
            <button type="submit" class="btn btn-primary">
              Signup
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default Login;
