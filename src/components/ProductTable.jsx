import React, { useState } from "react";
import { request } from "../helpers/axios_helper";

const ProductTable = ({ data, handleUpdate, handleDelete }) => {
  const [editingProductId, setEditingProductId] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});

  const handleUpdateClick = (product) => {
    setEditingProductId(product.id); // Set the product being edited
    setUpdatedProduct(product); // Pre-fill form with the current product details
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      await request("PUT", `/api/product/${editingProductId}`, updatedProduct);
      alert("Product updated successfully!");
      setEditingProductId(null); // Exit edit mode
      handleUpdate(updatedProduct); // Update product in parent state
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product.");
    }
  };

  const handleCancelClick = () => {
    setEditingProductId(null); // Cancel edit mode
  };

  const handleDeleteClick = async (id) => {
    try {
      await request("DELETE", `/api/product/${id}`);
      handleDelete(id); // Call the parent component function to remove the product from the state
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product.");
    }
  };

  return (
    <div className="card" style={{ width: "100%" }}>
      <div className="card-body">
        <h5 className="card-title">Product List</h5>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((product) => (
                <tr key={product.id}>
                  {editingProductId === product.id ? (
                    <>
                      <td>{product.id}</td>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={updatedProduct.name}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="description"
                          value={updatedProduct.description}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="price"
                          value={updatedProduct.price}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="stockQuantity"
                          value={updatedProduct.stockQuantity}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-success me-2"
                          onClick={handleSaveClick}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={handleCancelClick}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>{product.price}</td>
                      <td>{product.stockQuantity}</td>
                      <td>
                        <button
                          className="btn btn-warning me-2"
                          onClick={() => handleUpdateClick(product)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteClick(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
