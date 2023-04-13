import React, { useState } from "react";
import { useAppDispatch, RootState } from "../state/store";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { appLogin, appSignup } from "../state/slices/authSlice";
import "../styles/loginSignup.scss";
import { useSelector } from "react-redux";
import { loginSchema, signupSchema } from "../helpers/validation";
const LoginAndSignup = () => {
  const [mode, setMode] = useState(true);
  const dispatch = useAppDispatch();
  const { login, signup } = useSelector((state: RootState) => state.authSlice);
  const formikLogin = useFormik({
    initialValues: {
      email: "deneme@deneme.com",
      password: "123123",
    },

    onSubmit: async (values) => {
      toast("kanka hbb");
      dispatch(appLogin(values));
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
      toast("hayirli olsun kankk");
      const { email, password, firstName, lastName } = values;
      dispatch(appSignup({ email, password, firstName, lastName }));
    },
    validationSchema: signupSchema,
  });
  console.log(formikSignup.errors);
  console.log(formikLogin.errors);
  React.useEffect(() => {
    const { loading, error } = login;
    if (loading === false && error !== null) {
      alert(error);
    }
  }, [login]);
  React.useEffect(() => {
    const { loading, error } = signup;
    if (loading === false && error !== null) {
      alert(error);
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
          <input
            id="password"
            placeholder="Password"
            name="password"
            type="password"
            onChange={formikLogin.handleChange}
            value={formikLogin.values.password}
          />
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
          <input
            placeholder="Last Name"
            id="lastName"
            name="lastName"
            type="text"
            onChange={formikSignup.handleChange}
            value={formikSignup.values.lastName}
          />
          <input
            placeholder="E-Mail"
            id="email"
            name="email"
            type="email"
            onChange={formikSignup.handleChange}
            value={formikSignup.values.email}
          />
          <input
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            onChange={formikSignup.handleChange}
            value={formikSignup.values.password}
          />
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
