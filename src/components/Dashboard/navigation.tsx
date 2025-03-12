import { NavButton } from "../nav-button";

const routes = [
  {
    href: "/",
    label: "Dashboard",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];

export const Navigation = () => {
  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton key={route.href} href={route.href} label={route.label} />
      ))}
    </nav>
  );
};

export default Navigation;
