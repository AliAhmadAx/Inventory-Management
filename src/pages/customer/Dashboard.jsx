import React, { useState } from "react";
import Table from "../../components/ui/Table"; // Adjust the import path as needed

const CustomerDashboard = () => {
  const [activeSection, setActiveSection] = useState("inventory");

  const sidebarLinks = [
    { id: "profile", label: "Profile" },
    { id: "inventory", label: "Inventory" },
    { id: "payments", label: "Payments" },
    { id: "notifications", label: "Notifications" },
  ];

  // Dummy data for table
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Tracking Number", accessor: "trackingNumber" },
    {
      header: "Status",
      accessor: "status",
      cell: (row) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            row.status === "Received"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    { header: "Fulfillment", accessor: "fulfillment" },
  ];

  const data = [
    {
      name: "Package A",
      trackingNumber: "123456789",
      status: "Received",
      fulfillment: "FBA",
    },
    {
      name: "Package B",
      trackingNumber: "987654321",
      status: "Pending",
      fulfillment: "FMB",
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 text-xl font-bold border-b">Warehouse Portal</div>
        <nav className="mt-6">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveSection(link.id)}
              className={`block w-full text-left px-6 py-3 hover:bg-gray-200 ${
                activeSection === link.id ? "bg-gray-300 font-semibold" : ""
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-4 bg-white shadow-sm">
          <h1 className="text-2xl font-semibold">
            {sidebarLinks.find((l) => l.id === activeSection)?.label}
          </h1>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <span className="material-icons text-gray-600 cursor-pointer">notifications</span>
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
                3
              </span>
            </button>
            <div className="flex items-center space-x-2 cursor-pointer">
              <img
                src="/user-profile.jpg"
                alt="User Profile"
                className="w-8 h-8 rounded-full"
              />
              <span>John Doe</span>
            </div>
            <button className="text-red-600 hover:underline">Logout</button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {activeSection === "inventory" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Your Packages</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  + Add Package
                </button>
              </div>

              <Table columns={columns} data={data} />
            </div>
          )}

          {activeSection === "profile" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>
              <p>Profile form will go here.</p>
            </div>
          )}

          {activeSection === "payments" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Payments</h2>
              <p>Payment history and payment form goes here.</p>
            </div>
          )}

          {activeSection === "notifications" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Notifications</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Your package #123456789 has been received.</li>
                <li>Stock running low on Package B.</li>
                <li>Payment due for your recent order.</li>
              </ul>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
