import React, { useState } from 'react';
import { useForm } from 'react-hook-form';



const OrderForm = ({ input, addNewOrder }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showForm, setShowForm] = useState(false);

  const placeHolder = Object.keys(input[0]).slice(1);
  console.log('errors', errors);

  const handleClick = () => {
    setShowForm(true);
  };

  const onSubmit = (userData) => {
    addNewOrder(userData).then(() => setShowForm(false));
  };

  return (
    <div className="formuser">
      {!showForm && (
        <button onClick={handleClick}>
          Create new order
        </button>
      )}
      {showForm && (
        <>
          <button type="submit">
            Сохранить нового пользователя
          </button>
          <form
            id="newUser"
            onSubmit={handleSubmit(onSubmit)}
            className="formuser__form"
          >
            {placeHolder.map((input, i) => (
              <span key={i}>
                <input
                  className="formuser__input"
                  placeholder={input}
                  {...register(input, {
                    validate: (value) => value.length > 2,
                  })}
                ></input>
              </span>
            ))}
          </form>
        </>
      )}
    </div>
  );
};

export default OrderForm;