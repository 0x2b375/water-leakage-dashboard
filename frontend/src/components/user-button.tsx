import { LogOut } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type UserButtonProps = {
  afterSignOutUrl: string;
  userName: string;
};

const UserButton: React.FC<UserButtonProps> = ({ afterSignOutUrl, userName }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Add your sign-out logic here (clearing tokens, etc.)
    // Then navigate to the afterSignOutUrl
    navigate(afterSignOutUrl);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center rounded-full focus:outline-none cursor-pointer" type="button">
          <Avatar className="h-10 w-10">
            <AvatarImage src="avatar.jpg" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{userName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="opacity-80 flex">
          <LogOut />
          {" "}
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
