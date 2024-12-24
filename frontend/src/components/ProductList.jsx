/* eslint-disable */
import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={() => onEdit(product)}
          onDelete={() => onDelete(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductList;
