import { NavLink } from "react-router";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  label: string;
};

export function NavButton({ href, label }: Props) {
  return (
    <NavLink to={href}>
      {({ isActive }) => (
        <Button
          size="sm"
          variant="outline"
          className={cn(
            "w-full !p-4 lg:w-auto justify-between font-normal hover:bg-white/25 cursor-pointer hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent text-white outline-none transition-all duration-300",
            isActive ? "bg-white/25 text-white" : "bg-transparent",
          )}
        >
          {label}
        </Button>
      )}
    </NavLink>
  );
}
