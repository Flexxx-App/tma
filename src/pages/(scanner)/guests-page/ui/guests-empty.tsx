import { UsersIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/ui/empty";
import { cn } from "@/shared/lib/utils";

interface IProps {
  className?: string;
}

export function GuestsEmpty({ className }: IProps) {
  return (
    <Empty className={cn(className)}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <UsersIcon className="size-4" />
        </EmptyMedia>
        <EmptyTitle>No Guests Yet</EmptyTitle>
        <EmptyDescription>You have no guests yet.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
