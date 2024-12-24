/* eslint-disable */
import React from "react";

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 w-60">
      <img
        src={`http://localhost:5000/uploads/${product.image}`}
        alt={product.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-lg font-bold mt-2">{product.name}</h3>
      <p className="text-gray-600 text-sm">{product.description}</p>
      <p className="text-blue-500 font-semibold mt-2">
        Price: ${product.price}
      </p>
      <div className="flex justify-between mt-4">
        <button
          onClick={onEdit}
          className="px-2 py-1 bg-yellow-500 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
