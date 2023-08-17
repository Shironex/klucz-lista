import Image from "next/image";
import React from "react";
import { ThemeToggle } from "../theme-toggle";
import UserDropdown from "../user-dropdown";
import { UserNotifications } from "../user-notifications";

const DashboardNavBar = () => {

  return (
    <nav className="bg-backgroundNav w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
        <div className="flex items-center">
          <Image
            src="/todo key-icon.png"
            className="h-8 mr-3"
            width={36}
            height={36}
            alt="Klucz-lista Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-black dark:text-primary-foreground">
            Klucz-lista
          </span>
        </div>
        <div className="flex gap-2">
          <ThemeToggle />
          <UserNotifications />
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavBar;
