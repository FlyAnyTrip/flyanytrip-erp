"use client"

import { useState, useEffect } from "react"
import "./Dashboard.css"

const Dashboard = ({ excelSheets, websiteLinks, tasks, onNavigate }) => {
  const [stats, setStats] = useState({
    totalSheets: 0,
    totalLinks: 0,
    totalTasks: 0,
    categories: {},
  })

  const [pinnedFilter, setPinnedFilter] = useState("all")

  useEffect(() => {
    const categoryCount = {}
    const allItems = [...excelSheets, ...websiteLinks, ...tasks]

    allItems.forEach((item) => {
      categoryCount[item.category] = (categoryCount[item.category] || 0) + 1
    })

    setStats({
      totalSheets: excelSheets.length,
      totalLinks: websiteLinks.length,
      totalTasks: tasks.length,
      categories: categoryCount,
    })
  }, [excelSheets, websiteLinks, tasks])

  // Get pinned items from all categories
  const pinnedSheets = excelSheets.filter((sheet) => sheet.isPinned)
  const pinnedTasks = tasks.filter((task) => task.isPinned)
  const pinnedLinks = websiteLinks.filter((link) => link.isPinned)

  // Filter pinned items based on selected filter
  const getFilteredPinnedItems = () => {
    switch (pinnedFilter) {
      case "sheets":
        return pinnedSheets
      case "websites":
        return pinnedLinks
      case "tasks":
        return pinnedTasks
      default:
        // Return in priority order: sheets, websites, tasks
        return [...pinnedSheets, ...pinnedLinks, ...pinnedTasks]
    }
  }

  const filteredPinnedItems = getFilteredPinnedItems()

  // Get recent items
  const recentSheets = excelSheets.slice(0, 3)
  const recentTasks = tasks.slice(0, 3)
  const recentLinks = websiteLinks.slice(0, 3)

  const StatCard = ({ title, value, icon, color, trend, onClick }) => (
    <div className={`stats-card ${color}`} onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="stats-icon">{icon}</div>
      <div className="stats-content">
        <h3>{value}</h3>
        <p>{title}</p>
        {trend && (
          <div className="stat-trend">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 18" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
            <span>+{trend}%</span>
          </div>
        )}
      </div>
    </div>
  )

  const getItemType = (item) => {
    // Check if item exists in sheets array
    if (excelSheets.some((sheet) => sheet.id === item.id)) return "sheet"
    // Check if item exists in links array
    if (websiteLinks.some((link) => link.id === item.id)) return "link"
    // Otherwise it's a task
    return "task"
  }

  const getItemIcon = (item) => {
    const itemType = getItemType(item)

    if (itemType === "sheet") {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10,9 9,9 8,9" />
        </svg>
      )
    } else if (itemType === "link") {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    } else {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      )
    }
  }

  const getItemIconColor = (item) => {
    const itemType = getItemType(item)

    if (itemType === "sheet") return "#10b981" // Green for sheets
    if (itemType === "link") return "#3b82f6" // Blue for links
    return "#8b5cf6" // Purple for tasks
  }

  const handleItemClick = (item) => {
    if (item.url) {
      window.open(item.url, "_blank")
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome back! 👋</h1>
          <p className="welcome-subtitle">Here's what's happening with your resources today.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="stats-row">
          <StatCard
            title="Google Sheets"
            value={stats.totalSheets}
            color="green"
            trend={12}
            onClick={() => onNavigate("/sheets")}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            }
          />
          <StatCard
            title="Website Links"
            value={stats.totalLinks}
            color="blue"
            trend={8}
            onClick={() => onNavigate("/websites")}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            }
          />
          <StatCard
            title="Tasks"
            value={stats.totalTasks}
            color="purple"
            trend={25}
            onClick={() => onNavigate("/tasks")}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            }
          />
        </div>

        {/* Pinned Items Section */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="12" y1="17" x2="12" y2="3" />
                <path d="M5 7l7-7 7 7" />
                <path d="M5 17l7-7 7 7" />
              </svg>
              Pinned Items
              <span className="section-count">{filteredPinnedItems.length}</span>
            </h2>
          </div>

          {/* Pinned Items Filter */}
          <div className="pinned-filters">
            <button
              className={`filter-btn ${pinnedFilter === "all" ? "active" : ""}`}
              onClick={() => setPinnedFilter("all")}
            >
              All ({pinnedSheets.length + pinnedLinks.length + pinnedTasks.length})
            </button>
            <button
              className={`filter-btn ${pinnedFilter === "sheets" ? "active" : ""}`}
              onClick={() => setPinnedFilter("sheets")}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                style={{ width: "16px", height: "16px", marginRight: "4px" }}
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              Sheets ({pinnedSheets.length})
            </button>
            <button
              className={`filter-btn ${pinnedFilter === "websites" ? "active" : ""}`}
              onClick={() => setPinnedFilter("websites")}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                style={{ width: "16px", height: "16px", marginRight: "4px" }}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Websites ({pinnedLinks.length})
            </button>
            <button
              className={`filter-btn ${pinnedFilter === "tasks" ? "active" : ""}`}
              onClick={() => setPinnedFilter("tasks")}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                style={{ width: "16px", height: "16px", marginRight: "4px" }}
              >
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              Tasks ({pinnedTasks.length})
            </button>
          </div>

          <div className="pinned-items">
            {filteredPinnedItems.length > 0 ? (
              filteredPinnedItems.map((item) => (
                <div key={`pinned-${item.id}`} className="pinned-item" onClick={() => handleItemClick(item)}>
                  <div className="item-icon" style={{ background: getItemIconColor(item) }}>
                    {getItemIcon(item)}
                  </div>
                  <div className="item-content">
                    <div className="item-name">{item.name}</div>
                    <div className="item-meta">
                      <span className="item-category">{item.category}</span>
                    </div>
                  </div>
                  <div className="item-actions">
                    {item.url && (
                      <button
                        className="item-action"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(item.url, "_blank")
                        }}
                        title="Open"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15,3 21,3 21,9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="12" y1="17" x2="12" y2="3" />
                    <path d="M5 7l7-7 7 7" />
                    <path d="M5 17l7-7 7 7" />
                  </svg>
                </div>
                <p>No pinned items</p>
                <span>Pin your important items to see them here</span>
              </div>
            )}
          </div>
        </div>

        {/* Recent Google Sheets Section */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              Recent Google Sheets
            </h2>
            <button className="section-action" onClick={() => onNavigate("/sheets")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
              View All ({excelSheets.length})
            </button>
          </div>
          <div className="recent-items">
            {recentSheets.length > 0 ? (
              recentSheets.map((sheet) => (
                <div key={sheet.id} className="recent-item" onClick={() => handleItemClick(sheet)}>
                  <div className="item-icon" style={{ background: "#10b981" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14,2 14,8 20,8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  </div>
                  <div className="item-content">
                    <div className="item-name">{sheet.name}</div>
                    <div className="item-meta">
                      <span className="item-category">{sheet.category}</span>
                    </div>
                  </div>
                  <div className="item-actions">
                    {sheet.url && (
                      <button
                        className="item-action"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(sheet.url, "_blank")
                        }}
                        title="Open sheet"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15,3 21,3 21,9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <p>No Google Sheets</p>
                <span>Add your first Google Sheet to get started</span>
              </div>
            )}
          </div>
        </div>

        {/* Recent Tasks Section */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              Recent Tasks
            </h2>
            <button className="section-action" onClick={() => onNavigate("/tasks")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
              View All ({tasks.length})
            </button>
          </div>
          <div className="recent-items">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <div key={task.id} className="recent-item" onClick={() => handleItemClick(task)}>
                  <div className="item-icon" style={{ background: "#8b5cf6" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  </div>
                  <div className="item-content">
                    <div className="item-name">{task.name}</div>
                    <div className="item-meta">
                      <span className="item-category">{task.category}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </div>
                <p>No tasks</p>
                <span>Create your first task to get organized</span>
              </div>
            )}
          </div>
        </div>

        {/* Recent Website Links Section */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Recent Website Links
            </h2>
            <button className="section-action" onClick={() => onNavigate("/websites")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
              View All ({websiteLinks.length})
            </button>
          </div>
          <div className="recent-items">
            {recentLinks.length > 0 ? (
              recentLinks.map((link) => (
                <div key={link.id} className="recent-item" onClick={() => handleItemClick(link)}>
                  <div className="item-icon" style={{ background: "#3b82f6" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <div className="item-content">
                    <div className="item-name">{link.name}</div>
                    <div className="item-meta">
                      <span className="item-category">{link.category}</span>
                    </div>
                  </div>
                  <div className="item-actions">
                    {link.url && (
                      <button
                        className="item-action"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(link.url, "_blank")
                        }}
                        title="Visit website"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15,3 21,3 21,9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <p>No website links</p>
                <span>Add your first website link to get started</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
