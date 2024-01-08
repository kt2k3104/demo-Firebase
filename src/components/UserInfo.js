import React, { useContext } from "react";
import styles from "./UserInfo.module.css";
import UserContext from "../contexts/UserContext";

function UserInfo({ user }) {
  const userCtx = useContext(UserContext);
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h2 className={styles.name}>{user?.username}</h2>
        <p className={styles.contact}>{user?.email}</p>
        <p className={styles.contact}>{user?.phone}</p>
        <p className={styles.admin}>{user?.admin}</p>
      </div>
      <div className={styles.right}>
        <img src={user?.avatarUrl} alt="avt" width={100} height={100} />
        <button
          className={styles.deleteBtn}
          onClick={() => {
            userCtx.deleteUser(user.uid, user.filenameRef);
          }}
        >
          Delete
        </button>
        <button
          className={styles.editBtn}
          onClick={() => {
            userCtx.updateUser(user.uid, { ...user, username: "tendasua" });
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default UserInfo;
