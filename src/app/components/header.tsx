"use client";

import { Moon, Sun, User } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export function Header() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
         
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 transition-all">
              RideSwife
            </h1>
          </div>

         
          <div className="flex items-center gap-4">
          
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
              ) : (
                <Moon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              )}
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-2">
              <span className="text-gray-700 dark:text-gray-300 font-medium transition-all">
                Admin
              </span>
              <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-all cursor-pointer">
                <User className="h-5 w-5 text-gray-500 dark:text-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
