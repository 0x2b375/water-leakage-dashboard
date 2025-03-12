import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useMedia } from "react-use";
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
  {
    href: "/profile",
    label: "Profile",
  },
];

export const Navigation = () => {
  const navigate = useNavigate();
  const pathname = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMedia("(max-width: 1024px)", false);

  const onClick = (href: string) => {
    navigate(href);
    setIsOpen(false); // Close the sheet after navigation
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button
            variant="outline"
            size="sm"
            className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent focus:bg-white/30 transition"
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className="px-2" side="left">
          <nav className="flex flex-col gap-y-2 pt-10">
            {routes.map((route) => (
              <Button
                variant={route.href === pathname.pathname ? "default" : "ghost"}
                key={route.href}
                onClick={() => onClick(route.href)}
                className="w-full justify-start"
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton key={route.href} href={route.href} label={route.label} />
      ))}
    </nav>
  );
};

export default Navigation;
