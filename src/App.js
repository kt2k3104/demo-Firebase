import { useContext, useEffect } from "react";
import "./App.css";
import LoginFrom from "./components/LoginFrom";
import Navigation from "./components/Navigation";
import SigninForm from "./components/SigninForm";
import UserForm from "./components/UserForm";
import AuthContext from "./contexts/AuthContext";
import UserContext from "./contexts/UserContext";
import UserInfo from "./components/UserInfo";

function App() {
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    userCtx.getAllUser();
  }, []);

  return (
    <div className="container">
      <Navigation />
      {authCtx.isLogin && <UserForm />}
      {!authCtx.isLogin && authCtx.isSignup && <SigninForm />}
      {!authCtx.isLogin && !authCtx.isSignup && <LoginFrom />}
      {authCtx.isLogin &&
        userCtx.users.map((user, index) => {
          return <UserInfo key={index} user={user} />;
        })}
    </div>
  );
}

export default App;
