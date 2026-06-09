import { Link, useLocation, Form } from "react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Video,
  Users,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
} from "lucide-react";
import { useConfigurables } from "~/modules/configurables";
import { useAuth } from "~/modules/authentication";
import { cn } from "~/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Analyze Interview", href: "/analyze", icon: Video },
  { label: "Candidates", href: "/candidates", icon: Users },
  { label: "Reports", href: "/reports", icon: BarChart2 },
];

export function AppSidebar() {
  const { config, loading } = useConfigurables();
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const appName = loading ? "Interview Insight Plus" : (config.appName ?? "Interview Insight Plus");
  const logoUrl = loading ? "" : (config.logoUrl ?? "");

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-[#1A2B4A] text-white transition-all duration-300 flex-shrink-0",
        collapsed ? "w-16" : "w-60"
      )}
      style={{ minHeight: "100vh" }}
    >
      {/* Logo / App name */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-2 min-w-0">
            {logoUrl && logoUrl !== "FILL_LOGO_URL_HERE" ? (
              <img src={logoUrl} alt={appName} className="w-7 h-7 rounded object-contain flex-shrink-0" />
            ) : (
              <div className="w-7 h-7 rounded bg-[#00C2B2] flex items-center justify-center flex-shrink-0">
                <Video className="w-4 h-4 text-white" />
              </div>
            )}
            <span className="font-semibold text-sm leading-tight truncate">{appName}</span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto">
            {logoUrl && logoUrl !== "FILL_LOGO_URL_HERE" ? (
              <img src={logoUrl} alt={appName} className="w-7 h-7 rounded object-contain" />
            ) : (
              <div className="w-7 h-7 rounded bg-[#00C2B2] flex items-center justify-center">
                <Video className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-1 rounded hover:bg-white/10 transition-colors flex-shrink-0"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-white/60" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-white/60" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00C2B2]",
                active
                  ? "bg-[#00C2B2] text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10",
                collapsed && "justify-center"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User / Logout */}
      <div className="border-t border-white/10 px-2 py-4 space-y-1">
        {isAuthenticated && user && !collapsed && (
          <div className="px-3 py-2">
            <p className="text-xs text-white/40 font-medium uppercase tracking-wide">Signed in as</p>
            <p className="text-sm text-white font-medium truncate mt-0.5">{user.username || user.email}</p>
          </div>
        )}
        <Form method="post" action="/auth/logout">
          <button
            type="submit"
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors",
              collapsed && "justify-center"
            )}
            title={collapsed ? "Sign out" : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Sign out</span>}
          </button>
        </Form>
      </div>
    </aside>
  );
}
