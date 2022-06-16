import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../store/session";
import logo from "../Assets/logo.png";
import CartView from "./Cart/CartView"

import "./NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const user = useSelector((state) => state?.session?.user);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());

    setShowMenu(!showMenu)
    // history.push("/");
  };
console.log(user)
  return (
    <>
      <nav className="top__menu">
        <i class="fa-solid fa-bars" onClick={() => setShowMenu(!showMenu)}></i>
        <NavLink
          to="/"
          exact={true}
        >
          <img src={logo} alt="logo" className="logo" />
        </NavLink>
        <div className="cart_icon" onClick={() => setShowCart(!showMenu)}><i class="fa-solid fa-cart-flatbed"></i></div>
        {showMenu && (
          <div className="main__menu-bg">
            <nav className="main__menu">
              <div className="main__menu-header">
                <NavLink
                  to="/"
                  exact={true}
                  activeClassName="active"
                >
                  <img src={logo} alt="logo" className="logo" />
                </NavLink>
                <i
                  class="menuclose fas fa-times"
                  onClick={() => setShowMenu(!showMenu)}
                ></i>
              </div>
              <div className="main__menu-account">
                {/* <div>
                  <i class="fa-solid fa-user"></i>My Acccount
                </div> */}
                <span className="menu__name">
                  {user ? user?.first_name : ""}
                </span>
                {/* <div>
                  <i class="fa-solid fa-box"></i>My Orders
                </div> */}
              </div>
              <div className="main__menu-lists">
                {/* <div>
                  <i class="fa-solid fa-eye"></i>Recently Viewed
                </div> */}
                {/* <div>
                  <i class="fa-solid fa-calendar-plus"></i>New Arrivals
                </div> */}
                {/* <div>
                  <i class="fa-solid fa-heart"></i>Favorites
                </div> */}
              </div>
              <div className="main__menu-contact">
                {/* <div>
                  <i class="fa-solid fa-blog"></i>Refinisher's Blog
                </div> */}
                <NavLink
                  to="/ProductForm"
                  exact={true}
                  onClick={() => setShowMenu(!showMenu)}
                  activeClassName="active"
                >
                  <div>
                    <i class="fa-solid fa-dollar-sign"></i>Sell My Furniture
                  </div>
                </NavLink>
                {/* <div>
                  <i class="fa-solid fa-address-book"></i>Contact Us
                </div> */}
              </div>
              <div class="main__menu-footer">
                {user ? (
                  <NavLink
                    to="/"
                    exact={true}
                    onClick={logout}
                    activeClassName="active"
                  >
                    <button className="button__signup">Log Out</button>
                  </NavLink>
                ) : (
                  <NavLink
                    to="/login"
                    exact={true}
                    onClick={() => setShowMenu(!showMenu)}
                    activeClassName="active"
                  >
                    <button className="button__signup">Sign In</button>
                  </NavLink>
                )}
              </div>
            </nav>
          </div>
        )}
        {showCart && (
          <div className="main__menu-bg">
            <i class="cartclose fas fa-times" onClick={() => setShowCart(!showCart)}></i>
            <div className="cart_container">
              <CartView />
            </div>
            </div>
        )}
      </nav>
      {/* <div className="top__menu-categories">
        <ul>
          <li>Bedroom</li>
          <li>Dining Room</li>
          <li>Living Room</li>
          <li>Office</li>
          <li>Outdoor</li>
          <li>Other</li>
        </ul>
      </div> */}
    </>
  );
};

export default NavBar;
