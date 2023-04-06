import React, { useState } from "react";
import { useAppDispatch } from "../state/store";
import { useFormik } from "formik";
import { appLogin, appSignup } from "../state/slices/authSlice";
import "../styles/loginSignup.scss";

const LoginAndSignup = () => {
  const dispatch = useAppDispatch();
  const [mod, setmod] = useState(true);
  const login = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { email, password } = values;

      dispatch(appLogin({ email, password }));
    },
  });
  const signup = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { email, password, firstName, lastName } = values;
      alert(JSON.stringify({ firstName, lastName }, null, 2));
      dispatch(appSignup({ email, password, firstName, lastName }));
    },
  });

  return (
    <div className="container">
      {mod ? (
        <form onSubmit={login.handleSubmit}>
          <input
            id="email"
            placeholder="E-Mail"
            name="email"
            type="email"
            onChange={login.handleChange}
            value={login.values.email}
          />
          <input
            id="password"
            placeholder="Password"
            name="password"
            type="password"
            onChange={login.handleChange}
            value={login.values.password}
          />
          <button type="submit">Login</button>
          <p
            onClick={() => {
              setmod(!mod);
            }}
          >
            Singn up for click
          </p>
        </form>
      ) : (
        <form onSubmit={signup.handleSubmit}>
          <input
            placeholder="first Name"
            id="firstName"
            name="firstName"
            type="text"
            onChange={signup.handleChange}
            value={signup.values.firstName}
          />
          <input
            placeholder="Last Name"
            id="lastName"
            name="lastName"
            type="text"
            onChange={signup.handleChange}
            value={signup.values.lastName}
          />
          <input
            placeholder="E-Mail"
            id="email"
            name="email"
            type="email"
            onChange={signup.handleChange}
            value={signup.values.email}
          />
          <input
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            onChange={signup.handleChange}
            value={signup.values.password}
          />
          <button type="submit">Signup</button>
          <p
            onClick={() => {
              setmod(!mod);
            }}
          >
            Login for click
          </p>
        </form>
      )}
    </div>
  );
};

export default LoginAndSignup;
