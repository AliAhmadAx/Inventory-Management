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
            sku: "ELEC-SPX-2023",
            category: "Electronics",
            quantity: 5,
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
            quantity: 2,
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
            quantity: 15,
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
            quantity: 0,
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
            quantity: 3,
            location: "C-1-5",
            status: "in_stock",
            lastChecked: "2023-06-12",
            value: 39.99,
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

  const getQuantityIndicator = (quantity) => {
    if (quantity === 0) return "text-red-600 font-bold";
    if (quantity < 3) return "text-yellow-600 font-medium";
    return "text-green-600";
  };

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
              Add Item
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
                { header: "ID", accessor: "idDisplay" },
                { header: "Name", accessor: "name" },
                { header: "SKU", accessor: "sku" },
                { header: "Category", accessor: "category" },
                { header: "Quantity", accessor: "quantity" },
                { header: "Location", accessor: "location" },
                { header: "Status", accessor: "status" },
                { header: "Value", accessor: "value" },
                {
                  header: "Actions",
                  accessor: "actions",
                  cell: (item) => (
                    <Link to={`/user/inventory/edit/${item.id}`}>
                      {console.log(item, "item in Table Columns")}
                      <Button
                        variant="ghost"
                        size="small"
                        icon={<PencilSquareIcon className="h-4 w-4" />}
                        iconPosition="left"
                      >
                        Edit
                      </Button>
                    </Link>
                  ),
                },
              ]}
              data={currentItems.map((item) => ({
                ...item,
                idDisplay: (
                  <span className="font-mono font-medium">{item.id}</span>
                ),
                sku: <span className="font-mono text-sm">{item.sku}</span>,
                quantity: (
                  <span className={getQuantityIndicator(item.quantity)}>
                    {item.quantity}
                  </span>
                ),
                status: getStatusBadge(item.status),
                value: `$${item.value.toFixed(2)}`,
                lastChecked: new Date(item.lastChecked).toLocaleDateString(),
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
    </div>
  );
};

export default UserInventory;
