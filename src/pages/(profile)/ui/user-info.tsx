import { Avatar, AvatarImage, AvatarFallback, Text } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

interface IProps {
  name: string;
  avatar: string;
  username: string;
  className?: string;
}

export const UserInfoWidget = ({
  name,
  avatar,
  username,
  className,
}: IProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 p-4 justify-center flex-col",
        className
      )}
    >
      <Avatar className="size-24">
        <AvatarImage src={avatar} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <Text className="text-lg">{name}</Text>
        <Text className="text-sm text-muted-foreground">@{username}</Text>
      </div>
    </div>
  );
};
