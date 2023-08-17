"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const NavBar = () => {
  const router = useRouter();
  const navlist = [
    {
      name: "About",
      href: "/#about",
    },
    {
      name: "Services",
      href: "/#services",
    },
    {
      name: "Contact",
      href: "/#contact",
    },
    {
      name: "Pricing",
      href: "/#pricing",
    },
  ];

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
        <div className="flex md:order-2 gap-2">
          <Button type="button" onClick={() => router.push("/login")}>
            Get started
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" variant="ghost" className="md:hidden">
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-backgroundNav mt-3">
              <ul>
                {navlist.map((link) => (
                  <li key={link.name}>
                    <Link
                      className="block py-2 pl-3 pr-4 text-white md:hover:bg-transparent md:hover:text-primary md:p-0 "
                      href={link.href}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex font-medium p-4 md:p-0 mt-4 md:space-x-8 md:mt-0 md:border-0 ">
            {navlist.map((link) => (
              <li key={link.name}>
                <Link
                  className="block py-2 pl-3 pr-4 text-white md:hover:bg-transparent md:hover:text-primary md:p-0 "
                  href={link.href}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
