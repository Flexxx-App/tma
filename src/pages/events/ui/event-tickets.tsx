import { Page } from "@/shared/ui";
import { EventListWidget } from "./event-list";
import { cn } from "@/shared/lib/utils";
import { IEvent } from "@/entities/event/model/types";

interface IProps {
  className?: string;
}

const mockEvents: IEvent[] = [
  {
    id: "1",
    title: "Event 1",
    description: "Description 1",
    startsAt: "2025-01-01",
    endsAt: "2025-01-02",
    location: "Location 1",
    price: 100,
    posterUrl:
      "https://cdn.europosters.eu/image/750/posters/vintage-new-york-poster-i187882.jpg",
  },
  {
    id: "2",
    title: "Event 2",
    description: "Description 2",
    startsAt: "2025-01-03",
    endsAt: "2025-01-04",
    location: "Location 2",
    price: 200,
    posterUrl:
      "https://cdn.europosters.eu/image/750/posters/vintage-new-york-poster-i187882.jpg",
  },
];

export const EventTicketsPage: React.FC<IProps> = ({ className, ...props }) => {
  return (
    <Page className={cn("flex flex-col gap-2", className)} {...props}>
      <EventListWidget events={mockEvents} />
    </Page>
  );
};
