import { Card, CardContent } from "@/shared/ui/card";
import Image from "next/image";
import { Text } from "@/shared/ui";
import { IEvent } from "@/entities/event/model/types";
import { FC } from "react";
import { formatDate } from "@/entities/event/lib/format-date";

export const EventOverview: FC<{ event: IEvent }> = ({ event }) => {
  return (
    <div>
      <Card>
        <CardContent className="flex gap-4 items-center">
          <Image
            src={event?.poster_url ?? ""}
            alt="Event"
            width={100}
            height={100}
            className="size-12 object-cover rounded-md aspect-square"
          />
          <div className="flex flex-col">
            <Text className="font-semibold">{event?.name ?? ""}</Text>
            <Text className="text-sm text-muted-foreground">
              {formatDate(event?.starts_at ?? "")}
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
