import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  ArrowPathIcon,
  PencilIcon,
  TrashIcon,
  CubeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Modal from "../../components/ui/Modal";
import Pagination from "../../components/ui/Pagination";
import StatusBadge from "../../components/ui/StatusBadge";

const ManagerInventory = () => {
  const { user } = useAuth();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { addNotification } = useNotification();

  // Mock data - replace with API calls filtered by manager's warehouse
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const mockInventory = [
          {
            id: "INV-1001",
            name: "Smartphone X",
            sku: "ELEC-SPX-2023",
            category: "Electronics",
            quantity: 42,
            location: "A-12-5",
            status: "in_stock",
            lastChecked: "2023-06-14",
            value: 599.99,
          },
          {
            id: "INV-1002",
            name: "Wireless Headphones",
            sku: "ELEC-WH-2023",
            category: "Electronics",
            quantity: 18,
            location: "A-10-2",
            status: "low_stock",
            lastChecked: "2023-06-13",
            value: 149.99,
          },
          {
            id: "INV-1003",
            name: "Cotton T-Shirt",
            sku: "CLOTH-TS-2023",
            category: "Clothing",
            quantity: 125,
            location: "B-5-8",
            status: "in_stock",
            lastChecked: "2023-06-15",
            value: 19.99,
          },
          {
            id: "INV-1004",
            name: "Office Chair",
            sku: "FURN-OC-2023",
            category: "Furniture",
            quantity: 8,
            location: "C-2-1",
            status: "out_of_stock",
            lastChecked: "2023-06-10",
            value: 199.99,
          },
          {
            id: "INV-1005",
            name: "Desk Lamp",
            sku: "FURN-DL-2023",
            category: "Furniture",
            quantity: 15,
            location: "C-1-5",
            status: "in_stock",
            lastChecked: "2023-06-12",
            value: 39.99,
          },
          {
            id: "INV-1006",
            name: "Running Shoes",
            sku: "CLOTH-RS-2023",
            category: "Clothing",
            quantity: 22,
            location: "B-3-4",
            status: "in_stock",
            lastChecked: "2023-06-14",
            value: 89.99,
          },
          {
            id: "INV-1007",
            name: "Bluetooth Speaker",
            sku: "ELEC-BS-2023",
            category: "Electronics",
            quantity: 5,
            location: "A-11-3",
            status: "low_stock",
            lastChecked: "2023-06-11",
            value: 79.99,
          },
        ];
        setInventory(mockInventory);
      } catch (error) {
        addNotification({
          title: "Error",
          message: "Failed to load inventory",
          type: "error",
        });
        console.error("Error fetching inventory:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [addNotification, user]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
    addNotification({
      title: "Success",
      message: "Inventory data refreshed",
      type: "success",
    });
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (itemId) => {
    // TODO: Add API call for deletion
    setInventory(inventory.filter((item) => item.id !== itemId));
    addNotification({
      title: "Success",
      message: "Inventory item deleted",
      type: "success",
    });
  };

  // Filter inventory based on search and filters
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);
  const currentItems = filteredInventory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSaveItem = (itemData) => {
    // TODO: Add API call for save/update
    if (isEditing) {
      setInventory(
        inventory.map((item) =>
          item.id === selectedItem.id ? { ...item, ...itemData } : item
        )
      );
      addNotification({
        title: "Success",
        message: "Inventory item updated",
        type: "success",
      });
    } else {
      const newItem = {
        ...itemData,
        id: `INV-${1000 + inventory.length + 1}`,
        lastChecked: new Date().toISOString().split("T")[0],
      };
      setInventory([...inventory, newItem]);
      addNotification({
        title: "Success",
        message: "Inventory item added",
        type: "success",
      });
    }
    setIsModalOpen(false);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      in_stock: { color: "green", text: "In Stock" },
      low_stock: { color: "yellow", text: "Low Stock" },
      out_of_stock: { color: "red", text: "Out of Stock" },
    };
    return (
      <StatusBadge
        color={statusConfig[status].color}
        text={statusConfig[status].text}
      />
    );
  };

  const getQuantityIndicator = (quantity) => {
    if (quantity === 0) return "text-red-600 font-bold";
    if (quantity < 10) return "text-yellow-600 font-medium";
    return "text-green-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Inventory Management
        </h1>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <ArrowPathIcon
              className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button
            onClick={() => {
              setSelectedItem(null);
              setIsEditing(false);
              setIsModalOpen(true);
            }}
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Search Inventory"
            placeholder="Search by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
          />
          <Select
            label="Filter by Category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={[
              { value: "all", label: "All Categories" },
              { value: "Electronics", label: "Electronics" },
              { value: "Clothing", label: "Clothing" },
              { value: "Furniture", label: "Furniture" },
            ]}
            icon={<FunnelIcon className="h-5 w-5 text-gray-400" />}
          />
          <Select
            label="Filter by Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: "all", label: "All Statuses" },
              { value: "in_stock", label: "In Stock" },
              { value: "low_stock", label: "Low Stock" },
              { value: "out_of_stock", label: "Out of Stock" },
            ]}
            icon={<FunnelIcon className="h-5 w-5 text-gray-400" />}
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading inventory...</p>
          </div>
        ) : (
          <>
            <Table
              columns={[
                { header: "ID", accessor: "id" },
                { header: "Name", accessor: "name" },
                { header: "SKU", accessor: "sku" },
                { header: "Category", accessor: "category" },
                { header: "Quantity", accessor: "quantity" },
                { header: "Location", accessor: "location" },
                { header: "Status", accessor: "status" },
                { header: "Last Checked", accessor: "lastChecked" },
                { header: "Actions", accessor: "actions" },
              ]}
              data={currentItems.map((item) => ({
                ...item,
                id: <span className="font-mono font-medium">{item.id}</span>,
                sku: <span className="font-mono text-sm">{item.sku}</span>,
                quantity: (
                  <span className={getQuantityIndicator(item.quantity)}>
                    {item.quantity}
                  </span>
                ),
                status: getStatusBadge(item.status),
                lastChecked: new Date(item.lastChecked).toLocaleDateString(),
                actions: (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ),
              }))}
            />
            {filteredInventory.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No inventory items found matching your criteria.
              </div>
            )}
          </>
        )}
      </div>

      {/* Pagination */}
      {filteredInventory.length > itemsPerPage && (
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Add/Edit Inventory Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Edit Inventory Item" : "Add New Inventory Item"}
      >
        <InventoryForm
          item={selectedItem}
          onSave={handleSaveItem}
          onCancel={() => setIsModalOpen(false)}
          isEditing={isEditing}
        />
      </Modal>
    </div>
  );
};

// Inventory Form Component
const InventoryForm = ({ item, onSave, onCancel, isEditing }) => {
  const [formData, setFormData] = useState({
    name: item?.name || "",
    sku: item?.sku || "",
    category: item?.category || "Electronics",
    quantity: item?.quantity || 0,
    location: item?.location || "",
    status: item?.status || "in_stock",
    value: item?.value || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantity" || name === "value"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Item Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          label="SKU Code"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          required
          placeholder="ELEC-XXX-YYYY"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={[
            { value: "Electronics", label: "Electronics" },
            { value: "Clothing", label: "Clothing" },
            { value: "Furniture", label: "Furniture" },
            { value: "Other", label: "Other" },
          ]}
          required
        />
        <Input
          label="Quantity"
          name="quantity"
          type="number"
          min="0"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Storage Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          placeholder="e.g. A-12-5"
        />
        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            { value: "in_stock", label: "In Stock" },
            { value: "low_stock", label: "Low Stock" },
            { value: "out_of_stock", label: "Out of Stock" },
          ]}
          required
        />
      </div>
      <Input
        label="Value per Unit ($)"
        name="value"
        type="number"
        step="0.01"
        min="0"
        value={formData.value}
        onChange={handleChange}
        required
      />
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{isEditing ? "Update Item" : "Add Item"}</Button>
      </div>
    </form>
  );
};

export default ManagerInventory;
