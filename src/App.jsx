"use client"

import { useState, useEffect } from "react"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import ExcelGrid from "./components/ExcelGrid"
import WebsiteLinks from "./components/WebsiteLinks"
import TaskGrid from "./components/TaskGrid"
import { ToastContainer } from "./components/Toast"
import { dataService } from "./services/dataService"
import "./App.css"

function App() {
  // URL Routing State
  const [currentPath, setCurrentPath] = useState(() => {
    const path = window.location.pathname
    return path === "/" ? "/dashboard" : path
  })

  const [selectedCategory, setSelectedCategory] = useState("all")
  const [excelSheets, setExcelSheets] = useState([])
  const [websiteLinks, setWebsiteLinks] = useState([])
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([
    "Finance",
    "HR",
    "Inventory",
    "Sales",
    "Reports",
    "Marketing",
    "Leads",
    "Travellers",
    "Tech",
    "Partnerships",
    "Operations",
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [toasts, setToasts] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      setCurrentPath(path === "/" ? "/dashboard" : path)
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  // Load data from localStorage on component mount
  useEffect(() => {
    loadData()
  }, [])

  const showToast = (message, type = "success", duration = 3000) => {
    const id = Date.now()
    const toast = { id, message, type, duration }
    setToasts((prev) => [...prev, toast])
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const loadData = async () => {
    try {
      setLoading(true)
      const [sheetsData, linksData, tasksData] = await Promise.all([
        dataService.getExcelSheets(),
        dataService.getWebsiteLinks(),
        dataService.getTasks(),
      ])

      setExcelSheets(sheetsData)
      setWebsiteLinks(linksData)
      setTasks(tasksData)
      setError(null)
    } catch (error) {
      console.error("Error loading data:", error)
      setError("Failed to load data. Please try again.")
      showToast("Failed to load data", "error")
    } finally {
      setLoading(false)
    }
  }

  const navigate = (path) => {
    setCurrentPath(path)
    window.history.pushState(null, "", path)
    setIsSidebarOpen(false)
    // Clear search when navigating
    setSearchTerm("")
    setSelectedCategory("all")
  }

  const goBack = () => {
    navigate("/dashboard")
  }

  // Enhanced search functionality
  const filteredExcelSheets = excelSheets.filter((sheet) => {
    const matchesCategory = selectedCategory === "all" || sheet.category === selectedCategory
    const matchesSearch =
      sheet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sheet.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const filteredWebsiteLinks = websiteLinks.filter((link) => {
    const matchesCategory = selectedCategory === "all" || link.category === selectedCategory
    const matchesSearch =
      link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const filteredTasks = tasks.filter((task) => {
    const matchesCategory = selectedCategory === "all" || task.category === selectedCategory
    const matchesSearch =
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getActiveTab = () => {
    if (currentPath === "/dashboard") return "dashboard"
    if (currentPath === "/sheets") return "sheets"
    if (currentPath === "/tasks") return "tasks"
    if (currentPath === "/websites") return "websites"
    return "dashboard"
  }

  const renderContent = () => {
    switch (currentPath) {
      case "/dashboard":
        return <Dashboard excelSheets={excelSheets} websiteLinks={websiteLinks} tasks={tasks} onNavigate={navigate} />
      case "/sheets":
        return <ExcelGrid sheets={filteredExcelSheets} />
      case "/websites":
        return <WebsiteLinks links={filteredWebsiteLinks} />
      case "/tasks":
        return <TaskGrid tasks={filteredTasks} />
      default:
        return <Dashboard excelSheets={excelSheets} websiteLinks={websiteLinks} tasks={tasks} onNavigate={navigate} />
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={loadData} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <Sidebar
        activeTab={getActiveTab()}
        setActiveTab={(tab) => {
          if (tab === "dashboard") navigate("/dashboard")
          else if (tab === "sheets") navigate("/sheets")
          else if (tab === "tasks") navigate("/tasks")
          else if (tab === "websites") navigate("/websites")
        }}
        excelCount={excelSheets.length}
        websiteCount={websiteLinks.length}
        taskCount={tasks.length}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className={`main-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeTab={getActiveTab()}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          isSidebarOpen={isSidebarOpen}
          onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          currentPath={currentPath}
          onBack={goBack}
        />

        <main className="main-content">{renderContent()}</main>
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  )
}

export default App
