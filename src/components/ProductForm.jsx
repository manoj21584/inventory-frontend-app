import React from 'react';

const ProductForm = ({ productData, handleProductFormChange, handleCreateProduct }) => (
  <div className="card mb-4">
    <div className="card-body">
      <h5 className="card-title">Create Product</h5>
      <form onSubmit={handleCreateProduct}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleProductFormChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={productData.description}
            onChange={handleProductFormChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleProductFormChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stockQuantity">Stock Quantity</label>
          <input
            type="number"
            className="form-control"
            id="stockQuantity"
            name="stockQuantity"
            value={productData.stockQuantity}
            onChange={handleProductFormChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Create Product
        </button>
      </form>
    </div>
  </div>
);

export default ProductForm;
