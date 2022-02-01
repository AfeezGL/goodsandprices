import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearAlert, login } from "../redux/auth/AuthSlice";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const status = useSelector((state) => state.auth.status);
  const alert = useSelector((state) => state.auth.alert);

  const submit = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="container">
      <h1>Login</h1>
      {alert && (
        <Alert alert={alert} clearAlert={() => dispatch(clearAlert())} />
      )}
      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {status === "busy" ? <Spinner /> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
