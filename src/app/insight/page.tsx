"use client"

import { useEffect, useState, useCallback } from "react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import type { Order } from "../../../types/order"

export default function Insight() {
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageRental: 0,
    monthlyData: [] as { name: string; revenue: number; orders: number }[],
    dailyRevenue: [] as { name: string; revenue: number }[],
    popularCars: [] as { name: string; rentals: number }[],
  })

  const fetchOrders = useCallback(async () => {
    try {
      const response = await fetch("/api/create-order")
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    }
  }, [])

  const calculateStats = useCallback(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0)
    const averageRental = totalRevenue / orders.length

    // Monthly data
    const monthlyData: Record<string, { revenue: number; orders: number }> = {}
    orders.forEach((order) => {
      const month = new Date(order.createdAt).toLocaleString("default", { month: "short" })
      if (!monthlyData[month]) {
        monthlyData[month] = { revenue: 0, orders: 0 }
      }
      monthlyData[month].revenue += order.totalPrice
      monthlyData[month].orders += 1
    })

    // Daily revenue (last 7 days)
    const dailyRevenue = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toLocaleDateString("default", { weekday: "short" })
      const revenue = orders
        .filter((order) => new Date(order.createdAt).toDateString() === date.toDateString())
        .reduce((sum, order) => sum + order.totalPrice, 0)
      return { name: dateStr, revenue }
    }).reverse()

    // Popular cars
    const carRentals: Record<string, number> = {}
    orders.forEach((order) => {
      const carName = order.car.name
      carRentals[carName] = (carRentals[carName] || 0) + 1
    })
    const popularCars = Object.entries(carRentals)
      .map(([name, rentals]) => ({ name, rentals }))
      .sort((a, b) => b.rentals - a.rentals)
      .slice(0, 5)

    setStats({
      totalRevenue,
      totalOrders: orders.length,
      averageRental,
      monthlyData: Object.entries(monthlyData).map(([name, data]) => ({
        name,
        ...data,
      })),
      dailyRevenue,
      popularCars,
    })
  }, [orders])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  useEffect(() => {
    if (orders.length > 0) {
      calculateStats()
    }
  }, [orders, calculateStats])

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">${stats.totalRevenue.toFixed(2)}</p>
            <p className="mt-1 text-sm text-green-600 dark:text-green-400">+4.75% from last month</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{stats.totalOrders}</p>
            <p className="mt-1 text-sm text-green-600 dark:text-green-400">+12% from last month</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Rental Value</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">${stats.averageRental.toFixed(2)}</p>
            <p className="mt-1 text-sm text-green-600 dark:text-green-400">+2.3% from last month</p>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Revenue Overview</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.monthlyData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.2} />
                <XAxis dataKey="name" stroke="#6b7280" tick={{ fill: "#6b7280" }} />
                <YAxis stroke="#6b7280" tick={{ fill: "#6b7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  itemStyle={{ color: "#fff" }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Revenue & Popular Cars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Daily Revenue</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.dailyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.2} />
                  <XAxis dataKey="name" stroke="#6b7280" tick={{ fill: "#6b7280" }} />
                  <YAxis stroke="#6b7280" tick={{ fill: "#6b7280" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} dot={{ fill: "#3B82F6" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Popular Cars</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.popularCars}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.2} />
                  <XAxis dataKey="name" stroke="#6b7280" tick={{ fill: "#6b7280" }} />
                  <YAxis stroke="#6b7280" tick={{ fill: "#6b7280" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Bar dataKey="rentals" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

