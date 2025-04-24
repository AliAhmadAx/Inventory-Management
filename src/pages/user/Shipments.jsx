import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";
import {
  TruckIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Pagination from "../../components/ui/Pagination";
import StatusBadge from "../../components/ui/StatusBadge";

const UserShipments = () => {
  const { user } = useAuth();
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call filtered by user's shipments
        const mockShipments = [
          {
            id: "SH-1001",
            destination: "TechGadgets Inc, New York, NY",
            status: "delivered",
            items: 24,
            weight: 15.5,
            carrier: "FedEx",
            trackingNumber: "FX123456789",
            date: "2023-06-14",
            deliveredDate: "2023-06-16",
          },
          {
            id: "SH-1002",
            destination: "FashionHub, Los Angeles, CA",
            status: "in_transit",
            items: 42,
            weight: 28.2,
            carrier: "UPS",
            trackingNumber: "1Z123456789",
            date: "2023-06-13",
            estimatedDelivery: "2023-06-18",
          },
          {
            id: "SH-1003",
            destination: "HomeLiving, San Francisco, CA",
            status: "processing",
            items: 15,
            weight: 9.7,
            carrier: "FedEx",
            trackingNumber: "FX987654321",
            date: "2023-06-15",
          },
          {
            id: "SH-1004",
            destination: "ElectroWorld, Seattle, WA",
            status: "ready",
            items: 32,
            weight: 21.4,
            carrier: "UPS",
            trackingNumber: "1Z987654321",
            date: "2023-06-11",
          },
          {
            id: "SH-1005",
            destination: "GadgetZone, Chicago, IL",
            status: "cancelled",
            items: 18,
            weight: 12.3,
            carrier: "USPS",
            trackingNumber: "US123456789",
            date: "2023-06-10",
            cancelledDate: "2023-06-12",
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

  // Filter shipments based on search and filters
  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch =
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || shipment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const shipmentsPerPage = 5;
  const totalPages = Math.ceil(filteredShipments.length / shipmentsPerPage);
  const currentShipments = filteredShipments.slice(
    (currentPage - 1) * shipmentsPerPage,
    currentPage * shipmentsPerPage
  );

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

  const getDeliveryInfo = (shipment) => {
    switch (shipment.status) {
      case "delivered":
        return `Delivered on ${new Date(
          shipment.deliveredDate
        ).toLocaleDateString()}`;
      case "in_transit":
        return `Est. delivery: ${new Date(
          shipment.estimatedDelivery
        ).toLocaleDateString()}`;
      case "cancelled":
        return `Cancelled on ${new Date(
          shipment.cancelledDate
        ).toLocaleDateString()}`;
      default:
        return "Preparing for shipment";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Shipments</h1>
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
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Search Shipments"
            placeholder="Search by ID, destination or tracking..."
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
                { header: "Destination", accessor: "destination" },
                { header: "Status", accessor: "status" },
                { header: "Details", accessor: "details" },
                { header: "Tracking", accessor: "tracking" },
                { header: "Date", accessor: "date" },
              ]}
              data={currentShipments.map((shipment) => ({
                ...shipment,
                id: (
                  <span className="font-mono font-medium">{shipment.id}</span>
                ),
                destination: (
                  <div className="flex items-center">
                    <ArrowUpTrayIcon className="h-5 w-5 text-green-600 mr-2" />
                    {shipment.destination}
                  </div>
                ),
                status: (
                  <div>
                    {getStatusBadge(shipment.status)}
                    <div className="text-xs text-gray-500 mt-1">
                      {getDeliveryInfo(shipment)}
                    </div>
                  </div>
                ),
                details: (
                  <div className="text-sm">
                    <div>{shipment.items} items</div>
                    <div>{shipment.weight} kg</div>
                  </div>
                ),
                tracking: (
                  <div className="font-mono text-sm">
                    {shipment.carrier}: {shipment.trackingNumber}
                  </div>
                ),
                date: new Date(shipment.date).toLocaleDateString(),
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
    </div>
  );
};

export default UserShipments;
