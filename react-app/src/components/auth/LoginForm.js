import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import * as sessionActions from "../../store/session";
import logo from "../../assets/logo.png";
import SignUpForm from "./SignUpForm";

import "./auth.css";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const [showPassword, setShowPassword] = useState(false);
  const [showCheck, setShowCheck] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);

  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];
    if (!email) {
      errors.push("Email is required");
    }
    if (email && !email.includes('@')) {
      errors.push("Email must contain an @");
    }

    setValidationErrors(errors);
  }, [email, password]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const demoLogin = async (e) => {
    e.preventDefault();

    const demoEmail = "demo@aa.io";
    const demoPassword = "password";

    setEmail(demoEmail);
    setPassword(demoPassword);
    dispatch(sessionActions.login("demo@aa.io", "password"));
  };

  const onCheck = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length !== 0) return;

    const user = users.find((user) => user.email === email);
  
    if (user) {
        setShowPassword(!showPassword);
        setShowCheck(!showCheck);
        setShowLogin(!showLogin);      
    } else {
        setShowCheck(!showCheck);
        setShowSignUp(!showSignUp);
        setShowLoginForm(!showLoginForm);      
    }

    setHasSubmitted(false);
    setValidationErrors([]);
  };

  const onCancel = () => {
    setShowCheck(!showCheck);
    setShowSignUp(!showSignUp);
    setShowLoginForm(!showLoginForm);
  }

  const onLogin = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
  
    if (validationErrors.length !== 0) return;

    await dispatch(login(email, password));

    setHasSubmitted(false);
    setValidationErrors([]);

  };

  return (
    <>
      <ul className="auth-slideshow">
        <li>
          <span>Image 01</span>
        </li>
        <li>
          <span>Image 02</span>
        </li>
        <li>
          <span>Image 03</span>
        </li>
        <li>
          <span>Image 04</span>
        </li>
        <li>
          <span>Image 05</span>
        </li>
        <li>
          <span>Image 06</span>
        </li>
      </ul>
      <form className="auth-form">
        {showLoginForm && (
          <>
            <img src={logo} alt="logo"/>

            <h3>Enter your email address to sign in or to create an account</h3>

            <div>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value) }
              />
            </div>
          </>
        )}
        <div>
          {showPassword && (
            <div>
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value) }
              />
            </div>
          )}

          <div>
            {hasSubmitted && validationErrors.length > 0 && (
            validationErrors.map((error, ind) => (
              <div className="auth-form__error" key={ind}>{error}</div>
            )))}
          </div>
          {showCheck && (
            <>
              <p>
                When you enter your email address and click continue we will
                determine if you already have an account or not and get you to
                the right place.
              </p>
              <button
                type="submit"
                className="auth-form__button"
                onClick={onCheck}
              >
                Continue
              </button>
              <button
                type="submit"
                className="auth-form__button"
                onClick={demoLogin}
              >
                Demo Login
              </button>
            </>
          )}
          {showLogin && (
            <button type="submit" className="auth-form__button" onClick={onLogin}>
              Login
            </button>
          )}

          {showSignUp && (
            <>
              <SignUpForm email={email} />
              <button onClick={onCancel} className="auth-form__button">Cancel</button>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default LoginForm;
