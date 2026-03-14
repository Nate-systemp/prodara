import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-10">Prodara</h1>

        <nav className="flex flex-col gap-4">
          <a className="hover:text-blue-400">Dashboard</a>
          <a className="hover:text-blue-400">Tasks</a>
          <a className="hover:text-blue-400">Analytics</a>
          <a className="hover:text-blue-400">Settings</a>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="h-16 border-b flex items-center px-6">
          <h2 className="text-xl font-semibold">Dashboard</h2>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-100">
          {children}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;