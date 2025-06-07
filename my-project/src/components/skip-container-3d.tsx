"use client"

import React, { useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useDarkMode } from "@/context/darkModeContext"
import { useModelViewer } from "@/hooks/use-model-viewer"
import type { ProcessedSkipData } from "@/types/skip"
import { MdOutline360 } from "react-icons/md"
import { BsBadgeAr } from "react-icons/bs"
import { toast } from "sonner"

interface SkipContainer3DProps {
  skip: ProcessedSkipData
  minimal?: boolean
}

const MODEL_PATHS = {
  small: "/src/models/4Y.glb",
  medium: "/models/skip-6y.glb",
  large: "/models/skip-8y.glb",
} as const

function getModelPath(skipSize: number): string {
  if (skipSize <= 4) return MODEL_PATHS.small
  if (skipSize <= 6) return MODEL_PATHS.medium
  return MODEL_PATHS.large
}

interface ModelViewerProps {
  src: string
  alt: string
  "auto-rotate"?: boolean
  "camera-controls"?: boolean
  style?: React.CSSProperties
  onLoad?: () => void
  onError?: () => void
}

const ModelViewer = React.memo((props: ModelViewerProps) => {
  // @ts-ignore
  return <model-viewer {...props} />
})

ModelViewer.displayName = "ModelViewer"

export const SkipContainer3D = React.memo(({ skip, minimal = false }: SkipContainer3DProps) => {
  const { isDarkMode } = useDarkMode()
  const isModelViewerLoaded = useModelViewer()

  const [is360View, setIs360View] = useState(false)
  const [modelLoaded, setModelLoaded] = useState(false)
  const [modelError, setModelError] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)

  const modelPath = useMemo(() => getModelPath(skip.actualSize), [skip.actualSize])

  const handleModelLoad = useCallback(() => {
    setModelLoaded(true)
    setModelError(false)
  }, [])

  const handleModelError = useCallback(() => {
    setModelError(true)
    setModelLoaded(false)
  }, [])

  const handle360Toggle = useCallback(() => {
    if (!isModelViewerLoaded) {
      toast.error("3D viewer is still loading...")
      return
    }
    setIs360View(true)
  }, [isModelViewerLoaded])

  const handleARClick = useCallback(() => {
    toast("AR View Coming Soon!", { position: "top-right", duration: 3000 })
  }, [])

  const toggleAutoRotate = useCallback(() => {
    setAutoRotate((prev) => !prev)
  }, [])

  const resetCamera = useCallback(() => {
    const modelViewer = document.querySelector("model-viewer")
    if (modelViewer) {
      ;(modelViewer as any).cameraOrbit = "45deg 75deg 4m"
    }
  }, [])

  if (minimal) {
    return (
      <div className="relative w-full h-48">
        <div className="flex mb-2">
          <button
            className={cn(
              "text-xs px-2 py-1 rounded-l border-y border-l transition-colors",
              is360View
                ? isDarkMode
                  ? "bg-gray-800 border-gray-700 text-gray-300"
                  : "bg-gray-200 border-gray-300 text-gray-600"
                : isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-200"
                  : "bg-white border-gray-300 text-gray-700",
            )}
            onClick={() => setIs360View(false)}
          >
            Isometric Preview
          </button>
          <button
            className={cn(
              "text-xs px-2 py-1 rounded-r border transition-colors",
              is360View
                ? isDarkMode
                  ? "bg-gray-700 border-gray-600 text-gray-200"
                  : "bg-blue-100 border-blue-200 text-blue-700"
                : isDarkMode
                  ? "bg-gray-800 border-gray-700 text-gray-300"
                  : "bg-white border-gray-300 text-gray-700",
            )}
            onClick={handle360Toggle}
            disabled={!isModelViewerLoaded}
          >
            360° View
          </button>
        </div>

        <div
          className={cn(
            "flex items-center justify-center h-32 rounded transition-colors",
            isDarkMode ? "bg-gray-700" : "bg-gray-100",
          )}
        >
          {!is360View ? (
            <img
              src={skip.image || "/placeholder.svg?height=200&width=300"}
              alt={`${skip.name} - ${skip.size}`}
              className="h-24 w-auto object-contain"
              loading="lazy"
            />
          ) : isModelViewerLoaded ? (
            <ModelViewer
              src={modelPath}
              alt={`${skip.name} 3D model`}
              auto-rotate={autoRotate}
              camera-controls
              style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
              onLoad={handleModelLoad}
              onError={handleModelError}
            />
          ) : (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-sm text-gray-500">Loading 3D viewer...</p>
            </div>
          )}
        </div>

        <div className={cn("text-right text-xs mt-1", isDarkMode ? "text-gray-400" : "text-gray-600")}>
          {skip.name} - {skip.size}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative w-full h-[400px] rounded-lg overflow-hidden transition-colors",
        isDarkMode ? "bg-gray-800" : "bg-white",
      )}
    >
      {/* Top Controls */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Button
          onClick={() => setIs360View(false)}
          variant={!is360View ? "default" : "outline"}
          size="sm"
          className={cn(
            "transition-colors",
            !is360View
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : isDarkMode
                ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100",
          )}
        >
          Isometric Preview
        </Button>
      </div>

      {/* AR Button */}
      <div className="absolute bottom-4 left-4 z-10">
        <Button
          onClick={handleARClick}
          variant="outline"
          size="sm"
          className={cn(
            "border transition-colors",
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100",
          )}
        >
          AR
          <BsBadgeAr className="ml-1" size={18} />
        </Button>
      </div>

      {/* 360 View Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          onClick={handle360Toggle}
          variant={is360View ? "default" : "outline"}
          size="sm"
          disabled={!isModelViewerLoaded}
          className={cn(
            "flex items-center gap-2 transition-colors",
            is360View
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : isDarkMode
                ? "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100",
          )}
        >
          360° View
          <MdOutline360 size={18} />
        </Button>
      </div>

      {/* Viewer Scene */}
      <div className="absolute inset-0">
        {!is360View ? (
          <div className="flex items-center justify-center h-full">
            <img
              src={skip.image || "/placeholder.svg?height=200&width=300"}
              alt={`${skip.name} - ${skip.size} isometric view`}
              className="w-120 h-auto object-contain"
              loading="lazy"
            />
          </div>
        ) : isModelViewerLoaded ? (
          <ModelViewer
            src={modelPath}
            alt={`${skip.name} 3D model`}
            auto-rotate={autoRotate}
            camera-controls
            style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
            onLoad={handleModelLoad}
            onError={handleModelError}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-lg text-gray-500">Loading 3D viewer...</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls while 360 active */}
      {is360View && modelLoaded && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          <Button
            onClick={toggleAutoRotate}
            variant="outline"
            size="sm"
            className={cn(
              "backdrop-blur-sm transition-colors",
              isDarkMode
                ? "bg-gray-700/80 border-gray-600 text-gray-200 hover:bg-gray-600"
                : "bg-white/80 border-gray-300 text-gray-700 hover:bg-gray-200",
            )}
          >
            {autoRotate ? "⏸️ Pause" : "▶️ Play"}
          </Button>
          <Button
            onClick={resetCamera}
            variant="outline"
            size="sm"
            className={cn(
              "backdrop-blur-sm transition-colors",
              isDarkMode
                ? "bg-gray-700/80 border-gray-600 text-gray-200 hover:bg-gray-600"
                : "bg-white/80 border-gray-300 text-gray-700 hover:bg-gray-200",
            )}
          >
            🔄 Reset
          </Button>
        </div>
      )}

      {/* Info Label */}
      <div
        className={cn(
          "absolute bottom-3 right-3 text-right text-xs z-10 p-1.5 rounded backdrop-blur-sm transition-colors",
          isDarkMode ? "bg-gray-800/50 text-gray-400" : "bg-white/60 text-gray-600",
        )}
      >
        {skip.name} - {skip.size}
      </div>
    </div>
  )
})

SkipContainer3D.displayName = "SkipContainer3D"
