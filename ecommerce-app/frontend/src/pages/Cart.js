import { useState } from "react";
import axios from "axios";

function Cart() {

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const increaseQuantity = (index) => {

    const updatedCart = [...cart];

    updatedCart[index].quantity += 1;

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const decreaseQuantity = (index) => {

    const updatedCart = [...cart];

    if (updatedCart[index].quantity > 1) {

      updatedCart[index].quantity -= 1;

    } else {

      updatedCart.splice(index, 1);
    }

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const removeFromCart = (index) => {

    const updatedCart = [...cart];

    updatedCart.splice(index, 1);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  const placeOrder = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/orders/place",
        {
          user_id: 1,
          total
        }
      );

      alert("Order Placed Successfully");

      localStorage.removeItem("cart");

      setCart([]);

    } catch (err) {

      console.log(err);

      alert("Order Failed");
    }
  };

  return (

    <div style={{ padding: "20px" }}>

      <h1 style={{ textAlign: "center" }}>
        Cart Items
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >

        {cart.map((item, index) => (

          <div
            key={index}
            style={{
              backgroundColor: "white",
              width: "250px",
              margin: "15px",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px gray",
              textAlign: "center"
            }}
          >

            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px"
              }}
            />

            <h2>{item.name}</h2>

            <p>₹ {item.price}</p>

            <p>Quantity: {item.quantity}</p>

            <p>{item.description}</p>

            <button
              onClick={() => increaseQuantity(index)}
              style={{
                backgroundColor: "blue",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px"
              }}
            >
              +
            </button>

            <button
              onClick={() => decreaseQuantity(index)}
              style={{
                backgroundColor: "orange",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px"
              }}
            >
              -
            </button>

            <button
              onClick={() => removeFromCart(index)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Remove
            </button>

          </div>

        ))}

      </div>

      <h2 style={{ textAlign: "center" }}>
        Total Price: ₹ {total}
      </h2>

      <div style={{ textAlign: "center" }}>

        <button
          onClick={placeOrder}
          style={{
            backgroundColor: "green",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Place Order
        </button>

      </div>

    </div>
  );
}

export default Cart;