import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ModalContext } from "../../context/ModalContext";
import * as sessionActions from "../../store/session";

import logo from "../../assets/logo.png";
import "./MainMenu.css";

const MainMenu = () => {
  const dispatch = useDispatch();
  let { setModal } = useContext(ModalContext);
  const user = useSelector((state) => state?.session?.user);

  const logout = () => {
    dispatch(sessionActions.logout());
    setModal(false);
  };

  return (
    <div className="main-menu__bg" onClick={() => setModal(false)}>
      <nav className="main-menu">
        <div className="main-menu__header">
          <NavLink to="/" exact={true}>
            <img
              src={logo}
              alt="logo"
              className="logo"
              onClick={() => setModal(false)}
            />
          </NavLink>
          <i
            className="main-menu__close fas fa-times"
            onClick={() => setModal(false)}
          ></i>
        </div>
        <div className="main-menu__account" onClick={() => setModal(false)}>
          <NavLink to={`/myaccount`} exact={true} activeClassName="active">
            <div>
              <i className="fa-solid fa-user"></i>My Acccount
            </div>
          </NavLink>
          <span className="main-menu__name">
            {user ? user?.first_name : ""}
          </span>
          <NavLink
            to={`/myorders`}
            exact={true}
            onClick={() => setModal(false)}
          >
            <div>
              <i className="fa-solid fa-box"></i>My Orders
            </div>
          </NavLink>
        </div>
        <div className="main-menu__lists">
          <div>
            <i className="fa-solid fa-eye"></i>Recently Viewed
          </div>
          <div>
            <i className="fa-solid fa-calendar-plus"></i>New Arrivals
          </div>
          <div>
            <i className="fa-solid fa-heart"></i>Favorites
          </div>
        </div>
        <div className="main-menu__contact">
          <div>
            <i className="fa-solid fa-blog"></i>Refinisher's Blog
          </div>
          <NavLink to="/sell" exact={true} onClick={() => setModal(false)}>
            <div>
              <i className="fa-solid fa-dollar-sign"></i>Sell My Furniture
            </div>
          </NavLink>
          <div>
            <i className="fa-solid fa-address-book"></i>Contact Us
          </div>
        </div>
        <div className="main-menu__footer">
          {user ? (
            <NavLink to="/" exact={true} onClick={logout}>
              <button className="main-menu__signin">Log Out</button>
            </NavLink>
          ) : (
            <NavLink to="/login" exact={true} onClick={() => setModal(false)}>
              <button className="main-menu__signin">Sign In</button>
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MainMenu;
