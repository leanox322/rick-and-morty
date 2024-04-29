"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header: FC = () => {
  const routeName = usePathname();

  const linkStyle = (path: string) => {
    return `hover:text-yellow-400 transition-colors ${
      routeName === path ? "text-yellow-400" : ""
    }`;
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container flex justify-between">
        <Link href="/episodes">
          <span className={linkStyle("/episodes")}>Episodes</span>
        </Link>
        <Link href="/characters">
          <span className={linkStyle("/characters")}>Characters</span>
        </Link>
        <Link href="/locations">
          <span className={linkStyle("/locations")}>Locations</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
