import React, { useContext } from "react";
import styles from "./Navigation.module.css";
import AuthContext from "../contexts/AuthContext";

export default function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <div className={styles.navWrapper}>
      <p>{authCtx.currentUser?.displayName}</p>
      {authCtx.isLogin && (
        <button className={styles.buttonNav}>Add User</button>
      )}
      {!authCtx.isLogin && (
        <button
          className={styles.buttonNav}
          onClick={() => {
            authCtx.setIsSignup(false);
          }}
        >
          Login
        </button>
      )}
      {!authCtx.isLogin && (
        <button
          className={styles.buttonNav}
          onClick={() => {
            authCtx.setIsSignup(true);
          }}
        >
          Signup
        </button>
      )}
      {authCtx.isLogin && (
        <button
          className={styles.buttonNav}
          onClick={() => {
            authCtx.handleLogout();
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
}
