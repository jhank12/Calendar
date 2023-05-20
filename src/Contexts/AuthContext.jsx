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
    return signInWithEmailAndPassword(auth, email, password);
  }

  const createUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // const passwordReset = async (email) => {
  //   try {
  //     await sendPasswordResetEmail(auth, email);
  //     setEmailSuccess(true);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  const passwordReset = async (email) => {
    return sendPasswordResetEmail(auth, email);
  }

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
      
        signout,
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
