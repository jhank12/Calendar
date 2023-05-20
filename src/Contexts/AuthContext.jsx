import React, { useState, createContext, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

import { db, auth } from "../firebase/config";

import {setDoc, doc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { eventsReset } from "../Redux/Slices/EventReducer";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState(null);

  const [emailSuccess, setEmailSuccess] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsub();
  });

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(currentUser);
      console.log(auth.currentUser);

      navigate("/home");
    } catch (err) {
      console.log(err.message);

      return err
    }
  };

  const createUser = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log(currentUser);
      console.log(auth.currentUser);
      setDoc(doc(db, "users", auth.currentUser.uid), {
        email: auth.currentUser.email,
      });

      navigate("/home");
    } catch (err) {
      console.log(err.message);
    }
  };

  const passwordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSuccess(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  const signout = async () => {
    try {
      await signOut(auth);
      dispatch(eventsReset())
      navigate('/')
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        createUser,
        passwordReset,
        emailSuccess,
        setEmailSuccess,
        signout,
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
