import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/session";

const SignUpForm = ({ email }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState(email);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [errors, setErrors] = useState([]);

  useEffect (() => {
    setErrors([]);
  }, [firstName, lastName, emailAddress, password, repeatPassword]);


  const onSignUp = async (e) => {
    e.preventDefault();

    const data = await dispatch(
      signUp(firstName, lastName, emailAddress, password, repeatPassword)
    );

    if (data) {
      setErrors(data);
    }
  };

  return (
    <>
      <h3>Sign Up</h3>

        <div>
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          ></input>
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
        </div>
        <div>
          <label>Repeat Password</label>
          <input
            type="password"
            name="repeat_password"
            onChange={(e) => setRepeatPassword(e.target.value)}
            value={repeatPassword}
          ></input>
        </div>
        <div>
          {errors.length > 0 &&
            errors.map((error, ind) => (
              <div className="auth-form__error" key={ind}>
                {error}
              </div>
            ))}
        </div>

        <button
          type="submit"
          onClick={onSignUp}
          className="auth-form__button auth-float"
        >
          Sign Up
        </button>

    </>
  );
};

export default SignUpForm;
