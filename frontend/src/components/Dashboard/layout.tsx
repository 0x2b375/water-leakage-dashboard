import { Outlet } from "react-router";

import Header from "./header";

function DashboardLayout() {
  return (
    <div className="h-screen">
      <Header />
      <div className="px-3 lg:px-14 bg-main z-0">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
