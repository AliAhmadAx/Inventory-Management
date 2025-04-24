import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { ...notification, id }]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

const NotificationContainer = () => {
  const { notifications, removeNotification } = useContext(NotificationContext);

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};

const Notification = ({ notification, onClose }) => {
  const getNotificationColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-100 border-green-400 text-green-700";
      case "error":
        return "bg-red-100 border-red-400 text-red-700";
      case "warning":
        return "bg-yellow-100 border-yellow-400 text-yellow-700";
      default:
        return "bg-blue-100 border-blue-400 text-blue-700";
    }
  };

  return (
    <div
      className={`border-l-4 p-4 rounded shadow-lg ${getNotificationColor(
        notification.type
      )}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">{notification.title}</p>
          <p className="text-sm">{notification.message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export const useNotification = () => useContext(NotificationContext);
