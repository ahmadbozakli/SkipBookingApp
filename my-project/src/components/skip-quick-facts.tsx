import { LuCircleCheck ,LuZap ,LuTriangleAlert ,LuInfo ,LuLightbulb  } from "react-icons/lu";

import { cn } from "@/lib/utils";
import { useDarkMode } from "@/context/darkModeContext";
import type { ProcessedSkipData } from "@/types/skip";

interface SkipQuickFactsProps {
  skip: ProcessedSkipData;
}

export function SkipQuickFacts({ skip }: SkipQuickFactsProps) {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={cn(
        "rounded-3xl shadow-xl border overflow-hidden",
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white/70 backdrop-blur-xl border-0"
      )}
    >
      <div className="p-6">
        <h2
          className={cn(
            "text-xl font-bold flex items-center gap-3",
            isDarkMode ? "text-white" : "text-gray-600"
          )}
        >
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              isDarkMode ? "bg-amber-600" : "bg-white/20"
            )}
          >
            <LuLightbulb
              className={cn(
                "h-7 w-7",
                isDarkMode ? "text-white" : "text-amber-500"
              )}
            />
          </div>
          Quick Facts
        </h2>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Capacity */}
          <div
            className={cn(
              "flex items-start gap-3 p-4 rounded-2xl border",
              isDarkMode
                ? "bg-green-900/30 border-green-700 text-gray-200"
                : "bg-green-50 border-0 text-gray-700"
            )}
          >
            <LuCircleCheck
              className={cn(
                "h-5 w-5 shrink-0 mt-0.5",
                isDarkMode ? "text-green-400" : "text-green-500"
              )}
            />
            <span className="text-sm">
              Holds approx. {skip.capacity} standard bin bags.
            </span>
          </div>

          {/* Hire period */}
          <div
            className={cn(
              "flex items-start gap-3 p-4 rounded-2xl border",
              isDarkMode
                ? "bg-blue-900/30 border-blue-700 text-gray-200"
                : "bg-blue-50 border-0 text-gray-700"
            )}
          >
            <LuZap
              className={cn(
                "h-5 w-5 shrink-0 mt-0.5",
                isDarkMode ? "text-blue-400" : "text-blue-500"
              )}
            />
            <span className="text-sm">
              {skip.hirePeriod} day standard hire period.
            </span>
          </div>

          {/* Road Placement */}
          <div
            className={cn(
              "flex items-start gap-3 p-4 rounded-2xl border",
              skip.allowedOnRoad
                ? isDarkMode
                  ? "bg-green-900/30 border-green-700 text-gray-200"
                  : "bg-green-50 border-0 text-gray-700"
                : isDarkMode
                ? "bg-amber-900/30 border-amber-700 text-gray-200"
                : "bg-amber-50 border-0 text-gray-700"
            )}
          >
            {skip.allowedOnRoad ? (
              <LuCircleCheck
                className={cn(
                  "h-5 w-5 shrink-0 mt-0.5",
                  isDarkMode ? "text-green-400" : "text-green-500"
                )}
              />
            ) : (
              <LuTriangleAlert
                className={cn(
                  "h-5 w-5 shrink-0 mt-0.5",
                  isDarkMode ? "text-amber-400" : "text-amber-500"
                )}
              />
            )}
            <span className="text-sm">
              {skip.allowedOnRoad
                ? "Road placement permitted."
                : "Private land placement only."}
            </span>
          </div>

          {/* Heavy Waste */}
          <div
            className={cn(
              "flex items-start gap-3 p-4 rounded-2xl border",
              skip.allowsHeavyWaste
                ? isDarkMode
                  ? "bg-green-900/30 border-green-700 text-gray-200"
                  : "bg-green-50 border-0 text-gray-700"
                : isDarkMode
                ? "bg-amber-900/30 border-amber-700 text-gray-200"
                : "bg-amber-50 border-0 text-gray-700"
            )}
          >
            {skip.allowsHeavyWaste ? (
              <LuCircleCheck
                className={cn(
                  "h-5 w-5 shrink-0 mt-0.5",
                  isDarkMode ? "text-green-400" : "text-green-500"
                )}
              />
            ) : (
              <LuTriangleAlert
                className={cn(
                  "h-5 w-5 shrink-0 mt-0.5",
                  isDarkMode ? "text-amber-400" : "text-amber-500"
                )}
              />
            )}
            <span className="text-sm">
              {skip.allowsHeavyWaste
                ? "Suitable for heavy waste."
                : "Light waste materials only."}
            </span>
          </div>
        </div>

        {/* Dimensions Info */}
        <div
          className={cn(
            "flex items-start gap-3 p-4 rounded-2xl border",
            isDarkMode
              ? "bg-blue-900/30 border-blue-700 text-gray-200"
              : "bg-indigo-50 border-0 text-gray-700"
          )}
        >
          <LuInfo
            className={cn(
              "h-5 w-5 shrink-0 mt-0.5",
              isDarkMode ? "text-blue-400" : "text-indigo-500"
            )}
          />
          <span className="text-sm">
            Approx. Dimensions: {skip.dimensions}. Suitable for{" "}
            {skip.perfect.toLowerCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
