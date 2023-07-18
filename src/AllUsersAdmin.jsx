import { useEffect, useState, React } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./components/Loading";
import { AllUsersADMIN, DELETEUSERADMIN } from "./components/Apis/allApis";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function AllUsersAdmin({ isAdmin }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(AllUsersADMIN).then((res) => {
      sessionStorage.setItem("allusers", JSON.stringify(res.data.users));
      setUsers(res.data.users);
      setLoading(false);
    });
  }, [users]);

  function handelDelete(id) {
    axios
      .delete(DELETEUSERADMIN(id))
      .then((res) => {
        res.data.success && toast.success(`user ${id} delete successfully `);
        console.log(res.data);
      })
      .catch((err) => toast.error(`failed due to ${err.message}`));

    setLoading(true);

    axios.get(AllUsersADMIN).then((res) => {
      sessionStorage.setItem("allusers", JSON.stringify(res.data.users));
      setUsers(res.data.users);
      setLoading(false);
    });
  }

  if (isAdmin!='admin') {
    return navigate("/login");
  } else {
    return (
      <>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <h1 style={{ textAlign: "center", padding: "2vmax" }}>
              All Users Details
            </h1>
            <ToastContainer />
          <div className="table-responsive">
          <table className="table caption-top">
              <caption>All Users</caption>
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((item) => {
                    return (
                      <tr>
                        <th scope="row">{item._id}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td className="actions">
                          <Link to={`/userEdit/${item._id}`}>
                            <i className="fa-solid fa-pen-to-square editIcon"></i>
                          </Link>
                          <i
                            className="fa-solid fa-trash deletProduct"
                            onClick={() => handelDelete(item._id)}
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          </div>
        )}
      </>
    );
  }
}
