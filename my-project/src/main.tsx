import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { App } from "./App"
import { Toaster } from "sonner"
import { DarkModeProvider } from "@/context/darkModeContext"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DarkModeProvider>
      <App />
      <Toaster position="top-right" />
    </DarkModeProvider>
  </StrictMode>,
)
