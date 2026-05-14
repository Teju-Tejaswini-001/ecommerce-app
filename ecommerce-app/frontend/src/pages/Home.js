import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../styles/Home.css";

function Home() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  const addToCart = (product) => {

  let cart = JSON.parse(
    localStorage.getItem("cart")
  ) || [];

  const existingProduct = cart.find(
    (item) => item.id === product.id
  );

  if (existingProduct) {

    existingProduct.quantity += 1;

  } else {

    cart.push({
      ...product,
      quantity: 1
    });
  }

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  alert("Product Added To Cart");
};

  const logout = () => {

    localStorage.removeItem("token");

    alert("Logged Out");
  };

  const userEmail =
  localStorage.getItem("email");

  return (

    <div>

      <div
      style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#222",
      padding: "15px 30px"
    }}
    >

  <h2 style={{ color: "white" }}>
    E-Commerce
  </h2>

  <div>
    <Link to="/">
    <button className="nav-btn">Home</button>
    </Link>

    <Link to="/cart">
    <button className="nav-btn">Cart</button>
    </Link>

    <Link to="/orders">
      <button className="nav-btn">
        Orders
      </button>
    </Link>

    <span
    style={{
    color: "gray",
    marginLeft: "15px",
    marginRight: "15px",
    fontWeight: "light"
    }}
    >
      {userEmail}
      </span>

    <button
      className="nav-btn"
      onClick={logout}
    >
      Logout
    </button>
    </div>
    </div>

      <h1 className="title">
        E-Commerce Store
      </h1>

      <div style={{ textAlign: "center" }}>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid gray"
          }}
        />

      </div>

      <br />

      <div className="product-container">

        {products
          .filter((product) =>
            product.name
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((product) => (

            <div
            key={product.id}
            className="card"
            onClick={() =>
              navigate(`/product/${product.id}`)
            }
            style={{ cursor: "pointer" }}
          >

              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px"
                }}
              />

              <h2>{product.name}</h2>

              <p>₹ {product.price}</p>

              <p>{product.description}</p>

              <button
                onClick={() => addToCart(product)}
              >
                Add To Cart
              </button>

            </div>

          ))}

      </div>

    </div>
  );
}

export default Home;