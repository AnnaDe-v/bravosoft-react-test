import { useEffect, useState } from "react";
import { createOrder } from "./api/createOrder";
import { getOrdersData } from "./api/getOrders";
import "./App.css";

function App() {
  const [ordersData, setOrdersData] = useState([]);
  const [textOrder, setTextOrder] = useState("");
  const [countOrder, setCountOrder] = useState(1);
  const [textSelect, setTextSelect] = useState("Иванов И. И.");
  const [error, setError] = useState(false);

  useEffect(() => {
    getOrders();
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
    console.log(textSelect);
  }

  const addNewOrder = () => {
    
    const name = textSelect;
    const documentName = textOrder;
    console.log("click");
    return createOrder({ name, documentName })
      .then(() => getOrders())
      .then((orders) => {
        setOrdersData(orders);
        setTextOrder("");
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      });
  };

  // const filteredOrdersData = ordersData.map()

  const filteredOrdersData = ordersData.reduce(function (o, i) {
    if (!o.hasOwnProperty(i["documentName"])) {
      o[i["documentName"]] = 0;
    }
    o[i["documentName"]]++;
    console.log('o :',o);
    return o;
  }, {});



  var ordersResult = Object.keys(filteredOrdersData).map(function (id) {

    return { id: id, count: filteredOrdersData[id] };
  });
  console.log('result :', ordersResult);



  return (
    <>
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
            <button onClick={addNewOrder}>add order</button>
          </div>
        </section>
        <section className="order-table">
          <div className="container">
            <h2>Order's table</h2>
            {ordersResult.map((order, index) => (
              <div key={index}>
              <div>{order.id}</div>
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
