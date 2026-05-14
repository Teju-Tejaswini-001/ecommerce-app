import { useState } from "react";
import axios from "axios";

function AddProduct() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleAddProduct = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/products/add",
        {
          name,
          price,
          image,
          description
        }
      );

      alert("Product Added Successfully");

      setName("");
      setPrice("");
      setImage("");
      setDescription("");

    } catch (err) {

      console.log(err);

      alert("Failed To Add Product");
    }
  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Add Product</h1>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <button onClick={handleAddProduct}>
        Add Product
      </button>

    </div>
  );
}

export default AddProduct;