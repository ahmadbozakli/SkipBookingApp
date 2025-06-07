"use client";

import type React from "react";
import {
  LuMapPin,
  LuTrash2,
  LuTruck,
  LuShield,
  LuCalendar,
  LuCreditCard,
} from "react-icons/lu";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { useDarkMode } from "@/context/darkModeContext";

interface BookingStep {
  id: string;
  label: string;
  icon: React.ReactNode;
  status: "completed" | "active" | "inactive";
}

interface BookingHeaderProps {
  currentStep?: string;
}

export function BookingHeader({
  currentStep = "select-skip",
}: BookingHeaderProps) {
  const { isDarkMode } = useDarkMode();

  const steps: BookingStep[] = [
    {
      id: "postcode",
      label: "Postcode",
      icon: <LuMapPin className="h-4 w-4" />,
      status: "completed",
    },
    {
      id: "waste-type",
      label: "Waste Type",
      icon: <LuTrash2 className="h-4 w-4" />,
      status: "completed",
    },
    {
      id: "select-skip",
      label: "Select Skip",
      icon: <LuTruck className="h-4 w-4" />,
      status: "active",
    },
    {
      id: "permit-check",
      label: "Permit Check",
      icon: <LuShield className="h-4 w-4" />,
      status: "inactive",
    },
    {
      id: "choose-date",
      label: "Choose Date",
      icon: <LuCalendar className="h-4 w-4" />,
      status: "inactive",
    },
    {
      id: "payment",
      label: "Payment",
      icon: <LuCreditCard className="h-4 w-4" />,
      status: "inactive",
    },
  ];

  return (
    <header
      className={cn(
        "py-6 px-4 sm:px-6 md:px-8 top-0 z-20 transition-colors duration-300",
        isDarkMode
          ? "bg-gray-900 text-white border-b border-gray-800"
          : "bg-white text-gray-900 border-b border-gray-200 shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4 overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                {/* Step Icon + Label */}
                <div className="flex items-center space-x-2 whitespace-nowrap">
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full transition-colors",
                      step.status === "completed" && "bg-blue-500 text-white",
                      step.status === "active" && "bg-blue-500 text-white",
                      step.status === "inactive" &&
                        (isDarkMode
                          ? "bg-gray-600 text-gray-400"
                          : "bg-gray-200 text-gray-500")
                    )}
                  >
                    {step.icon}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors",
                      step.status === "completed" && "text-blue-500",
                      step.status === "active" && "text-blue-500",
                      step.status === "inactive" &&
                        (isDarkMode ? "text-gray-400" : "text-gray-500")
                    )}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connector */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-6 sm:w-12 h-0.5 mx-2 sm:mx-4",
                      isDarkMode ? "bg-gray-600" : "bg-gray-300"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Theme Toggle */}
          <div className="ml-4 shrink-0">
            <ThemeToggle />
          </div>
        </div>

        {/* Step Title */}
        <div className="text-center">
          <h1
            className={cn(
              "text-2xl md:text-3xl font-bold mb-2",
              isDarkMode ? "text-white" : "text-gray-900"
            )}
          >
            Choose Your Skip Size
          </h1>
          <p
            className={cn(
              "text-sm",
              isDarkMode ? "text-gray-300" : "text-gray-600"
            )}
          >
            Select the skip size that best suits your needs
          </p>
        </div>
      </div>
    </header>
  );
}
