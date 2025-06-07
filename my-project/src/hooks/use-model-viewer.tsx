"use client"

import { useEffect, useState } from "react"

// Singleton pattern for model-viewer script loading
let modelViewerPromise: Promise<void> | null = null
let isModelViewerLoaded = false

const loadModelViewer = (): Promise<void> => {
  if (isModelViewerLoaded) {
    return Promise.resolve()
  }

  if (modelViewerPromise) {
    return modelViewerPromise
  }

  modelViewerPromise = new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.customElements?.get("model-viewer")) {
      isModelViewerLoaded = true
      resolve()
      return
    }

    const script = document.createElement("script")
    script.type = "module"
    script.src = "https://unpkg.com/@google/model-viewer@3.4.0/dist/model-viewer.min.js"

    script.onload = () => {
      isModelViewerLoaded = true
      resolve()
    }

    script.onerror = () => {
      modelViewerPromise = null
      reject(new Error("Failed to load model-viewer"))
    }

    document.head.appendChild(script)
  })

  return modelViewerPromise
}

export function useModelViewer() {
  const [isLoaded, setIsLoaded] = useState(isModelViewerLoaded)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isModelViewerLoaded) {
      setIsLoaded(true)
      return
    }

    loadModelViewer()
      .then(() => setIsLoaded(true))
      .catch((err) => setError(err.message))
  }, [])

  return { isLoaded, error }
}
