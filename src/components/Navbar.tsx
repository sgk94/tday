import { Menu, CircleUserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";

type NavbarProps = {
  toggleSidebar: () => void;
};

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const { user } = useAuth();
  return (
    <>
      <div className="sticky top-0 z-40 flex justify-between gap-2 bg-slate-900 p-4 text-white">
        <button onClick={toggleSidebar}>
          <Menu />
        </button>

        <div className="flex flex-row items-center gap-2">
          <h2>Welcome {user?.email}</h2>
          <button>
            <CircleUserRound />
          </button>
        </div>
      </div>
    </>
  );
}
