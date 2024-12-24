/* eslint-disable */
import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import ProductModal from "../components/ProductModal";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSaveProduct = async (formData) => {
    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("description", formData.description);
      formDataObj.append("price", formData.price);
      if (formData.image) {
        formDataObj.append("image", formData.image);
      }

      if (editingProduct) {
        await axios.put(
          `http://localhost:5000/api/products/${editingProduct.id}`,
          formDataObj
        );
      } else {
        await axios.post("http://localhost:5000/api/products", formDataObj);
      }

      setModalOpen(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Product List</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Product
        </button>
        <ProductList
          products={products}
          onEdit={(product) => {
            setEditingProduct(product);
            setModalOpen(true);
          }}
          onDelete={handleDeleteProduct}
        />
        <ProductModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingProduct(null);
          }}
          onSave={handleSaveProduct}
          initialData={editingProduct}
        />
      </div>
    </div>
  );
};

export default Home;
