import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startLogin, startLoginGoogle } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    email: "pedro@outlook.com",
    password: "123456",
  });

  const { email, password } = formValues;
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(email, password));
  };

  const handleLoginGoogle = () => {
    dispatch(startLoginGoogle());
  };

  return (
    <>
      <h3 className="auth__title">Login</h3>
      <form onSubmit={handleLogin}>
        <input
          className="auth__input"
          value={email}
          onChange={handleInputChange}
          type="text"
          name="email"
          placeholder="Email..."
          autoComplete="off"
        />
        <input
          className="auth__input"
          value={password}
          onChange={handleInputChange}
          type="password"
          name="password"
          placeholder="Password..."
          autoComplete="off"
        />
        <button
          className="btn btn-primary btn-block"
          type="submit"
          disabled={loading}
        >
          Login
        </button>
        <hr />
        <div className="auth__social">
          <p>Login with social media</p>
          <div className="google-btn" onClick={handleLoginGoogle}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link className="link" to="/auth/register">
          Create new account
        </Link>
      </form>
    </>
  );
};
