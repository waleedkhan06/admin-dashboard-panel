"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"


const faqs = [
  {
    question: "How do I add a new car to the system?",
    answer:
      "To add a new car, go to the Car Rent section and click on the 'Add New Car' button. Fill in all the required details including car specifications, pricing, and upload images.",
  },
  {
    question: "How can I process a refund?",
    answer:
      "Navigate to the Reimburse section, find the order you want to refund, and click the 'Process Refund' button. Follow the prompts to complete the refund process.",
  },
  {
    question: "How do I update the status of an order?",
    answer:
      "In the Car Rent section, find the order you want to update. Use the status dropdown menu to change the status to Pending, Confirmed, Cancelled, or Completed.",
  },
  {
    question: "Can I export rental reports?",
    answer:
      "Yes, you can export reports from the Insight section. Click on the 'Export' button and choose your preferred format (PDF, CSV, or Excel).",
  },
  {
    question: "How do I contact technical support?",
    answer:
      "For technical support, please email support@rideswift.com or use the chat feature in the bottom right corner of your screen.",
  },
]

export default function HelpCenter() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Help Center</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Find answers to common questions and learn how to use RideSwift
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <span className="text-lg font-medium text-gray-900 dark:text-white">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openIndex === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && <p className="mt-4 text-gray-600 dark:text-gray-400">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Still need help?</h3>
          <div className="inline-flex space-x-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Contact Support</button>
            <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

