import React, { useContext, useRef, useState } from "react";

import LabelInputWrap from "../../ReusableComponents/LabelInputWrap/LabelInputWrap";
import ModalContainer from "../../ReusableComponents/ModalContainer/ModalContainer";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../Contexts/AuthContext";

import { setDoc, doc } from "firebase/firestore";

import { db, auth } from "../../../firebase/config";

import { useNavigate } from "react-router-dom";


const Signup = () => {
  const { createUser, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  const [passwordError, setPasswordError] = useState(false);

  const formSubmit = async (e) => {
    e.preventDefault();
    setPasswordError(false);

    if (passwordRef.current.value === passwordConfirmRef.current.value) {
      await createUser(emailRef.current.value, passwordRef.current.value);

      await setDoc(doc(db, "users", auth.currentUser.uid), {
        email: auth.currentUser.email,
      });

      navigate("/home");


    } else {
      // alert("Passwords don't match");
      setPasswordError(true);
    }

    
  };

  return (
    <ModalContainer>
      <h1>Signup</h1>

      <form onSubmit={formSubmit}>
        <div className="formInputs">
          <LabelInputWrap>
            <label>Email</label>
            <input ref={emailRef} required/>
          </LabelInputWrap>

          <LabelInputWrap>
            <label>Password</label>
            <input ref={passwordRef} required/>
          </LabelInputWrap>

          <LabelInputWrap>
            <label>Confirm Password</label>
            <input ref={passwordConfirmRef} required/>
          </LabelInputWrap>
        </div>

        {passwordError && (
          <p className="errorText">The passwords don't match</p>
        )}

        <button className="formSubmit">Sign Up</button>
      </form>

      <p>
        Already a User? <Link to="/">Back to Login</Link>
      </p>
    </ModalContainer>
  );
};

export default Signup;
