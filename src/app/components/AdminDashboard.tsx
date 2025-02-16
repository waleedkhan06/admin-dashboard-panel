"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { BarChart3, Calendar, HelpCircle, Home, Inbox, LogOut, RefreshCcw, Settings, Car, X } from "lucide-react"
import { FaEllipsisV } from "react-icons/fa"
import type { Order } from "../../..//types/order"
import { urlFor } from "@/sanity/lib/image"

const carTypes = [
  { name: "Sport Car", value: 17438, color: "#60a5fa" },
  { name: "SUV", value: 9478, color: "#34d399" },
  { name: "Coupe", value: 18197, color: "#a78bfa" },
  { name: "Hatchback", value: 12510, color: "#fb923c" },
  { name: "MPV", value: 14406, color: "#f472b6" },
]

const totalRentals = carTypes.reduce((acc, type) => acc + type.value, 0)

export default function AdminDashboard() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/create-order")
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
        if (data.length > 0) {
          setSelectedOrder(data[0])
        }
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleLogout = () => {
    // Implement your logout logic here
    router.push("/admin/login")
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full px-3 py-4 flex flex-col">
          <div className="flex justify-between items-center mb-6 px-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">MAIN MENU</h2>
            <button
              onClick={toggleSidebar}
              className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="space-y-2 flex-1">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/admin/car-rent"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            >
              <Car className="h-5 w-5" />
              Car Rent
            </Link>
            <Link
              href="/insight"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            >
              <BarChart3 className="h-5 w-5" />
              Insight
            </Link>
            <Link
              href="/reimburse"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            >
              <RefreshCcw className="h-5 w-5" />
              Reimburse
            </Link>
            <Link
              href="/inbox"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            >
              <Inbox className="h-5 w-5" />
              Inbox
            </Link>
            <Link
              href="/calendar"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            >
              <Calendar className="h-5 w-5" />
              Calendar
            </Link>
          </nav>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h2 className="mb-4 px-4 text-lg font-semibold text-gray-800 dark:text-white">PREFERENCES</h2>
            <nav className="space-y-2">
              <Link
                href="/settings"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
              <Link
                href="/help"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              >
                <HelpCircle className="h-5 w-5" />
                Help & Center
              </Link>
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 mt-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </button>
        </div>
      </aside>

      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Details Rental */}
              {selectedOrder && (
                <div
                  className="rounded-xl p-6 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200 border border-gray-200 dark:border-gray-700"
                  data-aos="fade-up"
                >
                  <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Details Rental</h2>

                  <Image
                    src="/Maps.png"
                    alt="Map"
                    width={800}
                    height={400}
                    className="rounded-xl h-48 mb-6 object-cover"
                  />

                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-blue-600 rounded-xl p-2 w-20 h-20 relative">
                      <Image
                        src={selectedOrder.car.image ? urlFor(selectedOrder.car.image).url() : "/placeholder.svg"}
                        alt={selectedOrder.car.name || "Car Image"}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-gray-900 dark:text-white font-semibold">{selectedOrder.car.name}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{selectedOrder.car.type || "Car"}</p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-gray-500 dark:text-gray-400 text-sm">#{selectedOrder._id}</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Pick-Up Details */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                        <span className="text-gray-900 dark:text-white text-sm font-medium">Pick - Up</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="text-gray-500 dark:text-gray-400 text-sm">Location</label>
                          <p className="font-medium text-gray-900 dark:text-white">{selectedOrder.pickupLocation}</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-gray-500 dark:text-gray-400 text-sm">Customer Name</label>
                          <p className="font-medium text-gray-900 dark:text-white">{selectedOrder.userName}</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-gray-500 dark:text-gray-400 text-sm">Phone Number</label>
                          <p className="font-medium text-gray-900 dark:text-white">{selectedOrder.userPhone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Drop-Off Details */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                        <span className="text-gray-900 dark:text-white text-sm font-medium">Drop - Off</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="text-gray-500 dark:text-gray-400 text-sm">Location</label>
                          <p className="font-medium text-gray-900 dark:text-white">{selectedOrder.dropOffLocation}</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-gray-500 dark:text-gray-400 text-sm">Email</label>
                          <p className="font-medium text-gray-900 dark:text-white">{selectedOrder.userEmail}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total Price and Rental Days */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-900 dark:text-white text-sm font-medium">Total Rental Price</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">
                          Overall price and includes rental discount
                        </p>
                      </div>
                      <div className="text-gray-900 dark:text-white text-2xl font-semibold">
                        ${selectedOrder.totalPrice}
                      </div>
                    </div>

                  
                    <div className="mt-4 text-right">
                      <p className="text-gray-900 dark:text-white text-sm font-medium">Rental Days</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedOrder.rentalDays} days</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {/* Top 5 Car Rental */}
                <div
                  className="rounded-xl p-6 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200 border border-gray-200 dark:border-gray-700"
                  data-aos="fade-up"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-gray-900 dark:text-white text-xl font-semibold">Top 5 Car Rental</h2>
                    <button className="text-gray-500 dark:text-gray-400">
                      <FaEllipsisV className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="relative w-32 h-32 md:w-40 md:h-40">
                      <Image src="/Chart.png" alt="Donut chart" fill className="object-contain" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-gray-900 dark:text-white text-xl md:text-2xl font-semibold">
                            {totalRentals.toLocaleString()}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 text-sm">Rental Car</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {carTypes.map((stat) => (
                        <div key={stat.name} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stat.color }} />
                          <span className="text-gray-900 dark:text-white text-sm">{stat.name}</span>
                          <span className="text-gray-500 dark:text-gray-400 text-sm ml-auto">
                            {stat.value.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Transaction */}
                <div
                  className="rounded-xl p-6 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200 border border-gray-200 dark:border-gray-700"
                  data-aos="fade-up"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-gray-900 dark:text-white text-2xl font-semibold">Recent Transaction</h2>
                    <a href="#" className="text-blue-600 dark:text-blue-400 text-sm">
                      View All
                    </a>
                  </div>

                  <div className="space-y-4">
                    {orders.slice(0, 6).map((order) => (
                      <div key={order._id} className="flex items-center gap-4">
                        <div className="w-16 h-12 relative rounded-lg p-2">
                          <Image
                            src={order.car.image ? urlFor(order.car.image).url() : "/placeholder.svg"}
                            alt={order.car.name || "Car Image"}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="text-gray-900 dark:text-white font-semibold">{order.car.name}</h3>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">{order.status}</p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <span className="text-gray-900 dark:text-white text-sm font-semibold">
                            ${order.totalPrice}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

