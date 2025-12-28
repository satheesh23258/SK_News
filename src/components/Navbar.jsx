import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">

        <Link className="navbar-brand" to="/">SK-News</Link>

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

            {["business","entertainment","health","science","sports","technology","general"].map(
              (item) => (
                <li className="nav-item" key={item}>
                  <Link className="nav-link" to={`/${item}`}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                </li>
              )
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
