import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Field,
  FieldLabel,
  FieldContent,
  Page,
  Text,
} from "@/shared/ui";
import { GuestDetails } from "./guest-details";
import { IProduct, ProductList } from "./product-list";
import { ITicket, TicketList } from "./ticket-list";
import { IPass } from "@/entities/passes/model/types";

const mockProducts: IProduct[] = [
  {
    id: "1",
    name: "Product 1",
    quantity: 1,
  },
  {
    id: "2",
    name: "Product 2",
    quantity: 2,
  },
];

const mockTickets: ITicket[] = [
  {
    id: "1",
    name: "Ticket 1",
    quantity: 1,
  },
  {
    id: "2",
    name: "Ticket 2",
    quantity: 2,
  },
];

export const GuestInfoPage = ({ id }: { id: string }) => {
  return (
    <Page className="flex flex-col gap-4 p-4">
      <div className="flex flex-col items-center gap-3 pt-6">
        <Avatar className="size-32">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center">
          <Text className="text-lg">John Doe</Text>
          <Text className="text-sm text-muted-foreground">@john.doe</Text>
        </div>
      </div>
      <Field>
        <FieldLabel className="text-muted-foreground">DETAILS</FieldLabel>
        <FieldContent>
          <GuestDetails />
        </FieldContent>
      </Field>
      <Field>
        <FieldLabel className="text-muted-foreground">TICKETS</FieldLabel>
        <FieldContent>
          <TicketList tickets={mockTickets} />
        </FieldContent>
      </Field>
      <Field>
        <FieldLabel className="text-muted-foreground">PRODUCTS</FieldLabel>
        <FieldContent>
          <ProductList products={mockProducts} />
        </FieldContent>
      </Field>
    </Page>
  );
};
