import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header2() {
  const [search, setSearch] = useState();
  const navigate = useNavigate();

  function inputSearch() {
    if (search.trim()) {
      navigate(`name/${search}`);
    } else {
      navigate("/");
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbarCss">
      <div className="container-fluid">
        <Link className="navbar-brand links" to="/">
          <img
            src="https://th.bing.com/th?id=OIP.OIkhBSRWLob0_v4oLMJm_gHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
            className="logoCss"
            alt="logo"
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
            onKeyUp={(e) => setSearch(e.target.value)}
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
              <Link className="nav-link links" to="/login">
                <i className="fa-thin fa-arrow-down-to-bracket"></i>
                Login
              </Link>
            </>
          </div>
        </div>
      </div>
    </nav>
  );
}
