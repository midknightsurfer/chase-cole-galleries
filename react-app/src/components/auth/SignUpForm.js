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

  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];
    setHasSubmitted(false);
    if (!firstName) {
      errors.push("First Name is required");
    }
    if (!lastName) {
      errors.push("Last Name is required");
    }
    if (!emailAddress) {
      errors.push("Email is required");
    }
    if (!password) {
      errors.push("Password is required");
    }
    if (!repeatPassword) {
      errors.push("Repeat Password is required");
    }
    if (password !== repeatPassword) {
      errors.push("Passwords do not match");
    }

    setValidationErrors(errors);
  }, [firstName, lastName, password, repeatPassword, emailAddress]);

  const onSignUp = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length !== 0) return;

    await dispatch(signUp(firstName, lastName, email, password));

    setHasSubmitted(false);
    setValidationErrors([]);
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
        {hasSubmitted &&
          validationErrors.length > 0 &&
          validationErrors.map((error, ind) => (
            <div className="auth-form__error" key={ind}>
              {error}
            </div>
          ))}
      </div>
      <button type="submit" onClick={onSignUp} className="auth-form__button">
        Sign Up
      </button>
    </>
  );
};

export default SignUpForm;
