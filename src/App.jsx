import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase/firebase";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Orders from "./Orders";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./firebase/useAuth";
import Login from "./Login";
import SignUp from "./SignUp";





function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <PrivateRoute exact path="/" element={<Orders/>} />
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/signup" element={<SignUp/>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
