import {
  TruckIcon,
  CheckIcon,
  ClockIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const statusConfig = {
  delivered: {
    icon: <CheckIcon className="h-5 w-5 text-green-500" />,
    color: "text-green-800 bg-green-100",
  },
  in_transit: {
    icon: <TruckIcon className="h-5 w-5 text-blue-500" />,
    color: "text-blue-800 bg-blue-100",
  },
  processing: {
    icon: <ArrowPathIcon className="h-5 w-5 text-yellow-500" />,
    color: "text-yellow-800 bg-yellow-100",
  },
  ready: {
    icon: <ClockIcon className="h-5 w-5 text-purple-500" />,
    color: "text-purple-800 bg-purple-100",
  },
};

const RecentShipments = ({ shipments }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Shipment ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Items
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {shipments.map((shipment) => (
            <tr key={shipment.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {shipment.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {shipment.customer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    statusConfig[shipment.status].color
                  }`}
                >
                  <div className="flex items-center">
                    {statusConfig[shipment.status].icon}
                    <span className="ml-1 capitalize">
                      {shipment.status.replace("_", " ")}
                    </span>
                  </div>
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {shipment.items}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(shipment.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentShipments;
