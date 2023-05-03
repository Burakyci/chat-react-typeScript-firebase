import React, { useState } from "react";
import "../styles/loginSignup.scss";
import { useFormik } from "formik";
import { loginSchema, signupSchema } from "../helpers/validation";
import toast, { Toaster } from "react-hot-toast";
import { appLogin, appSignup } from "../state/slices/authSlice";
import { useAppDispatch, RootState } from "../state/store";
import { useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
const LoginAndSignup: React.FC = () => {
  const [mode, setMode] = useState(true);
  const dispatch = useAppDispatch();
  const { login, signup } = useSelector((state: RootState) => state.authSlice);

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
          <FaUserAlt className="avatar" />
          <input
            id="email"
            placeholder="E-Mail"
            name="email"
            type="email"
            onChange={formikLogin.handleChange}
            value={formikLogin.values.email}
          />
          {formikLogin.touched.email && formikLogin.errors.email ? (
            <p className="error">{formikLogin.errors.email}</p>
          ) : (
            <p></p>
          )}
          <input
            id="password"
            placeholder="Password"
            name="password"
            type="password"
            onChange={formikLogin.handleChange}
            value={formikLogin.values.password}
          />
          {formikLogin.touched.password && formikLogin.errors.password ? (
            <p>{formikLogin.errors.password}</p>
          ) : (
            <p></p>
          )}
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
          <FaUserAlt className="avatar" />
          <input
            placeholder="first Name"
            id="firstName"
            name="firstName"
            type="text"
            onChange={formikSignup.handleChange}
            value={formikSignup.values.firstName}
          />
          {formikSignup.touched.firstName && formikSignup.errors.firstName ? (
            <p className="error">{formikSignup.errors.firstName}</p>
          ) : (
            <p></p>
          )}
          <input
            placeholder="Last Name"
            id="lastName"
            name="lastName"
            type="text"
            onChange={formikSignup.handleChange}
            value={formikSignup.values.lastName}
          />
          {formikSignup.touched.lastName && formikSignup.errors.lastName ? (
            <p className="error">{formikSignup.errors.lastName}</p>
          ) : (
            <p></p>
          )}
          <input
            placeholder="E-Mail"
            id="email"
            name="email"
            type="email"
            onChange={formikSignup.handleChange}
            value={formikSignup.values.email}
          />
          {formikSignup.touched.email && formikSignup.errors.email ? (
            <p className="error"> {formikSignup.errors.email}</p>
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
            <p className="error">{formikSignup.errors.lastName}</p>
          ) : (
            <p></p>
          )}
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
