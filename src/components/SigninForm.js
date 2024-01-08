import React, { useContext } from "react";
import styles from "./SigninFrom.module.css";
import AuthContext from "../contexts/AuthContext";

export default function SigninForm() {
  const authCtx = useContext(AuthContext);
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
    authCtx.handleSignup(
      formData.get("name"),
      formData.get("email"),
      formData.get("password")
    );
    authCtx.setIsSignup(false);
  };
  return (
    <form className={styles.formGroup} onSubmit={handleSubmitLogin}>
      <div className={styles.inputBox}>
        <label htmlFor="name" className={styles["inputBox-label"]}>
          Username
        </label>
        <input type="text" name="name" />
      </div>
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
      <div className={styles.inputBox}>
        <label htmlFor="repassword" className={styles["inputBox-label"]}>
          Confirm Password
        </label>
        <input type="text" name="repassword" />
      </div>

      <button type="submit" className={styles.buttonSubmit}>
        Signup
      </button>
    </form>
  );
}
