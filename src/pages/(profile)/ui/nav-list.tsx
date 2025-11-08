import * as React from "react";
import {
  ShoppingBagIcon,
  ChevronRightIcon,
  CreditCardIcon,
  HelpCircleIcon,
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

const navListItems = [
  {
    label: "Orders",
    icon: ShoppingBagIcon,
    description: "View your orders",
  },
  {
    label: "Payment Methods",
    icon: CreditCardIcon,
    description: "Manage your payment methods",
  },
  {
    label: "Help",
    icon: HelpCircleIcon,
    description: "Get help with your account",
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
          <React.Fragment key={item.label}>
            <Item className="hover:bg-card/50 transition-colors duration-100 py-3">
              <ItemMedia className="size-8 bg-white/20! rounded-md p-2">
                <item.icon className="size-6" />
              </ItemMedia>
              <ItemContent className="gap-0">
                <ItemTitle>{item.label}</ItemTitle>
                <ItemDescription className="text-sm!">
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
              <ItemSeparator className="w-[88%]! ml-auto" />
            )}
          </React.Fragment>
        ))}
      </ItemGroup>
    </div>
  );
}
