import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Page,
} from "@/shared/ui";
import { SearchIcon } from "lucide-react";
import { IGuest } from "@/entities/guest/model/types";
import { GuestList } from "./guest-list";
import { Text } from "@/shared/ui";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { useGetGuestsInfiniteQuery } from "@/entities/guest/model/api";

const guests: IGuest[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    status: "active",
    createdAt: "2025-01-01T00:00:00.000Z",
    avatarUrl: "https://github.com/shadcn.png",
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "1234567890",
    status: "active",
    createdAt: "2025-01-01T00:00:00.000Z",
    avatarUrl: "https://github.com/shadcn.png",
  },
];

export const GuestsPage = () => {
  const eventId = localStorage.getItem("scanner_event_id");
  const { data: guests } = useGetGuestsInfiniteQuery({
    eventId: eventId!,
  });
  const guestsData = guests?.pages?.flatMap((page) => page.data ?? []) ?? [];
  return (
    <Page className="p-4 space-y-4 flex flex-col">
      <Text className="text-2xl font-bold mb-4!">Guests</Text>
      <InputGroup>
        <InputGroupInput placeholder="Search by email, name..." />
        <InputGroupAddon align="inline-start">
          <SearchIcon className="size-4" />
        </InputGroupAddon>
      </InputGroup>
      <GuestList guests={guestsData} />
      <MainButton text="Invite" />
    </Page>
  );
};
