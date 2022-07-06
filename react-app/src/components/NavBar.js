import React, { useContext } from "react";
import { useCategory } from '../context/CategoryContext';
import { ModalContext } from "../context/ModalContext";
import { NavLink, useHistory } from "react-router-dom"
import CartView from "./Cart/CartView"
import MainMenu from "./MainMenu/MainMenu";

import logo from "../assets/logo.png";
import "./NavBar.css";

const NavBar = () => {
  const history = useHistory();
  const { setCategory } = useCategory()
  let { handleModal } = useContext(ModalContext);

  const handleCategory = (catId) => {
    if (window.location.pathname !== "/") {
      history.push('/');
    }
    setCategory(catId)
  }

  return (
    <>
      <nav className="top-menu">
        <i className="fa-solid fa-bars" onClick={() => handleModal(<MainMenu />)}></i>
        <div className="top-menu__menuhover">Menu</div>
        <NavLink
          to="/"
          exact={true}
        >
          <img src={logo} alt="logo" className="logo" />
        </NavLink>
        <div className="top-menu__cart" onClick={() => handleModal(<CartView />)}><i className="fa-solid fa-cart-flatbed"></i></div>
        <div className="top-menu__carthover">Cart</div>
      </nav>
      <div className="top-menu__categories">
        <ul>
          <li onClick={() => handleCategory(1)}>Bedroom</li>
          <li onClick={() => handleCategory(2)}>Dining Room</li>
          <li onClick={() => handleCategory(3)}>Living Room</li>
          <li onClick={() => handleCategory(4)}>Office</li>
          <li onClick={() => handleCategory(5)}>Outdoor</li>
          <li onClick={() => handleCategory(6)}>Other</li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
