import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {

    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {

        setProduct(res.data);
      })
      .catch((err) => {

        console.log(err);
      });

  }, [id]);

  if (!product) {

    return <h2>Loading...</h2>;
  }

  return (

    <div
      style={{
        padding: "40px",
        display: "flex",
        justifyContent: "center"
      }}
    >

      <div
        style={{
          width: "500px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px gray",
          textAlign: "center"
        }}
      >

        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "10px"
          }}
        />

        <h1>{product.name}</h1>

        <h2>₹ {product.price}</h2>

        <p>{product.description}</p>

      </div>

    </div>
  );
}

export default ProductDetails;