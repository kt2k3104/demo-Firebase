import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import firebase from "../firebaseConfig";

const AuthContext = React.createContext({
  isLogin: false,
  isSignup: false,
  currentUser: {},
  setIsLogin: () => {},
  setIsSignup: () => {},
  handleSignup: (email, password) => {},
  handleLogin: (email, password) => {},
  handleLogout: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleSignup = async (name, email, password) => {
    try {
      const user = await createUserWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );
      if (user.user) {
        await updateProfile(firebase.auth.currentUser, { displayName: name });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );
      console.log(user);
      if (user) {
        setIsLogin(true);
        setCurrentUser(firebase.auth.currentUser);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = async () => {
    console.log("logout ngoai");

    signOut(firebase.auth)
      .then((data) => {
        console.log(data);
        console.log(firebase.auth.currentUser);
        setIsLogin(false);
        setCurrentUser(null);
      })
      .catch((err) => console.log(err));
    // try {
    //   const response = await signOut(firebase.auth);
    //   console.log(response);
    //   if (response) {
    //     console.log("logout trong");
    //     setIsLogin(false);
    //     setCurrentUser(null);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        isSignup,
        currentUser,
        setIsLogin,
        setIsSignup,
        handleSignup,
        handleLogin,
        handleLogout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
