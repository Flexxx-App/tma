import { cn } from "@/shared/lib/utils";
import { Text } from "@/shared/ui";

interface IGuestDetailItemProps {
  label: string;
  value: string;
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

export const GuestDetails = () => {
  return (
    <div className="flex flex-col gap-2 bg-card rounded-md p-4">
      <GuestDetailItem label="Email" value="john.doe@example.com" />
      <GuestDetailItem label="Phone" value="1234567890" />
      <GuestDetailItem label="Gender" value="Male" />
      <GuestDetailItem label="Age" value="25 y.o." />
      <GuestDetailItem label="Location" value="United States" />
    </div>
  );
};
