import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import * as sessionActions from "../../store/session";

import "./auth.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showCheck, setShowCheck] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  let showHistory = 0;

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

    users.map((aUser) => {
      if (aUser.email === email) {
        setShowPassword(!showPassword);
        setShowCheck(!showCheck);
        setShowLogin(!showLogin);
      } else {
        showHistory += 1;
      }
    });
    if (showHistory === users.length) {
      history.push("/sign-up");
    }
  };

  const onLogin = async (e) => {
    e.preventDefault();

    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form className="login__form">
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
        <h3>Enter your email address to sign in or to create an account</h3>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          className="login__form-email"
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        {showPassword && (
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
        )}
        {showCheck && (
          <button type="submit" className="login__form-btn" onClick={onCheck}>
            Check
          </button>
        )}
        {showLogin && (
          <button type="submit" className="login__form-btn" onClick={onLogin}>
            Login
          </button>
        )}
          <button type="submit" className="login__form-btn" onClick={demoLogin}>
            Demo Login
          </button>        
      </div>
    </form>
  );
};

export default LoginForm;
