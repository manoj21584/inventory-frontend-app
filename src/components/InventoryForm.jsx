import React from 'react';

const InventoryForm = ({ inventoryData, handleInventoryFormChange, handleCreateInventory }) => (
  <div className="card mb-4">
    <div className="card-body">
      <h5 className="card-title">Create Inventory</h5>
      <form onSubmit={handleCreateInventory}>
        <div className="form-group">
          <label htmlFor="productId">Product ID</label>
          <input
            type="number"
            className="form-control"
            id="productId"
            name="productId"
            value={inventoryData.product.id}
            onChange={handleInventoryFormChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            value={inventoryData.quantity}
            onChange={handleInventoryFormChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Create Inventory
        </button>
      </form>
    </div>
  </div>
);

export default InventoryForm;
