import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";
import { Link } from "react-router-dom";
import {
  CubeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  PlusIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Pagination from "../../components/ui/Pagination";
import StatusBadge from "../../components/ui/StatusBadge";
import ProductLabelForm from "../../components/user/ProductLabelForm";

const UserInventory = () => {
  const { user } = useAuth();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call filtered by user's inventory
        const mockInventory = [
          {
            id: "INV-1001",
            name: "Smartphone X",
            status: "in_stock",
            fulfillmentUrl: "/api/download/INV-1001",
          },
          {
            id: "INV-1002",
            name: "Wireless Headphones",
            status: "low_stock",
            fulfillmentUrl: "/api/download/INV-1002",
          },
          {
            id: "INV-1003",
            name: "Cotton T-Shirt",
            status: "in_stock",
            fulfillmentUrl: "/api/download/INV-1003",
          },
          {
            id: "INV-1004",
            name: "Office Chair",
            status: "out_of_stock",
            fulfillmentUrl: "/api/download/INV-1004",
          },
          {
            id: "INV-1005",
            name: "Desk Lamp",
            status: "in_stock",
            fulfillmentUrl: "/api/download/INV-1005",
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

  // const getQuantityIndicator = (quantity) => {
  //   if (quantity === 0) return "text-red-600 font-bold";
  //   if (quantity < 3) return "text-yellow-600 font-medium";
  //   return "text-green-600";
  // };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <CubeIcon className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">My Inventory</h1>
        </div>
        <div className="flex space-x-3">
          <Link to="/user/inventory/add">
            <Button
              variant="primary"
              icon={<PlusIcon className="h-4 w-4" />}
              iconPosition="left"
            >
              Add Package
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
            loading={isRefreshing}
            icon={<ArrowPathIcon className="h-4 w-4" />}
            iconPosition="left"
          >
            Refresh
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
                { header: "Name", accessor: "name" },
                { header: "Tracking Number", accessor: "trackingNumber" },
                { header: "Status", accessor: "status" },
                {
                  header: "Fulfillment",
                  accessor: "fulfillment",
                  cell: (item) => (
                    <a
                      href={item.fulfillmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="ghost"
                        size="small"
                        icon={<ArrowPathIcon className="h-4 w-4" />}
                        iconPosition="left"
                      >
                        Download
                      </Button>
                    </a>
                  ),
                },
              ]}
              data={currentItems.map((item) => ({
                name: item.name,
                trackingNumber: item.id, // Assuming ID is the tracking number
                status: getStatusBadge(item.status),
                fulfillmentUrl: `/api/download/${item.id}`, // Replace with your actual URL logic
                fulfillment: item, // To pass to the cell renderer
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

      {/* <ProductLabelForm /> */}
    </div>
  );
};

export default UserInventory;
