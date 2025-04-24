import { formatDistanceToNow } from "date-fns";
import {
  UserIcon,
  BuildingOfficeIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

const activityIcons = {
  user: <UserIcon className="h-5 w-5 text-blue-500" />,
  warehouse: <BuildingOfficeIcon className="h-5 w-5 text-green-500" />,
  system: <CogIcon className="h-5 w-5 text-purple-500" />,
};

const RecentActivities = ({ activities }) => {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            {activityIcons[activity.type] || activityIcons.system}
          </div>
          <div className="ml-3 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">
                {activity.action}
              </p>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(activity.time), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <p className="text-sm text-gray-500">
              {activity.user && `User: ${activity.user}`}
              {activity.warehouse && `Warehouse: ${activity.warehouse}`}
              {!activity.user && !activity.warehouse && "System activity"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivities;
