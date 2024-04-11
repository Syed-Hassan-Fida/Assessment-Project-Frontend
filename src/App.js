import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm ";
import ProductDetail from "./components/ProductDetail";

function App() {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route
          path="/products/add"
          element={<ProductForm onAddProduct={handleAddProduct} />}
        />
        <Route
          path="/products/:id/edit"
          element={<ProductForm onAddProduct={handleAddProduct} />}
        />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;
