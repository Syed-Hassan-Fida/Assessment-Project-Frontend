import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Product Details</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">
            <strong>Description:</strong> {product.description}
          </p>
          <p className="card-text">
            <strong>Price:</strong> ${product.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
