"use client";

import { MenuDock, type MenuDockItem } from "@/shared/ui";
import { Ticket, User } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { usePathname } from "next/navigation";

const menuItems: MenuDockItem[] = [
  {
    label: "tickets",
    icon: Ticket,
    href: "/",
  },
  {
    label: "profile",
    icon: User,
    href: "/profile",
  },
];

interface IProps {
  className?: string;
  items?: MenuDockItem[];
}

export function Dock({ className }: IProps) {
  const pathname = usePathname();

  if (pathname !== "/" && pathname !== "/profile") {
    return null;
  }

  return (
    <div className={cn("flex justify-center min-h-[54px] mb-4", className)}>
      <MenuDock
        className="justify-center"
        items={menuItems}
        variant="compact"
        animated={false}
        showLabels={false}
      />
    </div>
  );
}
