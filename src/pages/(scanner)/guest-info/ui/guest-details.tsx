import { cn } from "@/shared/lib/utils";
import { Text } from "@/shared/ui";
import { IGuest } from "@/entities/guest/model/types";

interface IGuestDetailItemProps {
  label: string;
  value: string | number;
  isLast?: boolean;
}

const GuestDetailItem = ({ label, value }: IGuestDetailItemProps) => {
  return (
    <div className={cn("flex justify-between")}>
      <Text className="text-sm">{label}</Text>
      <Text className="text-sm text-muted-foreground">{value}</Text>
    </div>
  );
};

export const GuestDetails = ({ guest }: { guest: IGuest }) => {
  const gender = guest.gender === "male" ? "Male" : "Female";
  return (
    <div className="flex flex-col gap-2 bg-card rounded-md p-4">
      <GuestDetailItem label="Gender" value={gender} />
      <GuestDetailItem label="Age" value={`${guest.age} y.o.`} />
    </div>
  );
};
