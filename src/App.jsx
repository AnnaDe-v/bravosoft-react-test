import { useEffect, useState } from "react";
import { createOrder } from "./api/createOrder";
import { getOrdersData } from "./api/getOrders";
import "./App.css";

function App() {
  const [ordersData, setOrdersData] = useState([]);
  const [textOrder, setTextOrder] = useState("");
  const [textSelect, setTextSelect] = useState("Иванов И. И.");
  const [isLoading, setIsLoading] = useState(false);
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

  const addNewOrder = (event) => {
    const name = textSelect
    const documentName = textOrder
    event.preventDefault()
    if (ordersData.filter(
        (x) => x["name"] === textSelect && x["documentName"] === textOrder
      ) == false
    ) {
      setError(false);
      setIsLoading(true)
      console.log("Yep");
      return createOrder({ name, documentName })
        .then(() => getOrders())
        .then((orders) => {
          setOrdersData(orders)
          setTextOrder("");
        })
        .catch((err) => {
          setError(true)
          console.error(err)
        })
        .finally(
          setError(false)
        )
    } else {
      setError(true)
    }
  };

  const filteredOrdersData = ordersData.reduce(function (o, i) {
    if (!o.hasOwnProperty(i["documentName"])) {
      o[i["documentName"]] = 0;
    }
    o[i["documentName"]]++;
    return o;
  }, {});

  const ordersResult = Object.keys(filteredOrdersData).map(function (id) {
    return { id: id, count: filteredOrdersData[id] };
  });

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

            {isLoading && <div>Loading...</div>}
            {error && <div>Вы уже оставляли заявку на данный документ</div>}
          </div>
        </section>
        <section className="order-table">
          <div className="container">
            <h2 className="order-table__item">Order's table</h2>
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
