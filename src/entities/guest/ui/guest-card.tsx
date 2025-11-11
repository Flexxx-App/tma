import { IGuest } from "../model/types";
import { cn } from "@/shared/lib/utils";
import { Text } from "@/shared/ui/text";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui";
import { cva } from "class-variance-authority";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  guest: IGuest;
  className?: string;
}

const guestStatusBadgeVariants = cva("w-fit text-primary-foreground", {
  variants: {
    status: {
      active: "bg-green-500/10 text-green-500",
      scanned: "bg-yellow-500/10 text-yellow-500",
      queued: "bg-gray-500/10 text-gray-500",
    },
  },
  defaultVariants: {
    status: "active",
  },
});

export const GuestCard = ({ guest, className, ...props }: IProps) => {
  const { status } = guest;
  return (
    <div
      className={cn(
        className,
        "flex gap-4 justify-between items-center bg-card/50 backdrop-blur p-4 rounded-md"
      )}
      {...props}
    >
      <div className="flex gap-4 items-center">
        <Avatar>
          <AvatarImage src={guest.avatarUrl} />
          <AvatarFallback>
            {guest.name
              .split(" ")
              .map((name) => name.charAt(0).toUpperCase())
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <Text>{guest.name}</Text>
            <Badge
              variant="default"
              className={guestStatusBadgeVariants({ status })}
            >
              {status}
            </Badge>
          </div>
          <Text className="text-sm text-muted-foreground">{guest.email}</Text>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost">
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};
