"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Create Event", path: "/create-event" },  
    { name: "Canteen", path: "/canteen-menu" },
    { name: "Lost & Found", path: "/lost-found" },
    { name: "Helpdesk", path: "/helpdesk" },
    { name: "Recommendations", path: "/recommendations" },
    
    
  ];

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      
    
      <div className="text-xl font-bold">
        Campus Companion
      </div>

      <ul className="flex gap-6">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`hover:underline ${
                  isActive ? "font-bold underline" : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}