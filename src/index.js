import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

// Grammarly ki bakchodi hide karne ke liye
const originalWarn = console.warn
console.warn = (...args) => {
  if (args[0] && args[0].includes && args[0].includes("Grammarly")) {
    return
  }
  originalWarn.apply(console, args)
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
