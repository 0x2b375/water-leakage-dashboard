import { Route, Routes } from "react-router";
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import DashboardLayout from "../components/Dashboard/layout";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
