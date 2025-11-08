"use client";

import { MenuDock, type MenuDockItem } from "@/shared/ui";
import { Ticket, User } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const menuItems: MenuDockItem[] = [
  {
    label: "tickets",
    icon: Ticket,
    onClick: () => console.log("Tickets clicked"),
  },
  {
    label: "profile",
    icon: User,
    onClick: () => console.log("Profile clicked"),
  },
];

interface IProps {
  className?: string;
  items?: MenuDockItem[];
}

export function Dock({ className }: IProps) {
  return (
    <div className={cn("flex justify-center min-h-[54px]", className)}>
      <MenuDock
        className="w-full justify-center"
        items={menuItems}
        variant="compact"
        animated={false}
        showLabels={false}
      />
    </div>
  );
}
