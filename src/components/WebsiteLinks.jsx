"use client"

import "./WebsiteLinks.css"

const WebsiteLinks = ({ links }) => {
  const handleOpenLink = (url) => {
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

  if (links.length === 0) {
    return (
      <div className="empty-state">
        <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <h3 className="empty-title">No website links</h3>
        <p className="empty-description">Get started by adding your first website link.</p>
      </div>
    )
  }

  return (
    <div className="website-links">
      <div className="grid-header">
        <h2 className="grid-title">Website Links</h2>
        <p className="grid-description">Quick access to your important websites</p>
      </div>

      <div className="cards-grid">
        {links.map((link) => (
          <div key={link.id} className="card">
            <div className="card-content">
              <div className="card-header">
                <div className="card-title-section">
                  <svg
                    className="website-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    style={{ color: "#3b82f6" }}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <h3 className="card-title">{link.name}</h3>
                </div>
              </div>

              <p className="card-description">{link.description}</p>

              <div className="card-meta">
                <span className={`category-badge ${getCategoryColor(link.category)}`}>{link.category}</span>
              </div>

              <button onClick={() => handleOpenLink(link.url)} className="open-button">
                <svg className="external-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15,3 21,3 21,9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Visit Website
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WebsiteLinks
