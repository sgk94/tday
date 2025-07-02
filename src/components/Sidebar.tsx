import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef } from "react";

type SidebarProps = {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
};

export default function Sidebar({ isSidebarOpen, closeSidebar }: SidebarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    }

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, closeSidebar]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err: unknown) {
      console.error("Logout failed", err);
    }
  };
  return (
    <>
      <aside
        ref={sidebarRef}
        className={`fixed left-0 top-0 z-50 flex h-full w-[200px] transform flex-col justify-between bg-slate-900 p-4 text-white transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-2">
          <div className="flex justify-end">
            <button onClick={closeSidebar}>
              <X />
            </button>
          </div>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/account">Account</Link>
        </div>
        <button
          className="rounded-md bg-blue-700 px-2 py-1 hover:bg-blue-800 hover:text-neutral-200"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </aside>
    </>
  );
}
