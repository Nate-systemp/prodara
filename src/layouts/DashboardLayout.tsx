import React from "react";
import "./DashboardLayout.css";

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
}

const NAV_ITEMS = [
  { label: "Dashboard", icon: "◼" },
  { label: "Tasks", icon: "☐" },
  { label: "Timer", icon: "◷" },
  { label: "Habits", icon: "◆" },
  { label: "Analytics", icon: "▤" },
  { label: "Settings", icon: "⚙" },
];

const DashboardLayout = ({ children, currentView, onViewChange }: DashboardLayoutProps) => {
  return (
    <div className="brutal-layout">
      {/* Sidebar */}
      <aside className="brutal-sidebar">
        <div className="sidebar-brand">
          <span className="brand-text">P</span>
          <span className="brand-full">PRODARA</span>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${currentView === item.label ? "active" : ""}`}
              onClick={() => onViewChange(item.label)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="footer-version">V 0.1.0</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="brutal-main">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;