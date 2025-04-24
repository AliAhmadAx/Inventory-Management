import { useState, useEffect } from "react";
import { useNotification } from "../../contexts/NotificationContext";
import {
  BuildingOfficeIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Modal from "../../components/ui/Modal";
import Pagination from "../../components/ui/Pagination";
import StatusBadge from "../../components/ui/StatusBadge";

const AdminWarehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { addNotification } = useNotification();

  // Mock data - replace with API calls
  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        const mockWarehouses = [
          {
            id: 1,
            code: "NY-1",
            name: "New York Main",
            location: "Brooklyn, NY",
            status: "active",
            capacity: 85,
            manager: "Jane Smith",
            lastInventory: "2023-06-14",
            createdAt: "2022-01-15",
          },
          {
            id: 2,
            code: "LA-2",
            name: "Los Angeles West",
            location: "Los Angeles, CA",
            status: "active",
            capacity: 72,
            manager: "Bob Johnson",
            lastInventory: "2023-06-10",
            createdAt: "2022-03-22",
          },
          {
            id: 3,
            code: "CH-3",
            name: "Chicago Central",
            location: "Chicago, IL",
            status: "maintenance",
            capacity: 65,
            manager: "Mike Wilson",
            lastInventory: "2023-06-05",
            createdAt: "2022-05-10",
          },
          {
            id: 4,
            code: "TX-4",
            name: "Texas Distribution",
            location: "Houston, TX",
            status: "active",
            capacity: 91,
            manager: "Sarah Miller",
            lastInventory: "2023-06-12",
            createdAt: "2022-07-18",
          },
          {
            id: 5,
            code: "SF-5",
            name: "San Francisco Hub",
            location: "San Francisco, CA",
            status: "inactive",
            capacity: 0,
            manager: "None",
            lastInventory: "2023-05-20",
            createdAt: "2022-09-05",
          },
        ];
        setWarehouses(mockWarehouses);
      } catch (error) {
        addNotification({
          title: "Error",
          message: "Failed to load warehouses",
          type: "error",
        });
        console.error("Error fetching warehouses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouses();
  }, [addNotification]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
    addNotification({
      title: "Success",
      message: "Warehouses data refreshed",
      type: "success",
    });
  };

  // Filter warehouses based on search and filters
  const filteredWarehouses = warehouses.filter((warehouse) => {
    const matchesSearch =
      warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warehouse.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      warehouse.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || warehouse.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const warehousesPerPage = 5;
  const totalPages = Math.ceil(filteredWarehouses.length / warehousesPerPage);
  const currentWarehouses = filteredWarehouses.slice(
    (currentPage - 1) * warehousesPerPage,
    currentPage * warehousesPerPage
  );

  const handleEdit = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (warehouseId) => {
    // TODO: Add API call for deletion
    setWarehouses(
      warehouses.filter((warehouse) => warehouse.id !== warehouseId)
    );
    addNotification({
      title: "Success",
      message: "Warehouse deleted successfully",
      type: "success",
    });
  };

  const handleSaveWarehouse = (warehouseData) => {
    // TODO: Add API call for save/update
    if (isEditing) {
      setWarehouses(
        warehouses.map((warehouse) =>
          warehouse.id === selectedWarehouse.id
            ? { ...warehouse, ...warehouseData }
            : warehouse
        )
      );
      addNotification({
        title: "Success",
        message: "Warehouse updated successfully",
        type: "success",
      });
    } else {
      const newWarehouse = {
        ...warehouseData,
        id: warehouses.length + 1,
        createdAt: new Date().toISOString().split("T")[0],
        lastInventory: "Never",
        capacity: 0,
      };
      setWarehouses([...warehouses, newWarehouse]);
      addNotification({
        title: "Success",
        message: "Warehouse created successfully",
        type: "success",
      });
    }
    setIsModalOpen(false);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: "green", text: "Active" },
      maintenance: { color: "yellow", text: "Maintenance" },
      inactive: { color: "red", text: "Inactive" },
    };
    return (
      <StatusBadge
        color={statusConfig[status].color}
        text={statusConfig[status].text}
      />
    );
  };

  const getCapacityBar = (capacity) => {
    let barColor = "bg-green-500";
    if (capacity > 90) barColor = "bg-red-500";
    else if (capacity > 75) barColor = "bg-yellow-500";

    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${barColor}`}
          style={{ width: `${capacity}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Warehouse Management
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
              setSelectedWarehouse(null);
              setIsEditing(false);
              setIsModalOpen(true);
            }}
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Warehouse
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Search Warehouses"
            placeholder="Search by name, code or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<BuildingOfficeIcon className="h-5 w-5 text-gray-400" />}
          />
          <Select
            label="Filter by Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: "all", label: "All Statuses" },
              { value: "active", label: "Active" },
              { value: "maintenance", label: "Maintenance" },
              { value: "inactive", label: "Inactive" },
            ]}
          />
        </div>
      </div>

      {/* Warehouses Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading warehouses...</p>
          </div>
        ) : (
          <>
            <Table
              columns={[
                { header: "Code", accessor: "code" },
                { header: "Name", accessor: "name" },
                { header: "Location", accessor: "location" },
                { header: "Status", accessor: "status" },
                { header: "Capacity", accessor: "capacity" },
                { header: "Manager", accessor: "manager" },
                { header: "Last Inventory", accessor: "lastInventory" },
                { header: "Actions", accessor: "actions" },
              ]}
              data={currentWarehouses.map((warehouse) => ({
                ...warehouse,
                code: (
                  <span className="font-mono font-medium text-blue-600">
                    {warehouse.code}
                  </span>
                ),
                location: (
                  <div className="flex items-center">
                    <MapPinIcon className="h-4 w-4 text-gray-500 mr-2" />
                    {warehouse.location}
                  </div>
                ),
                status: getStatusBadge(warehouse.status),
                capacity: (
                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      {warehouse.capacity}%
                    </div>
                    {getCapacityBar(warehouse.capacity)}
                  </div>
                ),
                lastInventory: (
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 text-gray-500 mr-2" />
                    {warehouse.lastInventory === "Never"
                      ? "Never"
                      : new Date(warehouse.lastInventory).toLocaleDateString()}
                  </div>
                ),
                actions: (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(warehouse)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(warehouse.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ),
              }))}
            />
            {filteredWarehouses.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No warehouses found matching your criteria.
              </div>
            )}
          </>
        )}
      </div>

      {/* Pagination */}
      {filteredWarehouses.length > warehousesPerPage && (
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Add/Edit Warehouse Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Edit Warehouse" : "Add New Warehouse"}
      >
        <WarehouseForm
          warehouse={selectedWarehouse}
          onSave={handleSaveWarehouse}
          onCancel={() => setIsModalOpen(false)}
          isEditing={isEditing}
        />
      </Modal>
    </div>
  );
};

// Warehouse Form Component
const WarehouseForm = ({ warehouse, onSave, onCancel, isEditing }) => {
  const [formData, setFormData] = useState({
    code: warehouse?.code || "",
    name: warehouse?.name || "",
    location: warehouse?.location || "",
    status: warehouse?.status || "active",
    manager: warehouse?.manager || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Warehouse Code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
          placeholder="e.g. NY-1"
        />
        <Input
          label="Warehouse Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <Input
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
        placeholder="City, State"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            { value: "active", label: "Active" },
            { value: "maintenance", label: "Maintenance" },
            { value: "inactive", label: "Inactive" },
          ]}
          required
        />
        <Input
          label="Manager"
          name="manager"
          value={formData.manager}
          onChange={handleChange}
          placeholder="Assign a manager"
        />
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? "Update Warehouse" : "Create Warehouse"}
        </Button>
      </div>
    </form>
  );
};

export default AdminWarehouses;
