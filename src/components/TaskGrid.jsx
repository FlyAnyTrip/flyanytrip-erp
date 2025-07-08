"use client"

import "./TaskGrid.css"

const TaskGrid = ({ tasks }) => {
  const getCategoryColor = (category) => {
    const colors = {
      Finance: "category-finance",
      HR: "category-hr",
      Inventory: "category-inventory",
      Sales: "category-sales",
      Reports: "category-reports",
      Marketing: "category-marketing",
    }
    return colors[category] || "category-default"
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
        <h3 className="empty-title">No tasks</h3>
        <p className="empty-description">Get started by adding your first task.</p>
      </div>
    )
  }

  return (
    <div className="task-grid">
      <div className="grid-header">
        <h2 className="grid-title">Tasks</h2>
        <p className="grid-description">Manage and track your tasks efficiently</p>
      </div>

      <div className="cards-grid">
        {tasks.map((task) => (
          <div key={task.id} className="card">
            <div className="card-content">
              <div className="card-header">
                <div className="card-title-section">
                  <svg
                    className="task-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    style={{ color: "#8b5cf6" }}
                  >
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  <h3 className="card-title">{task.name}</h3>
                </div>
              </div>

              <p className="card-description">{task.description}</p>

              <div className="card-meta">
                <span className={`category-badge ${getCategoryColor(task.category)}`}>{task.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskGrid
