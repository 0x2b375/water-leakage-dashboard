import UserButton from "../user-button";
import { WelcomeMsg } from "../welcome-msg";
import { HeaderLogo } from "./header-logo";
import Navigation from "./navigation";

const Header = () => {
  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-600 px-4 py-8 lg:px-14 pb-36 z-10 relative">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <UserButton afterSignOutUrl="/" userName="John Doe" />
        </div>
        <WelcomeMsg />
      </div>
    </div>
  );
};

export default Header;
