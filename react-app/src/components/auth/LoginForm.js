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

  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const errors = []
    setHasSubmitted(false);
    if (!email) {
      errors.push(["Email: This field is required."]);
    }
    if (!email.includes("@")) {
      errors.push(["Email: This field must contain an @."]);
    }
    setErrors(errors)
  }, [email]);

  useEffect(() => {
    setErrors([]);
    setHasSubmitted(false);
  }, [password]);

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
    if (errors.length) return;

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
    
  };

  const onCancel = () => {
    setShowCheck(!showCheck);
    setShowSignUp(!showSignUp);
    setShowLoginForm(!showLoginForm);
  };

  const onCancelLogin = () => {
    setShowCheck(!showCheck);
    setShowPassword(!showPassword);
    setShowLogin(!showLogin);
  };  

  const onLogin = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }

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
            <img className="auth-logo" src={logo} alt="logo" />

            <h3>Enter your email address to sign in or to create an account</h3>


              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

          </>
        )}
        <div>
          {showPassword && (
            <div>
              <label htmlFor="Password">Password</label>
              <input
                name="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}

          <div>
            {hasSubmitted && errors.length > 0 &&
              errors.map((error, ind) => (
                <div className="auth-form__error" key={ind}>
                  {error}
                </div>
              ))}
          </div>
          {showCheck && (
            <>
              <p>
                When you enter your email address and click continue we will
                determine if you already have an account or not and get you to
                the right place.
              </p>
              <div className="auth-form__buttonContainer">
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
              </div>

            </>
          )}
          {showLogin && (
            <>
              <button
                type="submit"
                className="auth-form__button auth-float"
                onClick={onLogin}
              >
                Login
              </button>
              <button onClick={onCancelLogin} className="auth-form__button">
              Cancel
            </button>            
            </>

          )}

          {showSignUp && (
            <>
              <SignUpForm email={email} />
              <button onClick={onCancel} className="auth-form__button">
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default LoginForm;
