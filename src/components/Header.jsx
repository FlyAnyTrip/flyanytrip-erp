"use client";

import { useState, useRef, useEffect } from "react";
import "./Header.css";

const Header = ({
  searchTerm,
  setSearchTerm,
  activeTab,
  selectedCategory,
  setSelectedCategory,
  categories,
  isSidebarOpen,
  onSidebarToggle,
  currentPath,
  onBack,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    if (showFilters) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilters]);

  const getPageTitle = () => {
    switch (activeTab) {
      case "dashboard":
        return "Dashboard";
      case "sheets":
        return "Google Sheets";
      case "tasks":
        return "Tasks";
      case "websites":
        return "Website Links";
      default:
        return "Dashboard";
    }
  };

  const showSearchBar =
    activeTab === "sheets" || activeTab === "websites" || activeTab === "tasks";

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          {!isSidebarOpen && (
            <button
              className="menu-toggle"
              onClick={onSidebarToggle}
              title="Open menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          )}
          <div className="page-info">
            <h1 className="page-title">{getPageTitle()}</h1>
            <p className="page-subtitle">Manage your resources efficiently</p>
          </div>
        </div>

        {showSearchBar && (
          <div className="header-center">
            <div className="search-container">
              <div className="search-input-wrapper">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search sheets, links, tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                {searchTerm && (
                  <button
                    className="clear-search"
                    onClick={() => setSearchTerm("")}
                    title="Clear search"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="header-right">
          {showSearchBar && (
            <div className="filter-container" ref={filterRef}>
              <button
                className={`filter-btn ${showFilters ? "active" : ""}`}
                onClick={() => setShowFilters(!showFilters)}
                title="Filter by category"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
                </svg>
                <span>Filter</span>
              </button>

              {showFilters && (
                <div className="filter-dropdown">
                  <div className="filter-header">
                    <span>Filter by Category</span>
                  </div>
                  <div className="filter-options">
                    <button
                      className={`filter-option ${
                        selectedCategory === "all" ? "active" : ""
                      }`}
                      onClick={() => {
                        setSelectedCategory("all");
                        setShowFilters(false);
                      }}
                    >
                      <span className="filter-dot all"></span>
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`filter-option ${
                          selectedCategory === category ? "active" : ""
                        }`}
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowFilters(false);
                        }}
                      >
                        <span
                          className={`filter-dot ${category
                            .toLowerCase()
                            .replace(/\s+/g, "")}`}
                        ></span>
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
