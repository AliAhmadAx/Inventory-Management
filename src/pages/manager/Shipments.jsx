import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";
import {
  TruckIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  ArrowPathIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Modal from "../../components/ui/Modal";
import Pagination from "../../components/ui/Pagination";
import StatusBadge from "../../components/ui/StatusBadge";

const ManagerShipments = () => {
  const { user } = useAuth();
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { addNotification } = useNotification();

  // Mock data - replace with API calls filtered by manager's warehouse
  useEffect(() => {
    const fetchShipments = async () => {
      try {
        setLoading(true);
        const mockShipments = [
          {
            id: "SH-1001",
            customer: "TechGadgets Inc",
            type: "outbound",
            status: "processing",
            items: 24,
            weight: 15.5,
            carrier: "FedEx",
            trackingNumber: "FX123456789",
            date: "2023-06-14",
            destination: "New York, NY",
          },
          {
            id: "SH-1002",
            customer: "FashionHub",
            type: "outbound",
            status: "ready",
            items: 42,
            weight: 28.2,
            carrier: "UPS",
            trackingNumber: "1Z123456789",
            date: "2023-06-13",
            destination: "Los Angeles, CA",
          },
          {
            id: "SH-1003",
            customer: "Supplier Co",
            type: "inbound",
            status: "in_transit",
            items: 36,
            weight: 45.8,
            carrier: "DHL",
            trackingNumber: "DH123456789",
            date: "2023-06-12",
            origin: "Chicago, IL",
          },
          {
            id: "SH-1004",
            type: "inbound",
            status: "delivered",
            items: 18,
            weight: 12.3,
            carrier: "USPS",
            trackingNumber: "US123456789",
            date: "2023-06-10",
            origin: "Houston, TX",
          },
          {
            id: "SH-1005",
            customer: "HomeLiving",
            type: "outbound",
            status: "processing",
            items: 15,
            weight: 9.7,
            carrier: "FedEx",
            trackingNumber: "FX987654321",
            date: "2023-06-15",
            destination: "San Francisco, CA",
          },
          {
            id: "SH-1006",
            customer: "ElectroWorld",
            type: "outbound",
            status: "ready",
            items: 32,
            weight: 21.4,
            carrier: "UPS",
            trackingNumber: "1Z987654321",
            date: "2023-06-11",
            destination: "Seattle, WA",
          },
        ];
        setShipments(mockShipments);
      } catch (error) {
        addNotification({
          title: "Error",
          message: "Failed to load shipments",
          type: "error",
        });
        console.error("Error fetching shipments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, [addNotification, user]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
    addNotification({
      title: "Success",
      message: "Shipments data refreshed",
      type: "success",
    });
  };

  const handleEdit = (shipment) => {
    setSelectedShipment(shipment);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (shipmentId) => {
    // TODO: Add API call for deletion
    setShipments(shipments.filter((shipment) => shipment.id !== shipmentId));
    addNotification({
      title: "Success",
      message: "Shipment deleted successfully",
      type: "success",
    });
  };

  const handleStatusUpdate = (shipmentId, newStatus) => {
    // TODO: Add API call for status update
    setShipments(
      shipments.map((shipment) =>
        shipment.id === shipmentId
          ? { ...shipment, status: newStatus }
          : shipment
      )
    );
    addNotification({
      title: "Success",
      message: `Shipment status updated to ${newStatus.replace("_", " ")}`,
      type: "success",
    });
  };

  // Filter shipments based on search and filters
  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch =
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (shipment.customer &&
        shipment.customer.toLowerCase().includes(searchTerm.toLowerCase())) ||
      shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || shipment.status === statusFilter;
    const matchesType = typeFilter === "all" || shipment.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination
  const shipmentsPerPage = 5;
  const totalPages = Math.ceil(filteredShipments.length / shipmentsPerPage);
  const currentShipments = filteredShipments.slice(
    (currentPage - 1) * shipmentsPerPage,
    currentPage * shipmentsPerPage
  );

  const handleSaveShipment = (shipmentData) => {
    // TODO: Add API call for save/update
    if (isEditing) {
      setShipments(
        shipments.map((shipment) =>
          shipment.id === selectedShipment.id
            ? { ...shipment, ...shipmentData }
            : shipment
        )
      );
      addNotification({
        title: "Success",
        message: "Shipment updated successfully",
        type: "success",
      });
    } else {
      const newShipment = {
        ...shipmentData,
        id: `SH-${1000 + shipments.length + 1}`,
        date: new Date().toISOString().split("T")[0],
        status: "processing",
      };
      setShipments([...shipments, newShipment]);
      addNotification({
        title: "Success",
        message: "Shipment created successfully",
        type: "success",
      });
    }
    setIsModalOpen(false);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      processing: { color: "yellow", text: "Processing" },
      ready: { color: "blue", text: "Ready" },
      in_transit: { color: "purple", text: "In Transit" },
      delivered: { color: "green", text: "Delivered" },
      cancelled: { color: "red", text: "Cancelled" },
    };
    return (
      <StatusBadge
        color={statusConfig[status].color}
        text={statusConfig[status].text}
      />
    );
  };

  const getTypeIcon = (type) => {
    return type === "inbound" ? (
      <ArrowDownTrayIcon className="h-5 w-5 text-blue-600" />
    ) : (
      <ArrowUpTrayIcon className="h-5 w-5 text-green-600" />
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Shipments Management
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
              setSelectedShipment(null);
              setIsEditing(false);
              setIsModalOpen(true);
            }}
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            New Shipment
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Search Shipments"
            placeholder="Search by ID, customer or tracking..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
          />
          <Select
            label="Filter by Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: "all", label: "All Statuses" },
              { value: "processing", label: "Processing" },
              { value: "ready", label: "Ready" },
              { value: "in_transit", label: "In Transit" },
              { value: "delivered", label: "Delivered" },
              { value: "cancelled", label: "Cancelled" },
            ]}
            icon={<FunnelIcon className="h-5 w-5 text-gray-400" />}
          />
          <Select
            label="Filter by Type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            options={[
              { value: "all", label: "All Types" },
              { value: "inbound", label: "Inbound" },
              { value: "outbound", label: "Outbound" },
            ]}
            icon={<FunnelIcon className="h-5 w-5 text-gray-400" />}
          />
        </div>
      </div>

      {/* Shipments Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading shipments...</p>
          </div>
        ) : (
          <>
            <Table
              columns={[
                { header: "Shipment ID", accessor: "id" },
                { header: "Type", accessor: "type" },
                { header: "Customer/Supplier", accessor: "customer" },
                { header: "Status", accessor: "status" },
                { header: "Details", accessor: "details" },
                { header: "Date", accessor: "date" },
                { header: "Actions", accessor: "actions" },
              ]}
              data={currentShipments.map((shipment) => ({
                ...shipment,
                id: (
                  <span className="font-mono font-medium">{shipment.id}</span>
                ),
                type: (
                  <div className="flex items-center">
                    {getTypeIcon(shipment.type)}
                    <span className="ml-2 capitalize">{shipment.type}</span>
                  </div>
                ),
                customer: shipment.customer || shipment.origin || "N/A",
                status: getStatusBadge(shipment.status),
                details: (
                  <div className="text-sm">
                    <div>{shipment.items} items</div>
                    <div>{shipment.weight} kg</div>
                    {shipment.trackingNumber && (
                      <div className="font-mono text-xs">
                        {shipment.trackingNumber}
                      </div>
                    )}
                  </div>
                ),
                date: new Date(shipment.date).toLocaleDateString(),
                actions: (
                  <div className="flex space-x-2">
                    {shipment.status === "ready" && (
                      <Button
                        size="xs"
                        onClick={() =>
                          handleStatusUpdate(shipment.id, "in_transit")
                        }
                      >
                        Ship
                      </Button>
                    )}
                    {shipment.status === "in_transit" && (
                      <Button
                        size="xs"
                        variant="success"
                        onClick={() =>
                          handleStatusUpdate(shipment.id, "delivered")
                        }
                      >
                        Deliver
                      </Button>
                    )}
                    <button
                      onClick={() => handleEdit(shipment)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    {shipment.status !== "delivered" &&
                      shipment.status !== "cancelled" && (
                        <button
                          onClick={() => handleDelete(shipment.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      )}
                  </div>
                ),
              }))}
            />
            {filteredShipments.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No shipments found matching your criteria.
              </div>
            )}
          </>
        )}
      </div>

      {/* Pagination */}
      {filteredShipments.length > shipmentsPerPage && (
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Add/Edit Shipment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Edit Shipment" : "Create New Shipment"}
        size="lg"
      >
        <ShipmentForm
          shipment={selectedShipment}
          onSave={handleSaveShipment}
          onCancel={() => setIsModalOpen(false)}
          isEditing={isEditing}
        />
      </Modal>
    </div>
  );
};

// Shipment Form Component
const ShipmentForm = ({ shipment, onSave, onCancel, isEditing }) => {
  const [formData, setFormData] = useState({
    type: shipment?.type || "outbound",
    customer: shipment?.customer || "",
    items: shipment?.items || 0,
    weight: shipment?.weight || 0,
    carrier: shipment?.carrier || "FedEx",
    trackingNumber: shipment?.trackingNumber || "",
    destination: shipment?.destination || "",
    origin: shipment?.origin || "",
    notes: shipment?.notes || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "items" || name === "weight" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Shipment Type"
        name="type"
        value={formData.type}
        onChange={handleChange}
        options={[
          { value: "inbound", label: "Inbound" },
          { value: "outbound", label: "Outbound" },
        ]}
        required
      />

      {formData.type === "outbound" ? (
        <Input
          label="Customer"
          name="customer"
          value={formData.customer}
          onChange={handleChange}
          required
        />
      ) : (
        <Input
          label="Origin/Supplier"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
          required
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Number of Items"
          name="items"
          type="number"
          min="1"
          value={formData.items}
          onChange={handleChange}
          required
        />
        <Input
          label="Total Weight (kg)"
          name="weight"
          type="number"
          step="0.1"
          min="0.1"
          value={formData.weight}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Carrier"
          name="carrier"
          value={formData.carrier}
          onChange={handleChange}
          options={[
            { value: "FedEx", label: "FedEx" },
            { value: "UPS", label: "UPS" },
            { value: "DHL", label: "DHL" },
            { value: "USPS", label: "USPS" },
            { value: "Other", label: "Other" },
          ]}
          required
        />
        <Input
          label="Tracking Number"
          name="trackingNumber"
          value={formData.trackingNumber}
          onChange={handleChange}
        />
      </div>

      {formData.type === "outbound" ? (
        <Input
          label="Destination"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          required
        />
      ) : null}

      <Input
        label="Notes"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        as="textarea"
        rows={3}
      />

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? "Update Shipment" : "Create Shipment"}
        </Button>
      </div>
    </form>
  );
};

export default ManagerShipments;
