import React, { useEffect } from "react";

import Calendar from "../../Calendar/Calendar";

import { useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext";

import { db } from "../../../firebase/config";

import { onSnapshot, doc } from "firebase/firestore";

import { setAllEvents } from "../../../Redux/Slices/EventReducer";

import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    function getUserData() {
      onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        if (doc.data().events) {
          dispatch(setAllEvents(doc.data().events));
        } else {
          return;
        }
      });
    }
    getUserData();
  }, []);

  return (
    <>
      {/* <h2>todo:account signout button hover add new event color radio input</h2> */}
      <Calendar />
    </>
  );
};

export default Home;
