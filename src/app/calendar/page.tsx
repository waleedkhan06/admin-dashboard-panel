"use client"

import { useEffect, useState } from "react"
import type { Order } from "../../../types/order"

export default function CalendarPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [dateEvents, setDateEvents] = useState<Order[]>([])

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    if (selectedDate && orders.length > 0) {
      const eventsForDate = orders.filter((order) => {
        const orderDate = new Date(order.createdAt)
        return (
          orderDate.getDate() === selectedDate.getDate() &&
          orderDate.getMonth() === selectedDate.getMonth() &&
          orderDate.getFullYear() === selectedDate.getFullYear()
        )
      })
      setDateEvents(eventsForDate)
    }
  }, [selectedDate, orders])

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/create-order")
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="grid gap-6 md:grid-cols-[400px,1fr]">
        {/* Calendar Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Calendar</h2>
          <input
            type="date"
            value={selectedDate?.toISOString().split("T")[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="w-full p-2 border dark:border-gray-700 rounded-md dark:bg-gray-900 dark:text-gray-100"
          />
        </div>

        {/* Events Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Events for {selectedDate?.toLocaleDateString()}
          </h2>
          <div className="space-y-4 mt-4">
            {dateEvents.map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between p-4 rounded-lg border dark:border-gray-700"
              >
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{order.car.name} Rental</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Customer: {order.userName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status: {order.status}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Time: {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-gray-100">${order.totalPrice}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{order.rentalDays} days</p>
                </div>
              </div>
            ))}
            {dateEvents.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400">No events scheduled for this date</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
