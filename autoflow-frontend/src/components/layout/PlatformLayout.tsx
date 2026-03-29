import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, Workflow, Settings, LogOut } from "lucide-react";

export default function PlatformLayout() {
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: <Home className="w-5 h-5" /> },
    { name: "Agent Studio", path: "/studio", icon: <Workflow className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#121212] flex flex-col shrink-0">
        <div className="p-6 mb-2">
          <Link to="/" className="flex items-center gap-4 font-bold text-2xl tracking-tight text-white hover:text-gray-300 transition-colors">
            <img src="/favicon.png" className="w-10 h-10 invert-[1] brightness-200" alt="AutoFlow Logo" />
            AutoFlow
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-amber-600/10 text-amber-500 border border-amber-500/20" 
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-1">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </Link>
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <LogOut className="w-5 h-5" /> Sign out
          </Link>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 flex flex-col relative overflow-hidden h-screen bg-[#0a0a0a]">
        <Outlet />
      </main>
    </div>
  );
}
