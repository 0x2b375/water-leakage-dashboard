import { Outlet } from "react-router";
import Header from "./header";

const DashboardLayout = () => {
  return (
    <div className="h-screen">
      <Header />
      <div className="px-3 lg:px-14">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
