import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useAppDispatch } from "../../state/store";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const dispatch = useAppDispatch();
  const mavigation = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(appSendPasswordResetEmail(email));
    console.log(email);
  };
  return (
    <div className="loginContainer">
      <div className="field">
        <form onSubmit={handleSubmit}>
          <div className="inputContainer">
            <input
              id="email"
              placeholder="E-Mail"
              name="email"
              type="email"
              autoCapitalize="off"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="button3">
            Reset Password
          </button>
        </form>
        <button
          className="button3"
          onClick={() => {
            mavigation(-1);
          }}
        >
          <BsArrowReturnLeft />
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
function appSendPasswordResetEmail(email: string): any {
  throw new Error("Function not implemented.");
}
