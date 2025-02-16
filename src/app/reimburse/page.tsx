"use client";

import { useState, useEffect } from "react";
import type { Order } from "../../../types/order";

interface Reimbursements {
  pending: Order[];
  processed: Order[];
}

export default function Reimburse() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [reimbursements, setReimbursements] = useState<Reimbursements>({
    pending: [],
    processed: [],
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      const pending = orders.filter((order) => order.status === "Cancelled");
      const processed = orders.filter(
        (order) => order.status === "Completed" && order.isReimbursed === true
      );
      setReimbursements({ pending, processed });
    }
  }, [orders]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/create-order");
      if (response.ok) {
        const data: Order[] = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const processRefund = async (orderId: string) => {
    try {
      const response = await fetch("/api/create-order", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          status: "Completed",
          isReimbursed: true,
        }),
      });

      if (response.ok) {
        fetchOrders(); // Refresh orders after update
      }
    } catch (error) {
      console.error("Error processing refund:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* Pending Reimbursements */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Pending Reimbursements
            </h2>
            <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-2 py-1 rounded">
              {reimbursements.pending.length}
            </span>
          </div>
          <div className="space-y-4">
            {reimbursements.pending.map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between p-4 rounded-lg border dark:border-gray-700"
              >
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    {order.car.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Customer: {order.userName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Amount: ${order.totalPrice}
                  </p>
                </div>
                <button
                  className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                  onClick={() => processRefund(order._id)}
                >
                  Process Refund
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Processed Reimbursements */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Processed Reimbursements
            </h2>
            <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-2 py-1 rounded">
              {reimbursements.processed.length}
            </span>
          </div>
          <div className="space-y-4">
            {reimbursements.processed.map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between p-4 rounded-lg border dark:border-gray-700"
              >
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    {order.car.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Customer: {order.userName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Refunded: ${order.totalPrice}
                  </p>
                </div>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                  Completed
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
