import React, { useContext } from "react";
import styles from "./LoginFrom.module.css";
import AuthContext from "../contexts/AuthContext";

export default function LoginFrom() {
  const authCtx = useContext(AuthContext);
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    authCtx.handleLogin(formData.get("email"), formData.get("password"));
  };

  return (
    <form className={styles.formGroup} onSubmit={handleSubmitLogin}>
      <div className={styles.inputBox}>
        <label htmlFor="email" className={styles["inputBox-label"]}>
          E-mail
        </label>
        <input type="text" name="email" />
      </div>

      <div className={styles.inputBox}>
        <label htmlFor="password" className={styles["inputBox-label"]}>
          Password
        </label>
        <input type="text" name="password" />
      </div>

      <button type="submit" className={styles.buttonSubmit}>
        login
      </button>
    </form>
  );
}
