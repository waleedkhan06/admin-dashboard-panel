"use client"

import { useState } from "react"


export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    orderUpdates: true,
    marketingEmails: false,
    language: "english",
    currency: "usd",
  })

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
     
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="p-6 border-b dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Account Settings</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your account preferences and settings
            </p>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Notifications</h3>
              <div className="space-y-4">
                {[
                  { key: "notifications", label: "Push Notifications" },
                  { key: "emailAlerts", label: "Email Alerts" },
                  { key: "orderUpdates", label: "Order Updates" },
                  { key: "marketingEmails", label: "Marketing Emails" },
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">{label}</span>
                    <button
                      onClick={() => handleToggle(key as keyof typeof settings)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        settings[key as keyof typeof settings] ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings[key as keyof typeof settings] ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Preferences</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Language</label>
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings((prev) => ({ ...prev, language: e.target.value }))}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currency</label>
                    <select
                      value={settings.currency}
                      onChange={(e) => setSettings((prev) => ({ ...prev, currency: e.target.value }))}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="usd">USD ($)</option>
                      <option value="eur">EUR (€)</option>
                      <option value="gbp">GBP (£)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700">
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

