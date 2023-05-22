import React, { useContext, useRef, useState } from "react";

import { AuthContext } from "../../../Contexts/AuthContext";

import { Link } from "react-router-dom";

import ModalContainer from "../../ReusableComponents/ModalContainer/ModalContainer";
import LabelInputWrap from "../../ReusableComponents/LabelInputWrap/LabelInputWrap";

const ForgotPassword = () => {
  const { passwordReset } = useContext(AuthContext);

  const [emailSuccess, setEmailSuccess] = useState(false);

  const [hasError, setHasError] = useState(false);

  const [ email, setEmail ] = useState(null);


  const formSubmit = async (e) => {
    e.preventDefault();

    setHasError(false);


    try {
      await passwordReset(email);

      setEmailSuccess(true);
    } catch {
      setHasError(true);
    }
  };

  return (
    <ModalContainer>
      {!emailSuccess ? (
        <>
          <h2>Forgot Password?</h2>

          <form onSubmit={formSubmit}>
            <div className="formInputs">
              <LabelInputWrap>
                <label>Email</label>
                <input onChange={(e) => setEmail(e.target.value)}/>
              </LabelInputWrap>
            </div>

            {hasError && (
              <p className="errorText">Error: No user found with this email</p>
            )}

            <button className="formSubmit">Send Reset Link</button>
          </form>
          <Link to="/">Back to Login</Link>
        </>
      ) : (
        <>
          <h2>Check your email</h2>

          <p>
            A password reset link has been sent to: {email}
          </p>

          <Link to="/" onClick={() => setEmailSuccess(false)}>
            Back to login
          </Link>
        </>
      )}
    </ModalContainer>
  );
};

export default ForgotPassword;
