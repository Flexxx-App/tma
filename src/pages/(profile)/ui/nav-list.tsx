import {
  ShoppingBagIcon,
  ChevronRightIcon,
  CreditCardIcon,
  HelpCircleIcon,
  SettingsIcon,
} from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
  Button,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";

const navListItems = [
  {
    label: "Orders",
    icon: ShoppingBagIcon,
    description: "View your orders",
    href: "/orders",
  },
  {
    label: "Help",
    icon: HelpCircleIcon,
    description: "Get help with your account",
    href: process.env.NEXT_PUBLIC_HELP_URL,
  },
];

interface IProps {
  className?: string;
}

export function NavList({ className }: IProps) {
  return (
    <div className={cn("flex w-full flex-col gap-6", className)}>
      <ItemGroup className="bg-card/40 rounded-md">
        {navListItems.map((item, index) => (
          <Link href={item.href ?? ""} key={item.label}>
            <Item className="py-2 hover:bg-card/50 transition-colors duration-100">
              <ItemMedia className="size-8 bg-white/20! rounded-md p-2">
                <item.icon className="size-6" />
              </ItemMedia>
              <ItemContent className="gap-0">
                <ItemTitle>{item.label}</ItemTitle>
                <ItemDescription className="text-sm! hidden sm:block">
                  {item.description}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ChevronRightIcon className="size-4 text-muted-foreground transition-colors duration-100" />
                </Button>
              </ItemActions>
            </Item>
            {index !== navListItems.length - 1 && (
              <ItemSeparator className="w-[80%]! ml-auto sm:w-[88%]" />
            )}
          </Link>
        ))}
      </ItemGroup>
    </div>
  );
}
