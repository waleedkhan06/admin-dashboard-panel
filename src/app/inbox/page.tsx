"use client";

import { useEffect, useState } from "react";
import type { Order } from "../../../types/order";

export default function Inbox() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<{
    new: { order: Order; message: string }[];
    earlier: { order: Order; message: string }[];
  }>({
    new: [],
    earlier: [],
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      const newNotifications = orders
        .filter((order) => new Date(order.createdAt).getTime() > Date.now() - 24 * 60 * 60 * 1000)
        .map((order) => ({
          order,
          message: getNotificationMessage(order),
        }));

      const earlierNotifications = orders
        .filter((order) => new Date(order.createdAt).getTime() <= Date.now() - 24 * 60 * 60 * 1000)
        .map((order) => ({
          order,
          message: getNotificationMessage(order),
        }));

      setNotifications({
        new: newNotifications,
        earlier: earlierNotifications,
      });
    }
  }, [orders]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/create-order");
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const getNotificationMessage = (order: Order) => {
    switch (order.status) {
      case "Pending":
        return "New rental request received";
      case "Confirmed":
        return "Rental has been confirmed";
      case "Cancelled":
        return "Rental has been cancelled";
      case "Completed":
        return "Rental has been completed";
      default:
        return "Order status updated";
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* New Notifications */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            New Notifications
          </h2>
          <span className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded">
            {notifications.new.length}
          </span>
        </div>
        <div className="space-y-4 mt-4">
          {notifications.new.map(({ order, message }) => (
            <div
              key={order._id}
              className="p-4 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 shadow-sm"
            >
              <h3 className="font-medium text-gray-900 dark:text-gray-100">{message}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {order.car.name} - {order.userName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <span className="text-sm font-medium px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Earlier Notifications */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Earlier</h2>
        <div className="space-y-4 mt-4">
          {notifications.earlier.map(({ order, message }) => (
            <div
              key={order._id}
              className="p-4 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 shadow-sm"
            >
              <h3 className="font-medium text-gray-900 dark:text-gray-100">{message}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {order.car.name} - {order.userName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <span className="text-sm font-medium px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-200">
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
