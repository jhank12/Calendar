import React, {useState, useContext, useRef, useEffect} from "react";

import LabelInputWrap from "../../ReusableComponents/LabelInputWrap/LabelInputWrap";
import ModalContainer from "../../ReusableComponents/ModalContainer/ModalContainer";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../Contexts/AuthContext";
import { signOut } from "firebase/auth";

const Login = () => {

  const { login,signout } = useContext(AuthContext);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    signout()
  }, [])


  const formSubmit = (e) => {
    
    e.preventDefault();
    
    const hasString = emailRef.current.value.includes(' ') ? 'true' : 'false';
    
    

    login(emailRef.current.value, passwordRef.current.value)
    
  }


  return (
    <ModalContainer>
      <h1>Login</h1>


      <form onSubmit={formSubmit}>
        <div className='formInputs'>
          <LabelInputWrap>
            <label>Email</label>
            <input ref={emailRef} required/>
          </LabelInputWrap>

          <LabelInputWrap>
            <label>Password</label>
            <input ref={passwordRef} required/>
            <Link to='/forgot-password' className='linkRight'>Forgot Password?</Link>
          </LabelInputWrap>

        </div>
        


        <button className='formSubmit'>Log In</button>
      </form>
      <p>New User? <Link to='/signup'>Create Account</Link></p>


    </ModalContainer>
  );
};

export default Login;