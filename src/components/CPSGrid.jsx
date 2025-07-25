"use client"

import "./CPSGrid.css"

const CPSGrid = ({ cpsItems }) => {
  const handleOpenCPS = (item) => {
    if (item.url) {
      window.open(item.url, "_blank")
    } else {
      // Fallback if no URL is provided
      alert(`CPS system "${item.name}" - No URL configured`)
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      Finance: "category-finance",
      HR: "category-hr",
      Inventory: "category-inventory",
      Sales: "category-sales",
      Reports: "category-reports",
      Marketing: "category-marketing",
      Leads: "category-leads",
      Travellers: "category-travellers",
      Tech: "category-tech",
      Partnerships: "category-partnerships",
      Operations: "category-operations",
      "Customer Portal": "category-customer-portal",
      Packages: "category-packages",
      "Agent Tools": "category-agent-tools",
    }
    return colors[category] || "category-default"
  }

  if (cpsItems.length === 0) {
    return (
      <div className="empty-state">
        <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <h3 className="empty-title">No CPS items</h3>
        <p className="empty-description">Get started by adding your first CPS system.</p>
      </div>
    )
  }

  return (
    <div className="cps-grid">
      <div className="grid-header">
        <h2 className="grid-title">CPS Systems</h2>
        <p className="grid-description">Manage your Commission Payment Systems efficiently</p>
      </div>

      <div className="cards-grid">
        {cpsItems.map((item) => (
          <div key={item.id} className="card">
            <div className="card-content">
              <div className="card-header">
                <div className="card-title-section">
                  <svg
                    className="cps-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    style={{ color: "#f59e0b" }}
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <h3 className="card-title">{item.name}</h3>
                </div>
              </div>

              <p className="card-description">{item.description}</p>

              <div className="card-meta">
                <span className={`category-badge ${getCategoryColor(item.category)}`}>{item.category}</span>
                <div className="date-info">
                  <svg className="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </div>

              <button onClick={() => handleOpenCPS(item)} className="open-button">
                <svg className="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15,3 21,3 21,9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Open CPS
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CPSGrid
