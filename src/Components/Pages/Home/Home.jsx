import React, { useEffect, useState } from "react";

import Calendar from "../../Calendar/Calendar";
import Sidebar from "../../Sidebar/Sidebar";

import { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";

import { db } from "../../../firebase/config";

import { onSnapshot, doc } from "firebase/firestore";

import { setAllEvents } from "../../../Redux/Slices/EventReducer";

import { useDispatch } from "react-redux";

import styles from './Home.module.css'

const Home = () => {
  const dispatch = useDispatch();

  const { currentUser } = useContext(AuthContext);


  function getUserData() {
    onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
      if (doc.data().events) {
        dispatch(setAllEvents(doc.data().events));
      } else {
        return
      }
    });
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
    {/* <h1>on log in screen in the background have snapshot of home page with layer blur and maybe a modal that explains project</h1> */}
        <Calendar currentUser={currentUser}  />
    </>
  );
};

export default Home;
