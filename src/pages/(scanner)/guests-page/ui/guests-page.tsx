import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Page,
} from "@/shared/ui";
import { SearchIcon } from "lucide-react";
import { GuestList } from "./guest-list";
import { Text } from "@/shared/ui";
import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { useGetGuestsInfiniteQuery } from "@/entities/guest/model/api";
import { useRouter } from "next/navigation";

export const GuestsPage = () => {
  const router = useRouter();
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
      <MainButton
        text="Invite"
        onClick={() => router.push("/scanner/guests/invite")}
      />
    </Page>
  );
};
