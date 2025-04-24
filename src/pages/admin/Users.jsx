import { useState, useEffect } from "react";
import { useNotification } from "../../contexts/NotificationContext";
import {
  UserIcon,
  EnvelopeIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Table from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Modal from "../../components/ui/Modal";
import Pagination from "../../components/ui/Pagination";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { addNotification } = useNotification();

  // Mock data - replace with API calls
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        const mockUsers = [
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            role: "super-admin",
            status: "active",
            lastLogin: "2023-06-15T10:30:00",
            warehouse: "All",
          },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "manager",
            status: "active",
            lastLogin: "2023-06-14T15:45:00",
            warehouse: "NY-1",
          },
          {
            id: 3,
            name: "Bob Johnson",
            email: "bob@example.com",
            role: "manager",
            status: "pending",
            lastLogin: null,
            warehouse: "LA-2",
          },
          {
            id: 4,
            name: "Alice Williams",
            email: "alice@example.com",
            role: "user",
            status: "active",
            lastLogin: "2023-06-13T09:20:00",
            warehouse: "CH-3",
          },
          {
            id: 5,
            name: "Charlie Brown",
            email: "charlie@example.com",
            role: "user",
            status: "suspended",
            lastLogin: "2023-06-10T14:10:00",
            warehouse: "TX-4",
          },
          {
            id: 6,
            name: "Eva Davis",
            email: "eva@example.com",
            role: "user",
            status: "active",
            lastLogin: "2023-06-15T08:45:00",
            warehouse: "SF-5",
          },
          {
            id: 7,
            name: "Mike Wilson",
            email: "mike@example.com",
            role: "manager",
            status: "active",
            lastLogin: "2023-06-14T11:30:00",
            warehouse: "NY-1",
          },
          {
            id: 8,
            name: "Sarah Miller",
            email: "sarah@example.com",
            role: "user",
            status: "pending",
            lastLogin: null,
            warehouse: "LA-2",
          },
        ];
        setUsers(mockUsers);
      } catch (error) {
        addNotification({
          title: "Error",
          message: "Failed to load users",
          type: "error",
        });
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [addNotification]);

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const usersPerPage = 5;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (userId) => {
    // TODO: Add API call for deletion
    setUsers(users.filter((user) => user.id !== userId));
    addNotification({
      title: "Success",
      message: "User deleted successfully",
      type: "success",
    });
  };

  const handleSaveUser = (userData) => {
    // TODO: Add API call for save/update
    if (isEditing) {
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...user, ...userData } : user
        )
      );
      addNotification({
        title: "Success",
        message: "User updated successfully",
        type: "success",
      });
    } else {
      const newUser = {
        ...userData,
        id: users.length + 1,
        status: "active",
        lastLogin: null,
      };
      setUsers([...users, newUser]);
      addNotification({
        title: "Success",
        message: "User created successfully",
        type: "success",
      });
    }
    setIsModalOpen(false);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "super-admin":
        return <ShieldCheckIcon className="h-5 w-5 text-purple-500" />;
      case "manager":
        return <UserGroupIcon className="h-5 w-5 text-blue-500" />;
      default:
        return <UserIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      suspended: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <Button
          onClick={() => {
            setSelectedUser(null);
            setIsEditing(false);
            setIsModalOpen(true);
          }}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Search Users"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<UserIcon className="h-5 w-5 text-gray-400" />}
          />
          <Select
            label="Filter by Role"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            options={[
              { value: "all", label: "All Roles" },
              { value: "super-admin", label: "Super Admin" },
              { value: "manager", label: "Manager" },
              { value: "user", label: "User" },
            ]}
          />
          <Select
            label="Filter by Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: "all", label: "All Statuses" },
              { value: "active", label: "Active" },
              { value: "pending", label: "Pending" },
              { value: "suspended", label: "Suspended" },
            ]}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading users...</p>
          </div>
        ) : (
          <>
            <Table
              columns={[
                { header: "Name", accessor: "name" },
                { header: "Email", accessor: "email" },
                { header: "Role", accessor: "role" },
                { header: "Status", accessor: "status" },
                { header: "Warehouse", accessor: "warehouse" },
                { header: "Last Login", accessor: "lastLogin" },
                { header: "Actions", accessor: "actions" },
              ]}
              data={currentUsers.map((user) => ({
                ...user,
                name: (
                  <div className="flex items-center">
                    {getRoleIcon(user.role)}
                    <span className="ml-2">{user.name}</span>
                  </div>
                ),
                email: (
                  <div className="flex items-center">
                    <EnvelopeIcon className="h-4 w-4 text-gray-500 mr-2" />
                    {user.email}
                  </div>
                ),
                role: (
                  <span className="capitalize">
                    {user.role.replace("-", " ")}
                  </span>
                ),
                status: getStatusBadge(user.status),
                lastLogin: user.lastLogin
                  ? new Date(user.lastLogin).toLocaleString()
                  : "Never",
                actions: (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ),
              }))}
            />
            {filteredUsers.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No users found matching your criteria.
              </div>
            )}
          </>
        )}
      </div>

      {/* Pagination */}
      {filteredUsers.length > usersPerPage && (
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Add/Edit User Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Edit User" : "Add New User"}
      >
        <UserForm
          user={selectedUser}
          onSave={handleSaveUser}
          onCancel={() => setIsModalOpen(false)}
          isEditing={isEditing}
        />
      </Modal>
    </div>
  );
};

// User Form Component
const UserForm = ({ user, onSave, onCancel, isEditing }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "user",
    status: user?.status || "active",
    warehouse: user?.warehouse || "",
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
      <Input
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        disabled={isEditing}
      />
      <Select
        label="User Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        options={[
          { value: "super-admin", label: "Super Admin" },
          { value: "manager", label: "Manager" },
          { value: "user", label: "Regular User" },
        ]}
        required
      />
      {formData.role !== "super-admin" && (
        <Input
          label="Assigned Warehouse"
          name="warehouse"
          value={formData.warehouse}
          onChange={handleChange}
          placeholder="Enter warehouse code"
        />
      )}
      {isEditing && (
        <Select
          label="Account Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            { value: "active", label: "Active" },
            { value: "pending", label: "Pending" },
            { value: "suspended", label: "Suspended" },
          ]}
          required
        />
      )}
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? "Update User" : "Create User"}
        </Button>
      </div>
    </form>
  );
};

export default AdminUsers;
