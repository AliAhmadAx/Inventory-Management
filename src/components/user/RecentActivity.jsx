import {
  ClockIcon,
  CubeIcon,
  TruckIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { formatDistanceToNow } from "date-fns";

const activityIcons = {
  inventory: <CubeIcon className="h-5 w-5 text-blue-500" />,
  shipment: <TruckIcon className="h-5 w-5 text-green-500" />,
  payment: <CheckCircleIcon className="h-5 w-5 text-purple-500" />,
  default: <ClockIcon className="h-5 w-5 text-gray-500" />,
};

const RecentActivity = ({ activities = [] }) => {
  if (!activities.length) {
    return (
      <div className="text-center py-4 text-gray-500">
        No recent activities found.
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start">
            <div className="flex-shrink-0 pt-1">
              {activityIcons[activity.type] || activityIcons.default}
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {activity.title}
              </p>
              <div className="flex flex-wrap items-center text-xs text-gray-500 mt-1">
                <span>
                  {formatDistanceToNow(new Date(activity.timestamp), {
                    addSuffix: true,
                  })}
                </span>
                {activity.meta && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{activity.meta}</span>
                  </>
                )}
              </div>
            </div>
            {/* {action && ( */}
            <button className="ml-2 text-sm text-blue-600 hover:text-blue-800">
              View
            </button>
            {/* )} */}
          </div>
        ))}
      </div>
      {activities.length > 3 && (
        <div className="mt-4 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View All Activity
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
