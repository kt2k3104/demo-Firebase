import React, { useState } from "react";
import * as database from "firebase/database";
import * as storage from "firebase/storage";
import { v4 } from "uuid";

const UserContext = React.createContext({
  users: [],
  saveUser: (user) => {},
  getUser: (userUid) => {},
  getAllUser: () => {},
  updateUser: (updateData, userUid) => {},
  deleteUser: (userUid) => {},
  saveImage: (image) => {},
});

export const UserContextProvider = (props) => {
  const [users, setUsers] = useState([]);

  // save data
  async function saveUser(user) {
    try {
      const db = database.getDatabase();

      const usersRef = database.ref(db, "users");
      const newUserRef = database.push(usersRef);

      await database.set(newUserRef, { ...user });

      getAllUser();
    } catch (error) {
      console.log(error);
    }
  }

  // get data
  async function getAllUser() {
    const users = [];

    try {
      const db = database.getDatabase();
      const dbRef = database.ref(db);

      const snapshots = await database.get(database.child(dbRef, "users"));
      snapshots.forEach((snapshot) => {
        users.push({
          ...snapshot.val(),
          uid: snapshot.key,
        });
      });

      setUsers(users);
    } catch (error) {
      console.log(error);
    }
  }

  // get data
  async function getUser(userUid) {
    try {
      const db = database.getDatabase();
      const dbRef = database.ref(db);

      const userSnapshot = await database.get(
        database.child(dbRef, `users/${userUid}`)
      );

      console.log(userSnapshot.val());
    } catch (error) {
      console.log(error);
    }
  }

  // update data
  async function updateUser(userUid, updateData) {
    try {
      const db = database.getDatabase();
      const updates = {};

      updates[`/users/${userUid}`] = updateData;

      await database.update(database.ref(db), updates);

      getAllUser();
    } catch (error) {
      console.log(error);
    }
  }

  // delete data
  async function deleteUser(userUid, filenameRef) {
    try {
      const db = database.getDatabase();
      const removedUserRef = database.ref(db, `users/${userUid}`);

      await database.remove(removedUserRef);

      const avatarRef = storage.ref(
        storage.getStorage(),
        "/avatars/" + filenameRef
      );
      storage.deleteObject(avatarRef);

      getAllUser();
    } catch (error) {
      console.log(error);
    }
  }

  // saved image
  async function saveImage(imageFile) {
    const filename = `${v4()}-${imageFile.name}`;
    try {
      const st = storage.getStorage();
      const avatarRef = storage.ref(st, "/avatars/" + filename);
      await storage.uploadBytes(avatarRef, imageFile);
      const avatarUrl = await storage.getDownloadURL(avatarRef);

      return { avatarUrl, filename };
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UserContext.Provider
      value={{
        users,
        saveUser,
        getUser,
        getAllUser,
        updateUser,
        deleteUser,
        saveImage,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
