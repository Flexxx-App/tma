import { cn } from "@/shared/lib/utils";
import { GuestCard } from "@/entities/guest/ui/guest-card";
import { IGuest } from "@/entities/guest/model/types";
import Link from "next/link";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/ui/empty";
import { Ghost } from "lucide-react";

interface IProps {
  className?: string;
  guests: IGuest[];
}

export const GuestList = ({ className, guests, ...props }: IProps) => {
  return (
    <div className={cn(className, "flex flex-col gap-4")} {...props}>
      {guests?.map((guest) => (
        <Link key={guest.id} href={`/scanner/guests/${guest.id}`}>
          <GuestCard guest={guest} />
        </Link>
      ))}
      {guests?.length === 0 && (
        <Empty className="gap-1">
          <EmptyMedia variant="icon">
            <Ghost className="size-4" />
          </EmptyMedia>
          <EmptyContent className="gap-1">
            <EmptyTitle className="font-semibold">No guests found</EmptyTitle>
            <EmptyDescription>You have no guests yet.</EmptyDescription>
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
};
