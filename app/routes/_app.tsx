import { redirect } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { Outlet } from "react-router";
import { getUserFromRequest } from "~/modules/authentication/authentication.server";
import { AppSidebar } from "~/components/layout/app-sidebar";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = getUserFromRequest(request);
  if (!user) {
    return redirect("/auth/login");
  }
  return { user };
}

export default function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F7F9FC]">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
