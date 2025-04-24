import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import InventoryItem from "./InventoryItem";

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with API call
    const fetchInventory = async () => {
      setLoading(true);
      // Mock data
      setTimeout(() => {
        setInventory([
          {
            id: 1,
            name: "Electronics Bundle",
            quantity: 15,
            size: "Medium",
            status: "In Warehouse",
            arrivalDate: "2023-05-15",
          },
          {
            id: 2,
            name: "Clothing Collection",
            quantity: 42,
            size: "Large",
            status: "In Transit",
            arrivalDate: "2023-05-20",
          },
        ]);
        setLoading(false);
      }, 500);
    };
    fetchInventory();
  }, []);

  const handleDelete = (id) => {
    // TODO: Add API call
    setInventory(inventory.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-800">My Inventory</h2>
        <Link to="/user/inventory/add">
          <Button>+ Add New Item</Button>
        </Link>
      </div>

      {loading ? (
        <div className="p-4 text-center">Loading inventory...</div>
      ) : inventory.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          No inventory items found. Add your first item to get started.
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {inventory.map((item) => (
            <InventoryItem key={item.id} item={item} onDelete={handleDelete} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default InventoryList;
