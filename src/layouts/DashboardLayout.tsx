import React from "react";
import "./DashboardLayout.css";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { label: "Dashboard", icon: "◼", active: true },
  { label: "Tasks", icon: "☐", active: false },
  { label: "Timer", icon: "◷", active: false },
  { label: "Habits", icon: "◆", active: false },
  { label: "Analytics", icon: "▤", active: false },
  { label: "Settings", icon: "⚙", active: false },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
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
            <a
              key={item.label}
              className={`nav-item ${item.active ? "active" : ""}`}
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </a>
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