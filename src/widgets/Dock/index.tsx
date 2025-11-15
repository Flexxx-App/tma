"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(() =>
    menuItems.findIndex((item) => item.href === pathname),
  );

  useEffect(() => {
    const index = menuItems.findIndex((item) => item.href === pathname);
    if (index >= 0) {
      setActiveIndex(index);
    }
  }, [pathname]);

  if (pathname !== "/" && pathname !== "/profile") {
    return null;
  }

  const itemsWithHandlers = menuItems.map((item, index) => ({
    ...item,
    href: undefined,
    onClick: () => {
      setActiveIndex(index);
      if (item.href) {
        router.push(item.href);
      }
    },
  }));

  return (
    <div className={cn("flex justify-center min-h-[54px] mb-4", className)}>
      <MenuDock
        className="justify-center"
        items={itemsWithHandlers}
        variant="compact"
        animated={false}
        showLabels={false}
        activeIndex={activeIndex >= 0 ? activeIndex : 0}
      />
    </div>
  );
}
