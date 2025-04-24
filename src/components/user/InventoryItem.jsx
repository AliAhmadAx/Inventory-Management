import { Link } from "react-router-dom";
import Button from "../ui/Button";
import StatusBadge from "../ui/StatusBadge";

const InventoryItem = ({ item, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "in warehouse":
        return "bg-green-100 text-green-800";
      case "in transit":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <li className="p-4 hover:bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="text-md font-medium text-gray-900 truncate">
              {item.name}
            </h3>
            <StatusBadge
              status={item.status}
              color={getStatusColor(item.status)}
            />
          </div>
          <div className="mt-1 flex flex-wrap gap-2 text-sm text-gray-500">
            <span>Qty: {item.quantity}</span>
            <span>•</span>
            <span>Size: {item.size}</span>
            <span>•</span>
            <span>Arrival: {item.arrivalDate}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link to={`/user/inventory/${item.id}`}>
            <Button variant="outline">View</Button>
          </Link>
          <Button variant="danger" onClick={() => onDelete(item.id)}>
            Delete
          </Button>
        </div>
      </div>
    </li>
  );
};

export default InventoryItem;
