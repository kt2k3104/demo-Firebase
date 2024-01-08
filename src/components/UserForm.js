import React, { useContext } from "react";
import styles from "./UserFrom.module.css";
import UserContext from "../contexts/UserContext";
import firebase from "../firebaseConfig";

export default function UserForm() {
  const userCtx = useContext(UserContext);
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const avatar = await userCtx.saveImage(formData.get("avatar"));
    userCtx.saveUser({
      username: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      admin: firebase.auth.currentUser.displayName,
      avatarUrl: avatar.avatarUrl,
      filenameRef: avatar.filename,
    });

    e.target.reset();
  };
  return (
    <form className={styles.formGroup} onSubmit={handleSubmitLogin}>
      <div className={styles.inputBox}>
        <label htmlFor="name" className={styles["inputBox-label"]}>
          Name
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
        <label htmlFor="phone" className={styles["inputBox-label"]}>
          Phone Number
        </label>
        <input type="text" name="phone" />
      </div>
      <div className={styles.inputBox}>
        <label htmlFor="avatar" className={styles["inputBox-label"]}>
          Your avatar
        </label>
        <input type="file" name="avatar" />
      </div>
      <button type="submit" className={styles.buttonSubmit}>
        Save
      </button>
    </form>
  );
}
