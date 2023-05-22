import React from "react";

import styles from "./Sidebar.module.css";

import { useContext } from "react";

import { AuthContext } from "../../Contexts/AuthContext";

const Sidebar = ({ setSidebarOpen, setAddEventOpen }) => {
  const { signout } = useContext(AuthContext);

  return (
    <div className={styles.sidebar}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="45"
        height="45"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
        onClick={() => setSidebarOpen(false)}
      >
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
      </svg>

      <div className={styles.sidebarOptions}>
        <p onClick={() => setAddEventOpen(true)}>Add Event</p>
        <p onClick={() => signout()}>Signout</p>
      </div>
    </div>
  );
};

export default Sidebar;