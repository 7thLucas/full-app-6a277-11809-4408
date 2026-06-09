import { Outlet } from "react-router";
import { useAuth } from "~/modules/authentication";
import { useConfigurables } from "~/modules/configurables";
import { AppSidebar } from "./app-sidebar";

export function AppLayout() {
  const { loading: configLoading } = useConfigurables();

  return (
    <div className="flex h-screen overflow-hidden bg-[#F7F9FC]">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
