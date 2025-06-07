import { LuInfo ,LuZap } from "react-icons/lu";

import { useDarkMode } from "@/context/darkModeContext";
import { SkipContainer3D } from "./skip-container-3d";
import type { ProcessedSkipData } from "@/types/skip";
import { cn } from "@/lib/utils";

interface SkipVisualizationProps {
  skip: ProcessedSkipData | null;
}

export function SkipVisualization({ skip }: SkipVisualizationProps) {
  const { isDarkMode } = useDarkMode();

  if (!skip) {
    return (
      <div className={cn(
        "rounded-3xl shadow-xl overflow-hidden",
        isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
      )}>
        <div className="flex items-center justify-center min-h-[400px] p-8">
          <div className="text-center">
            <div className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4",
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            )}>
              <LuInfo className={cn("h-10 w-10", isDarkMode ? "text-gray-400" : "text-gray-500")} />
            </div>
            <p className={cn("text-lg", isDarkMode ? "text-gray-300" : "text-gray-600")}>
              Select a skip to view 3D preview
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "rounded-3xl shadow-xl overflow-hidden",
      isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
    )}>
      <div className={cn("p-6 border-b", isDarkMode ? "border-gray-700" : "border-gray-200")}>
        <h2 className={cn("text-2xl font-bold flex items-center gap-3", isDarkMode ? "text-white" : "text-gray-900")}>
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <LuZap className="h-6 w-6 text-white" />
          </div>
          3D Preview: {skip.name}
        </h2>
        <p className={cn("mt-1", isDarkMode ? "text-gray-400" : "text-gray-600")}>
          Interactive 3D visualization of your selected skip
        </p>
      </div>

      <div className="p-0">
        <SkipContainer3D skip={skip} />
      </div>
    </div>
  );
}
