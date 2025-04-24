import { useState, useEffect } from "react";
import StatusStepper from "../ui/StatusStepper";

const ShipmentTracking = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with API call
    const fetchShipments = async () => {
      setLoading(true);
      // Mock data
      setTimeout(() => {
        setShipments([
          {
            id: "SH-12345",
            trackingNumber: "TN987654321",
            status: "in_transit",
            items: ["Electronics Bundle", "Gift Items"],
            origin: "Warehouse A",
            destination: "Customer Location",
            estimatedDelivery: "2023-06-15",
            steps: [
              {
                id: "ordered",
                label: "Order Processed",
                date: "2023-06-01",
                completed: true,
              },
              {
                id: "packed",
                label: "Packed for Shipping",
                date: "2023-06-03",
                completed: true,
              },
              {
                id: "shipped",
                label: "Shipped",
                date: "2023-06-05",
                completed: true,
              },
              {
                id: "in_transit",
                label: "In Transit",
                date: "2023-06-07",
                completed: true,
              },
              {
                id: "out_for_delivery",
                label: "Out for Delivery",
                date: null,
                completed: false,
              },
              {
                id: "delivered",
                label: "Delivered",
                date: null,
                completed: false,
              },
            ],
          },
        ]);
        setLoading(false);
      }, 800);
    };
    fetchShipments();
  }, []);

  if (loading)
    return <div className="text-center py-4">Loading shipments...</div>;

  return (
    <div className="space-y-6">
      {shipments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No active shipments found.
        </div>
      ) : (
        shipments.map((shipment) => (
          <div
            key={shipment.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">
                    Shipment #{shipment.id}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Tracking: {shipment.trackingNumber}
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {shipment.status.replace("_", " ")}
                </span>
              </div>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">
                  Items in Shipment
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {shipment.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Route</h4>
                  <p className="text-sm text-gray-600">
                    {shipment.origin} → {shipment.destination}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">
                    Estimated Delivery
                  </h4>
                  <p className="text-sm text-gray-600">
                    {shipment.estimatedDelivery || "Not available"}
                  </p>
                </div>
              </div>

              <h4 className="font-medium text-gray-700 mb-3">
                Shipment Progress
              </h4>
              <StatusStepper
                steps={shipment.steps}
                currentStatus={shipment.status}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ShipmentTracking;
