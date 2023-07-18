import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverApi } from "./Apis/allApis";
import MetaData from "./MetaData";
import Loading from "./Loading";
import{Link,useNavigate} from 'react-router-dom';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function basic() {
      const token = sessionStorage.getItem("token");
      if(token){
        axios.get(`${serverApi}/me/${token}`)
      .then(res=>{
        setUserData(res.data.user)
        setLoading(false);
      })
      }
      else{
        navigate('/login');
      }
    }
    basic();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
         {
            userData && (
               <>
                 <MetaData title={`${userData.name}`} />
                 <div className="profileContainer">
                    <div>
                        <h1>My Profile</h1>
                        <img className="dp" src={userData.profileImage} alt={userData.name}/>
                        <Link className="editProfile" to='/me/update'>Edit Profile</Link>
                    </div>
                    <div className="userDetails">
                        <div>
                            <h4>Name</h4>
                            <p className="namesHeading">{userData.name}</p>
                        </div>
                        <div>
                            <h4>Email</h4>
                            <p className="namesHeading">{userData.email}</p>
                        </div>
                        <div>
                            <h4>Phone</h4>
                            <p className="namesHeading">{userData.phone}</p>
                        </div>
                       <div>
                        <Link to='/password/update' className="editProfile">Change Password</Link>
                       </div>
                    </div>
                 </div>
               </>
            )
         }
        </div>
      )}
    </>
  );
}
