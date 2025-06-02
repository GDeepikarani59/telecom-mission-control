import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/authActions";
import styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, accessToken } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials));
  };

  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard");
    }
  }, [accessToken, navigate]);

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
        aria-describedby={error ? "error-message" : undefined}
        noValidate
      >
        <h2 tabIndex={-1}>Login</h2>

        {error && (
          <p
            id="error-message"
            className={styles.error}
            role="alert"
            aria-live="assertive"
          >
            {error}
          </p>
        )}

        <label htmlFor="username" className={styles.label}>
          User Name
        </label>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="Enter your user name"
          value={credentials.username}
          onChange={handleChange}
          required
          autoComplete="username"
          className={styles.input}
          aria-invalid={!!error}
        />

        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={credentials.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
          className={styles.input}
          aria-invalid={!!error}
        />

        <button
          type="submit"
          disabled={loading}
          className={styles.button}
          aria-busy={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
