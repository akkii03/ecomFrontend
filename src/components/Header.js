import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { logoutApi } from "./Apis/allApis";

export default function Header({ login }) {
  const [userLogin, setUserLogin] = useState(login);
  const [search, setSearch] = useState();
  const navigate = useNavigate();

  function inputSearch(e) {
    e.preventDefault();
    if (search.trim()) {
      navigate(`name/${search}`);
    } else {
      navigate("/");
    }
  }

  function EnterinputSearch(e) {
    e.preventDefault();
    if (e.keyCode == "13") {
      e.preventDefault();
      inputSearch(e);
    }
  }

  async function handelLogout() {
    await axios.get(logoutApi).then((res) => console.log(res.data));
    sessionStorage.removeItem("token");
    window.location.reload();
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbarCss">
      <div className="container-fluid">
        <Link className="navbar-brand links" to="/">
          <img
            src="https://th.bing.com/th?id=OIP.OIkhBSRWLob0_v4oLMJm_gHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
            alt="logo"
            className="logoCss"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <form className="d-flex searchBar" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onKeyUp={(e) => {
              EnterinputSearch(e);
              setSearch(e.target.value);
            }}
          />
          <img
            onClick={inputSearch}
            className="searchIcon"
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAxNyAxOCIgY2xhc3M9IiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjMjg3NEYxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGNsYXNzPSJfMzRSTnBoIiBkPSJtMTEuNjE4IDkuODk3bDQuMjI1IDQuMjEyYy4wOTIuMDkyLjEwMS4yMzIuMDIuMzEzbC0xLjQ2NSAxLjQ2Yy0uMDgxLjA4MS0uMjIxLjA3Mi0uMzE0LS4wMmwtNC4yMTYtNC4yMDMiLz48cGF0aCBjbGFzcz0iXzM0Uk5waCIgZD0ibTYuNDg2IDEwLjkwMWMtMi40MiAwLTQuMzgxLTEuOTU2LTQuMzgxLTQuMzY4IDAtMi40MTMgMS45NjEtNC4zNjkgNC4zODEtNC4zNjkgMi40MiAwIDQuMzgxIDEuOTU2IDQuMzgxIDQuMzY5IDAgMi40MTMtMS45NjEgNC4zNjgtNC4zODEgNC4zNjhtMC0xMC44MzVjLTMuNTgyIDAtNi40ODYgMi44OTUtNi40ODYgNi40NjcgMCAzLjU3MiAyLjkwNCA2LjQ2NyA2LjQ4NiA2LjQ2NyAzLjU4MiAwIDYuNDg2LTIuODk1IDYuNDg2LTYuNDY3IDAtMy41NzItMi45MDQtNi40NjctNi40ODYtNi40NjciLz48L2c+PC9zdmc+"
          />
        </form>

        <div
          className="collapse navbar-collapse linkContainer"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <>
              <Link
                className="nav-link active links"
                aria-current="page"
                to="/order"
              >
                <i className="fa-sharp fa-solid fa-store"></i>
                Orders
              </Link>

              <Link
                className="nav-link active links"
                aria-current="page"
                to="profile"
              >
                <i className="fa-solid fa-user"></i>
                Profile
              </Link>
              <Link
                className="nav-link active links"
                aria-current="page"
                to="/cart"
              >
                <i className="fa-solid fa-cart-shopping"></i>
                Cart
              </Link>

              <span
                className="nav-link active links logout"
                aria-current="page"
                to="/logout"
                onClick={handelLogout}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                Logout
              </span>
            </>
          </div>
        </div>
      </div>
    </nav>
  );
}
