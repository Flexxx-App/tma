import { cn } from "@/shared/lib/utils";
import { GuestCard } from "@/entities/guest/ui/guest-card";
import { IGuest } from "@/entities/guest/model/types";
import Link from "next/link";

interface IProps {
  className?: string;
  guests: IGuest[];
}

export const GuestList = ({ className, guests, ...props }: IProps) => {
  return (
    <div className={cn(className, "flex flex-col gap-4")} {...props}>
      {guests.map((guest) => (
        <Link key={guest.id} href={`/scanner/guests/${guest.id}`}>
          <GuestCard guest={guest} />
        </Link>
      ))}
    </div>
  );
};
