"use client";

import { cn } from "@/lib/utils";
import { LayoutDashboard, MessageSquare, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FreeCounter from "./free-counter";
import Image from "next/image";

const routes = [
  
  {
    label: "Email generator",
    icon: MessageSquare,
    href: "/email-generator",
  
  },

  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

interface sidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}

const Sidebar = ({ apiLimitCount = 0, isPro = false }: sidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-black text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/email-generator" className="flex items-center pl-3 mb-14">
          <div className="relative h-10 w-10 mr-4">
          <Image
                fill
                alt="Logo"
                src="/logo.png"
                />
          </div>
            <h1 className="text-lg font-bold">Generator</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white  hover:bg-gray-400/10  rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-green-400"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3")} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount} />
    </div>
  );
};

export default Sidebar;
