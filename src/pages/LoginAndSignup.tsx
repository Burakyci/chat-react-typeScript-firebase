import React, { useState } from "react";
import "../styles/loginSignup.scss";
import { useFormik } from "formik";
import { loginSchema, signupSchema } from "../helpers/validation";
import toast, { Toaster } from "react-hot-toast";
import { appLogin, appSignup } from "../state/slices/authSlice";
import { useAppDispatch, RootState } from "../state/store";
import { useSelector } from "react-redux";
import { ChildProcess } from "child_process";
const LoginAndSignup = () => {
  const [mode, setMode] = useState(true);
  const dispatch = useAppDispatch();
  const { login, signup, user } = useSelector(
    (state: RootState) => state.authSlice
  );

  const formikLogin = useFormik({
    initialValues: {
      email: "deneme@deneme.com",
      password: "123123",
    },

    onSubmit: async (values) => {
      await dispatch(appLogin(values));
    },
    validationSchema: loginSchema,
  });

  const formikSignup = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      const { email, password, firstName, lastName } = values;
      dispatch(appSignup({ email, password, firstName, lastName }));
    },
    validationSchema: signupSchema,
  });

  React.useEffect(() => {
    const { loading, error } = login;
    if (loading === false && error !== null) {
      toast.error("hatali giris yaptin hadiii");
    }
  }, [login]);
  React.useEffect(() => {
    const { loading, error } = signup;
    if (loading === false && error !== null) {
      toast.error("birseyleri yanlis gitti opss..");
    }
  }, [signup]);

  return (
    <div className="container">
      <Toaster />
      {mode ? (
        <form onSubmit={formikLogin.handleSubmit}>
          <input
            id="email"
            placeholder="E-Mail"
            name="email"
            type="email"
            onChange={formikLogin.handleChange}
            value={formikLogin.values.email}
          />
          {formikLogin.touched.email && formikLogin.errors.email ? (
            <div style={{ color: "red" }}>{formikLogin.errors.email}</div>
          ) : null}
          <input
            id="password"
            placeholder="Password"
            name="password"
            type="password"
            onChange={formikLogin.handleChange}
            value={formikLogin.values.password}
          />
          {formikLogin.touched.password && formikLogin.errors.password ? (
            <div style={{ color: "red" }}>{formikLogin.errors.password}</div>
          ) : null}
          <button disabled={login.loading} type="submit">
            {login.loading ? "Loading..." : "Login"}
          </button>{" "}
          <p
            onClick={() => {
              setMode(!mode);
            }}
          >
            Singn up for click
          </p>
        </form>
      ) : (
        <form onSubmit={formikSignup.handleSubmit}>
          <input
            placeholder="first Name"
            id="firstName"
            name="firstName"
            type="text"
            onChange={formikSignup.handleChange}
            value={formikSignup.values.firstName}
          />
          {formikSignup.touched.firstName && formikSignup.errors.firstName ? (
            <div style={{ color: "red" }}>{formikSignup.errors.firstName}</div>
          ) : null}
          <input
            placeholder="Last Name"
            id="lastName"
            name="lastName"
            type="text"
            onChange={formikSignup.handleChange}
            value={formikSignup.values.lastName}
          />
          {formikSignup.touched.lastName && formikSignup.errors.lastName ? (
            <div style={{ color: "red" }}>{formikSignup.errors.lastName}</div>
          ) : null}
          <input
            placeholder="E-Mail"
            id="email"
            name="email"
            type="email"
            onChange={formikSignup.handleChange}
            value={formikSignup.values.email}
          />
          {formikSignup.touched.email && formikSignup.errors.email ? (
            <div style={{ color: "red" }}>{formikSignup.errors.email}</div>
          ) : null}
          <input
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            onChange={formikSignup.handleChange}
            value={formikSignup.values.password}
          />
          {formikSignup.touched.password && formikSignup.errors.password ? (
            <div style={{ color: "red" }}>{formikSignup.errors.lastName}</div>
          ) : null}
          <button disabled={signup.loading} type="submit">
            {signup.loading ? "Loading..." : "Signup"}
          </button>{" "}
          <p
            onClick={() => {
              setMode(!mode);
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
