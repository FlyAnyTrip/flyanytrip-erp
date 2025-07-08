"use client"

import "./ExcelGrid.css"

const ExcelGrid = ({ sheets }) => {
  const handleOpenSheet = (url) => {
    window.open(url, "_blank")
  }

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

  if (sheets.length === 0) {
    return (
      <div className="empty-state">
        <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10,9 9,9 8,9" />
        </svg>
        <h3 className="empty-title">No Excel sheets</h3>
        <p className="empty-description">Get started by adding your first Excel sheet.</p>
      </div>
    )
  }

  return (
    <div className="excel-grid">
      <div className="grid-header">
        <h2 className="grid-title">Google Sheets</h2>
        <p className="grid-description">Manage and access your Google Sheets easily</p>
      </div>

      <div className="cards-grid">
        {sheets.map((sheet) => (
          <div key={sheet.id} className="card">
            <div className="card-content">
              <div className="card-header">
                <div className="card-title-section">
                  <svg
                    className="sheet-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    style={{ color: "#10b981" }}
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10,9 9,9 8,9" />
                  </svg>
                  <h3 className="card-title">{sheet.name}</h3>
                </div>
              </div>

              <p className="card-description">{sheet.description}</p>

              <div className="card-meta">
                <span className={`category-badge ${getCategoryColor(sheet.category)}`}>{sheet.category}</span>
              </div>

              <button onClick={() => handleOpenSheet(sheet.url)} className="open-button">
                <svg className="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15,3 21,3 21,9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Open Sheet
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExcelGrid
