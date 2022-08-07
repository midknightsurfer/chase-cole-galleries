import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ModalProvider } from "./context/ModalContext";
import SearchProvider from "./context/SearchContext";
import SearchDisplay from "./components/Search/SearchDisplay";

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
  PageNotFound,
  Policy,
} from "./components";

import ProtectedRoute from "./components/auth/ProtectedRoute";
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
      <BrowserRouter>
      <SearchProvider>
        <ModalProvider>
          <NavBar />
          <Footer />

          <Switch>
            <Route path="/" exact={true}>
              <Products />
              <div className="homepage-description">
                <h2>Exclusive High End Furniture</h2>
                <p>
                  Welcome to Chase Cole Galleries! Your one stop shop for hard
                  to find and classic Furniture! Many of our products are
                  designed by the artist Bob Timberlake and were once offered by
                  Lexington Furniture. The pieces on this site are not your
                  usual cheap particle board furniture that your normally find
                  at other venues; they are expertly crafted, made to last,
                  precision pieces that will light up your home. Feel free to
                  create an account and browse our inventory. Also note that
                  shipping on all these items will take awhile and be a bit more
                  expensive than shipping with a large retail company because we
                  use high end, private shippers and wrap your items with care
                  to protect them on their journey.
                </p>
              </div>
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
            <Route path="/policy" exact={true}>
              <Policy />
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
            <ProtectedRoute path="/checkout" exact={true}>
              <Checkout />
            </ProtectedRoute>
            <ProtectedRoute path="/sell" exact={true}>
              <ProductForm />
            </ProtectedRoute>
            <Route exact path="/search">
            <SearchDisplay />
          </Route>
            <PageNotFound />
          </Switch>
        </ModalProvider>
      </SearchProvider>
      </BrowserRouter>
    );
  }

  return <>{splash}</>;
}

export default App;
