import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import { useState } from "react";
import Navbar from "./Navbar";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex min-h-screen">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          closeSidebar={toggleSidebar}
        />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </>
  );
}
