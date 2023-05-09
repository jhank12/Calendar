import React, { useState, useContext, useRef, useEffect } from "react";

import { AuthContext } from "../../../Contexts/AuthContext";

import { Link } from "react-router-dom";

// components

import ModalContainer from "../../ReusableComponents/ModalContainer/ModalContainer";
import LabelInputWrap from "../../ReusableComponents/LabelInputWrap/LabelInputWrap";

const ForgotPassword = () => {
  const { passwordReset, setEmailSuccess, emailSuccess } = useContext(AuthContext);



  useEffect(() => {
   setEmailSuccess(false)
  }, [])

  const emailRef = useRef(null);

  const formSubmit =  (e) => {
    e.preventDefault();
    passwordReset(emailRef.current.value);
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
                <input ref={emailRef}  />
              </LabelInputWrap>
            </div>

            <button className="formSubmit">Send Reset Link</button>
          </form>
          <Link to='/'>Back to Login</Link>
        </>
      ) : (
        <>
          <h2>Check your email</h2>

          <p>
            A password reset link has been sent to: {emailRef.current.value}
          </p>

          <Link to='/' onClick={() => setEmailSuccess(false)}>Back to login</Link>
        </>
      )}
    </ModalContainer>
  );
};

export default ForgotPassword;