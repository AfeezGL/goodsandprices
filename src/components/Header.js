import { signOut } from "firebase/auth";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            Goods and Prices
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/addproduct"}>
                  Add Product
                </Link>
              </li>
              <li className="nav-item">
                {!user ? (
                  <Link className="nav-link" to={"/login"}>
                    Login
                  </Link>
                ) : (
                  <a className="nav-link" onClick={logout}>
                    Logout
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
