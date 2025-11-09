import { Text } from "@/shared/ui/text";
import { Truck, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

interface IProps {
  trackingNumber: string;
  trackingUrl: string;
}

export const Tracking = ({ trackingNumber, trackingUrl }: IProps) => {
  return (
    <div className="flex gap-2 justify-between bg-card items-center backdrop-blur rounded-md p-4">
      <div className="flex items-center gap-4">
        <Truck className="size-5" />
        <div className="flex flex-col">
          <Text className="text-xs text-muted-foreground uppercase">
            Tracking Number
          </Text>
          <Text className="text-sm">{trackingNumber}</Text>
        </div>
      </div>
      <Link href={trackingUrl}>
        <SquareArrowOutUpRight className="size-4" />
      </Link>
    </div>
  );
};
