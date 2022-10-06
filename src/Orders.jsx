import React, { useEffect, useState } from "react";
import { createOrder } from "./api/createOrder";
import { getOrdersData } from "./api/getOrders";

export default function Orders() {
  const [ordersData, setOrdersData] = useState([]);
  const [textOrder, setTextOrder] = useState("");
  const [textSelect, setTextSelect] = useState("Иванов И. И.");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    getOrders()
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
    e.preventDefault();
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
          setTextOrder("");
        })
        .catch((err) => {
          setError(true);
          console.error(err);
        })
        .finally(() => {
          setError(false);
          setIsLoading(false);
        });
    } else {
      setError(true);
    }
  };

  const filteredOrdersData = ordersData.reduce(function (o, i) {
    if (!o.hasOwnProperty(i["documentName"])) {
      o[i["documentName"]] = 0;
    }
    o[i["documentName"]]++;
    return o;
  }, {});

  const ordersResult = Object.keys(filteredOrdersData).map(function (o) {
    return { documentName: o, count: filteredOrdersData[o] };
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

            <button type="button" onClick={addNewOrder}>
              add order
            </button>

            {isLoading && <div>Loading...</div>}
            {error && <div>Вы уже оставляли заявку на данный документ</div>}
          </div>
        </section>
        <section className="order-table">
          <div className="container">
            <div className="order-table__inner">
              <h2 className="order-table__title">Order's table</h2>
              <div className="order-table__description">
                <div className="order-table__description-item">Документ</div>
                <div className="order-table__description-item">
                  Количество заявок
                </div>
              </div>
              {ordersResult.map((order, index) => (
                <div className="order-table__row" key={index}>
                  <div>{order.documentName}</div>
                  <div>{order.count}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
