import Image from "next/image";
import React from "react";
import { Icons } from "@/components/icons";
import Link from "next/link";

const SideBar = () => {
  const Menuitems = [
    {
      name: "Main",
      icon: Icons.dashboard,
      href: "/dashboard",
    },
    {
      name: "inbox",
      icon: Icons.notifications,
      href: "/dashboard/inbox",
    },
    {
      name: "Settings",
      icon: Icons.settings,
      href: "/dashboard/settings",
    },
  ];

  return (
    <aside className="w-20 h-screen px-2">
      <div className="h-full px-3 py-4 overflow-y-auto bg-background">
        <div className="flex items-center mb-7">
          <Image
            src="/todo key-icon.png"
            className="mr-3 rounded-full"
            alt="Klucz-lista Logo"
            width={38}
            height={38}
          />
        </div>
        <ul className="space-y-2 font-medium">
          {Menuitems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center p-2 text-black rounded-sm dark:text-white hover:bg-primary transition duration-300"
              >
                <item.icon className="w-5 h-5" />
                {/* <span className="ml-3">{item.name}</span> */}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
