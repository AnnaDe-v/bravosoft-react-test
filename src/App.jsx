import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Orders from "./Orders";
import { AuthProvider } from "./firebase/AuthProvider";
import Login from "./Login";
import SignUp from "./SignUp";
import PrivateRoute from "./PrivateRoute";





function App() {


  return (
    <>
      {/* <AuthProvider> */}
        <BrowserRouter>
          <Routes>
            <Route index element={<Orders/>} />
            <Route exact path="login" element={<Login/>}/>
            <Route exact path="signup" element={<SignUp/>}/>
          </Routes>
        </BrowserRouter>
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
