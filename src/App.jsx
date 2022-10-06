import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { createOrder } from "./api/createOrder";
import { getOrdersData } from "./api/getOrders";
import "./App.css";
import { auth } from "./firebase/firebase";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");



  const [user, setUser] = useState({});





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

  function setRegisterEmailHandler(e) {
    setRegisterEmail(e.currentTarget.value);
  }
  function setRegisterPasswordHandler(e) {
    setRegisterPassword(e.currentTarget.value);
  }
  



  const [ordersData, setOrdersData] = useState([]);
  const [textOrder, setTextOrder] = useState("");
  const [textSelect, setTextSelect] = useState("Иванов И. И.");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    getOrders();
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    })
  }, []);

  const getOrders = () => {
    return getOrdersData()
      .then((orders) => setOrdersData(orders))
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  };

  function handleEditInputValue(e) {
    setTextOrder(e.currentTarget.value);
  }

  function handleSelectValue(e) {
    setTextSelect(e.target.value);
  }

  const addNewOrder = (e) => {
    debugger
    e.preventDefault()
    const name = textSelect;
    const documentName = textOrder;
    console.log(textSelect, textOrder);
    if (
      ordersData.filter(
        (x) => x["name"] === textSelect && x["documentName"] === textOrder
      ) == false
    ) {
      setError(false);
      setIsLoading(true);
      console.log("Yep");
      return createOrder({ name, documentName })
        .then(() => getOrders())
        .then(() => {
          // setOrdersData(orders);
          setTextOrder("");
        })
        .catch((err) => {
          setError(true);
          console.error(err);
        })
        .finally(() => {
          setError(false)
          setIsLoading(false)
        })
    } else {
      setError(true);
    }
  };

  const filteredOrdersData = ordersData.reduce(function (o, i) {
    debugger
    if (!o.hasOwnProperty(i["documentName"])) {
      o[i["documentName"]] = 0;
    }
    o[i["documentName"]]++;
    return o;
  }, {});

  const ordersResult = Object.keys(filteredOrdersData).map(function (o) {
    debugger
    return { "documentName": o, count: filteredOrdersData[o] };
  });

  return (
    <>
      <div className="Auth">
        <div>
          <h3> Register User </h3>
          <input
            placeholder="Email..."
            onChange={setRegisterEmailHandler}
          />
          <input
            placeholder="Password..."
            onChange={setRegisterPasswordHandler}
          />

          <button onClick={register}> Create User</button>
        </div>

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
      </div>




      <div className="App">
        <section className="order-form">
          <div className="container">
            <select onClick={handleSelectValue}>
              <option value="Иванов И. И.">Иванов И. И.</option>
              <option value="Петров П. П.">Петров П. П.</option>
              <option value="Сидоров С. С">Сидоров С. С</option>
            </select>
            <input
              type="text"
              onChange={handleEditInputValue}
              value={textOrder}
            />

            <button type="button" onClick={addNewOrder}>add order</button>

            {isLoading && <div>Loading...</div>}
            {error && <div>Вы уже оставляли заявку на данный документ</div>}
          </div>
        </section>
        <section className="order-table">
          <div className="container">
            <h2 className="order-table__item">Order's table</h2>
            {ordersResult.map((order, index) => (
              <div key={index}>
                <div>{order.documentName}</div>
                <div>{order.count}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
