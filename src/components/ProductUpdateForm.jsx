import React from "react";

const ProductUpdateForm = ({
  productData,
  handleProductFormChange,
  handleUpdateProduct,
}) => (
  <div className="card mb-4">
    <div className="card-body">
      <h5 className="card-title">Update Product</h5>
      <form onSubmit={handleUpdateProduct}>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="number"
            className="form-control"
            id="id"
            name="id"
            value={productData.id}
            onChange={handleProductFormChange}
            required
            readOnly
          />
        </div>
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
          Update Product
        </button>
      </form>
    </div>
  </div>
);

export default ProductUpdateForm;
