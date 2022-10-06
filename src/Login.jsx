import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useCallback, useContext, useState } from "react";
import {useNavigate } from "react-router-dom";
import { auth } from "./firebase/firebase";
import { AuthContext } from "./firebase/useAuth";

const Login = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({});



    const login = async () => {
        try {
          const user = await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
          );
          console.log(user);
        } catch (error) {
          console.log(error.message);
        }
      };


      const logout = async () => {
        await signOut(auth);
      };

      
      const navigate = useNavigate()
  
      
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return navigate("/")
    
  }

  return (
    <>
      <div>
          <h3> Login </h3>
          <input
            placeholder="Email..."
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <input
            placeholder="Password..."
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />

          <button onClick={login}> Login</button>
        </div>

        <h4> User Logged In: </h4>
        {user?.email}
        <button onClick={logout}> Sign Out </button>
    </>
  );
};

export default Login;