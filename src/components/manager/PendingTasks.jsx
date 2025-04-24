import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { formatDistanceToNow } from "date-fns";

const priorityIcons = {
  high: <ExclamationCircleIcon className="h-5 w-5 text-red-500" />,
  medium: <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" />,
  low: <ExclamationCircleIcon className="h-5 w-5 text-blue-500" />,
};

const PendingTasks = ({ tasks, onTaskComplete }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No pending tasks. Great job!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <div className="flex-shrink-0 pt-1">
            {priorityIcons[task.priority]}
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{task.title}</p>
            <p className="text-xs text-gray-500">
              Due {formatDistanceToNow(new Date(task.due), { addSuffix: true })}
            </p>
          </div>
          <button
            onClick={() => onTaskComplete(task.id)}
            className="ml-2 text-green-600 hover:text-green-800"
            title="Mark as complete"
          >
            <CheckCircleIcon className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default PendingTasks;
