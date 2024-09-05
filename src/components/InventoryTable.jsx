import React, { useEffect, useState } from "react";
import { request } from "../helpers/axios_helper";

const InventoryTable = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantityUpdate, setQuantityUpdate] = useState({});

  // Fetch inventory data from API
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await request("GET", "/api/inventory");
        // console.log("API Response: ", response.data);  // Debugging the API response
        setInventoryData(response.data);
      } catch (err) {
        setError("Error fetching inventory data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  // Handle quantity input changes
  const handleQuantityChange = (e, productId) => {
    setQuantityUpdate({
      ...quantityUpdate,
      [productId]: e.target.value,
    });
  };

  // Handle inventory update request
  const handleUpdateInventory = async (productId) => {
    const quantity = quantityUpdate[productId];
    if (!quantity || isNaN(quantity)) {
      alert("Please enter a valid quantity.");
      return;
    }

    try {
      await request("PUT", `/api/inventory/${productId}`, { quantity });
      alert("Inventory updated successfully!");
    } catch (error) {
      console.error("Error updating inventory:", error);
      alert("Error updating inventory.");
    }
  };

  // Handle delete request
  const handleDeleteInventory = async (productId) => {
    if (
      window.confirm("Are you sure you want to delete this inventory item?")
    ) {
      try {
        await request("DELETE", `/api/inventory/${productId}`);
        setInventoryData(
          inventoryData.filter((item) => item.product.id !== productId)
        );
        alert("Inventory deleted successfully!");
      } catch (error) {
        console.error("Error deleting inventory:", error);
        alert("Error deleting inventory.");
      }
    }
  };

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Render inventory table
  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">Inventory List</h5>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Inventory ID</th>
              <th>Product ID</th>
              <th>Last Update</th>
              <th>Quantity</th>
              <th>Update Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.length > 0 ? (
              inventoryData.map((inventory) => (
                <tr key={inventory.id}>
                  <td>{inventory.id}</td>
                  <td>{inventory.product.id}</td>
                  <td>{inventory.lastUpdated}</td>
                  <td>{inventory.quantity}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      value={quantityUpdate[inventory.product.id] || ""}
                      onChange={(e) =>
                        handleQuantityChange(e, inventory.product.id)
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleUpdateInventory(inventory.product.id)
                      }
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger ml-2"
                      onClick={() =>
                        handleDeleteInventory(inventory.product.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No Inventory Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
