// src/components/AuthContent.js
import React, { useState } from 'react';
import { request, setAuthHeader } from '../helpers/axios_helper';
import ProductForm from './ProductForm';
import InventoryForm from './InventoryForm';
import ProductTable from './ProductTable';
import InventoryTable from './InventoryTable';

const AuthContent = () => {
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [activeAction, setActiveAction] = useState(null);
  
  const [productData, setProductData] = useState({
    id: 0,
    name: '',
    description: '',
    price: 0,
    stockQuantity: 0,
  });

  const [inventoryData, setInventoryData] = useState({
    quantity: 0,
    product: {
      id: 0,
    },
  });

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await request("POST", "/api/product", productData);
      alert("Product created successfully!");
      setData([`Product Created: ${response.data.name}`]);

      setActiveAction(null);
    } catch (error) {
      console.error(error);
    }
  };



  const handleCreateInventory = async (e) => {
    e.preventDefault();
    try {
      const response = await request("POST", "/api/inventory", inventoryData);

      setData([`Inventory Created: ${response.data.id}`]);
      alert("Inventory created successfully!");

      setActiveAction(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductFormChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInventoryFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'productId') {
      setInventoryData({
        ...inventoryData,
        product: {
          id: parseInt(value, 10),
        },
      });
    } else {
      setInventoryData({
        ...inventoryData,
        [name]: parseInt(value, 10),
      });
    }
  };

  const handleFetchData = async (endpoint) => {
    try {
      const response = await request("GET", endpoint, {});
      setData(response.data);
      setShowTable(true);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setAuthHeader(null);
      } else {
        setData([{ error: error.message }]);
      }
    }
  };

  const handleButtonClick = (action) => {
    setActiveAction(action);
    setShowTable(false);

    if (action === "viewProduct") {
      handleFetchData("/api/product");
    } else if (action === "viewInventory") {
      handleFetchData("/api/inventory");
    }
  };

  const handleUpdate = (product) => {
    setProductData(product);
    setActiveAction('updateProduct');
  };

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  return (
    <div className="row justify-content-md-center">
      <div className="col-8">
        <div className="mb-4">
          <button
            className="btn btn-primary me-2"
            onClick={() => handleButtonClick('createProduct')}
          >
            Create Product
          </button>
          <button
            className="btn btn-secondary me-2"
            onClick={() => handleButtonClick('createInventory')}
          >
            Create Inventory
          </button>
          <button
            className="btn btn-success me-2"
            onClick={() => handleButtonClick('viewProduct')}
          >
            Show Product Data
          </button>
          <button
            className="btn btn-info"
            onClick={() => handleButtonClick('viewInventory')}
          >
            Show Inventory Data
          </button>
        </div>

        <div>
          {activeAction === "createProduct" && (
            <ProductForm
              productData={productData}
              handleProductFormChange={handleProductFormChange}
              handleCreateProduct={handleCreateProduct}
            />
          )}

          {activeAction === "createInventory" && (
            <InventoryForm
              inventoryData={inventoryData}
              handleInventoryFormChange={handleInventoryFormChange}
              handleCreateInventory={handleCreateInventory}
            />
          )}

          {showTable && activeAction === "viewProduct" && (
            <ProductTable
              data={data}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          )}

          {showTable && activeAction === "viewInventory" && (
            <InventoryTable />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthContent;
