import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useCallback, useState } from "react";
import { auth } from "./firebase/firebase";

const SignUp = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");



    const register = async () => {
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
          );
          console.log(user);
        } catch (error) {
          console.log(error.message);
        }
      };

    function setRegisterEmailHandler(e) {
        setRegisterEmail(e.currentTarget.value);
      }
      function setRegisterPasswordHandler(e) {
        setRegisterPassword(e.currentTarget.value);
      }


  return (
    <div>
      <h3> Register User </h3>
      <input placeholder="Email..." onChange={setRegisterEmailHandler} />
      <input placeholder="Password..." onChange={setRegisterPasswordHandler} />

      <button onClick={register}> Create User</button>
    </div>
  );
};

export default SignUp;
