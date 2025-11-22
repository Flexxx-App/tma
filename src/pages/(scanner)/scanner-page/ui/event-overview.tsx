import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/card";
import Image from "next/image";
import { Text } from "@/shared/ui";

export const EventOverview = () => {
  return (
    <div>
      <Card>
        <CardContent className="flex gap-4 items-center">
          <Image
            src="https://picsum.photos/200/300"
            alt="Event"
            width={100}
            height={100}
            className="size-12 object-cover rounded-md aspect-square"
          />
          <div className="flex flex-col">
            <Text>Event Name</Text>
            <Text className="text-sm text-muted-foreground">2025-12-12</Text>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
