import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyA6g1CYCXGwKeTaibzLeyjkbVyBAl_i9m8",
  authDomain: "orders-app-test.firebaseapp.com",
  projectId: "orders-app-test",
  storageBucket: "orders-app-test.appspot.com",
  messagingSenderId: "403840986114",
  appId: "1:403840986114:web:0c314288f6ad15abe00b1b"
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


