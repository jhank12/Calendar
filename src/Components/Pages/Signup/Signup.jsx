import React, {useContext, useRef} from "react";

import LabelInputWrap from "../../ReusableComponents/LabelInputWrap/LabelInputWrap";
import ModalContainer from "../../ReusableComponents/ModalContainer/ModalContainer";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../Contexts/AuthContext";


const Signup = () => {


  const { createUser } = useContext(AuthContext);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);


  const formSubmit = (e) => {
    e.preventDefault();

    if(passwordRef.current.value === passwordConfirmRef.current.value) {
      createUser(emailRef.current.value, passwordRef.current.value)

    } else {
      alert('Passwords don\'t match')
    }


  }



  return (
    <ModalContainer>
      <h1>Signup</h1>


      <form onSubmit={formSubmit}>
        <div className='formInputs'>
          <LabelInputWrap>
            <label>Email</label>
            <input ref={emailRef}/>
          </LabelInputWrap>

          <LabelInputWrap>
            <label>Password</label>
            <input ref={passwordRef} />
          </LabelInputWrap>

          <LabelInputWrap>
            <label>Confirm Password</label>
            <input ref={passwordConfirmRef} />
          </LabelInputWrap>

        </div>
        


        <button className='formSubmit'>Sign Up</button>
      </form>

      <p>Already a User? <Link to='/'>Back to Login</Link></p>
    </ModalContainer>
  );
};

export default Signup;
