import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  LoginForm,
  SignUpForm,
  Products,
  ProductForm,
  NavBar,
  EditProductForm,
  ProductView,
  CartView,
  Checkout,
  MyOrders,
  Footer,
  MyAccount,
} from "./components";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";

function App() {
  const user = useSelector((state) => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  let splash;

  if (!user) {
    splash = <LoginForm />;
  } else {
    splash = loaded && (
      <>

      <BrowserRouter>
        <NavBar />
        <Footer />

        <Switch>
          <Route path="/" exact={true}>
            <Products />
          </Route>
          <Route path="/cart" exact={true}>
            <CartView />
          </Route>
          <Route path="/login" exact={true}></Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm />
          </Route>
          <Route path="/products/:productId" exact={true}>
            <ProductView />
          </Route>
          <ProtectedRoute path="/products/edit/:productId" exact={true}>
            <EditProductForm />
          </ProtectedRoute>
          <ProtectedRoute path="/myorders" exact={true}>
            <MyOrders />
          </ProtectedRoute>
          <ProtectedRoute path="/myaccount" exact={true}>
            <MyAccount />
          </ProtectedRoute>
          <ProtectedRoute path="/users" exact={true}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/checkout" exact={true}>
            <Checkout />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true}>
            <User />
          </ProtectedRoute>
        </Switch>
        <ProtectedRoute path="/productform" exact={true}>
          <ProductForm />
        </ProtectedRoute>
      </BrowserRouter>      
  
      <div className="homepage-description">
      <h2>Exclusive High End Furniture</h2>
      <p>
        Welcome to Chase Cole Galleries! Your one stop shop for hard to find
        and classic Furniture! Many of our products are designed by the artist
        Bob Timberlake and were once offered by Lexington Furniture. The
        pieces on this site are not your usual cheap particle board furniture
        that your normally find at other venues; they are expertly crafted,
        made to last, precision pieces that will light up your home. Feel free
        to create an account and browse our inventory. Also note that shipping
        on all these items will take awhile and be a bit more expensive than
        shipping with a large retail company because we use high end, private
        shippers and wrap your items with care to protect them on their
        journey.
      </p>
    </div>
    <div className="homepage-footer">
      <div className="homepage-footer__sitemap">
        <h6>- Sitemap -</h6>
        <ul>
          <li>Homepage</li>
          <li>My Account</li>
          <li>My Orders</li>
          <li>New Products</li>
          <li>Favorites</li>
          <li>Refinisher's Blog</li>
          <li>Sell Furniture</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className="homepage-footer__policies">
        <h6>- Policies -</h6>
        <ul>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
          <li>Return Policy</li>
          <li>Shipping Policy</li>
        </ul>
      </div>

      <div className="homepage-footer__communication">
        <h6>- Get in Touch -</h6>
        <ul className="homepage-footer__socialicons">
          <li><i class="fa-brands fa-facebook-square"></i></li>
          <li><i class="fa-brands fa-instagram-square"></i></li>
          <li><i class="fa-brands fa-twitter-square"></i></li>
        </ul>
      </div>
    </div>
    </>
    );
  }

  return (
    <>
      {splash}


    </>
  );
}

export default App;
