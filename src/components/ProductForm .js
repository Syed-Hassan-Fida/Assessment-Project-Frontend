import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = ({ onAddProduct }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://127.0.0.1:8000/api/products/${id}`)
        .then((response) => {
          const { name, description, price } = response.data;
          setName(name);
          setDescription(description);
          setPrice(price);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      description,
      price,
    };

    if (id) {
      axios
        .put(`http://127.0.0.1:8000/api/products/${id}`, formData)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
    } else {
      axios
        .post("http://127.0.0.1:8000/api/products", formData)
        .then((response) => {
          onAddProduct(response.data);
          navigate("/");
        })
        .catch((error) => {
          console.error("Error adding product:", error);
        });
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
