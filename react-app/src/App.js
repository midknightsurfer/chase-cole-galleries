import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import Products from "./components/ProductView/Products";
import ProductForm from "./components/ProductForm/ProductForm";
import NavBar from "./components/NavBar";
import EditProductForm from "./components/ProductForm/EditProductForm";
import ProductView from "./components/ProductView/ProductView";
import CartView from "./components/Cart/CartView";
import Checkout from './components/Cart/Checkout';
import MyOrders from "./components/Orders/MyOrders";
import Footer from "./components/Footer/footer"
import MyAccount from "./components/MyAccount/MyAccount"

import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);


  if (!loaded) {
    return null;
  }

  return (
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
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
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
        <ProtectedRoute path="/" exact={true}></ProtectedRoute>
      </Switch>
      <ProtectedRoute path="/productform" exact={true}>
        <ProductForm />
      </ProtectedRoute>
    </BrowserRouter>
  );
}

export default App;
