import { Button, ConfigProvider } from "antd";
import { NavLink } from "react-router";

type Props = {
  href: string;
  label: string;
};

export const NavButton = ({ href, label }: Props) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            ghostBg: "transparent",
          },
        },
      }}
    >
      <NavLink to={href}>
        {({ isActive }) => (
          <Button
            type={isActive ? "primary" : "text"}
            size="small"
            className={`w-full !p-4 lg:w-auto justify-between font-normal hover:bg-white/50 hover:text-white focus-visible:ring-offset-0 focus-visible:ring-transparent !text-white outline-none transition-all duration-300 ${
              isActive ? "bg-white/10 text-white" : "bg-transparent"
            }`}
          >
            {label}
          </Button>
        )}
      </NavLink>
    </ConfigProvider>
  );
};
