import React, { useState, useContext } from "react";
import axios from "axios";
import { globalUser } from "../App";
import { updateProfile } from "./Apis/allApis";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { ToastContainer, toast } from "react-toastify";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.readyState === 2) {
        console.log("outside the everthing vale i s", reader.result);
      }
      resolve(reader.result);
    };

    reader.onerror = (error) => reject(error);
  });

export default function UpdateProfile() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
    console.log("file", file);
    console.log("previewImage ", previewImage);
    console.log("previewOpen ", previewOpen);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const userValue = useContext(globalUser);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [imagePath, setImagePath] = useState("initialValue");
  const [signupData, setSignUpData] = useState({
    name: "",
    email: "",
    image: "",
    phone: "",
    oldEmail: "",
  });

  function userData(e) {
    if (e.target.name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePath(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setSignUpData({ ...signupData, [e.target.name]: e.target.value });
    }
  }

  function registerHandel(e) {
    e.preventDefault();
    
    signupData.image = imagePath;
    signupData.oldEmail = userValue.user.email;

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    setLoading(true);
    const {image} = signupData;
    if(!image ){
      toast.error('Profile field is mandatory');
      setLoading(false)
    }
   else{
    axios
    .put(updateProfile,signupData,config)
    .then((res) => {
      console.log(res.data)
      if(res.data.success==true){
        navigate('/profile')
        toast.success(`😭${'profile update successfully !'}`);
      }else{
        setLoading(false);
        toast.error(`😭${res.data.msg}`);
      }
    })
    .catch((err) => {
      console.log(err.message);
      setLoading(false);
    });
   }
  }

  return (
    <div>
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

            {loading ? (
              <button type="submit" class="btn btn-primary disabled">
              Update profile
            </button>
            ) : (
              <button type="submit" class="btn btn-primary">
                Update profile
              </button>
            )}
            <Upload
              // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              type="file"
              accept="image/*"
              class="form-control upload"
              name="image"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </form>
        </div>
      </>
    </div>
  );
}
